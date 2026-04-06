import { Component, type ErrorInfo, type ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

/**
 * Standard React Error Boundary to catch runtime errors and show a fallback UI.
 */
export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <main style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          minHeight: '100vh' 
        }}>
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Oops! Something went wrong. 😅</h1>
          <p style={{ color: '#666', marginBottom: '2rem' }}>
            The app encountered an unexpected error. Don't worry, your progress should be safe!
          </p>
          <button
            type="button"
            className="btn-gamified btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload App
          </button>
        </main>
      )
    }

    return this.props.children
  }
}
