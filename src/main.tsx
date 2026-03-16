import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './style/index.scss'

const rootDom = document.getElementById('root')
if (!rootDom) {
  throw new Error('Root DOM element not found')
}
createRoot(rootDom).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
