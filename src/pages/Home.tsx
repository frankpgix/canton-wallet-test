import { type FC, useEffect } from 'react'
import { useAuth } from 'react-oidc-context'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const Home: FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    // Handle callback logic here since we are using root as redirect_uri
    if (!auth.isLoading && auth.isAuthenticated) {
      // Check for state to redirect back to original page
      const state = auth.user?.state as Record<string, unknown> | undefined
      const redirectTo = (state?.redirectTo as string) || '/'

      // If we are currently at root (which matches redirect_uri) but have a different target, navigate there
      if (redirectTo !== '/' && window.location.pathname === '/') {
        navigate(redirectTo, { replace: true })
      }

      // Clean up the URL query params (code, state) left by OIDC
      window.history.replaceState({}, document.title, window.location.pathname)
    }
  }, [auth.isLoading, auth.isAuthenticated, auth.user, navigate])

  if (auth.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center gap-2">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading auth status...</p>
        </div>
      </div>
    )
  }

  if (auth.error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
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

  return (
    <div className="max-w-[800px] mx-auto p-10 font-sans text-center">
      <h1 className="text-4xl font-bold mb-8">Welcome to Wallet Test</h1>

      {/* Auth Status Section */}
      <div className="mb-8 p-4 bg-muted/30 rounded-lg">
        {auth.isAuthenticated ? (
          <div className="flex flex-col items-center gap-2">
            <span className="text-green-600 font-medium">✅ Logged in</span>
            <span className="text-xs text-muted-foreground">
              Token: {auth.user?.access_token ? 'Present' : 'Missing'}
            </span>
            <Button variant="outline" size="sm" onClick={() => auth.removeUser()} className="mt-2">
              Log Out
            </Button>
          </div>
        ) : (
          <Link to="/login">
            <Button>Log In with OAuth2</Button>
          </Link>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link to="/api-test">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle>API Tester</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Test various wallet APIs including Balance, Transactions, Tap, and Transfer.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/about">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Learn more about this project and its purpose.
              </p>
            </CardContent>
          </Card>
        </Link>
      </div>
    </div>
  )
}

export default Home
