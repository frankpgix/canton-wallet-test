import { type FC, useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Home: FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // 1. Handle OIDC Callback logic
    if (!auth.isLoading && auth.isAuthenticated) {
      // Check for state to redirect back to original page
      const state = auth.user?.state as Record<string, unknown> | undefined
      const redirectTo = (state?.redirectTo as string) || '/api-test'

      // Clean up the URL query params (code, state) left by OIDC
      window.history.replaceState({}, document.title, window.location.pathname)

      // Redirect to target page
      navigate(redirectTo, { replace: true })
      return
    }

    // 2. Handle redirect logic based on auth status
    if (!auth.isLoading && !auth.isAuthenticated) {
      // If not authenticated and no auth params (code/state), redirect to login
      if (!window.location.search.includes('code=')) {
        navigate('/login', { replace: true })
      }
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, navigate])

  if (auth.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Checking authentication...</p>
        </div>
      </div>
    )
  }

  if (auth.error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)]">
        <Card className="w-[350px] border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Auth Error</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{auth.error.message}</p>
            <Button onClick={() => auth.signinRedirect()} className="mt-4 w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return null // Should redirect, so render nothing
}

export default Home
