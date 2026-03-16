import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import APITest from '../pages/APITest'
import LoginPage from '../pages/LoginPage'
import CallbackPage from '../pages/CallbackPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/api-test',
    element: <APITest />,
  },
  {
    path: '/about',
    element: <About />,
  },
])

export default router
