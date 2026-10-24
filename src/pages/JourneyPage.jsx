import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PLAYER, LEVELS } from '../data/roadmap'
import { PROJECTS } from '../data/projects'
import '../styles/journey.css'

// ─── SCROLL REVEAL HOOK ──────────────────────────────
function useReveal(once = true) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) obs.disconnect()
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [once])
  return [ref, visible]
}

// ─── STARFIELD ───────────────────────────────────────
function Starfield() {
  return (
    <>
      <div className="journey-starfield" aria-hidden="true" />
      <div className="journey-sky-overlay" aria-hidden="true" />
      <div className="journey-mountains" aria-hidden="true" />
    </>
  )
}

// ─── XP BAR ─────────────────────────────────────────
function XpBar({ current, max }) {
  const pct = Math.min(100, Math.round((current / max) * 100))
  return (
    <div className="xp-bar-wrapper">
      <div className="xp-label">
        <span>XP (Decorative)</span>
        <span>{current.toLocaleString()} / {max.toLocaleString()}</span>
      </div>
      <div className="xp-bar-track" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={max} aria-label="Learning XP progress">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
        />
      </div>
    </div>
  )
}

// ─── PLAYER PROFILE ──────────────────────────────────
function PlayerProfile() {
  const [ref, visible] = useReveal()
  return (
    <motion.div
      ref={ref}
      className="player-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3 }}
    >
      <div className="player-avatar" aria-hidden="true">
        🧑‍💻
        <div className="player-avatar-level">L{PLAYER.level}</div>
      </div>

      <div className="player-info">
        <div className="player-name">{PLAYER.name}</div>
        <div className="player-role">{PLAYER.role}</div>
        <XpBar current={PLAYER.xp} max={PLAYER.xpMax} />
      </div>

      <div className="player-stats" aria-label="Player statistics">
        <div className="player-stat">
          <div className="player-stat-val">{PLAYER.level}/{PLAYER.totalLevels}</div>
          <div className="player-stat-lbl">Levels</div>
        </div>
        <div className="player-stat">
          <div className="player-stat-val">{PLAYER.achievements}</div>
          <div className="player-stat-lbl">Skills</div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── JOURNEY HEADER ──────────────────────────────────
function JourneyHeader() {
  return (
    <header className="journey-header">
      <motion.div
        className="journey-eyebrow"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="journey-eyebrow-line" />
        Cloud &amp; DevOps Roadmap
      </motion.div>

      <motion.h1
        className="journey-title"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        The <span className="accent-cyan">Journey</span>{' '}
        <span className="accent-gold">Map</span>
      </motion.h1>

      <motion.p
        className="journey-subtitle"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        A visual roadmap of my Cloud &amp; DevOps engineering journey — from Linux fundamentals to advanced platform engineering.
        Five islands, real projects, and an honest view of where I am.
      </motion.p>

      <PlayerProfile />
    </header>
  )
}

// ─── STATUS BADGE ────────────────────────────────────
function StatusBadge({ status }) {
  const labels = { completed: '✓ Completed', current: '⚡ In Progress', planned: '◈ Planned' }
  return (
    <span className={`status-badge ${status}`}>{labels[status]}</span>
  )
}

// ─── FLOATING ISLAND GRAPHIC ─────────────────────────
function FloatingIsland({ color, isActive }) {
  const glowStyle = isActive ? { filter: `drop-shadow(0 0 18px ${color}66)` } : {}
  return (
    <div className="island-graphic" style={glowStyle} aria-hidden="true">
      {/* Tree decorations */}
      <span className="island-tree t1">🌳</span>
      <span className="island-tree t2">🌲</span>
      {/* Grassy top */}
      <div className="island-top" style={{ boxShadow: `0 0 20px ${color}22` }} />
      {/* Rocky underside */}
      <div className="island-bottom" />
      {/* Waterfall */}
      <div className="island-waterfall" />
    </div>
  )
}

// ─── LEVEL CARD ──────────────────────────────────────
function LevelCard({ level, isSelected, onClick }) {
  const [ref, visible] = useReveal()
  const doneCount = level.milestones.filter(m => m.done).length
  const totalCount = level.milestones.length

  const borderColor = isSelected ? level.color : 'var(--j-border)'
  const boxShadow = isSelected
    ? `0 0 30px ${level.glowColor}, 0 8px 32px rgba(0,0,0,0.4)`
    : '0 4px 20px rgba(0,0,0,0.3)'

  return (
    <div
      ref={ref}
      className={`reveal level-card ${visible ? 'visible' : ''}`}
      style={{ borderColor, boxShadow }}
      onClick={onClick}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && onClick()}
      tabIndex={0}
      role="button"
      aria-pressed={isSelected}
      aria-label={`Level ${level.num}: ${level.title} — ${level.status}`}
    >
      <div className="level-card-topbar" style={{ background: `linear-gradient(90deg, ${level.color}, transparent)` }} />

      <div className="level-card-header">
        <div>
          <div className="level-card-num">LEVEL {level.num}</div>
          <div className="level-card-icon">{level.icon}</div>
        </div>
        <StatusBadge status={level.status} />
      </div>

      <div className="level-card-title">{level.title}</div>
      <div className="level-card-theme">{level.theme}</div>
      <p className="level-card-desc">{level.description}</p>

      {/* Progress */}
      <div className="level-progress-wrap">
        <div className="level-progress-header">
          <span>Progress</span>
          <span>{level.progress}%</span>
        </div>
        <div className="level-progress-track">
          <motion.div
            className="level-progress-fill"
            style={{ background: `linear-gradient(90deg, ${level.color}cc, ${level.color})` }}
            initial={{ width: 0 }}
            animate={{ width: `${level.progress}%` }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />
        </div>
      </div>

      {/* Milestone chips */}
      <div className="level-milestones-mini" aria-label="Milestones">
        {level.milestones.slice(0, 4).map((m, i) => (
          <span key={i} className={`milestone-chip ${m.done ? 'done' : 'todo'}`}>
            {m.done ? '✓' : '○'} {m.text.length > 28 ? m.text.slice(0, 26) + '…' : m.text}
          </span>
        ))}
      </div>

      <div className="card-view-hint" aria-hidden="true">
        <span>›</span>
        <span>{isSelected ? 'Viewing details below' : 'Click to explore this level'}</span>
      </div>
    </div>
  )
}

// ─── LEVEL DETAILS PANEL ─────────────────────────────
function LevelDetails({ level, projects, onClose }) {
  const levelProjects = level.projects
    .map(lp => projects.find(p => p.id === lp.id))
    .filter(Boolean)

  return (
    <AnimatePresence>
      <motion.section
        key={level.id}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.5 }}
        className="details-panel"
        style={{ borderColor: level.color + '44' }}
        aria-label={`Details for Level ${level.num}: ${level.title}`}
      >
        {/* Header */}
        <div className="details-panel-header">
          <div className="details-panel-title-row">
            <span className="details-icon">{level.icon}</span>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                <StatusBadge status={level.status} />
              </div>
              <h2 className="details-h2">Level {level.num}: {level.title}</h2>
              <div className="details-theme">{level.theme}</div>
            </div>
          </div>
          <button className="details-close" onClick={onClose} aria-label="Close level details">
            ✕ Close
          </button>
        </div>

        {/* Body */}
        <div className="details-body">
          {/* Left: Skills */}
          <div>
            <div className="details-section-title">Skills &amp; Topics</div>
            <div className="skills-categories">
              {level.skills.map((cat, ci) => (
                <div key={ci}>
                  <div className="skill-category-label">{cat.category}</div>
                  <div className="skill-items">
                    {cat.items.map((item, ii) => (
                      <div key={ii} className="skill-item">{item}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Milestones, Tasks, Projects */}
          <div>
            <div className="details-section-title">Milestones</div>
            <div className="milestones-list">
              {level.milestones.map((m, i) => (
                <div key={i} className="milestone-row">
                  <div className={`milestone-check ${m.done ? 'done' : 'todo'}`}>
                    {m.done && '✓'}
                  </div>
                  <span className={`milestone-text ${m.done ? 'done' : ''}`}>{m.text}</span>
                </div>
              ))}
            </div>

            {level.currentTasks.length > 0 && (
              <>
                <div className="details-section-title" style={{ marginTop: 20 }}>Current Tasks</div>
                <div className="tasks-list">
                  {level.currentTasks.map((t, i) => (
                    <div key={i} className="task-row">
                      <div className="task-dot" aria-hidden="true" />
                      <span>{t.text}</span>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Linked projects */}
            {levelProjects.length > 0 && (
              <>
                <div className="details-section-title" style={{ marginTop: 20 }}>Related Projects</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {levelProjects.map(p => (
                    <div key={p.id} style={{
                      padding: '10px 12px',
                      background: 'rgba(100,130,255,0.05)',
                      border: '1px solid var(--j-border2)',
                      borderRadius: 6,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: 10,
                      flexWrap: 'wrap',
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                          <span>{p.icon}</span>
                          <span style={{ fontFamily: 'var(--sans)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--j-text)' }}>{p.title}</span>
                        </div>
                        <div style={{ fontFamily: 'var(--mono)', fontSize: '0.58rem', color: 'var(--j-muted)' }}>{p.subtitle}</div>
                      </div>
                      {p.github && (
                        <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn github">
                          <GithubIcon /> GitHub ↗
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Achievement */}
            <div className={`achievement-banner ${level.achievement.earned ? 'earned' : ''}`}>
              <span className="achievement-emoji">{level.achievement.emoji}</span>
              <div>
                <div className="achievement-label">{level.achievement.label}</div>
                <div className="achievement-sublabel">
                  {level.achievement.earned ? '✓ Achievement unlocked' : '○ Not yet earned'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </AnimatePresence>
  )
}

// ─── SVG PATH CONNECTOR ──────────────────────────────
function PathConnector({ from, to, color }) {
  // Simple cubic bezier path
  const mx = (from.x + to.x) / 2
  const my = (from.y + to.y) / 2
  const d = `M ${from.x} ${from.y} C ${from.x} ${my}, ${to.x} ${my}, ${to.x} ${to.y}`
  return (
    <path
      d={d}
      className="path-dot"
      stroke={color}
      strokeWidth="2.5"
      opacity="0.6"
    />
  )
}

// ─── GITHUB ICON ─────────────────────────────────────
function GithubIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  )
}

// ─── ROADMAP WORLD ───────────────────────────────────
function RoadmapWorld({ selectedId, onSelect }) {
  const alignments = ['left', 'right', 'left', 'right', 'left']

  return (
    <section className="roadmap-world" aria-label="Cloud and DevOps Roadmap">
      <div className="roadmap-world-inner">
        {LEVELS.map((level, idx) => {
          const align = alignments[idx]
          const isSelected = selectedId === level.id

          return (
            <div key={level.id}>
              <div className={`island-station align-${align}`}>
                {/* Island visual */}
                <div className="island-visual" aria-hidden="true">
                  <FloatingIsland color={level.color} isActive={isSelected || level.status === 'current'} />
                  <div className="level-sign">
                    <div className="level-sign-num">Level {level.num}</div>
                    <div className="level-sign-title">{level.title}</div>
                  </div>
                </div>

                {/* Card */}
                <LevelCard
                  level={level}
                  isSelected={isSelected}
                  onClick={() => onSelect(isSelected ? null : level.id)}
                />
              </div>

              {/* Dotted connector path between islands */}
              {idx < LEVELS.length - 1 && (
                <div aria-hidden="true" style={{ display: 'flex', justifyContent: align === 'left' ? 'flex-end' : 'flex-start', padding: '0 40px' }}>
                  <svg width="120" height="60" viewBox="0 0 120 60" style={{ display: 'block' }}>
                    <path
                      d={align === 'left'
                        ? 'M 100 0 C 100 30, 20 30, 20 60'
                        : 'M 20 0 C 20 30, 100 30, 100 60'
                      }
                      fill="none"
                      stroke={LEVELS[idx + 1].color}
                      strokeWidth="2"
                      strokeDasharray="6 5"
                      opacity="0.45"
                      className="path-dot"
                    />
                    {/* Glow dots */}
                    <circle cx={align === 'left' ? 100 : 20} cy="0" r="4" fill={level.color} opacity="0.7" />
                    <circle cx={align === 'left' ? 20 : 100} cy="60" r="4" fill={LEVELS[idx + 1].color} opacity="0.7" />
                  </svg>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}

// ─── PROJECTS SECTION ────────────────────────────────
function ProjectsSection() {
  const [ref, visible] = useReveal()
  return (
    <section className="projects-section" aria-labelledby="projects-heading">
      <div className="projects-section-inner">
        <div ref={ref} className={`reveal ${visible ? 'visible' : ''}`}>
          <div className="journey-eyebrow" style={{ marginBottom: 8 }}>
            <span className="journey-eyebrow-line" />
            Real Work
          </div>
          <h2 id="projects-heading" className="projects-section-title">
            Projects I've <span className="accent">built.</span>
          </h2>
          <p className="projects-section-sub">
            Each project maps to a roadmap level — theory applied to real cloud infrastructure.
          </p>
        </div>

        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              className="project-card"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              style={{
                '--proj-accent': p.accent,
                boxShadow: 'none',
              }}
              whileHover={{ boxShadow: `0 0 28px ${p.accent}22, 0 8px 32px rgba(0,0,0,0.3)`, borderColor: p.accent + '44' }}
            >
              <div className="project-card-topbar" style={{ background: `linear-gradient(90deg, ${p.accent}, transparent)` }} />

              <div className="project-card-header">
                <span className="project-card-icon">{p.icon}</span>
                <span className="project-level-tag">Level {p.level < 10 ? '0' + p.level : p.level}</span>
              </div>

              <div className="project-title">{p.title}</div>
              <div className="project-subtitle">{p.subtitle}</div>
              <p className="project-desc">{p.description}</p>

              <div className="project-tech-wrap">
                {p.tech.map(t => <span key={t} className="project-tech-pill">{t}</span>)}
              </div>

              <div className="project-links">
                {p.github && (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="project-link-btn github">
                    <GithubIcon /> View on GitHub ↗
                  </a>
                )}
                {p.demo && (
                  <a href={p.demo} target="_blank" rel="noopener noreferrer" className="project-link-btn demo">
                    ↗ Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── JOURNEY FOOTER / FINAL ISLAND ───────────────────
function JourneyFooter() {
  const [ref, visible] = useReveal()
  const futureGoals = [
    'Advanced Kubernetes Ops',
    'Platform Engineering',
    'Self-Service Infrastructure',
    'SRE & Error Budgets',
    'Open-Source Contributions',
    'Cloud Cost Governance',
    'Advanced Observability',
    'Distributed Systems Design',
  ]

  return (
    <footer className="journey-footer" aria-labelledby="final-heading">
      <div className="journey-footer-inner">
        <div ref={ref} className={`reveal final-island ${visible ? 'visible' : ''}`}>
          <div className="final-island-glow" aria-hidden="true" />

          <div className="final-castle" aria-label="Castle — final destination">🏰</div>

          <h2 id="final-heading" className="final-title">
            To Be <span className="accent">Continued…</span>
          </h2>
          <p className="final-sub">
            The journey doesn't end here. Advanced cloud architecture, Kubernetes at scale, platform engineering, and open-source contributions are next on the horizon.
          </p>

          <div className="final-goals" aria-label="Future learning goals">
            {futureGoals.map(g => (
              <span key={g} className="final-goal-pill">{g}</span>
            ))}
          </div>

          <div className="final-ctas">
            <a href="/#projects" className="btn-journey-primary">
              Explore My Projects ↓
            </a>
            <a href="https://github.com/vanshitsharma18" target="_blank" rel="noopener noreferrer" className="btn-journey-outline">
              <GithubIcon /> View GitHub ↗
            </a>
            <a href="/#contact" className="btn-journey-outline">
              Contact Me ↗
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── JOURNEY PAGE (MAIN) ─────────────────────────────
export default function JourneyPage() {
  const [selectedLevelId, setSelectedLevelId] = useState(3) // default: current level
  const detailsRef = useRef(null)

  const selectedLevel = LEVELS.find(l => l.id === selectedLevelId) || null

  const handleSelect = (id) => {
    setSelectedLevelId(id)
    if (id !== null) {
      // Smooth scroll to details panel after state update
      setTimeout(() => {
        detailsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 80)
    }
  }

  return (
    <div className="journey-page">
      {/* Decorative background layers */}
      <Starfield />

      {/* Page content */}
      <div className="journey-content">
        {/* Header + player profile */}
        <JourneyHeader />

        {/* Roadmap world */}
        <RoadmapWorld
          selectedId={selectedLevelId}
          onSelect={handleSelect}
        />

        {/* Details panel — renders below selected level */}
        <div ref={detailsRef} style={{ padding: '0 var(--pad)', position: 'relative', zIndex: 1 }}>
          <div style={{ maxWidth: 960, margin: '0 auto' }}>
            {selectedLevel && (
              <LevelDetails
                level={selectedLevel}
                projects={PROJECTS}
                onClose={() => setSelectedLevelId(null)}
              />
            )}
          </div>
        </div>

        {/* Projects */}
        <ProjectsSection />

        {/* Final destination */}
        <JourneyFooter />
      </div>
    </div>
  )
}
