'use client'

import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { isAuthenticated, type User } from '@/lib/auth-utils'

interface WithAuthOptions {
  requireAuth?: boolean
  allowedRoles?: string[]
  redirectTo?: string
}

/**
 * Higher Order Component untuk page protection
 * 
 * @param WrappedComponent - Component yang akan di-protect
 * @param options - Options untuk authentication & authorization
 * @returns Protected component
 */
export function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  options: WithAuthOptions = {}
) {
  const {
    requireAuth = true,
    allowedRoles = [],
    redirectTo = '/login',
  } = options

  return function WithAuthComponent(props: P) {
    const router = useRouter()
    const [isAuthorized, setIsAuthorized] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState<User | null>(null)
    const hasCheckedRef = useRef(false)

    useEffect(() => {
      // Prevent multiple checks
      if (hasCheckedRef.current) return

      const checkAuth = () => {
        hasCheckedRef.current = true

        // Check authentication
        const { authenticated, user: currentUser } = isAuthenticated()

        if (!authenticated) {
          if (requireAuth) {
            setIsLoading(false)
            toast.error('Please login first')
            setTimeout(() => router.push(redirectTo), 100)
            return
          }
        } else {
          setUser(currentUser)

          // Check authorization if roles are specified
          if (allowedRoles.length > 0 && currentUser) {
            const hasAccess = allowedRoles.includes(currentUser.role.toLowerCase())

            if (!hasAccess) {
              setIsLoading(false)
              toast.error('You do not have access to this page')
              setTimeout(() => router.push('/dashboard'), 100)
              return
            }
          }

          setIsAuthorized(true)
        }

        setIsLoading(false)
      }

      checkAuth()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []) // Empty dependency array - only run once on mount

    if (isLoading) {
      return (
        <div className="flex min-h-screen bg-gradient-to-br from-slate-800 to-gray-900 text-white items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-gray-400">Checking access...</p>
          </div>
        </div>
      )
    }

    if (!isAuthorized && requireAuth) {
      return null
    }

    return <WrappedComponent {...props} user={user} />
  }
}

/**
 * Hook untuk check authentication status
 */
export function useAuthCheck(allowedRoles: string[] = []) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)
  const hasCheckedRef = useRef(false)

  useEffect(() => {
    // Prevent multiple checks using ref
    if (hasCheckedRef.current) return

    const checkAuth = () => {
      hasCheckedRef.current = true

      const { authenticated, user: currentUser } = isAuthenticated()

      if (!authenticated) {
        setIsLoading(false)
        toast.error('Please login first')
        setTimeout(() => router.push('/login'), 100)
        return
      }

      setUser(currentUser)

      if (allowedRoles.length > 0 && currentUser) {
        const hasAccess = allowedRoles.includes(currentUser.role.toLowerCase())

        if (!hasAccess) {
          setIsLoading(false)
          toast.error('You do not have access to this page')
          setTimeout(() => router.push('/dashboard'), 100)
          return
        }
      }

      setIsAuthorized(true)
      setIsLoading(false)
    }

    checkAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // Empty dependency array - only run once on mount

  return { isAuthorized, isLoading, user }
}

