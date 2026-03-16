import { RouterProvider } from 'react-router-dom'
import router from './router'
import { AppAuthProvider } from './auth/AuthProvider'

const App: React.FC = () => {
  return (
    <AppAuthProvider>
      <RouterProvider router={router} />
    </AppAuthProvider>
  )
}

export default App
