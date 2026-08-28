import { useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { products } from '../config/site'
import Feedback from '../components/Feedback'
import Reveal from '../components/Reveal'
import StickyOrderBar from '../components/StickyOrderBar'

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>()
  const product = products.find((p) => p.id === id)
  const buyRef = useRef<HTMLDivElement>(null)

  if (!product) {
    return <Navigate to="/" replace />
  }

  return (
    <main>
      <StickyOrderBar product={product} anchorRef={buyRef} />

      <section className="product-detail-hero">
        <div className="container">
          <Link to="/" className="back-link">← Back to products</Link>
          <div className="product-detail-grid">
            <Reveal className="product-detail-media">
              <span className="product-cat-tag">{product.category}</span>
              <img src={product.image} alt={product.name} />
            </Reveal>
            <Reveal delay={100} className="product-detail-info">
              <span className="product-subtitle">{product.subtitle}</span>
              <h1>{product.name}</h1>
              <p className="product-detail-desc">{product.description}</p>

              <h3 style={{ marginTop: 20 }}>Key benefits</h3>
              <ul className="product-benefits">
                {product.benefits.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>

              {product.dosage && <div className="product-dosage">{product.dosage}</div>}

              <div className="product-detail-buy" ref={buyRef}>
                <span className="price-tag-lg">₹{product.price}</span>
                <a href={product.formUrl} target="_blank" rel="noreferrer" className="btn btn-primary shine">
                  Order Now
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Feedback productId={product.id} productName={product.name} />
    </main>
  )
}