import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';

export default function Auth() {
  const [authMode, setAuthMode] = useState('login'); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = authMode === 'register' ? '/api/auth/register' : '/api/auth/login';
      const response = await axios.post(`${import.meta.env.VITE_API_URL}${endpoint}`, { email, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed. Please try again.');
    }
  };

  const isRegister = authMode === 'register';
  const isAdmin = authMode === 'admin';

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/google`, {
        credential: credentialResponse.credential,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="page-container animate-slide-up" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
      <div className="glass-panel glow-hover" style={{
        padding: '3rem 2.5rem', 
        width: '100%', 
        maxWidth: '450px', 
        borderTop: isAdmin ? '4px solid var(--neon-purple)' : '1px solid var(--card-border)' 
      }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 className="text-gradient" style={{ marginBottom: '0.5rem', fontSize: '2.2rem' }}>
            {isAdmin ? 'Admin Portal' : isRegister ? 'Create an Account' : 'Welcome to IEEE'}
          </h2>
          <p className="subtitle">
            {isAdmin ? 'Secure access for ExeCom members' : 
             isRegister ? 'Register to join the student branch' : 
             'Sign in to access your dashboard'}
          </p>
        </div>

        {error && (
          <div style={{ color: '#ff8080', textAlign: 'center', marginBottom: '1.5rem', fontSize: '0.9rem', backgroundColor: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.3)', padding: '0.75rem', borderRadius: '6px', fontWeight: '500' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Address</label>
            <input 
              type="email" 
              className="glass-input"
              placeholder={isAdmin ? "admin@ieee.org" : "member@university.edu"}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label style={{ fontWeight: '600', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" 
              className="glass-input"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>
            {isAdmin ? 'Secure Login' : isRegister ? 'Register' : 'Sign In'}
          </button>
        </form>

        {!isAdmin && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
              <span style={{ padding: '0 10px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>OR</span>
              <div style={{ flex: 1, height: '1px', backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin 
                onSuccess={handleGoogleSuccess} 
                onError={() => setError('Google sign-in failed.')}
                theme="filled_black"
                size="large"
              />
            </div>
          </>
        )}

        <div style={{ textAlign: 'center', marginTop: '2rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isAdmin ? (
            <span style={{ color: 'var(--neon-purple)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setAuthMode('login')}>
              ← Back to Member Login
            </span>
          ) : isRegister ? (
            <>
              Already have an account?{' '}
              <span style={{ color: 'var(--neon-purple)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setAuthMode('login')}>
                Sign in here
              </span>
            </>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                Don't have an account?{' '}
                <span style={{ color: 'var(--neon-purple)', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setAuthMode('register')}>
                  Register here
                </span>
              </div>
              <div style={{ fontSize: '0.8rem' }}>
                <span style={{ color: 'var(--text-secondary)', cursor: 'pointer' }} onClick={() => setAuthMode('admin')}>
                  ExeCom / Admin Login
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}