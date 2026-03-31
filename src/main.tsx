import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProgressProvider } from './context/AppProgressProvider'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AppProgressProvider>
        <App />
      </AppProgressProvider>
    </BrowserRouter>
  </StrictMode>,
)
