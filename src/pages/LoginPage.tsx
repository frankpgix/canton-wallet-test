import { type FC } from 'react'
import { useAuth } from 'react-oidc-context'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const LoginPage: FC = () => {
  const auth = useAuth()

  const handleLogin = () => {
    // Store current path to redirect back after login
    // Although we use a fixed callback page, we can pass state to redirect later
    auth.signinRedirect({
      prompt: 'login',
      state: { redirectTo: window.location.pathname },
    })
  }

  const handleLogout = () => {
    auth.removeUser()
    // Optional: redirect to keycloak logout endpoint
    // auth.signoutRedirect()
  }

  if (auth.isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>Loading auth status...</div>
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
            <Button onClick={handleLogin} className="mt-4 w-full">
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-muted/20">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-center">
            {auth.isAuthenticated ? 'Welcome Back' : 'Log In'}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {auth.isAuthenticated ? (
            <div className="text-center space-y-4">
              <div className="bg-green-100 text-green-800 p-2 rounded-md font-medium">
                ✅ Logged in
              </div>
              <div className="text-sm text-muted-foreground break-all">
                Token Status: {auth.user?.access_token ? 'Present' : 'Missing'}
              </div>
              <div className="text-xs text-muted-foreground">
                Expires in: {Math.floor((auth.user?.expires_in || 0) / 60)} mins
              </div>
              <Button onClick={handleLogout} variant="destructive" className="w-full">
                Log Out
              </Button>
            </div>
          ) : (
            <Button onClick={handleLogin} className="w-full" size="lg">
              Log In with OAuth2
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage
