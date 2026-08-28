import { useEffect, useState } from 'react'

const SESSION_KEY = 'mbnc-intro-played'

export default function SiteIntro() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    sessionStorage.setItem(SESSION_KEY, '1')
    setShow(true)
  }, [])

  if (!show) return null

  return (
    <div className="site-intro" aria-hidden="true">
      <img src="/images/MBNC_LOGO.jpeg" alt="" className="site-intro-crest" />
      <img src="/images/MBNC_WORDMARK.png" alt="MBNC" className="site-intro-word" />
    </div>
  )
}