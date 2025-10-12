import { useParams, useNavigate } from 'react-router-dom'
import './ProjectDetail.css'

function ProjectDetail() {
  const { id } = useParams()
  const navigate = useNavigate()

  const projectsData = {
    1: {
      title: 'Progetto Residenziale',
      subtitle: 'Complesso residenziale moderno',
      description: `Un complesso residenziale all'avanguardia che combina design contemporaneo e sostenibilità ambientale.

      Il progetto si sviluppa su 5 piani fuori terra, con particolare attenzione all'efficienza energetica e al comfort abitativo. Ogni unità è stata progettata per massimizzare l'illuminazione naturale e garantire la privacy dei residenti.

      Le strutture sono state realizzate con materiali di alta qualità, rispettando le più moderne normative antisismiche. Gli spazi comuni includono aree verdi, parcheggi sotterranei e zone dedicate al fitness e al relax.`,
      images: [
        'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000',
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1000',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1000'
      ],
      specs: [
        'Superficie: 3.500 mq',
        'Anno: 2023',
        'Ubicazione: Milano',
        'Classe energetica: A+'
      ]
    },
    2: {
      title: 'Edificio Commerciale',
      subtitle: 'Centro commerciale e uffici',
      description: `Edificio polifunzionale che ospita spazi commerciali al piano terra e uffici ai piani superiori.

      La struttura è stata progettata per offrire massima flessibilità d'uso, con ampie vetrate che garantiscono luminosità e visibilità. Il sistema di climatizzazione è stato ottimizzato per ridurre i consumi energetici.

      Gli spazi commerciali sono dotati di tutti i comfort moderni, mentre le aree uffici offrono ambienti di lavoro innovativi e funzionali. Il parcheggio multipiano può ospitare oltre 200 veicoli.`,
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1000',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1000'
      ],
      specs: [
        'Superficie: 8.000 mq',
        'Anno: 2022',
        'Ubicazione: Roma',
        'Piani: 7'
      ]
    },
    3: {
      title: 'Ristrutturazione Edificio Storico',
      subtitle: 'Restauro conservativo',
      description: `Intervento di restauro conservativo su edificio storico del centro città, con particolare attenzione alla preservazione degli elementi architettonici originali.

      Il progetto ha richiesto un'attenta analisi strutturale per garantire la sicurezza statica dell'edificio, mantenendo inalterato il suo valore storico e artistico. Sono state utilizzate tecniche innovative di consolidamento.

      Gli interni sono stati completamente rinnovati con impianti moderni, rispettando le linee guida della Soprintendenza. Il risultato è un perfetto equilibrio tra antico e moderno, funzionalità e bellezza architettonica.`,
      images: [
        'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=1000',
        'https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=1000',
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1000',
        'https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1000'
      ],
      specs: [
        'Superficie: 1.200 mq',
        'Anno: 2024',
        'Ubicazione: Firenze',
        'Epoca: XIX secolo'
      ]
    }
  }

  const project = projectsData[id]

  if (!project) {
    return (
      <div className="project-detail">
        <div className="project-not-found">
          <h2>Progetto non trovato</h2>
          <button onClick={() => navigate('/progetti')}>Torna ai progetti</button>
        </div>
      </div>
    )
  }

  return (
    <div className="project-detail">
      {/* Sezione principale: prima foto + info */}
      <div className="project-hero">
        <div className="project-hero-image">
          <button className="back-button" onClick={() => navigate('/progetti')}>
            ← Torna ai progetti
          </button>
          <img src={project.images[0]} alt={project.title} />
        </div>

        <div className="project-hero-content">
          <h1>{project.title}</h1>
          <h2>{project.subtitle}</h2>

          <div className="project-description">
            {project.description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph.trim()}</p>
            ))}
          </div>

          <div className="project-specs">
            <h3>Specifiche tecniche</h3>
            <ul>
              {project.specs.map((spec, index) => (
                <li key={index}>{spec}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Gallery a tutta larghezza - altre foto */}
      {project.images.length > 1 && (
        <div className="project-gallery">
          {project.images.slice(1).map((image, index) => (
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
