import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AppProgressProvider } from './context/AppProgressProvider'
import './index.css'
import App from './App.tsx'

import { ErrorBoundary } from './components/ErrorBoundary'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <AppProgressProvider>
          <App />
        </AppProgressProvider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>,
)
