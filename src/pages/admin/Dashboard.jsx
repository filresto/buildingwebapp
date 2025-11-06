import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProjects, deleteProject, signOut } from '../../lib/supabase'
import { AdminRoute } from '../../utils/adminGuard'
import '../../styles/admin.css'

function Dashboard() {
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
      setError(null)
    } catch (err) {
      console.error('Errore caricamento progetti:', err)
      setError('Impossibile caricare i progetti')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Sei sicuro di voler eliminare "${title}"? Questa azione è irreversibile.`)) {
      return
    }

    try {
      await deleteProject(id)
      setProjects(projects.filter(p => p.id !== id))
    } catch (err) {
      console.error('Errore eliminazione progetto:', err)
      alert('Errore durante l\'eliminazione del progetto')
    }
  }

  const handleLogout = async () => {
    try {
      await signOut()
      navigate('/admin/login')
    } catch (err) {
      console.error('Errore logout:', err)
    }
  }

  return (
    <AdminRoute>
      <div className="admin-layout">
        <header className="admin-header">
          <div className="admin-header-content">
            <h1>Admin Dashboard</h1>
            <div className="admin-header-actions">
              <button 
                onClick={() => navigate('/')} 
                className="btn-link"
              >
                Vai al sito
              </button>
              <button 
                onClick={handleLogout}
                className="btn-secondary btn-small"
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="admin-dashboard">
          <div className="dashboard-header">
            <h2>Gestione Progetti</h2>
            <button 
              onClick={() => navigate('/admin/projects/new')}
              className="btn-primary"
            >
              + Nuovo Progetto
            </button>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '3rem' }}>
              Caricamento progetti...
            </div>
          )}

          {error && (
            <div className="error-message">
              {error}
            </div>
          )}

          {!loading && !error && projects.length === 0 && (
            <div className="empty-state">
              <div className="empty-state-icon">📁</div>
              <h3>Nessun progetto</h3>
              <p>Inizia creando il tuo primo progetto!</p>
              <button 
                onClick={() => navigate('/admin/projects/new')}
                className="btn-primary"
                style={{ marginTop: '1rem' }}
              >
                Crea Progetto
              </button>
            </div>
          )}

          {!loading && !error && projects.length > 0 && (
            <div className="projects-list">
              {projects.map(project => {
                const imageUrl = project.main_image || 
                               (project.gallery_images && project.gallery_images[0]) || 
                               'https://via.placeholder.com/300x200?text=No+Image'
                
                return (
                  <div key={project.id} className="project-item">
                    <img 
                      src={imageUrl} 
                      alt={project.title}
                      className="project-thumbnail"
                    />
                    <div className="project-info">
                      <h3>{project.title}</h3>
                      <p>{project.subtitle}</p>
                    </div>
                    <div className="project-actions">
                      <button
                        onClick={() => navigate(`/progetti/${project.id}`)}
                        className="btn-secondary btn-small"
                      >
                        Visualizza
                      </button>
                      <button
                        onClick={() => navigate(`/admin/projects/${project.id}/edit`)}
                        className="btn-primary btn-small"
                      >
                        Modifica
                      </button>
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        className="btn-danger btn-small"
                      >
                        Elimina
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </AdminRoute>
  )
}

export default Dashboard

