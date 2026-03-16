import { type FC, useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const LoginPage: FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // If authenticated, redirect to API test page immediately
    if (!auth.isLoading && auth.isAuthenticated) {
      navigate('/api-test', { replace: true })
    }
  }, [auth.isLoading, auth.isAuthenticated, navigate])

  const handleLogin = () => {
    // Store current path to redirect back after login
    // Although we use a fixed callback page, we can pass state to redirect later
    auth.signinRedirect({
      prompt: 'login',
      state: { redirectTo: '/api-test' }, // Explicitly set redirect to API test page
    })
  }

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
            <Button onClick={handleLogin} className="mt-4 w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-3.5rem)] bg-muted/20">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">Log In</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={handleLogin} className="w-full" size="lg">
            Log In with OAuth2
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
