import { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Contact from './components/Contact'
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

export default function App() {
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
      <Cursor />
      <ScrollProgress />
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
