import type { FC, ReactNode } from 'react'
import { useAuth } from 'react-oidc-context'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

interface LayoutProps {
  children: ReactNode
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const auth = useAuth()

  const handleLogout = () => {
    auth.removeUser()
  }

  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between mx-auto px-4">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Link to="/" className="flex items-center gap-2">
              <span>Wallet API Tester</span>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            {auth.isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="text-sm text-muted-foreground hidden md:block">
                  <span className="text-green-600 font-medium mr-2">●</span>
                  Logged in
                </div>
                <Button onClick={handleLogout} variant="outline" size="sm">
                  Log Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">Log In</Button>
              </Link>
            )}
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  )
}

export default Layout
