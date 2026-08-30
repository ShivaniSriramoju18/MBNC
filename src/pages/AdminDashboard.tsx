import { useEffect, useState } from 'react'
import { collection, getDocs, doc, updateDoc, setDoc, deleteDoc } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase'
import type { Product } from '../types'

const emptyProduct: Partial<Product> = {
  id: '',
  name: '',
  subtitle: '',
  category: '',
  price: 0,
  offer: '',
  description: '',
  dosage: '',
  image: '',
  formUrl: '',
  benefits: [],
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Product>>({})
  const [saving, setSaving] = useState(false)
  const [showAddForm, setShowAddForm] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  async function loadProducts() {
    const snapshot = await getDocs(collection(db, 'products'))
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Product))
    setProducts(data)
  }

  function startEdit(product: Product) {
    setEditingId(product.id)
    setFormData(product)
    setShowAddForm(false)
  }

  function startAdd() {
    setShowAddForm(true)
    setEditingId(null)
    setFormData(emptyProduct)
  }

  async function handleSaveEdit() {
    if (!editingId) return
    setSaving(true)
    try {
      await updateDoc(doc(db, 'products', editingId), {
        name: formData.name || '',
        subtitle: formData.subtitle || '',
        category: formData.category || '',
        price: Number(formData.price) || 0,
        offer: formData.offer || '',
        description: formData.description || '',
        dosage: formData.dosage || null,
        image: formData.image || '',
        orderFormUrl: formData.formUrl || '',
        benefits: formData.benefits || [],
      })
      await loadProducts()
      setEditingId(null)
    } catch (err) {
      alert('Failed to save. Check console.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  async function handleCreateNew() {
    const newId = (formData.id || '').trim().toLowerCase().replace(/\s+/g, '-')
    if (!newId) {
      alert('Please enter a Product ID (e.g. "ashwagandha") — used as the URL slug.')
      return
    }
    setSaving(true)
    try {
      await setDoc(doc(db, 'products', newId), {
        name: formData.name || '',
        subtitle: formData.subtitle || '',
        category: formData.category || '',
        price: Number(formData.price) || 0,
        offer: formData.offer || '',
        description: formData.description || '',
        dosage: formData.dosage || null,
        image: formData.image || '',
        orderFormUrl: formData.formUrl || '',
        benefits: formData.benefits || [],
      })
      await loadProducts()
      setShowAddForm(false)
    } catch (err) {
      alert('Failed to create product. Check console.')
      console.error(err)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(productId: string, productName: string) {
    const confirmed = window.confirm(`Delete "${productName}" permanently? This cannot be undone.`)
    if (!confirmed) return
    try {
      await deleteDoc(doc(db, 'products', productId))
      await loadProducts()
    } catch (err) {
      alert('Failed to delete. Check console.')
      console.error(err)
    }
  }

  function renderForm(onSave: () => void, isNew: boolean) {
    return (
      <>
        {isNew && (
          <input
            value={formData.id || ''}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="Product ID (e.g. ashwagandha) — no spaces"
            style={{ width: '100%', marginBottom: 8, padding: 8 }}
          />
        )}
        <input
          value={formData.name || ''}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          value={formData.subtitle || ''}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          placeholder="Subtitle"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          value={formData.category || ''}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          placeholder="Category"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          type="number"
          value={formData.price || ''}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          placeholder="Price"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          value={formData.offer || ''}
          onChange={(e) => setFormData({ ...formData, offer: e.target.value })}
          placeholder="Offer/Discount (optional, e.g. '10% OFF')"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <textarea
          value={formData.description || ''}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Description"
          rows={3}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          value={formData.dosage || ''}
          onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
          placeholder="Dosage (leave blank if none)"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          value={formData.image || ''}
          onChange={(e) => setFormData({ ...formData, image: e.target.value })}
          placeholder="Image path, e.g. /images/NEWPRODUCT.jpeg"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <input
          value={formData.formUrl || ''}
          onChange={(e) => setFormData({ ...formData, formUrl: e.target.value })}
          placeholder="Order form URL"
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <textarea
          value={(formData.benefits || []).join('\n')}
          onChange={(e) =>
            setFormData({ ...formData, benefits: e.target.value.split('\n').filter(Boolean) })
          }
          placeholder="Benefits — one per line"
          rows={4}
          style={{ width: '100%', marginBottom: 8, padding: 8 }}
        />
        <button onClick={onSave} disabled={saving} className="btn btn-primary">
          {saving ? 'Saving…' : 'Save'}
        </button>
        <button
          onClick={() => {
            setEditingId(null)
            setShowAddForm(false)
          }}
          style={{ marginLeft: 8 }}
        >
          Cancel
        </button>
      </>
    )
  }

  return (
    <div style={{ maxWidth: 800, margin: '40px auto', padding: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Admin — Manage Products</h2>
        <div>
          <button onClick={startAdd} className="btn btn-primary" style={{ marginRight: 8 }}>
            + Add New Product
          </button>
          <button onClick={() => signOut(auth)} className="btn">Log Out</button>
        </div>
      </div>

      {showAddForm && (
        <div style={{ border: '2px solid #7c3aed', padding: 16, marginTop: 16, borderRadius: 8 }}>
          <h3>New Product</h3>
          {renderForm(handleCreateNew, true)}
        </div>
      )}

      {products.map((p) => (
        <div key={p.id} style={{ border: '1px solid #ccc', padding: 16, marginTop: 16, borderRadius: 8 }}>
          {editingId === p.id ? (
            renderForm(handleSaveEdit, false)
          ) : (
            <>
              <h3>
                {p.name} — ₹{p.price}
                {p.offer && (
                  <span style={{ marginLeft: 10, color: '#16a34a', fontSize: 14 }}>
                    ({p.offer})
                  </span>
                )}
              </h3>
              <p>{p.description}</p>
              <button onClick={() => startEdit(p)} className="btn">Edit</button>
              <button
                onClick={() => handleDelete(p.id, p.name)}
                className="btn"
                style={{ marginLeft: 8, background: '#dc2626', color: 'white' }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  )
}