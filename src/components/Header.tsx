import { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container">
        <Link to="/" className="logo" onClick={closeMenu}>
          Mateket Secondary
        </Link>
        
        <button
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
          onClick={toggleMenu}
        >
          {menuOpen ? '✕' : '☰'}
        </button>

        <nav
          id="mainNav"
          className={`main-nav ${menuOpen ? 'active' : ''}`}
          role="navigation"
          aria-label="Primary"
        >
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link to="/performance" onClick={closeMenu}>
                Performance
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
