import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './styles/index.css'

// Error boundary for production error handling
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Application Error:', error, errorInfo)
    
    // In production, send to error reporting service
    if (process.env.NODE_ENV === 'production') {
      // Send error to monitoring service
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          error: error.message,
          stack: error.stack,
          componentStack: errorInfo.componentStack,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          url: window.location.href
        })
      }).catch(console.error)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          textAlign: 'center',
          fontFamily: 'Noto Sans Devanagari, sans-serif',
          maxWidth: '600px',
          margin: '0 auto'
        }}>
          <div style={{ 
            fontSize: '48px', 
            marginBottom: '20px',
            color: '#E74C3C'
          }}>
            ⚠️
          </div>
          <h1 style={{ 
            fontSize: '24px', 
            marginBottom: '16px',
            color: '#2C3E50'
          }}>
            कुछ गलत हुआ है / Something went wrong
          </h1>
          <p style={{ 
            fontSize: '18px', 
            marginBottom: '24px',
            color: '#7F8C8D',
            lineHeight: '1.6'
          }}>
            हमें खुशी है कि आप पोर्टल का उपयोग कर रहे हैं। कृपया पेज को रीफ्रेश करें।
            <br />
            We're sorry for the inconvenience. Please refresh the page.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              backgroundColor: '#2B5A33',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              fontSize: '18px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontFamily: 'inherit'
            }}
          >
            पेज रीफ्रेश करें / Refresh Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

// Initialize React app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
)

// Remove loading spinner
const spinner = document.querySelector('.loading-spinner') as HTMLElement
const loadingText = document.querySelector('.loading-text') as HTMLElement
if (spinner) spinner.style.display = 'none'
if (loadingText) loadingText.style.display = 'none'

root.render(
  <React.StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </React.StrictMode>
)