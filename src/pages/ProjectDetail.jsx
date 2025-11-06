import { useParams, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProject } from '../lib/supabase'
import './ProjectDetail.css'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProject()
  }, [id])

  const loadProject = async () => {
    try {
      setLoading(true)
      const data = await getProject(id)
      setProject(data)
    } catch (err) {
      console.error('Errore caricamento progetto:', err)
      setError('Progetto non trovato')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="project-detail">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          Caricamento progetto...
        </div>
      </div>
    )
  }

  if (error || !project) {
    return (
      <div className="project-detail">
        <div className="project-not-found">
          <h2>Progetto non trovato</h2>
          <button onClick={() => navigate('/progetti')}>Torna ai progetti</button>
        </div>
      </div>
    )
  }

  // Prepara le immagini: main_image + gallery_images
  const allImages = []
  if (project.main_image) {
    allImages.push(project.main_image)
  }
  if (project.gallery_images && Array.isArray(project.gallery_images)) {
    allImages.push(...project.gallery_images)
  }

  return (
    <div className="project-detail">
      {/* Sezione principale: prima foto + info */}
      <div className="project-hero">
        <div className="project-hero-image">
          <button className="back-button" onClick={() => navigate('/progetti')}>
            ← Torna ai progetti
          </button>
          {allImages.length > 0 ? (
            <img src={allImages[0]} alt={project.title} />
          ) : (
            <div style={{ 
              width: '100%', 
              height: '400px', 
              backgroundColor: '#f0f0f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              Nessuna immagine disponibile
            </div>
          )}
        </div>

        <div className="project-hero-content">
          <h1>{project.title}</h1>
          <h2>{project.subtitle}</h2>

          <div className="project-description">
            {project.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          {project.specs && project.specs.length > 0 && (
            <div className="project-specs">
              <h3>Specifiche tecniche</h3>
              <ul>
                {project.specs.map((spec, index) => (
                  <li key={index}>{spec}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Gallery a tutta larghezza - altre foto */}
      {allImages.length > 1 && (
        <div className="project-gallery">
          {allImages.slice(1).map((image, index) => (
            <div key={index} className="gallery-image">
              <img src={image} alt={`${project.title} - ${index + 2}`} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProjectDetail
