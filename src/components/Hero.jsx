import { Suspense, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import HeroCanvas from './HeroCanvas'

const stats = [
  { value: '82%', label: 'Deploy Time↓' },
  { value: '10K', label: 'Concurrent Req.' },
  { value: '70%', label: 'Cost Reduction' },
  { value: '0',   label: 'Config Drift' },
]

const phrases = [
  'devops-engineer',
  'cloud-architect',
  'k8s-orchestrator',
  'terraform-wizard',
  'gcp-specialist',
]

function Typewriter() {
  const [text, setText] = useState('')
  const [si, setSi] = useState(0)
  const [ci, setCi] = useState(0)
  const [del, setDel] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      const phrase = phrases[si]
      if (!del) {
        setText(phrase.slice(0, ci + 1))
        if (ci + 1 > phrase.length) { setDel(true); return }
        setCi(c => c + 1)
      } else {
        setText(phrase.slice(0, ci - 1))
        if (ci - 1 < 0) {
          setDel(false)
          setSi(s => (s + 1) % phrases.length)
          setCi(0)
          return
        }
        setCi(c => c - 1)
      }
    }, del ? 40 : 75)
    return () => clearTimeout(timer)
  }, [si, ci, del])

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      fontFamily: 'var(--mono)', fontSize: '0.88rem',
      padding: '10px 16px', background: 'var(--surf)',
      border: '1px solid var(--border)', borderLeft: '3px solid var(--lime)',
      borderRadius: 3, marginBottom: 24, width: 'fit-content', maxWidth: '100%',
    }}>
      <span style={{ color: 'var(--lime)' }}>$</span>
      <span>{text}</span>
      <span style={{ color: 'var(--lime)', animation: 'blink 1s step-end infinite' }}>_</span>
      <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
    </div>
  )
}

const fadeUp = { hidden: { opacity: 0, y: 32 }, visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] } }) }

export default function Hero() {
  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', padding: 0 }}>
      {/* 3D Background Canvas */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <Suspense fallback={<div style={{ position: 'absolute', inset: 0, background: 'var(--bg)' }} />}>
          <HeroCanvas />
        </Suspense>
      </div>

      {/* Gradient overlay so text is readable */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        background: 'linear-gradient(90deg, rgba(3,3,3,0.92) 0%, rgba(3,3,3,0.75) 55%, rgba(3,3,3,0.15) 100%)',
      }} />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, width: '100%', maxWidth: 'var(--max-w)', margin: '0 auto', padding: 'calc(64px + 48px) var(--pad) 80px' }}>
        <motion.div custom={0} variants={fadeUp} initial="hidden" animate="visible">
          <div className="eyebrow">
            <span className="eyebrow-line" />
            Junior DevOps &amp; Cloud Engineer · MRIIRS 2027
          </div>
        </motion.div>

        <motion.h1 custom={1} variants={fadeUp} initial="hidden" animate="visible"
          style={{ fontFamily: 'var(--sans)', fontSize: 'clamp(3.2rem, 8vw, 7.5rem)', fontWeight: 700, lineHeight: 0.95, marginBottom: 24, color: 'var(--text)' }}>
          <span style={{ display: 'block' }}>Vanshit</span>
          <span style={{ display: 'block', color: 'var(--lime)' }}>Sharma<span style={{ color: 'rgba(200,255,0,0.5)' }}>.</span></span>
        </motion.h1>

        <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
          <Typewriter />
        </motion.div>

        <motion.p custom={3} variants={fadeUp} initial="hidden" animate="visible"
          style={{ fontSize: '0.95rem', color: 'var(--muted)', maxWidth: 520, lineHeight: 1.8, marginBottom: 28 }}>
          Building resilient cloud infrastructure on GCP &amp; AWS — GitOps pipelines, Kubernetes orchestration, and DevSecOps automation that scales.
        </motion.p>

        {/* Stats */}
        <motion.div custom={4} variants={fadeUp} initial="hidden" animate="visible"
          style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: 32, width: 'fit-content', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden' }}>
          {stats.map((s, i) => (
            <div key={i} style={{ padding: '12px 22px', textAlign: 'center', borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--lime)', lineHeight: 1 }}>{s.value}</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--muted)', marginTop: 4, whiteSpace: 'nowrap', fontFamily: 'var(--mono)' }}>{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div custom={5} variants={fadeUp} initial="hidden" animate="visible" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
            View Projects ↓
          </button>
          <a href="mailto:vanshitsharma2006@gmail.com" className="btn-outline">Get in Touch ↗</a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
        <motion.div style={{ width: 1, height: 48, background: 'linear-gradient(to bottom, var(--lime), transparent)' }}
          animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
        <span style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--dim)', textTransform: 'uppercase', letterSpacing: '0.15em' }}>scroll</span>
      </motion.div>
    </section>
  )
}
