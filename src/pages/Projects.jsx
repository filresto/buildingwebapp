import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { getProjects } from '../lib/supabase'
import './Projects.css'

function Projects() {
  const navigate = useNavigate()
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    loadProjects()
  }, [])

  const loadProjects = async () => {
    try {
      setLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      console.error('Errore caricamento progetti:', err)
      setError('Impossibile caricare i progetti')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="projects">
        <div className="projects-container">
          <div style={{ textAlign: 'center', padding: '50px' }}>
            Caricamento progetti...
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="projects">
        <div className="projects-container">
          <div style={{ textAlign: 'center', padding: '50px', color: '#e74c3c' }}>
            {error}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="projects">
      <div className="projects-container">
        <h2 className="projects-title">Progetti</h2>
        <div className="projects-grid">
          {projects.map(project => {
            // Usa main_image se disponibile, altrimenti la prima della gallery
            const imageUrl = project.main_image || 
                            (project.gallery_images && project.gallery_images[0]) || 
                            'https://via.placeholder.com/800x600?text=Nessuna+Immagine'
            
            return (
              <div
                key={project.id}
                className="project-card"
                onClick={() => navigate(`/progetti/${project.id}`)}
              >
                <img src={imageUrl} alt={project.title} />
                <div className="project-info">
                  <h3>{project.title}</h3>
                  <p>{project.subtitle}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Projects

