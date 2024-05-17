import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssVarsProvider } from '@mui/joy'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Reviews from './components/Reviews/Reviews.tsx'
import Roasters from './components/Roasters/Roasters.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: 'reviews',
        element: <Reviews />
      },
      {
        path: 'roasters',
        element: <Roasters />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider>
      <RouterProvider router={router} />
    </CssVarsProvider>
  </React.StrictMode>,
)
