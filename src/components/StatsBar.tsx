import CountUp from './CountUp'
import Reveal from './Reveal'

interface Stat {
  to: number
  suffix: string
  label: string
  isYear?: boolean
}

const stats: Stat[] = [
  { to: 2018, suffix: '', label: 'Founded', isYear: true },
  { to: 5, suffix: '+', label: 'Formulations' },
  { to: 100, suffix: '%', label: 'Nature-derived sourcing' },
  { to: 4, suffix: '', label: 'Family running it' },
]

export default function StatsBar() {
  return (
    <section className="stats-bar">
      <div className="container">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 90} className="stat-item">
              <span className="stat-number">
                {s.isYear ? s.to : <CountUp to={s.to} suffix={s.suffix} />}
              </span>
              <span className="stat-label">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
