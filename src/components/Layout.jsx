import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useIsAdmin } from '../hooks/useIsAdmin'
import './Layout.css'

function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { isAdmin } = useIsAdmin()

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <div className={`layout ${!isHome ? 'layout-page' : ''}`}>
      {/* Header desktop - logo */}
      <header className="header">
        <Link to="/" className="logo-link" onClick={closeMobileMenu}>
          <img src="/logo/8.png" alt="Boschi Studio" className="logo-image" />
        </Link>
      </header>

      {/* Hamburger button - separato, sempre visibile su mobile */}
      <button
        className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={toggleMobileMenu}
        aria-label="Menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Overlay - solo mobile */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}

      <nav className={`sidebar ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
        {/* Logo nel menu mobile */}
        <div className="mobile-menu-header">
          <Link to="/" className="mobile-logo-link" onClick={closeMobileMenu}>
            <img src="/logo/8.png" alt="Boschi Studio" className="mobile-logo-image" />
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/progetti" onClick={closeMobileMenu}>Progetti</Link>
          </li>
          <li>
            <Link to="/about" onClick={closeMobileMenu}>About</Link>
          </li>
          <li>
            <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
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
          
          {/* Admin Dashboard - visibile solo se loggato come admin */}
          {isAdmin && (
            <li className="admin-nav-item">
              <Link to="/admin/dashboard" onClick={closeMobileMenu} className="admin-link">
                🔐 Admin Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>

      <main className="main-content">
        {children}
      </main>
    </div>
  )
}

export default Layout

