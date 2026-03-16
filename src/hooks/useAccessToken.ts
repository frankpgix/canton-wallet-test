import { useAuth } from 'react-oidc-context'

/**
 * Hook to get the current access token
 * Returns null if not authenticated
 */
export const useAccessToken = (): string | null => {
  const auth = useAuth()

  if (auth.isLoading || !auth.isAuthenticated || !auth.user) {
    return null
  }

  return auth.user.access_token || null
}
