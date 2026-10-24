import { useEffect, useRef, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
import JourneyPage from './pages/JourneyPage'
import { motion, useScroll, useSpring } from 'framer-motion'

// Custom cursor
function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => {
      if (dot.current) {
        dot.current.style.left = e.clientX + 'px'
        dot.current.style.top  = e.clientY + 'px'
      }
      if (ring.current) {
        ring.current.style.left = e.clientX + 'px'
        ring.current.style.top  = e.clientY + 'px'
      }
    }
    const over = (e) => { if (e.target.closest('a,button,[data-hover]')) setHovered(true) }
    const out  = () => setHovered(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseover', over)
    document.addEventListener('mouseout', out)
    return () => {
      window.removeEventListener('mousemove', move)
      document.removeEventListener('mouseover', over)
      document.removeEventListener('mouseout', out)
    }
  }, [])

  return (
    <>
      <div className="cursor-dot" ref={dot} />
      <div className={`cursor-ring ${hovered ? 'hovered' : ''}`} ref={ring} />
    </>
  )
}

// Scroll progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  return <motion.div className="scroll-progress" style={{ scaleX }} />
}

// Home page — all existing sections
function HomePage() {
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) })
      },
      { threshold: 0.4 }
    )
    sections.forEach(s => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Navbar activeSection={activeSection} />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Certifications />
        <Contact />
      </main>
    </>
  )
}

// Journey page wrapper — uses journey-aware navbar
function JourneyLayout() {
  return (
    <>
      <JourneyNavbar />
      <JourneyPage />
    </>
  )
}

// Minimal navbar for the Journey page
function JourneyNavbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      zIndex: 400, height: 64,
      display: 'flex', alignItems: 'center',
      padding: '0 48px', gap: 40,
      transition: 'background 0.3s, border-color 0.3s',
      background: scrolled ? 'rgba(4,6,26,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(100,130,255,0.15)' : '1px solid transparent',
    }}>
      <a href="/" style={{
        fontFamily: 'var(--mono)', fontSize: '1rem', fontWeight: 600,
        color: 'var(--text)', marginRight: 'auto', textDecoration: 'none', cursor: 'none',
      }}>
        <span style={{ color: 'var(--lime)' }}>&lt;</span>vs<span style={{ color: 'var(--lime)' }}>/&gt;</span>
      </a>

      <div style={{ display: 'flex', gap: 4 }} className="desktop-nav">
        {[
          { href: '/', label: 'Portfolio' },
          { href: '/journey', label: 'Journey', active: true },
        ].map(l => (
          <a key={l.href} href={l.href} style={{
            padding: '6px 12px', fontSize: '0.8rem', fontWeight: 500,
            color: l.active ? 'rgba(0,255,209,1)' : 'var(--muted)',
            background: l.active ? 'rgba(0,255,209,0.07)' : 'none',
            border: 'none', borderRadius: 3, textDecoration: 'none',
            transition: 'color 0.2s',
            position: 'relative',
          }}>
            {l.label}
            {l.active && (
              <span style={{
                position: 'absolute', bottom: 2, left: '50%', transform: 'translateX(-50%)',
                width: 4, height: 4, borderRadius: '50%', background: 'var(--j-cyan, #00FFD1)',
                display: 'block',
              }} />
            )}
          </a>
        ))}
      </div>

      <a href="mailto:vanshitsharma2006@gmail.com" style={{
        padding: '8px 18px', background: 'var(--j-cyan, #00FFD1)', color: '#000',
        fontSize: '0.78rem', fontWeight: 700, borderRadius: 3,
        textDecoration: 'none', flexShrink: 0, cursor: 'none',
        whiteSpace: 'nowrap',
      }} className="desktop-nav">
        Hire Me
      </a>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          nav[style] { padding: 0 20px !important; }
        }
      `}</style>
    </nav>
  )
}

export default function App() {
  return (
    <>
      <Cursor />
      <ScrollProgress />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/journey" element={<JourneyLayout />} />
      </Routes>
    </>
  )
}

