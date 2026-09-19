import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase'

/**
 * The uid of whoever is currently using this browser (an anonymous visitor who has
 * posted before, or the signed-in admin). Null if they haven't posted anything yet.
 */
export default function useReviewerUid(): string | null {
  const [uid, setUid] = useState<string | null>(auth.currentUser?.uid ?? null)

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => setUid(user?.uid ?? null))
  }, [])

  return uid
}