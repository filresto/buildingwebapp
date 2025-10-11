import { Link, useLocation } from 'react-router-dom'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  
  return (
    <div className={`layout ${!isHome ? 'layout-page' : ''}`}>
      <header className="header">
        <Link to="/" className="logo-link">
          <h1 className="logo">STUDIO INGEGNERIA</h1>
        </Link>
      </header>
      
      <nav className="sidebar">
        <ul className="nav-links">
          <li>
            <Link to="/progetti">Progetti</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
              Linkedin
            </a>
          </li>
          <li>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              Instagram
            </a>
          </li>
        </ul>
      </nav>
      
      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout

