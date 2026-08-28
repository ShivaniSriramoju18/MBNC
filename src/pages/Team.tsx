import { teamMembers, WHATSAPP_LINK, YOUTUBE_LINK, INSTAGRAM_LINK } from '../config/site'
import Reveal from '../components/Reveal'

function initials(name: string): string {
  return name.split(' ').map((n) => n[0]).slice(0, 2).join('')
}

export default function Team() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">The people behind MBNC</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw + 1rem, 3.4rem)' }}>Our Tribe</h1>
          <p className="hero-lede" style={{ margin: '0 auto' }}>
            The family building MBNC — devoted to one vision, one alliance.
          </p>
        </div>
      </section>

      <section style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="team-grid">
            {teamMembers.map((m, i) => (
              <Reveal key={m.name} delay={i * 90} className="team-card">
                {m.photo ? (
                  <img src={m.photo} alt={m.name} className="team-photo" />
                ) : (
                  <div className="team-avatar">{initials(m.name)}</div>
                )}
                <h3>{m.name}</h3>
                <span className="team-role">{m.role}</span>
              </Reveal>
            ))}
          </div>
          <p className="team-note">
            Reach the team on{' '}
            <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer" style={{ color: 'var(--parrot)' }}>Instagram</a>
            {', '}
            <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer" style={{ color: 'var(--parrot)' }}>WhatsApp</a>
            {' or '}
            <a href={YOUTUBE_LINK} target="_blank" rel="noreferrer" style={{ color: 'var(--parrot)' }}>YouTube</a>.
          </p>
        </div>
      </section>
    </main>
  )
}
