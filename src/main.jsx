import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CMSProvider } from './context/CMSContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CMSProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CMSProvider>
  </StrictMode>,
)
