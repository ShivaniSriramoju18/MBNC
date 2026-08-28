import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Review } from '../types'
import Reveal from './Reveal'

interface StarPickerProps {
  value: number
  onChange: (n: number) => void
}

function StarPicker({ value, onChange }: StarPickerProps) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="star-picker">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          type="button"
          key={n}
          className={n <= (hovered || value) ? 'filled' : ''}
          onClick={() => onChange(n)}
          onMouseEnter={() => setHovered(n)}
          onMouseLeave={() => setHovered(0)}
          aria-label={`${n} star${n > 1 ? 's' : ''}`}
        >
          ★
        </button>
      ))}
    </div>
  )
}

interface ToastState {
  type: 'ok' | 'err'
  message: string
}

interface FeedbackProps {
  productId: string
  productName: string
}

export default function Feedback({ productId, productName }: FeedbackProps) {
  const [reviews, setReviews] = useState<Review[]>([])
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [toast, setToast] = useState<ToastState | null>(null)
  const [toastVisible, setToastVisible] = useState(false)
  const hideTimer = useRef<ReturnType<typeof setTimeout>>()

  function showToast(next: ToastState) {
    setToast(next)
    setToastVisible(true)
    if (hideTimer.current) clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setToastVisible(false), 3200)
  }

  useEffect(() => {
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
    }
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name || !message || rating === 0) {
      showToast({ type: 'err', message: 'Please add your name, a rating, and a message.' })
      return
    }
    setReviews((r) => [{ id: Date.now(), productId, name, rating, message }, ...r])
    setName('')
    setRating(0)
    setMessage('')
    showToast({ type: 'ok', message: 'Thank you — your feedback was added below.' })
  }

  return (
    <section id="feedback" className="band-surface">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Your voice</span>
          <h2>Tell us how {productName} is working for you.</h2>
        </Reveal>

        <Reveal delay={80} className="feedback-layout" style={{ marginTop: 32 }}>
          <form className="feedback-form" onSubmit={handleSubmit}>
            <div className="field">
              <label htmlFor="fb-name">Name</label>
              <input id="fb-name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="field">
              <label>Rating</label>
              <StarPicker value={rating} onChange={setRating} />
            </div>
            <div className="field">
              <label htmlFor="fb-message">Your feedback</label>
              <textarea
                id="fb-message"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-accent">Submit feedback</button>
            <p className="form-note">
              Feedback shown here is stored for this browsing session only. Once the backend is
              connected, submissions will be saved and visible to every visitor.
            </p>
          </form>

          <div className="review-list">
            {reviews.length === 0 && (
              <div className="review-empty">No feedback yet for {productName} — be the first to share yours.</div>
            )}
            {reviews.map((r) => (
              <div className="review-card" key={r.id}>
                <div className="review-head">
                  <span className="review-name">{r.name}</span>
                  <span className="review-stars">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
                </div>
                <p style={{ marginTop: 8, marginBottom: 0 }}>{r.message}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      {toast && (
        <div className={`toast toast-${toast.type}${toastVisible ? ' visible' : ''}`} role="status">
          <span className="toast-icon">{toast.type === 'ok' ? '✓' : '!'}</span>
          <span>{toast.message}</span>
        </div>
      )}
    </section>
  )
}