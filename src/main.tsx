import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import Thread from './components/Thread.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import { ThreadProvider } from './contexts/ThreadContext.tsx'
import { dummyThreads } from './data/threads.ts'

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ThreadProvider>
        <App />
      </ThreadProvider>
    )
    element: <App />
  },
  {
    path: "/thread",
    element: <Thread thread={dummyThreads[0]} />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
