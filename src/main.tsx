import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ThreadProvider } from './contexts/ThreadContext.tsx'
import { UserProvider } from './contexts/UserContext.tsx'
import PrivateRoute from './components/routes/PrivateRoute.tsx'
import ThreadForm from './components/ThreadForm.tsx'
import Modal from 'react-modal'

Modal.setAppElement('#root')

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <UserProvider>
        <ThreadProvider>
          <App />
        </ThreadProvider>
      </UserProvider>
    ),
    children: [
      {
        path: "create-thread",
        element: (
          <PrivateRoute>
            <ThreadForm />
          </PrivateRoute>
        )
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)