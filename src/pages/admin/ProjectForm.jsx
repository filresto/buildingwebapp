import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProject, createProject, updateProject } from '../../lib/supabase'
import { AdminRoute } from '../../utils/adminGuard'
import ImageUpload from '../../components/admin/ImageUpload'
import GalleryUpload from '../../components/admin/GalleryUpload'
import DynamicList from '../../components/admin/DynamicList'
import '../../styles/admin.css'

function ProjectForm() {
  const navigate = useNavigate()
  const { id } = useParams()
  const isEditMode = !!id

  const [loading, setLoading] = useState(isEditMode)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    main_image: null,
    gallery_images: [],
    specs: []
  })

  useEffect(() => {
    if (isEditMode) {
      loadProject()
    }
  }, [id])

  const loadProject = async () => {
    try {
      setLoading(true)
      const project = await getProject(id)
      setFormData({
        title: project.title,
        subtitle: project.subtitle,
        description: project.description,
        main_image: project.main_image || null,
        gallery_images: project.gallery_images || [],
        specs: project.specs || []
      })
    } catch (err) {
      console.error('Errore caricamento progetto:', err)
      setError('Impossibile caricare il progetto')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validazione
    if (!formData.title.trim()) {
      setError('Il titolo è obbligatorio')
      return
    }
    if (!formData.subtitle.trim()) {
      setError('Il sottotitolo è obbligatorio')
      return
    }
    if (!formData.description.trim()) {
      setError('La descrizione è obbligatoria')
      return
    }

    setSaving(true)
    setError(null)

    try {
      const projectData = {
        title: formData.title.trim(),
        subtitle: formData.subtitle.trim(),
        description: formData.description.trim(),
        main_image: formData.main_image,
        gallery_images: formData.gallery_images,
        specs: formData.specs
      }

      if (isEditMode) {
        await updateProject(id, projectData)
      } else {
        await createProject(projectData)
      }

      navigate('/admin/dashboard')
    } catch (err) {
      console.error('Errore salvataggio:', err)
      setError('Errore durante il salvataggio del progetto')
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    if (window.confirm('Sei sicuro? Le modifiche non salvate andranno perse.')) {
      navigate('/admin/dashboard')
    }
  }

  if (loading) {
    return (
      <AdminRoute>
        <div style={{ textAlign: 'center', padding: '3rem' }}>
          Caricamento progetto...
        </div>
      </AdminRoute>
    )
  }

  return (
    <AdminRoute>
      <div className="admin-layout">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1>{isEditMode ? 'Modifica Progetto' : 'Nuovo Progetto'}</h1>
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="btn-secondary btn-small"
            >
              ← Dashboard
            </button>
          </div>
        </header>

        <div className="admin-project-form">
          <form onSubmit={handleSubmit} className="form-container">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            {/* Informazioni base */}
            <div className="form-section">
              <h3>Informazioni Base</h3>
              
              <div className="form-group">
                <label htmlFor="title">Titolo *</label>
                <input
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Es: Progetto Residenziale"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="subtitle">Sottotitolo *</label>
                <input
                  type="text"
                  id="subtitle"
                  value={formData.subtitle}
                  onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                  placeholder="Es: Complesso residenziale moderno"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Descrizione *</label>
                <textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Descrizione dettagliata del progetto..."
                  rows={10}
                  required
                />
                <small style={{ color: '#7f8c8d', fontSize: '0.85rem' }}>
                  Usa doppie righe vuote per separare i paragrafi
                </small>
              </div>
            </div>

            {/* Immagine principale */}
            <div className="form-section">
              <h3>Immagine Principale</h3>
              <div className="form-group">
                <ImageUpload
                  value={formData.main_image}
                  onChange={(url) => setFormData({ ...formData, main_image: url })}
                  label="immagine principale"
                />
              </div>
            </div>

            {/* Gallery */}
            <div className="form-section">
              <h3>Gallery Immagini</h3>
              <div className="form-group">
                <GalleryUpload
                  images={formData.gallery_images}
                  onChange={(images) => setFormData({ ...formData, gallery_images: images })}
                />
              </div>
            </div>

            {/* Specifiche tecniche */}
            <div className="form-section">
              <h3>Specifiche Tecniche</h3>
              <div className="form-group">
                <DynamicList
                  items={formData.specs}
                  onChange={(specs) => setFormData({ ...formData, specs })}
                  placeholder="Es: Superficie: 3.500 mq"
                  label="Specifiche"
                />
              </div>
            </div>

            {/* Azioni */}
            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={saving}
              >
                {saving ? 'Salvataggio...' : isEditMode ? 'Salva Modifiche' : 'Crea Progetto'}
              </button>
              <button
                type="button"
                className="btn-secondary"
                onClick={handleCancel}
                disabled={saving}
              >
                Annulla
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminRoute>
  )
}

export default ProjectForm

