import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

const infoCards = [
  { icon: '🎓', label: 'Education', value: 'B.Tech CSE · MRIIRS · 2023–2027' },
  { icon: '🏢', label: 'Internship', value: 'NextGenya Solutions · Jun–Jul 2025' },
  { icon: '📍', label: 'Location', value: 'New Delhi, India' },
  { icon: '📄', label: 'Publication', value: 'Com-IT CON 2025 International Conference' },
  { icon: '✉',  label: 'Email', value: 'vanshitsharma2006@gmail.com' },
]

const highlights = [
  { emoji: '🏅', text: 'GCP Associate Cloud Engineer certified' },
  { emoji: '⚙️', text: 'Building GitOps pipelines with GitHub Actions + ArgoCD on GKE Autopilot' },
  { emoji: '🔒', text: 'Practising DevSecOps — Trivy container scanning, IAM least-privilege' },
  { emoji: '📄', text: 'Research published at Com-IT CON 2025 International Conference' },
  { emoji: '☁️', text: 'Hands-on with GCP, AWS, and Azure multi-cloud deployments' },
]

export default function About() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="about">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 64, alignItems: 'start' }} ref={ref}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8 }}>
            <div className="eyebrow"><span className="eyebrow-line" />01 — About Me</div>
            <h2 className="section-title" style={{ marginBottom: 20 }}>
              Building reliable infra,<br /><span className="lime">one pipeline at a time.</span>
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.88, marginBottom: 14 }}>
              B.Tech CSE student at <strong style={{ color: 'var(--text)' }}>MRIIRS (2023–2027)</strong> with hands-on experience in cloud infrastructure, CI/CD automation, and DevSecOps. Interned at <strong style={{ color: 'var(--text)' }}>NextGenya Solutions</strong> where I built Azure DevOps pipelines cutting manual release coordination by 30% and achieved zero unauthorized deployments.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--muted)', lineHeight: 1.88, marginBottom: 24 }}>
              I'm a <strong style={{ color: 'var(--text)' }}>GCP ACE-certified</strong> engineer actively building GitOps workflows on GKE Autopilot. My Serverless Notification System on AWS was presented at <strong style={{ color: 'var(--text)' }}>Com-IT CON 2025</strong>, an international conference on cloud computing.
            </p>

            {/* Highlights */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
              {highlights.map((h, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.55 }}
                  style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '10px 14px', background: 'var(--surf)', border: '1px solid var(--border)', borderRadius: 5, fontSize: '0.82rem', color: 'var(--muted)', lineHeight: 1.6 }}
                >
                  <span style={{ fontSize: '1rem', flexShrink: 0 }}>{h.emoji}</span>
                  <span>{h.text}</span>
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn-primary" onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}>
                View My Work →
              </button>
              <a href="https://linkedin.com/in/vanshit-sharma" target="_blank" rel="noopener" className="btn-outline">LinkedIn ↗</a>
            </div>
          </motion.div>

          {/* Right: info cards */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 8, position: 'sticky', top: 88 }}>
            {infoCards.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.07 }}
                whileHover={{ x: 6, borderColor: 'rgba(255,255,255,0.15)' }}
                style={{ display: 'flex', gap: 14, alignItems: 'center', padding: '14px 16px', background: 'var(--surf)', border: '1px solid var(--border)', borderRadius: 6, borderLeft: i === 0 ? '3px solid var(--lime)' : '1px solid var(--border)', cursor: 'default' }}
              >
                <span style={{ fontSize: '1.2rem' }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: 'var(--mono)', fontSize: '0.6rem', color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{c.label}</div>
                  <div style={{ fontSize: '0.84rem', fontWeight: 500, color: 'var(--text)', marginTop: 2 }}>{c.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Tag cloud */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
              {['GitOps', 'DevSecOps', 'Kubernetes', 'Terraform', 'Cloud Native', 'Published Researcher'].map(t => (
                <span key={t} className="pill pill-lime">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #about .container > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}
