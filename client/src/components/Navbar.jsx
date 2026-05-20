import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  
  // Check if a user is logged in by looking for the token
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    // 1. Remove the security token and role from storage
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    
    // 2. Alert the user and redirect to the home page
    alert('You have been securely logged out.');
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>
        <Link to="/" style={styles.brandLink}>
          IEEE Student Branch
        </Link>
      </div>

      <ul style={styles.navLinks}>
        <li><Link to="/" style={styles.link}>Home</Link></li>
        <li><Link to="/events" style={styles.link}>Events</Link></li>
        <li><Link to="/execom" style={styles.link}>ExeCom</Link></li>
        <li><Link to="/history" style={styles.link}>History</Link></li>
        
        {/* WE MOVED CONTACT HERE SO IT IS ALWAYS VISIBLE */}
        <li><Link to="/contact" style={styles.link}>Contact</Link></li>
        
        {/* CONDITIONAL RENDERING: Change links based on login status */}
        {token ? (
          <>
            {/* If logged in, show Dashboard and Logout */}
            <li>
              <Link to="/dashboard" style={{...styles.link, color: '#fca311'}}>
                {role} Dashboard
              </Link>
            </li>
            <li>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </li>
          </>
        ) : (
          /* If NOT logged in, ONLY show the Login button */
          <li>
            <Link to="/auth" style={styles.loginBtn}>
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', backgroundColor: '#002855', color: 'white', fontFamily: 'sans-serif' },
  brand: { fontSize: '1.5rem', fontWeight: 'bold' },
  brandLink: { color: 'white', textDecoration: 'none' },
  navLinks: { display: 'flex', listStyle: 'none', gap: '1.5rem', margin: 0, alignItems: 'center' },
  link: { color: 'white', textDecoration: 'none', fontSize: '1rem', fontWeight: '500' },
  loginBtn: { backgroundColor: '#00629B', padding: '0.5rem 1rem', borderRadius: '4px', color: 'white', textDecoration: 'none', fontWeight: 'bold' },
  logoutBtn: { backgroundColor: '#e63946', padding: '0.5rem 1rem', border: 'none', borderRadius: '4px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }
};