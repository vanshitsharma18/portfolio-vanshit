import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const projects = [
  {
    id: 1, num: '01',
    title: 'GitOps Kubernetes Pipeline',
    subtitle: 'Full CI/CD · GKE · ArgoCD · Trivy',
    desc: 'Production-grade GitOps pipeline deploying a microservices app to GKE Autopilot. GitHub Actions builds & scans container images with Trivy, ArgoCD syncs Kubernetes manifests declaratively, and Prometheus+Grafana provide observability — achieving 82% faster deploy times with zero config drift.',
    tech: ['GitHub Actions', 'GKE Autopilot', 'ArgoCD', 'Trivy', 'Prometheus', 'Grafana', 'Helm', 'Docker'],
    metrics: [
      { v: '82%', l: 'Deploy↓' },
      { v: '0',   l: 'Drift'  },
      { v: '100%',l: 'CVE Block' },
    ],
    github: 'https://github.com/vanshitsharma18/todo-app-deployment',
    tag: 'Featured',
    accent: 'var(--lime)',
    icon: '🔷',
  },
  {
    id: 2, num: '02',
    title: 'Serverless Notification System',
    subtitle: 'AWS Lambda · SNS · SQS · DynamoDB',
    desc: 'Event-driven notification platform on AWS supporting 10K+ concurrent requests at 70% lower cost than traditional approaches. Uses Lambda + SNS fan-out, SQS DLQ for zero message loss, Terraform IaC, and Eventbridge for scheduling — presented at Com-IT CON 2025.',
    tech: ['AWS Lambda', 'SNS', 'SQS', 'DynamoDB', 'Terraform', 'EventBridge', 'CloudWatch'],
    metrics: [
      { v: '10K',  l: 'Req/s' },
      { v: '70%',  l: 'Cost↓' },
      { v: '0',    l: 'Loss'  },
    ],
    github: 'https://github.com/vanshitsharma18/serverless-notification-system',
    tag: 'Published 📄',
    accent: 'var(--orange)',
    icon: '⚡',
  },
  {
      id: '03', num: '03',
      title: 'GCP Incident Management Platform',
      subtitle: 'Multi-Environment IaC',
      desc: 'Enterprise-grade incident management system leveraging Infrastructure as Code across dev, staging, and production environments. Implemented with Terraform and Terragrunt for modular, reusable infrastructure, deployed on Cloud Run with secure access via Workload Identity Federation and IAP — ensuring consistent, scalable, and secure operations.',
      tech: ['Terraform', 'Terragrunt', 'Cloud Run', 'WIF', 'IAP'],
      metrics: [
        { v: '7', l: 'Modules' },
        { v: '3', l: 'Environments' },
        { v: '0', l: 'Unauth Access' },
      ],
      github: 'https://github.com/vanshitsharma18/infra-repo',
      tag: 'Featured',
      accent: 'var(--blue)',
      icon: '🛠️',
  },
]

function ProjectCard({ project, index }) {
  const [hovered, setHovered] = useState(false)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const cardRef = useRef()

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width  - 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5
    setRotate({ x: y * -10, y: x * 10 })
  }
  const handleMouseLeave = () => { setHovered(false); setRotate({ x: 0, y: 0 }) }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background: 'var(--surf)',
        border: `1px solid ${hovered ? project.accent + '44' : 'var(--border)'}`,
        borderRadius: 8,
        overflow: 'hidden',
        position: 'relative',
        transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${hovered ? 8 : 0}px)`,
        transition: 'transform 0.12s ease, border-color 0.3s, box-shadow 0.3s',
        boxShadow: hovered ? `0 20px 60px rgba(0,0,0,0.5), 0 0 30px ${project.accent}22` : '0 4px 24px rgba(0,0,0,0.3)',
        cursor: 'default',
      }}
    >
      {/* Top accent */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${project.accent}, transparent)` }} />

      {/* Glow effect */}
      {hovered && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: `radial-gradient(circle at 50% 0%, ${project.accent}08, transparent 60%)`,
          pointerEvents: 'none',
        }} />
      )}

      <div style={{ padding: '22px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--dim)', marginBottom: 6, letterSpacing: '0.1em' }}>{project.num}</div>
            <span style={{ fontSize: '1.6rem' }}>{project.icon}</span>
          </div>
          <div style={{ display: 'flex', gap: 6, flexDirection: 'column', alignItems: 'flex-end' }}>
            {project.tag && (
              <span style={{ fontSize: '0.6rem', padding: '3px 8px', background: project.accent === 'var(--lime)' ? 'rgba(200,255,0,0.1)' : project.accent === 'var(--orange)' ? 'rgba(255,107,53,0.1)' : 'rgba(123,142,255,0.1)', border: `1px solid ${project.accent}44`, borderRadius: 3, color: project.accent, fontFamily: 'var(--mono)' }}>
                {project.tag}
              </span>
            )}
          </div>
        </div>

        <h3 style={{ fontFamily: 'var(--sans)', fontSize: '1rem', fontWeight: 700, color: 'var(--text)', marginBottom: 4, lineHeight: 1.25 }}>{project.title}</h3>
        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.66rem', color: 'var(--muted)', marginBottom: 14 }}>{project.subtitle}</div>

        {/* Metrics */}
        <div style={{ display: 'flex', border: '1px solid var(--border)', borderRadius: 4, overflow: 'hidden', marginBottom: 14 }}>
          {project.metrics.map((m, i) => (
            <div key={i} style={{ flex: 1, padding: '8px 4px', textAlign: 'center', borderRight: i < project.metrics.length - 1 ? '1px solid var(--border)' : 'none' }}>
              <div style={{ fontFamily: 'var(--sans)', fontSize: '1.1rem', fontWeight: 700, color: project.accent, lineHeight: 1 }}>{m.v}</div>
              <div style={{ fontSize: '0.56rem', color: 'var(--muted)', marginTop: 3, fontFamily: 'var(--mono)' }}>{m.l}</div>
            </div>
          ))}
        </div>

        {/* Description */}
        <p style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.75, marginBottom: 14 }}>{project.desc}</p>

        {/* Tech pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 16 }}>
          {project.tech.map(t => <span key={t} className="pill">{t}</span>)}
        </div>

        {/* GitHub link */}
        <a href={project.github} target="_blank" rel="noopener"
          style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '0.75rem', fontFamily: 'var(--mono)', color: 'var(--muted)', textDecoration: 'none', padding: '6px 12px', background: 'var(--surf2)', border: '1px solid var(--border)', borderRadius: 3, cursor: 'none', transition: 'color 0.2s, border-color 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'var(--muted)'; e.currentTarget.style.borderColor = 'var(--border)' }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
          View on GitHub ↗
        </a>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="grid-bg">
      <div className="container">
        <div className="eyebrow"><span className="eyebrow-line" />04 — Projects</div>
        <h2 className="section-title">What I've <span className="lime">built.</span></h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.4 }}
          style={{ marginTop: 32, textAlign: 'center' }}>
          <a href="https://github.com/vanshitsharma18" target="_blank" rel="noopener" className="btn-outline">
            More on GitHub ↗
          </a>
        </motion.div>
      </div>
    </section>
  )
}
