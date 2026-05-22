import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--bg-darker)', color: 'var(--text-primary)', paddingTop: '4rem', marginTop: 'auto', borderTop: '1px solid var(--card-border)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
        
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 className="text-gradient" style={{ margin: '0 0 1rem 0', fontSize: '1.8rem' }}>IEEE Student Branch</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '0.95rem' }}>
            Empowering the innovators of tomorrow. Join a global community of engineers, scientists, and technology professionals dedicated to advancing technology for humanity.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.2rem' }}>Quick Links</h3>
          <ul style={styles.list}>
            <li><Link to="/events" style={styles.link}>Upcoming Events</Link></li>
            <li><Link to="/execom" style={styles.link}>Meet the Team</Link></li>
            <li><Link to="/history" style={styles.link}>Our Journey</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact Us</Link></li>
          </ul>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ margin: '0 0 1.2rem 0', fontSize: '1.2rem' }}>Societies</h3>
          <ul style={styles.list}>
            <li><Link to="/society/computer" style={styles.link}>Computer Society (CS)</Link></li>
            <li><Link to="/society/wie" style={styles.link}>Women in Eng. (WIE)</Link></li>
            <li><Link to="/society/ras" style={styles.link}>Robotics (RAS)</Link></li>
          </ul>
        </div>
      </div>

      <div style={{ backgroundColor: '#000000', padding: '1.5rem', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
          &copy; {currentYear} IEEE Student Branch. All rights reserved. | Developed for the Student Community.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  link: { color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' }
};