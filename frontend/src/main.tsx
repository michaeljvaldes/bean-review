import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CssVarsProvider } from '@mui/joy'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Reviews from './components/Reviews/Reviews.tsx'
import Roasters from './components/Roasters/Roasters.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import axios from 'axios'
import './index.css'


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

axios.defaults.baseURL = 'http://localhost:8000/'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CssVarsProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </CssVarsProvider>
  </React.StrictMode>,
)
