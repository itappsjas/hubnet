/**
 * Utility functions untuk authentication dan authorization
 */

export interface User {
  id: number
  email: string
  role: string
  roleId: number
  airlineCode?: string
  airlineName?: string
}

// Role permissions mapping
export const ROLE_PERMISSIONS: Record<string, string[]> = {
  admin: ['dashboard', 'airline', 'airline_flight', 'airline_detail', 'user', 'report'],
  view: ['dashboard', 'airline', 'airline_flight', 'airline_detail', 'report'],
  airline: ['dashboard', 'airline_flight', 'airline_detail', 'report'],
}

/**
 * Check if user is authenticated
 */
export function isAuthenticated(): { authenticated: boolean; user: User | null } {
  if (typeof window === 'undefined') {
    return { authenticated: false, user: null }
  }

  const userStr = localStorage.getItem('user')
  const loginTime = localStorage.getItem('login_time')
  const loggedIn = localStorage.getItem('logged_in')

  if (!userStr || !loginTime || loggedIn !== '1') {
    return { authenticated: false, user: null }
  }

  try {
    const user = JSON.parse(userStr) as User
    return { authenticated: true, user }
  } catch (error) {
    console.error('Error parsing user data:', error)
    localStorage.clear()
    return { authenticated: false, user: null }
  }
}

/**
 * Check if user has permission to access a specific page
 */
export function hasPermission(user: User | null, page: string): boolean {
  if (!user) return false

  const permissions = ROLE_PERMISSIONS[user.role.toLowerCase()]
  if (!permissions) return false

  return permissions.includes(page)
}

/**
 * Get user from localStorage
 */
export function getUser(): User | null {
  if (typeof window === 'undefined') return null

  const userStr = localStorage.getItem('user')
  if (!userStr) return null

  try {
    return JSON.parse(userStr) as User
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

/**
 * Clear authentication data
 */
export function clearAuth(): void {
  if (typeof window === 'undefined') return
  localStorage.clear()
}

/**
 * Get redirect path based on user role
 */
export function getDefaultRedirectPath(role: string): string {
  const roleMap: Record<string, string> = {
    admin: '/dashboard',
    view: '/dashboard',
    airline: '/dashboard',
  }

  return roleMap[role.toLowerCase()] || '/dashboard'
}

