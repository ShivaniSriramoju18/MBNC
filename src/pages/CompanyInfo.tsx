import type { ReactNode } from 'react'
import Reveal from '../components/Reveal'

interface Pillar {
  title: string
  body: string
  icon: ReactNode
}

const pillars: Pillar[] = [
  {
    title: 'The Fights',
    body: 'We embrace honest conflict and rigorous debate — staying sharp requires pushing boundaries and challenging the status quo.',
    icon: <svg viewBox="0 0 32 32" fill="none"><path d="M6 26 L26 6 M26 26 L6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
  {
    title: 'The Talking',
    body: 'We value direct, transparent dialogue where every voice is heard and clarity is paramount.',
    icon: <svg viewBox="0 0 32 32" fill="none"><path d="M5 8 H27 V21 H14 L8 27 V21 H5 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>,
  },
  {
    title: 'The Belief',
    body: 'We maintain an unwavering conviction in our shared vision, holding the line even when the road gets tough.',
    icon: <svg viewBox="0 0 32 32" fill="none"><path d="M16 4 V22 M16 22 C10 22 8 26 8 28 H24 C24 26 22 22 16 22 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" /></svg>,
  },
  {
    title: 'The Understanding',
    body: "Deep mutual respect — knowing each other's strengths, protecting our own, and standing united through every trial.",
    icon: <svg viewBox="0 0 32 32" fill="none"><path d="M6 16 C6 10 12 6 16 6 C20 6 26 10 26 16 C26 22 20 26 16 26 C12 26 6 22 6 16 Z" stroke="currentColor" strokeWidth="2" /></svg>,
  },
  {
    title: 'Making Profit',
    body: 'We drive relentlessly toward success, earning our prosperity together as a unit and sharing the rewards of our collective strength.',
    icon: <svg viewBox="0 0 32 32" fill="none"><path d="M8 26 C8 26 8 16 16 16 C24 16 24 6 24 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /><path d="M24 6 L18 8 M24 6 L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>,
  },
]

export default function CompanyInfo() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Company info</span>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw + 1rem, 3.4rem)' }}>Who We Are</h1>
          <p className="hero-lede" style={{ margin: '0 auto' }}>
            MBNC was founded in 2018 with a commitment to transforming wellness through
            authentic nutraceuticals — guided by one clear principle: work strictly with
            what the earth provides, and remain dedicated to natural integrity.
          </p>
        </div>
      </section>

      <section>
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Our philosophy</span>
            <h2>From Nature, To You</h2>
            <p>
              At MBNC, we source exclusively from nature and craft every formulation with
              you in mind. We operate on the understanding that true health cannot be
              synthesized; it must be cultivated.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <p className="pull-line">
              "Every product we manufacture reflects a balance between natural purity and
              modern nutraceutical science."
            </p>
            <p style={{ marginTop: 18 }}>
              What we take from the earth is respected, preserved, and returned with care.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="band-surface">
        <div className="container split">
          <Reveal>
            <span className="eyebrow">Growing together</span>
            <h2>Our Purpose</h2>
          </Reveal>
          <Reveal delay={100}>
            <p>
              We have a clear motive: to grow along with people, not from people. Our
              success is measured by the strength and well-being of the community
              surrounding us. We don't view our supporters as mere consumers, nor do we
              build our business on transactional relationships.
            </p>
            <p>
              We build alongside you — ensuring our progress directly translates into
              shared value, collective health, and long-term vitality for everyone who
              walks this path with us.
            </p>
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container">
          <Reveal>
            <span className="eyebrow">Our tribe</span>
            <h2 style={{ maxWidth: '20ch' }}>A family bound by loyalty.</h2>
            <p style={{ maxWidth: '65ch', fontSize: '1.02rem' }}>
              We view this company as our family — a tight-knit collective defined by
              passion, fierce loyalty, and raw authenticity, operating on complete devotion
              to one another. We are not just building a business; we are building an
              unbreakable alliance.
            </p>
          </Reveal>
          <div className="pillars">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 70} className="pillar">
                {p.icon}
                <h3>{p.title}</h3>
                <p>{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
