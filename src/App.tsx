import type { FC } from 'react'
import { Outlet } from 'react-router-dom'
import { AppAuthProvider } from './auth/AuthProvider'
import Layout from './layout/Layout'

const App: FC = () => {
  return (
    <AppAuthProvider>
      <Layout>
        <Outlet />
      </Layout>
    </AppAuthProvider>
  )
}

export default App
