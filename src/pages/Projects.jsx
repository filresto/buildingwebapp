import './Projects.css'

function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Progetto Residenziale',
      description: 'Complesso residenziale moderno',
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=800'
    },
    {
      id: 2,
      title: 'Edificio Commerciale',
      description: 'Centro commerciale e uffici',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800'
    },
    {
      id: 3,
      title: 'Ristrutturazione',
      description: 'Restauro edificio storico',
      image: 'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=800'
    }
  ]

  return (
    <div className="projects">
      <div className="projects-container">
        <h2 className="projects-title">Progetti</h2>
        <div className="projects-grid">
          {projects.map(project => (
            <div key={project.id} className="project-card">
              <img src={project.image} alt={project.title} />
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Projects

