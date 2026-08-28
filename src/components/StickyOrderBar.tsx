import { useEffect, useState } from 'react'
import type { RefObject } from 'react'
import type { Product } from '../types'

interface StickyOrderBarProps {
  product: Product
  anchorRef: RefObject<HTMLElement>
}

export default function StickyOrderBar({ product, anchorRef }: StickyOrderBarProps) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = anchorRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only show once the original button has fully scrolled above the viewport
        // (bottom edge above 0), not just as soon as its top edge passes — avoids
        // the sticky bar and the original button both being visible at once.
        setVisible(entry.boundingClientRect.bottom < 0)
      },
      { threshold: 0 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [anchorRef])

  return (
    <div className={`sticky-order-bar${visible ? ' visible' : ''}`} aria-hidden={!visible}>
      <div className="container sticky-order-inner">
        <div className="sticky-order-info">
          <img src={product.image} alt={product.name} />
          <div>
            <strong>{product.name}</strong>
            <span>₹{product.price}</span>
          </div>
        </div>
        <a href={product.formUrl} target="_blank" rel="noreferrer" className="btn btn-primary shine">
          Order Now
        </a>
      </div>
    </div>
  )
}