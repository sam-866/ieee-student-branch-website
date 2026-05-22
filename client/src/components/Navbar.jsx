import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have been securely logged out.');
    navigate('/');
  };

  return (
    <div style={{ padding: '1rem 2rem', position: 'sticky', top: 0, zIndex: 100 }}>
      <nav className="glass-panel" style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: '1rem 2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          <Link to="/" className="text-gradient" style={{ textDecoration: 'none' }}>
            IEEE Student Branch
          </Link>
        </div>

        <ul style={{ display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, alignItems: 'center' }}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/events" style={styles.link}>Events</Link></li>
          <li><Link to="/execom" style={styles.link}>ExeCom</Link></li>
          <li><Link to="/history" style={styles.link}>History</Link></li>
          <li><Link to="/contact" style={styles.link}>Contact</Link></li>
          
          {token ? (
            <>
              <li>
                <Link to="/dashboard" style={{...styles.link, color: 'var(--neon-purple)', fontWeight: '700'}}>
                  {role} Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} style={styles.logoutBtn} className="glow-hover">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/auth" className="btn-primary" style={{ textDecoration: 'none' }}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

const styles = {
  link: { color: 'var(--text-primary)', textDecoration: 'none', fontSize: '1rem', fontWeight: '500', transition: 'color 0.3s' },
  logoutBtn: { backgroundColor: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.5)', padding: '0.6rem 1.2rem', borderRadius: '8px', color: '#ff8080', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }
};