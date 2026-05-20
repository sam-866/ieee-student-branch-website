import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    email: 'Loading...', phone: 'Loading...', address: 'Loading...', instagram: '#', linkedin: '#'
  });

  useEffect(() => {
    // Fetch the data from our new API route when the page loads
    axios.get('http://localhost:5000/api/contact')
      .then(res => setContactInfo(res.data))
      .catch(err => console.error("Failed to fetch contact info"));
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.headerBox}>
        <h1 style={styles.header}>Get in Touch</h1>
        <p style={styles.subtext}>Have questions about joining or partnering with us? Reach out!</p>
      </div>

      <div style={styles.grid}>
        {/* Left Column: The Contact Details */}
        <div style={styles.infoCard}>
          <h2 style={styles.cardHeader}>Official Branch Information</h2>
          
          <div style={styles.detailRow}>
            <span style={styles.icon}>📍</span>
            <div>
              <h4 style={styles.detailTitle}>Office Location</h4>
              <p style={styles.detailText}>{contactInfo.address}</p>
            </div>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.icon}>✉️</span>
            <div>
              <h4 style={styles.detailTitle}>Email Us</h4>
              <a href={`mailto:${contactInfo.email}`} style={styles.link}>{contactInfo.email}</a>
            </div>
          </div>

          <div style={styles.detailRow}>
            <span style={styles.icon}>📞</span>
            <div>
              <h4 style={styles.detailTitle}>Call Us</h4>
              <p style={styles.detailText}>{contactInfo.phone}</p>
            </div>
          </div>

          <div style={styles.socialBox}>
            <a href={contactInfo.linkedin} style={styles.socialLink}>LinkedIn</a>
            <a href={contactInfo.instagram} style={styles.socialLink}>Instagram</a>
          </div>
        </div>

        {/* Right Column: Visual Element / Message Form Placeholder */}
        <div style={styles.visualCard}>
          <h2 style={{color: 'white', marginBottom: '1rem'}}>Connect with IEEE</h2>
          <p style={{color: '#a0b2c6', lineHeight: '1.6'}}>
            Follow our social media channels to stay updated on our latest technical workshops, hackathons, and community events.
          </p>
        </div>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem', fontFamily: 'sans-serif' },
  headerBox: { textAlign: 'center', marginBottom: '4rem' },
  header: { color: '#002855', fontSize: '2.5rem', margin: '0 0 0.5rem 0' },
  subtext: { color: '#666', fontSize: '1.1rem' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' },
  infoCard: { backgroundColor: 'white', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' },
  cardHeader: { color: '#002855', borderBottom: '2px solid #f0f0f0', paddingBottom: '1rem', marginBottom: '2rem' },
  detailRow: { display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start' },
  icon: { fontSize: '1.5rem', backgroundColor: '#f0f4f8', padding: '0.8rem', borderRadius: '8px' },
  detailTitle: { margin: '0 0 0.3rem 0', color: '#333' },
  detailText: { margin: 0, color: '#666', lineHeight: '1.5' },
  link: { color: '#00629B', textDecoration: 'none', fontWeight: 'bold' },
  socialBox: { display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '2px solid #f0f0f0' },
  socialLink: { backgroundColor: '#00629B', color: 'white', padding: '0.6rem 1.2rem', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold', fontSize: '0.9rem' },
  visualCard: { backgroundColor: '#002855', padding: '3rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }
};