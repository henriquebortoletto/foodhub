import { useAuth } from '@/context/auth'
import { Navigate, Outlet } from 'react-router'

export const RoutePrivate = () => {
  const { user, loading } = useAuth()
  if (loading) return null
  return !user ? <Navigate to="/sign-in" /> : <Outlet />
}
