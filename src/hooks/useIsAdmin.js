import { useEffect, useState } from 'react'
import { getCurrentUser, checkIsAdmin, onAuthStateChange } from '../lib/supabase'

/**
 * Hook per verificare se l'utente corrente è admin
 * A differenza di useAdminAuth, questo NON fa redirect
 * Utilizzato per mostrare/nascondere elementi UI
 */
export const useIsAdmin = () => {
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const checkAdminStatus = async () => {
      try {
        const currentUser = await getCurrentUser()
        
        if (!isMounted) return
        
        if (!currentUser) {
          setIsAdmin(false)
          setLoading(false)
          return
        }

        const adminStatus = await checkIsAdmin(currentUser.email)
        
        if (!isMounted) return
        
        setIsAdmin(adminStatus)
        setLoading(false)
      } catch (error) {
        console.error('Error checking admin status:', error)
        if (!isMounted) return
        setIsAdmin(false)
        setLoading(false)
      }
    }

    checkAdminStatus()

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = onAuthStateChange(() => {
      if (!isMounted) return
      checkAdminStatus()
    })

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [])

  return { isAdmin, loading }
}

