import { useEffect, useState } from 'react'

const SESSION_KEY = 'mbnc-intro-played'

export default function SiteIntro() {
 const [show] = useState(() => {
  if (typeof window === 'undefined') return false
  return !sessionStorage.getItem(SESSION_KEY)
})

useEffect(() => {
  if (show) {
    sessionStorage.setItem(SESSION_KEY, '1')
  }
}, [show])

  if (!show) return null

  return (
    <div className="site-intro" aria-hidden="true">
      <img src="/images/MBNC_LOGO.jpeg" alt="" className="site-intro-crest" />
      <img src="/images/MBNC_WORDMARK.png" alt="MBNC" className="site-intro-word" />
    </div>
  )
}