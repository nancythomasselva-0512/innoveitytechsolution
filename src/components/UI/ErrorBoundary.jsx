import React from 'react';
import { FiAlertTriangle, FiRefreshCw, FiHome } from 'react-icons/fi';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('[ErrorBoundary caught error]:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    try {
      localStorage.removeItem('cms_session_sec_v1');
      sessionStorage.removeItem('cms_session_sec_v1');
    } catch (e) {
      console.warn(e);
    }
    window.location.href = '/admin';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#082233',
          color: '#ffffff',
          fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 107, 0, 0.3)',
            borderRadius: '24px',
            padding: '40px 32px',
            maxWidth: '520px',
            width: '100%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            backdropFilter: 'blur(16px)'
          }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: 'rgba(255, 107, 0, 0.15)',
              color: '#ff914d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              margin: '0 auto 20px'
            }}>
              <FiAlertTriangle />
            </div>

            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, margin: '0 0 10px', color: '#ffffff' }}>
              Portal Recovery Assistant
            </h2>
            <p style={{ fontSize: '0.88rem', color: '#94a3b8', margin: '0 0 24px', lineHeight: '1.6' }}>
              A temporary render issue occurred in the workspace. Click below to refresh your session and restore the dashboard cleanly.
            </p>

            {this.state.error && (
              <div style={{
                background: 'rgba(0,0,0,0.3)',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '0.78rem',
                color: '#f87171',
                textAlign: 'left',
                marginBottom: '24px',
                fontFamily: 'monospace',
                overflowX: 'auto',
                border: '1px solid rgba(239, 68, 68, 0.2)'
              }}>
                {this.state.error.toString()}
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button
                onClick={this.handleReset}
                style={{
                  background: 'linear-gradient(135deg, #ff914d, #ff6b00)',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  boxShadow: '0 8px 20px rgba(255, 107, 0, 0.3)'
                }}
              >
                <FiRefreshCw /> Restore Dashboard
              </button>

              <button
                onClick={() => { window.location.href = '/'; }}
                style={{
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  padding: '12px 20px',
                  borderRadius: '12px',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <FiHome /> Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
