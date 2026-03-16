import { createBrowserRouter } from 'react-router-dom'
import App from '../App'
import About from '../pages/About'
import APITest from '../pages/APITest'
import Home from '../pages/Home'
import LoginPage from '../pages/LoginPage'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'api-test',
        element: <APITest />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
])

export default router
