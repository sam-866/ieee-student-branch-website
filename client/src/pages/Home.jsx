import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={styles.container}>
      
      {/* 1. HERO SECTION */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Empowering Innovators of Tomorrow</h1>
          <p style={styles.heroSubtitle}>
            Welcome to the official IEEE Student Branch website. Join a global community of engineers, scientists, and technology professionals dedicated to advancing technology for humanity.
          </p>
          <div style={styles.heroButtons}>
            <Link to="/events" style={styles.primaryButton}>Discover Events</Link>
            <Link to="/execom" style={styles.secondaryButton}>Meet the Team</Link>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section style={styles.about}>
        <div style={styles.aboutContent}>
          <h2 style={styles.sectionTitle}>About Our Branch</h2>
          <div style={styles.divider}></div>
          <p style={styles.aboutText}>
            Established with a vision to foster technological innovation and excellence, our IEEE Student Branch serves as a dynamic hub for passionate students. We organize hands-on workshops, 48-hour hackathons, expert seminars, and networking events to bridge the gap between academic learning and real-world industry demands.
          </p>
        </div>
      </section>

      {/* 3. SOCIETIES QUICK-LINKS */}
      <section style={styles.societies}>
        <h2 style={styles.sectionTitle}>Explore Our Societies</h2>
        <div style={styles.divider}></div>
        
        <div style={styles.grid}>
          {/* Computer Society Card */}
          <div style={{ ...styles.card, borderTop: '6px solid #FFA300' }}>
            <h3 style={styles.cardTitle}>Computer Society</h3>
            <p style={styles.cardText}>Empowering the computing professionals of tomorrow through coding bootcamps and algorithmic hackathons.</p>
            <Link to="/society/computer" style={styles.cardLink}>Learn More →</Link>
          </div>

          {/* WIE Card */}
          <div style={{ ...styles.card, borderTop: '6px solid #782F40' }}>
            <h3 style={styles.cardTitle}>Women in Engineering</h3>
            <p style={styles.cardText}>Inspiring and empowering women in STEM fields to achieve their academic and professional goals.</p>
            <Link to="/society/wie" style={styles.cardLink}>Learn More →</Link>
          </div>

          {/* RAS Card */}
          <div style={{ ...styles.card, borderTop: '6px solid #990000' }}>
            <h3 style={styles.cardTitle}>Robotics & Automation</h3>
            <p style={styles.cardText}>Building the machines of the future with hands-on hardware projects and robotics competitions.</p>
            <Link to="/society/ras" style={styles.cardLink}>Learn More →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}

// Inline Styles
const styles = {
  container: { fontFamily: 'sans-serif', backgroundColor: '#f9f9f9', minHeight: '100vh' },
  
  // Hero Styles
  hero: {backgroundImage: `linear-gradient(135deg, rgba(0, 40, 85, 0.9) 0%, rgba(0, 98, 155, 0.65) 100%), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')`,
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    color: 'white', 
    padding: '9rem 2rem', /* Added a bit more padding for breathing room */
    textAlign: 'center' },
  heroContent: { maxWidth: '800px', margin: '0 auto' },
  heroTitle: {fontSize: '3.5rem', /* Made slightly larger */
    margin: '0 0 1.5rem 0', 
    fontWeight: '800', /* Extra bold to stand out */
    color: '#ffffff',
    textShadow: '0 4px 15px rgba(0,0,0,0.5)' /* The secret to perfect readability */ },
  heroSubtitle: { fontSize: '1.25rem', 
    lineHeight: '1.7', 
    color: '#f8fafc', /* Swapped from muted grey to bright off-white */
    marginBottom: '2.5rem',
    fontWeight: '500',
    textShadow: '0 2px 10px rgba(0,0,0,0.4)' /* Soft shadow behind the paragraph */ },
  heroButtons: { display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' },
  primaryButton: { backgroundColor: '#00629B', color: 'white', padding: '1rem 2rem', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', transition: '0.2s' },
  secondaryButton: { backgroundColor: 'transparent', color: 'white', padding: '1rem 2rem', textDecoration: 'none', borderRadius: '4px', fontWeight: 'bold', fontSize: '1.1rem', border: '2px solid white', transition: '0.2s' },
  
  // Section Shared Styles
  sectionTitle: { color: '#002855', fontSize: '2.2rem', textAlign: 'center', margin: '0 0 0.5rem 0' },
  divider: { width: '60px', height: '4px', backgroundColor: '#00629B', margin: '0 auto 2.5rem auto', borderRadius: '2px' },
  
  // About Styles
  about: { padding: '5rem 2rem', backgroundColor: 'white' },
  aboutContent: { maxWidth: '800px', margin: '0 auto', textAlign: 'center' },
  aboutText: { fontSize: '1.15rem', color: '#555', lineHeight: '1.8' },
  
  // Societies Styles
  societies: { padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' },
  card: { backgroundColor: 'white', padding: '2.5rem 2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' },
  cardTitle: { color: '#002855', fontSize: '1.5rem', margin: '0 0 1rem 0' },
  cardText: { color: '#666', lineHeight: '1.6', flex: 1, marginBottom: '1.5rem' },
  cardLink: { color: '#00629B', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.05rem' }
};