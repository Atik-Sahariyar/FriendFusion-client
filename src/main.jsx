import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routes/Routes'
import AuthProvider from './Provider/AuthProvider'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import ReactModal from 'react-modal';
import SearchProvider from './Provider/SearchProvider'

ReactModal.setAppElement(document.getElementById('root'));

const queryClient = new QueryClient()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
         <SearchProvider>
         <div className=' max-w-screen-xl mx-auto'>
            <RouterProvider router={router} />
          </div>
         </SearchProvider>
        </HelmetProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
