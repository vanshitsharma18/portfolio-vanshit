import { motion } from 'framer-motion'

const certs = [
  { logo: 'GCP', bg: 'rgba(0,255,209,0.08)', fg: 'var(--teal)', border: 'rgba(0,255,209,0.2)',
    name: 'Associate Cloud Engineer', issuer: 'Google Cloud Platform', status: 'Certified', ok: true },
  { logo: 'AWS', bg: 'rgba(255,107,53,0.08)', fg: 'var(--orange)', border: 'rgba(255,107,53,0.2)',
    name: 'Cloud Practitioner (CLF-C02)', issuer: 'Amazon Web Services', status: 'Certified', ok: true },
  { logo: 'ALI', bg: 'rgba(255,107,53,0.08)', fg: '#FF8A50', border: 'rgba(255,107,53,0.2)',
    name: 'Cloud Certified Developer', issuer: 'Alibaba Cloud', status: 'Certified', ok: true },
  { logo: 'HCP', bg: 'rgba(179,136,255,0.08)', fg: 'var(--purple)', border: 'rgba(179,136,255,0.2)',
    name: 'Terraform Associate', issuer: 'HashiCorp', status: 'In Progress', ok: false },
]

export default function Certifications() {
  return (
    <section id="certifications" className="section-alt">
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: '0.9fr 1.1fr', gap: 72, alignItems: 'start' }}>
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} viewport={{ once: true }}>
            <div className="eyebrow"><span className="eyebrow-line" />05 — Credentials</div>
            <h2 className="section-title">Certified &amp;<br /><span className="lime">still learning.</span></h2>
            <p style={{ fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.85, marginBottom: 28 }}>
              Three cloud certifications spanning GCP, AWS, and Alibaba — plus HashiCorp Terraform in progress. Each backed by real hands-on projects, not just exam prep.
            </p>

            {/* Education */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} viewport={{ once: true }}
              style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '18px 18px', background: 'var(--surf)', border: '1px solid var(--border)', borderLeft: '3px solid var(--lime)', borderRadius: 6 }}>
              <span style={{ fontSize: '1.5rem' }}>🎓</span>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text)', marginBottom: 4 }}>
                  B.Tech — Computer Science Engineering
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 4, lineHeight: 1.5 }}>
                  Manav Rachna International Institute of Research and Studies
                </div>
                <div style={{ fontFamily: 'var(--mono)', fontSize: '0.7rem', color: 'var(--lime)' }}>
                  2023 – 2027 · New Delhi, India
                </div>
              </div>
            </motion.div>

            {/* Research publication */}
            <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} viewport={{ once: true }}
              style={{ display: 'flex', gap: 14, alignItems: 'flex-start', padding: '16px 18px', background: 'rgba(251,191,36,0.04)', border: '1px solid rgba(251,191,36,0.15)', borderRadius: 6, marginTop: 10 }}>
              <span style={{ fontSize: '1.3rem' }}>📄</span>
              <div>
                <div style={{ fontFamily: 'var(--sans)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)', marginBottom: 3 }}>
                  Research Publication
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--muted)', lineHeight: 1.5 }}>
                  Serverless Notification System on AWS — presented at <strong style={{ color: '#fbbf24' }}>Com-IT CON 2025</strong> International Conference
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right: cert cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {certs.map((c, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, x: 24, y: 0 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.6, delay: i * 0.09 }}
                viewport={{ once: true }}
                style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', background: 'var(--surf)', border: `1px solid ${c.border}`, borderRadius: 6, cursor: 'default' }}
              >
                <div style={{ width: 46, height: 46, borderRadius: 8, background: c.bg, border: `1px solid ${c.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--mono)', fontSize: '0.68rem', fontWeight: 700, color: c.fg, flexShrink: 0 }}>
                  {c.logo}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)' }}>{c.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2 }}>{c.issuer}</div>
                </div>
                <span style={{
                  fontSize: '0.66rem', fontWeight: 600, padding: '3px 10px', borderRadius: 3, flexShrink: 0,
                  background: c.ok ? 'rgba(74,222,128,0.1)' : 'rgba(251,191,36,0.1)',
                  color: c.ok ? 'var(--green)' : '#fbbf24',
                  border: c.ok ? '1px solid rgba(74,222,128,0.25)' : '1px solid rgba(251,191,36,0.25)',
                }}>
                  {c.ok ? '✓' : '⏳'} {c.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #certifications .container > div { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </section>
  )
}
