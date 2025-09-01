import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ThreadProvider } from './contexts/ThreadContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThreadProvider>
        <App />
      </ThreadProvider>
    )
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
