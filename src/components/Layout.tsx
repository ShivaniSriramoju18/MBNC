import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { WHATSAPP_LINK, YOUTUBE_LINK, INSTAGRAM_LINK } from '../config/site'
import ScrollProgress from './ScrollProgress'
import SiteIntro from './SiteIntro'
interface LayoutProps {
  children: ReactNode
}

const navLinks = [
  { to: '/', label: 'Products', end: true },
  { to: '/company', label: 'Company Info' },
  { to: '/team', label: 'Team' },
]

export default function Layout({ children }: LayoutProps) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
    <SiteIntro/>
      <div className="brand-bg" aria-hidden="true" />
      <ScrollProgress />
      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <NavLink to="/" className="brandmark">
            <img src="/images/MBNC_LOGO.jpeg" alt="MBNC crest" className="brandmark-crest" />
            <img src="/images/MBNC_WORDMARK.png" alt="MBNC" className="brandmark-word-img" />
          </NavLink>
          <nav className="primary-nav" aria-label="Primary">
            {navLinks.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.end} className={({ isActive }) => (isActive ? 'active' : '')}>
                {l.label}
              </NavLink>
            ))}
          </nav>
          <a href="#products" className="btn btn-accent shine" style={{ padding: '9px 18px' }}>
            Shop
          </a>
        </div>
      </header>

      <div key={location.pathname} className="page-transition">
        {children}
      </div>

      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div style={{ maxWidth: 300 }}>
              <div className="brandmark" style={{ marginBottom: 14 }}>
                <img src="/images/MBNC_LOGO.jpeg" alt="MBNC crest" className="brandmark-crest" />
                <img src="/images/MBNC_WORDMARK.png" alt="MBNC" className="brandmark-word-img" />
              </div>
              <p style={{ color: 'var(--text-soft)', fontSize: '0.88rem' }}>
                Try, Believe, and Repeat. Founded 2018 — Mahen Bharadwaj Nutraceuticals.
              </p>
            </div>
            <div className="footer-links">
              <div className="footer-col">
                <h4>Site</h4>
                <a href="/#products">Products</a>
                <a href="/company">Company Info</a>
                <a href="/team">Team</a>
              </div>
              <div className="footer-col">
                <h4>Connect</h4>
                <a href={INSTAGRAM_LINK} target="_blank" rel="noreferrer">Instagram</a>
                <a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a>
                <a href={YOUTUBE_LINK} target="_blank" rel="noreferrer">YouTube</a>
              </div>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} MBNC. All rights reserved.</span>
            <span>mbnc.org</span>
          </div>
          <p className="disclaimer">
            These statements have not been evaluated by any regulatory food or drug authority.
            MBNC products are not intended to diagnose, treat, cure, or prevent any disease.
            Please consult a qualified healthcare practitioner before beginning any new
            supplement, especially if pregnant, nursing, or taking medication.
          </p>
        </div>
      </footer>
    </>
  )
}
