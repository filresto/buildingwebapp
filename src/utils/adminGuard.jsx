import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser, checkIsAdmin, onAuthStateChange } from '../lib/supabase'

/**
 * Hook per proteggere le route admin
 * Verifica che l'utente sia autenticato e sia un admin
 */
export const useAdminAuth = () => {
  const [user, setUser] = useState(null)
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    let isMounted = true

    const checkAuth = async () => {
      try {
        console.log('🔍 Checking authentication...')
        const currentUser = await getCurrentUser()
        console.log('👤 User:', currentUser?.email || 'none')
        
        if (!isMounted) return
        
        if (!currentUser) {
          console.log('❌ No user, redirecting to login')
          setLoading(false)
          navigate('/admin/login', { replace: true })
          return
        }

        console.log('✉️ Checking admin status for:', currentUser.email)
        const adminStatus = await checkIsAdmin(currentUser.email)
        console.log('👮 Is admin:', adminStatus)
        
        if (!isMounted) return
        
        if (!adminStatus) {
          console.log('❌ Not admin, redirecting to login')
          setLoading(false)
          navigate('/admin/login', { replace: true })
          return
        }

        console.log('✅ Authentication successful!')
        setUser(currentUser)
        setIsAdmin(true)
        setLoading(false)
      } catch (error) {
        console.error('❌ Auth error:', error)
        if (!isMounted) return
        setLoading(false)
        navigate('/admin/login', { replace: true })
      }
    }

    checkAuth()

    // Ascolta i cambiamenti di autenticazione
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      console.log('🔄 Auth state changed:', event)
      if (!isMounted) return

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setIsAdmin(false)
        navigate('/admin/login', { replace: true })
      } else if (event === 'SIGNED_IN' && session) {
        checkAuth()
      }
    })

    return () => {
      isMounted = false
      subscription?.unsubscribe()
    }
  }, [navigate])

  return { user, isAdmin, loading }
}

/**
 * Componente wrapper per proteggere le route admin
 */
export const AdminRoute = ({ children }) => {
  const { loading, isAdmin } = useAdminAuth()

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        Verifica autenticazione...
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return children
}

