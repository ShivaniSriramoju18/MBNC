import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from 'firebase/firestore'
import type { DocumentData, Unsubscribe } from 'firebase/firestore'
import { signInAnonymously } from 'firebase/auth'
import type { User } from 'firebase/auth'
import { auth, db } from '../firebase'
import type { Review, ReviewInput } from '../types'

/**
 * All customer-feedback storage lives here (Firestore collection: "reviews").
 * The UI never talks to Firestore directly for reviews.
 */
const reviewsCol = collection(db, 'reviews')

function toReview(id: string, d: DocumentData): Review {
  return {
    id,
    productId: d.productId,
    name: d.name,
    rating: d.rating,
    message: d.message,
    ownerUid: d.ownerUid,
    createdAt: d.createdAt?.toMillis?.() ?? Date.now(),
    updatedAt: d.updatedAt?.toMillis?.(),
  }
}

/** Live-updating list of reviews for one product, newest first. */
export function subscribeToReviews(
  productId: string,
  onData: (reviews: Review[]) => void,
  onError: (err: unknown) => void
): Unsubscribe {
  const q = query(reviewsCol, where('productId', '==', productId))
  return onSnapshot(
    q,
    (snap) => {
      const list = snap.docs.map((s) =>
        // "estimate" makes a just-written review show its date immediately,
        // before the server has confirmed the timestamp.
        toReview(s.id, s.data({ serverTimestamps: 'estimate' }))
      )
      list.sort((a, b) => b.createdAt - a.createdAt)
      onData(list)
    },
    onError
  )
}

/**
 * Visitors don't have accounts, so each browser gets a silent anonymous Firebase
 * identity the first time it posts. That identity is what "this is my review" means.
 */
let signingIn: Promise<User> | null = null
async function ensureUser(): Promise<User> {
  await auth.authStateReady()
  if (auth.currentUser) return auth.currentUser
  if (!signingIn) {
    signingIn = signInAnonymously(auth)
      .then((cred) => cred.user)
      .finally(() => {
        signingIn = null
      })
  }
  return signingIn
}

export async function addReview(productId: string, input: ReviewInput): Promise<void> {
  const user = await ensureUser()
  await addDoc(reviewsCol, {
    productId,
    name: input.name,
    rating: input.rating,
    message: input.message,
    ownerUid: user.uid,
    createdAt: serverTimestamp(),
  })
}

export async function updateReview(reviewId: string, input: ReviewInput): Promise<void> {
  await updateDoc(doc(db, 'reviews', reviewId), {
    name: input.name,
    rating: input.rating,
    message: input.message,
    updatedAt: serverTimestamp(),
  })
}

export async function deleteReview(reviewId: string): Promise<void> {
  await deleteDoc(doc(db, 'reviews', reviewId))
}