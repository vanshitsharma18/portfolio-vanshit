import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { id: 'about',         label: 'About' },
  { id: 'skills',        label: 'Skills' },
  { id: 'experience',    label: 'Experience' },
  { id: 'projects',      label: 'Projects' },
  { id: 'certifications',label: 'Certs' },
  { id: 'contact',       label: 'Contact' },
]

const navStyles = {
  nav: {
    position: 'fixed', top: 0, left: 0, right: 0,
    zIndex: 400, height: 64,
    display: 'flex', alignItems: 'center',
    padding: '0 48px', gap: 40,
    transition: 'background 0.3s, border-color 0.3s, backdrop-filter 0.3s',
  },
  logo: {
    fontFamily: 'var(--mono)', fontSize: '1rem', fontWeight: 600,
    color: 'var(--text)', marginRight: 'auto', flexShrink: 0,
    textDecoration: 'none', cursor: 'none',
  },
  link: {
    padding: '6px 12px', fontSize: '0.8rem', fontWeight: 500,
    color: 'var(--muted)', background: 'none', border: 'none',
    borderRadius: 3, cursor: 'none', fontFamily: 'var(--body)',
    position: 'relative', transition: 'color 0.2s',
  },
  hire: {
    padding: '8px 18px', background: 'var(--lime)', color: '#000',
    fontSize: '0.78rem', fontWeight: 700, borderRadius: 3,
    textDecoration: 'none', flexShrink: 0, cursor: 'none',
    whiteSpace: 'nowrap', transition: 'opacity 0.2s, transform 0.2s',
  },
}

export default function Navbar({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <nav style={{
      ...navStyles.nav,
      background: scrolled ? 'rgba(3,3,3,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
    }}>
      <a href="#hero" style={navStyles.logo} onClick={e => { e.preventDefault(); scrollTo('hero') }}>
        <span style={{ color: 'var(--lime)' }}>&lt;</span>vs<span style={{ color: 'var(--lime)' }}>/&gt;</span>
      </a>

      {/* Desktop links */}
      <div style={{ display: 'flex', gap: 2 }} className="desktop-nav">
        {links.map(l => (
          <motion.button
            key={l.id}
            style={{
              ...navStyles.link,
              color: activeSection === l.id ? 'var(--lime)' : 'var(--muted)',
              background: activeSection === l.id ? 'rgba(200,255,0,0.06)' : 'none',
            }}
            whileHover={{ color: 'var(--text)' }}
            onClick={() => scrollTo(l.id)}
          >
            {l.label}
            {activeSection === l.id && (
              <motion.div layoutId="nav-indicator" style={{
                position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                width: 4, height: 4, borderRadius: '50%', background: 'var(--lime)',
              }} />
            )}
          </motion.button>
        ))}
      </div>

      <a href="mailto:vanshitsharma2006@gmail.com" style={navStyles.hire}
        className="desktop-nav">Hire Me</a>

      {/* Hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{ display: 'none', flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'none', padding: 4 }}
        className="ham-btn"
        aria-label="Menu"
      >
        {[0,1,2].map(i => (
          <motion.span key={i} style={{ display: 'block', width: 22, height: 1.5, background: 'var(--text)', borderRadius: 1 }}
            animate={menuOpen ? {
              rotate: i === 1 ? 0 : i === 0 ? 45 : -45,
              y: i === 0 ? 6.5 : i === 2 ? -6.5 : 0,
              opacity: i === 1 ? 0 : 1,
            } : { rotate: 0, y: 0, opacity: 1 }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{
              position: 'fixed', top: 64, left: 0, right: 0, bottom: 0,
              background: 'rgba(3,3,3,0.97)', backdropFilter: 'blur(20px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center',
              justifyContent: 'center', gap: 8, zIndex: 399,
            }}
          >
            {links.map(l => (
              <button key={l.id} onClick={() => scrollTo(l.id)}
                style={{ ...navStyles.link, fontSize: '1.3rem', color: activeSection === l.id ? 'var(--lime)' : 'var(--text)', padding: '12px 32px' }}>
                {l.label}
              </button>
            ))}
            <a href="mailto:vanshitsharma2006@gmail.com" style={{ ...navStyles.hire, marginTop: 16 }}>Hire Me</a>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .ham-btn { display: flex !important; }
        }
        @media (max-width: 480px) {
          nav { padding: 0 20px !important; }
        }
      `}</style>
    </nav>
  )
}
