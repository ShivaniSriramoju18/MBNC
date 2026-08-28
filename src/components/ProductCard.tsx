import { useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const cardRef = useRef<HTMLAnchorElement>(null)
  const [style, setStyle] = useState<React.CSSProperties>({})

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    const rotateY = px * 14
    const rotateX = py * -14
    setStyle({
      transform: `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px) scale(1.02)`,
    })
  }

  function handleMouseLeave() {
    setStyle({ transform: 'perspective(900px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)' })
  }

  return (
    <Link
      to={`/product/${product.id}`}
      className="product-card"
      ref={cardRef}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="product-media">
        <span className="product-cat-tag">{product.category}</span>
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-body">
        <span className="product-subtitle">{product.subtitle}</span>
        <h3>{product.name}</h3>
        <div className="product-footer">
          <span className="price-tag">₹{product.price}</span>
          <span className="btn btn-primary">View Product</span>
        </div>
      </div>
    </Link>
  )
}