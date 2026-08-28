import Products from '../components/Products'
import StatsBar from '../components/StatsBar'

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-blobs" aria-hidden="true">
          <div className="blob blob-violet" />
          <div className="blob blob-green" />
        </div>
        <img src="/images/MBNC_LOGO.jpeg" alt="" className="hero-crest-float" aria-hidden="true" />
        <div className="container">
          <span className="eyebrow hero-eyebrow-in">Est. 2018 — A Nutraceuticals Company</span>
          <h1 className="hero-title-in">
            From nature,<br /><em className="gradient-text" style={{ fontStyle: 'italic' }}>to you.</em>
          </h1>
          <p className="hero-lede hero-lede-in">
            MBNC crafts authentic, nature-derived formulations — sourced strictly
            from what the earth provides, made with modern nutraceutical care.
          </p>
          <div className="hero-actions hero-actions-in">
            <a href="#products" className="btn btn-accent shine">Explore products</a>
            <a href="/company" className="btn btn-ghost">Our philosophy</a>
          </div>
          <p className="hero-tagline hero-tagline-in">"Try, Believe, and Repeat."</p>
        </div>
          <a href="#products" className="scroll-cue" aria-label="Scroll to products">
          <svg viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </a>
      </section>

      <StatsBar />
      <Products />
    </main>
  )
}
