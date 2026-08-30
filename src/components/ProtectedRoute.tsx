import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { currentUser, loading } = useAuth()

  if (loading) return <p style={{ padding: 40 }}>Checking login…</p>
  if (!currentUser) return <Navigate to="/admin/login" replace />

  return <>{children}</>
}