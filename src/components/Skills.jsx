import { motion, useInView } from 'framer-motion'
import { useRef, Suspense } from 'react'
import SkillsCloud from './SkillsCloud'

const categories = [
  { label: '☁️ Cloud Platforms',   items: ['GCP', 'AWS', 'Azure'], color: 'var(--lime)' },
  { label: '☸️ Containers & Orch.',items: ['Docker', 'Kubernetes', 'GKE Autopilot', 'Helm'], color: 'var(--teal)' },
  { label: '🔁 CI/CD & GitOps',    items: ['GitHub Actions', 'ArgoCD', 'Jenkins'], color: 'var(--blue)' },
  { label: '🏗️ IaC',               items: ['Terraform', 'Ansible', 'YAML'], color: 'var(--purple)' },
  { label: '📊 Monitoring',         items: ['Prometheus', 'Grafana', 'Loki', 'Alertmanager'], color: 'var(--orange)' },
  { label: '🔒 DevSecOps',          items: ['Trivy', 'WIF', 'IAM', 'Cloud IAP'], color: 'var(--green)' },
  { label: '⚡ Serverless',          items: ['Lambda', 'SNS', 'SQS', 'DynamoDB', 'Cloud Run'], color: 'var(--orange)' },
  { label: '💻 Languages',           items: ['Python', 'Bash', 'JavaScript', 'Go'], color: 'var(--lime)' },
]

const pillColorMap = { 'var(--lime)': 'pill-lime', 'var(--teal)': 'pill-t', 'var(--blue)': 'pill-b', 'var(--purple)': 'pill-p', 'var(--orange)': 'pill-o', 'var(--green)': 'pill-g' }

export default function Skills() {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="skills" className="section-alt grid-bg">
      <div className="container">
        <div className="eyebrow"><span className="eyebrow-line" />02 — Tech Stack</div>
        <h2 className="section-title">Skills I build <span className="lime">with.</span></h2>

        {/* 3D Interactive Cloud */}
        <motion.div
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ marginBottom: 48 }}
        >
          <Suspense fallback={<div style={{ height: 440, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--muted)', fontFamily: 'var(--mono)', fontSize: '0.8rem', border: '1px solid var(--border)', borderRadius: 8 }}>Loading 3D cloud...</div>}>
            <SkillsCloud />
          </Suspense>
        </motion.div>

        {/* Skill category grid */}
        <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 10 }}>
          {categories.map((cat, ci) => (
            <motion.div key={ci}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: ci * 0.07, duration: 0.6 }}
              style={{ background: 'var(--surf)', border: '1px solid var(--border)', borderRadius: 6, padding: '14px 16px' }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text)', marginBottom: 10, paddingBottom: 8, borderBottom: '1px solid var(--border)' }}>{cat.label}</div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5 }}>
                {cat.items.map(item => (
                  <span key={item} className={`pill ${pillColorMap[cat.color] || ''}`}>{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
