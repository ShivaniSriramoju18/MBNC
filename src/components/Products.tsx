import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'
import type { Product } from '../types'
import ProductCard from './ProductCard'
import Reveal from './Reveal'

export default function Products() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProducts() {
      try {
        const snapshot = await getDocs(collection(db, 'products'))
        const data = snapshot.docs.map((doc) => {
          const d = doc.data()
          return {
            id: doc.id,
            name: d.name,
            subtitle: d.subtitle,
            image: d.image,
            category: d.category,
            price: d.price,
            description: d.description,
            benefits: d.benefits,
            dosage: d.dosage,
            formUrl: d.orderFormUrl, // Firestore field is named orderFormUrl
          } as Product
        })
        setProducts(data)
      } catch (err) {
        console.error('Failed to fetch products:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

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
        {loading ? (
          <p>Loading products…</p>
        ) : (
          <div className="product-grid">
            {products.map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProductCard product={p} />
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}