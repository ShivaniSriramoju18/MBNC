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
      <SiteIntro />

      <div className="brand-bg" aria-hidden="true" />

      <ScrollProgress />

      <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
        <div className="container">

          {/* Brand */}
          <NavLink to="/" className="brandmark" aria-label="MBNC Home">
            <img
              src="/images/MBNC_LOGO.jpeg"
              alt="MBNC crest"
              className="brandmark-crest"
            />

            <img
              src="/images/MBNC_WORDMARK.png"
              alt="MBNC"
              className="brandmark-word-img"
            />
          </NavLink>

          {/* Main Navigation */}
          <nav className="primary-nav" aria-label="Primary">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  isActive ? 'active' : ''
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Shop */}
          <NavLink
            to="/"
            className="btn btn-accent shine"
            style={{ padding: '9px 18px' }}
            onClick={() => {
              setTimeout(() => {
                document
                  .getElementById('products')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }, 100)
            }}
          >
            Shop
          </NavLink>

        </div>
      </header>

      {/* Page content */}
      <div key={location.pathname} className="page-transition">
        {children}
      </div>

      {/* Footer */}
      <footer className="site-footer">
        <div className="container">

          <div className="footer-top">

            <div style={{ maxWidth: 300 }}>
              <NavLink
                to="/"
                className="brandmark"
                style={{ marginBottom: 14 }}
                aria-label="MBNC Home"
              >
                <img
                  src="/images/MBNC_LOGO.jpeg"
                  alt="MBNC crest"
                  className="brandmark-crest"
                />

                <img
                  src="/images/MBNC_WORDMARK.png"
                  alt="MBNC"
                  className="brandmark-word-img"
                />
              </NavLink>

              <p
                style={{
                  color: 'var(--text-soft)',
                  fontSize: '0.88rem',
                }}
              >
                Try, Believe, and Repeat. Founded 2018 —
                Mahen Bharadwaj Nutraceuticals.
              </p>
            </div>

            <div className="footer-links">

              {/* Site Links */}
              <div className="footer-col">
                <h4>Site</h4>

                <NavLink to="/">
                  Products
                </NavLink>

                <NavLink to="/company">
                  Company Info
                </NavLink>

                <NavLink to="/team">
                  Team
                </NavLink>
              </div>

              {/* Social Links */}
              <div className="footer-col">
                <h4>Connect</h4>

                <a
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  Instagram
                </a>

                <a
                  href={WHATSAPP_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  WhatsApp
                </a>

                <a
                  href={YOUTUBE_LINK}
                  target="_blank"
                  rel="noreferrer"
                >
                  YouTube
                </a>
              </div>

            </div>
          </div>

          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} MBNC. All rights reserved.
            </span>

            <span>mbnc.org</span>
          </div>

          <p className="disclaimer">
            These statements have not been evaluated by any regulatory food
            or drug authority. MBNC products are not intended to diagnose,
            treat, cure, or prevent any disease. Please consult a qualified
            healthcare practitioner before beginning any new supplement,
            especially if pregnant, nursing, or taking medication.
          </p>

        </div>
      </footer>
    </>
  )
}