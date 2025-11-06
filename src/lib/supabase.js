import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Mancano le variabili d\'ambiente Supabase. Crea un file .env.local con VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ==================== AUTH HELPERS ====================

/**
 * Effettua il login con email e password
 */
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  
  if (error) throw error
  
  // Verifica che l'utente sia un admin
  const isAdmin = await checkIsAdmin(data.user.email)
  if (!isAdmin) {
    await supabase.auth.signOut()
    throw new Error('Non hai i permessi di amministratore')
  }
  
  return data
}

/**
 * Effettua il logout
 */
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

/**
 * Ottiene l'utente corrente
 */
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) throw error
  return user
}

/**
 * Verifica se un'email è nella tabella admins
 */
export const checkIsAdmin = async (email) => {
  const { data, error } = await supabase
    .from('admins')
    .select('email')
    .eq('email', email)
    .single()
  
  if (error && error.code !== 'PGRST116') {
    // PGRST116 = no rows returned, è normale se non è admin
    console.error('Errore verifica admin:', error)
    return false
  }
  
  return !!data
}

/**
 * Ottiene la sessione corrente
 */
export const getSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw error
  return session
}

/**
 * Subscribe ai cambiamenti di autenticazione
 */
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
}

// ==================== PROJECTS CRUD ====================

/**
 * Ottiene tutti i progetti
 */
export const getProjects = async () => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data
}

/**
 * Ottiene un singolo progetto per ID
 */
export const getProject = async (id) => {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) throw error
  return data
}

/**
 * Crea un nuovo progetto
 */
export const createProject = async (projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .insert([projectData])
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Aggiorna un progetto esistente
 */
export const updateProject = async (id, projectData) => {
  const { data, error } = await supabase
    .from('projects')
    .update(projectData)
    .eq('id', id)
    .select()
    .single()
  
  if (error) throw error
  return data
}

/**
 * Elimina un progetto
 */
export const deleteProject = async (id) => {
  // Prima elimina le immagini associate
  const project = await getProject(id)
  
  if (project.main_image) {
    await deleteImageFromStorage(project.main_image)
  }
  
  if (project.gallery_images && project.gallery_images.length > 0) {
    for (const imageUrl of project.gallery_images) {
      await deleteImageFromStorage(imageUrl)
    }
  }
  
  // Poi elimina il progetto
  const { error } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)
  
  if (error) throw error
}

// ==================== STORAGE HELPERS ====================

/**
 * Carica un'immagine su Supabase Storage
 */
export const uploadImage = async (file, folder = 'projects') => {
  const fileExt = file.name.split('.').pop()
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
  
  const { data, error } = await supabase.storage
    .from('project-images')
    .upload(fileName, file, {
      cacheControl: '3600',
      upsert: false
    })
  
  if (error) throw error
  
  // Ottieni l'URL pubblico
  const { data: { publicUrl } } = supabase.storage
    .from('project-images')
    .getPublicUrl(data.path)
  
  return publicUrl
}

/**
 * Elimina un'immagine da Supabase Storage
 */
export const deleteImageFromStorage = async (imageUrl) => {
  // Estrai il path dall'URL
  // URL format: https://xxx.supabase.co/storage/v1/object/public/project-images/path/to/file.jpg
  const urlParts = imageUrl.split('/project-images/')
  if (urlParts.length !== 2) {
    console.warn('URL immagine non valido:', imageUrl)
    return
  }
  
  const filePath = urlParts[1]
  
  const { error } = await supabase.storage
    .from('project-images')
    .remove([filePath])
  
  if (error) {
    console.error('Errore eliminazione immagine:', error)
    // Non throwamo l'errore per non bloccare l'eliminazione del progetto
  }
}

/**
 * Carica più immagini contemporaneamente
 */
export const uploadMultipleImages = async (files, folder = 'gallery') => {
  const uploadPromises = files.map(file => uploadImage(file, folder))
  return await Promise.all(uploadPromises)
}

