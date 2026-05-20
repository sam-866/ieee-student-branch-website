import { useState } from 'react';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';

export default function Authentication() {
  // State: '', 'user', or 'admin'
  const [portalType, setPortalType] = useState(''); 
  const [isRegistering, setIsRegistering] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); setMessage('');

    try {
      if (isRegistering && portalType === 'user') {
        // REGISTRATION (User Portal Only)
        await axios.post('http://localhost:5000/api/auth/register', { email, password });
        setMessage('✅ Account created! Please log in.');
        setIsRegistering(false);
        setPassword('');
      } else {
        // LOGIN (Both Portals)
        const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
        
        // Security Check: Block normal users from logging into the Admin portal
        if (portalType === 'admin' && response.data.role !== 'Admin') {
          setError('Access Denied. You are not an Admin.');
          return;
        }

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
        
        alert(`Welcome! Logged in as ${response.data.role}`);
        window.location.href = response.data.role === 'Admin' ? '/dashboard' : '/'; 
      }
    } catch (err) {
     setError(err.response?.data?.message || err.response?.data?.error || err.message || 'Action failed.');
     console.error("Full Error:", err); // Prints everything to your browser console
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/google', { credential: credentialResponse.credential });
      
      if (portalType === 'admin' && response.data.role !== 'Admin') {
        setError('Access Denied. You are not an Admin.');
        return;
      }

      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      alert(`Welcome via Google! Logged in as ${response.data.role}`);
      window.location.href = response.data.role === 'Admin' ? '/dashboard' : '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Google Login failed.');
    }
  };

  // 1. RENDER PORTAL SELECTION
  if (portalType === '') {
    return (
      <div style={styles.container}>
        <div style={styles.card}>
          <h2 style={styles.header}>Select Portal</h2>
          <p style={styles.subtext}>Choose your login destination.</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button onClick={() => setPortalType('user')} style={styles.userButton}>Standard User Portal</button>
            <button onClick={() => setPortalType('admin')} style={styles.adminButton}>Secure Admin Portal</button>
          </div>
        </div>
      </div>
    );
  }

  // 2. RENDER THE CHOSEN PORTAL
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <button onClick={() => { setPortalType(''); setError(''); setMessage(''); setIsRegistering(false); }} style={styles.backButton}>← Back</button>
        
        <h2 style={styles.header}>{portalType === 'admin' ? 'Admin Login' : (isRegistering ? 'User Registration' : 'User Login')}</h2>
        
        {error && <div style={styles.errorBox}>{error}</div>}
        {message && <div style={styles.successBox}>{message}</div>}

        {!isRegistering && (
          <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <GoogleLogin onSuccess={handleGoogleSuccess} onError={() => setError('Google failed')} />
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={styles.input} required />
          </div>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.input} required />
          </div>
          <button type="submit" style={portalType === 'admin' ? styles.adminSubmit : styles.userSubmit}>
            {isRegistering ? 'Register Account' : 'Secure Login'}
          </button>
        </form>

        {/* ONLY SHOW REGISTER TOGGLE IN THE USER PORTAL */}
        {portalType === 'user' && (
          <p style={styles.toggleText}>
            {isRegistering ? "Already have an account? " : "Don't have an account? "}
            <span style={styles.toggleLink} onClick={() => { setIsRegistering(!isRegistering); setError(''); setMessage(''); }}>
              {isRegistering ? "Login here" : "Register here"}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' },
  card: { backgroundColor: 'white', padding: '2.5rem', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px' },
  header: { textAlign: 'center', color: '#002855', margin: '0 0 0.5rem 0' },
  subtext: { textAlign: 'center', color: '#666', marginBottom: '1.5rem', fontSize: '0.9rem' },
  errorBox: { backgroundColor: '#ffeef0', color: '#e63946', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' },
  successBox: { backgroundColor: '#e6fffa', color: '#047481', padding: '0.8rem', borderRadius: '4px', marginBottom: '1rem', textAlign: 'center', fontWeight: 'bold' },
  form: { display: 'flex', flexDirection: 'column', gap: '1.2rem' },
  inputGroup: { display: 'flex', flexDirection: 'column', gap: '0.4rem' },
  label: { fontSize: '0.9rem', fontWeight: 'bold', color: '#333' },
  input: { padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' },
  userButton: { backgroundColor: '#f0f4f8', color: '#00629B', padding: '1rem', border: '2px solid #00629B', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' },
  adminButton: { backgroundColor: '#002855', color: 'white', padding: '1rem', border: 'none', borderRadius: '8px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer' },
  userSubmit: { backgroundColor: '#00629B', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  adminSubmit: { backgroundColor: '#002855', color: 'white', padding: '0.8rem', border: 'none', borderRadius: '4px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' },
  backButton: { background: 'none', border: 'none', color: '#666', cursor: 'pointer', marginBottom: '1rem', fontSize: '0.9rem', padding: 0 },
  toggleText: { textAlign: 'center', marginTop: '1.5rem', fontSize: '0.9rem', color: '#666' },
  toggleLink: { color: '#00629B', fontWeight: 'bold', cursor: 'pointer', textDecoration: 'underline' }
};