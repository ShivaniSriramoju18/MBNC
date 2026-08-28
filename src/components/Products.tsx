import { products } from '../config/site'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function Products() {
  return (
    <section id="products">
      <div className="container">
        <Reveal>
          <div className="products-head">
            <div>
              <span className="eyebrow">The lineup</span>
              <h2 style={{ marginBottom: 6 }}>Formulated from the earth up.</h2>
            </div>
            <p style={{ maxWidth: '40ch', margin: 0 }}>
              Tap a product to see full details, dosage, and to leave feedback.
            </p>
          </div>
        </Reveal>
        <div className="product-grid">
          {products.map((p, i) => (
            <Reveal key={p.id} delay={i * 80}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
