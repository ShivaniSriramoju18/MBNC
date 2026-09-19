import { useEffect, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import type { Review } from '../types'
import Reveal from './Reveal'
import { useAuth } from '../context/AuthContext'
import useReviewerUid from '../hooks/useReviewerUid'
import { addReview, deleteReview, subscribeToReviews, updateReview } from '../services/reviews'

const MAX_NAME = 60
const MAX_MESSAGE = 1000

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

function formatDate(ms: number) {
  return new Date(ms).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export default function Feedback({ productId, productName }: FeedbackProps) {
  const { currentUser: admin } = useAuth() // only a real login (never an anonymous visitor)
  const myUid = useReviewerUid()

  const [reviews, setReviews] = useState<Review[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')

  // "Leave feedback" form
  const [name, setName] = useState('')
  const [rating, setRating] = useState(0)
  const [message, setMessage] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Edit / delete state (one review at a time)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editRating, setEditRating] = useState(0)
  const [editMessage, setEditMessage] = useState('')
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null)
  const [busyId, setBusyId] = useState<string | null>(null)

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

  // Load this product's feedback from Firestore and keep it live.
  useEffect(() => {
    setStatus('loading')
    setReviews([])
    setEditingId(null)
    setConfirmDeleteId(null)
    const unsubscribe = subscribeToReviews(
      productId,
      (list) => {
        setReviews(list)
        setStatus('ready')
      },
      (err) => {
        console.error('[MBNC feedback] Could not load feedback:', err)
        setStatus('error')
      }
    )
    return unsubscribe
  }, [productId])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const cleanName = name.trim()
    const cleanMessage = message.trim()
    if (!cleanName || !cleanMessage || rating === 0) {
      showToast({ type: 'err', message: 'Please add your name, a rating, and a message.' })
      return
    }
    setSubmitting(true)
    try {
      await addReview(productId, { name: cleanName, rating, message: cleanMessage })
      setName('')
      setRating(0)
      setMessage('')
      showToast({ type: 'ok', message: 'Thank you — your feedback is now saved below.' })
    } catch (err) {
      console.error('[MBNC feedback] Could not save feedback:', err)
      showToast({ type: 'err', message: "Sorry, we couldn't save your feedback. Please try again." })
    } finally {
      setSubmitting(false)
    }
  }

  function startEdit(r: Review) {
    setConfirmDeleteId(null)
    setEditingId(r.id)
    setEditName(r.name)
    setEditRating(r.rating)
    setEditMessage(r.message)
  }

  function cancelEdit() {
    setEditingId(null)
  }

  async function handleSaveEdit(e: FormEvent) {
    e.preventDefault()
    if (!editingId) return
    const cleanName = editName.trim()
    const cleanMessage = editMessage.trim()
    if (!cleanName || !cleanMessage || editRating === 0) {
      showToast({ type: 'err', message: 'Please keep your name, a rating, and a message.' })
      return
    }
    setBusyId(editingId)
    try {
      await updateReview(editingId, { name: cleanName, rating: editRating, message: cleanMessage })
      setEditingId(null)
      showToast({ type: 'ok', message: 'Your feedback was updated.' })
    } catch (err) {
      console.error('[MBNC feedback] Could not update feedback:', err)
      showToast({ type: 'err', message: "Sorry, we couldn't update your feedback. Please try again." })
    } finally {
      setBusyId(null)
    }
  }

  async function handleDelete(id: string) {
    setBusyId(id)
    try {
      await deleteReview(id)
      setConfirmDeleteId(null)
      showToast({ type: 'ok', message: 'Your feedback was deleted.' })
    } catch (err) {
      console.error('[MBNC feedback] Could not delete feedback:', err)
      showToast({ type: 'err', message: "Sorry, we couldn't delete that feedback. Please try again." })
    } finally {
      setBusyId(null)
    }
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
              <input
                id="fb-name"
                value={name}
                maxLength={MAX_NAME}
                onChange={(e) => setName(e.target.value)}
                required
              />
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
                maxLength={MAX_MESSAGE}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-accent" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit feedback'}
            </button>
            <p className="form-note">
              Feedback is public and visible to every visitor. You can edit or delete your own
              feedback afterwards from the same browser.
            </p>
          </form>

          <div className="review-list">
            {status === 'loading' && <div className="review-empty">Loading feedback…</div>}
            {status === 'error' && (
              <div className="review-empty">
                We couldn't load feedback right now. Please refresh the page in a moment.
              </div>
            )}
            {status === 'ready' && reviews.length === 0 && (
              <div className="review-empty">No feedback yet for {productName} — be the first to share yours.</div>
            )}

            {reviews.map((r) => {
              const isMine = !!myUid && r.ownerUid === myUid
              const canDelete = isMine || !!admin
              const isEditing = editingId === r.id
              const isConfirming = confirmDeleteId === r.id
              const isBusy = busyId === r.id

              if (isEditing) {
                return (
                  <form className="review-card review-edit" key={r.id} onSubmit={handleSaveEdit}>
                    <div className="field">
                      <label htmlFor={`edit-name-${r.id}`}>Name</label>
                      <input
                        id={`edit-name-${r.id}`}
                        value={editName}
                        maxLength={MAX_NAME}
                        onChange={(e) => setEditName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="field">
                      <label>Rating</label>
                      <StarPicker value={editRating} onChange={setEditRating} />
                    </div>
                    <div className="field">
                      <label htmlFor={`edit-message-${r.id}`}>Your feedback</label>
                      <textarea
                        id={`edit-message-${r.id}`}
                        rows={4}
                        value={editMessage}
                        maxLength={MAX_MESSAGE}
                        onChange={(e) => setEditMessage(e.target.value)}
                        required
                      />
                    </div>
                    <div className="review-actions">
                      <button type="submit" className="btn btn-accent btn-sm" disabled={isBusy}>
                        {isBusy ? 'Saving…' : 'Save changes'}
                      </button>
                      <button type="button" className="btn btn-ghost btn-sm" onClick={cancelEdit} disabled={isBusy}>
                        Cancel
                      </button>
                    </div>
                  </form>
                )
              }

              return (
                <div className="review-card" key={r.id}>
                  <div className="review-head">
                    <span className="review-name">
                      {r.name}
                      {isMine && <span className="review-mine">You</span>}
                    </span>
                    <span className="review-stars" aria-label={`${r.rating} out of 5 stars`}>
                      {'★'.repeat(r.rating)}
                      {'☆'.repeat(5 - r.rating)}
                    </span>
                  </div>
                  <div className="review-date">
                    {formatDate(r.createdAt)}
                    {r.updatedAt && ' · edited'}
                  </div>
                  <p className="review-message">{r.message}</p>

                  {canDelete &&
                    (isConfirming ? (
                      <div className="review-confirm" role="alert">
                        <span>Delete this feedback permanently?</span>
                        <div className="review-actions">
                          <button
                            type="button"
                            className="review-action danger"
                            onClick={() => handleDelete(r.id)}
                            disabled={isBusy}
                          >
                            {isBusy ? 'Deleting…' : 'Yes, delete'}
                          </button>
                          <button
                            type="button"
                            className="review-action"
                            onClick={() => setConfirmDeleteId(null)}
                            disabled={isBusy}
                          >
                            Keep it
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="review-actions">
                        {isMine && (
                          <button type="button" className="review-action" onClick={() => startEdit(r)}>
                            Edit
                          </button>
                        )}
                        {canDelete && (
                          <button
                            type="button"
                            className="review-action danger"
                            onClick={() => {
                              setEditingId(null)
                              setConfirmDeleteId(r.id)
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              )
            })}
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