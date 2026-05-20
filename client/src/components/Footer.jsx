import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        
        {/* Column 1: Brand & About */}
        <div style={styles.column}>
          <h2 style={styles.brand}>IEEE Student Branch</h2>
          <p style={styles.text}>
            Empowering the innovators of tomorrow. Join a global community of engineers, scientists, and technology professionals dedicated to advancing technology for humanity.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Quick Links</h3>
          <ul style={styles.list}>
            <li><Link to="/events" style={styles.link}>Upcoming Events</Link></li>
            <li><Link to="/execom" style={styles.link}>Meet the Team</Link></li>
            <li><Link to="/history" style={styles.link}>Our Journey</Link></li>
            <li><Link to="/contact" style={styles.link}>Contact Us</Link></li>
          </ul>
        </div>

        {/* Column 3: Societies */}
        <div style={styles.column}>
          <h3 style={styles.heading}>Societies</h3>
          <ul style={styles.list}>
            <li><Link to="/society/computer" style={styles.link}>Computer Society (CS)</Link></li>
            <li><Link to="/society/wie" style={styles.link}>Women in Eng. (WIE)</Link></li>
            <li><Link to="/society/ras" style={styles.link}>Robotics (RAS)</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright Bar */}
      <div style={styles.bottomBar}>
        <p style={styles.bottomText}>
          &copy; {currentYear} IEEE Student Branch. All rights reserved. | Developed for the Student Community.
        </p>
      </div>
    </footer>
  );
}

// Inline Styles
const styles = {
  footer: { backgroundColor: '#001b3a', color: '#fff', fontFamily: 'sans-serif', paddingTop: '4rem', marginTop: 'auto' },
  container: { maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' },
  column: { display: 'flex', flexDirection: 'column' },
  brand: { margin: '0 0 1rem 0', color: '#fca311', fontSize: '1.8rem' },
  text: { color: '#a0b2c6', lineHeight: '1.6', fontSize: '0.95rem' },
  heading: { margin: '0 0 1.2rem 0', fontSize: '1.2rem', color: '#fff' },
  list: { listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' },
  link: { color: '#a0b2c6', textDecoration: 'none', fontSize: '0.95rem', transition: 'color 0.2s' },
  bottomBar: { backgroundColor: '#001226', padding: '1.5rem', textAlign: 'center' },
  bottomText: { margin: 0, color: '#667a99', fontSize: '0.85rem' }
};