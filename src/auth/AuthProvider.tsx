import type { FC, ReactNode } from 'react'
import { AuthProvider } from 'react-oidc-context'
import { oidcConfig } from './oidc'

interface AppAuthProviderProps {
  children: ReactNode
}

/**
 * Wrapper component for the OIDC AuthProvider
 */
export const AppAuthProvider: FC<AppAuthProviderProps> = ({ children }) => {
  return <AuthProvider {...oidcConfig}>{children}</AuthProvider>
}
