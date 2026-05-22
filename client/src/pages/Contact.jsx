import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Contact() {
  const [contactInfo, setContactInfo] = useState({
    email: 'Loading...', phone: 'Loading...', address: 'Loading...', instagram: '#', linkedin: '#'
  });

  useEffect(() => {
    axios.get('http://localhost:5000/api/contact')
      .then(res => setContactInfo(res.data))
      .catch(err => console.error("Failed to fetch contact info", err));
  }, []);

  return (
    <div className="page-container animate-slide-up">
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', margin: '0 0 0.5rem 0' }}>Get in Touch</h1>
        <p className="subtitle">Have questions about joining or partnering with us? Reach out!</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
        
        {/* Left Column: The Contact Details */}
        <div className="glass-panel glow-hover" style={{ padding: '2.5rem' }}>
          <h2 style={{ color: 'white', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '2rem' }}>Official Branch Information</h2>
          
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

          <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--card-border)' }}>
            <a href={contactInfo.linkedin} className="btn-primary" style={{ textDecoration: 'none' }}>LinkedIn</a>
            <a href={contactInfo.instagram} className="btn-primary" style={{ background: 'linear-gradient(135deg, #e1306c, #833ab4)', textDecoration: 'none' }}>Instagram</a>
          </div>
        </div>

        {/* Right Column: Visual Element */}
        <div className="glass-panel glow-hover" style={{ padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(0, 243, 255, 0.1))' }}>
          <h2 style={{ color: 'white', marginBottom: '1rem', fontSize: '2rem' }}>Connect with IEEE</h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', fontSize: '1.1rem' }}>
            Follow our social media channels to stay updated on our latest technical workshops, hackathons, and community events. Let's build the future together.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  detailRow: { display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', alignItems: 'flex-start' },
  icon: { fontSize: '1.5rem', backgroundColor: 'rgba(255,255,255,0.05)', padding: '0.8rem', borderRadius: '12px', border: '1px solid var(--card-border)' },
  detailTitle: { margin: '0 0 0.3rem 0', color: 'white' },
  detailText: { margin: 0, color: 'var(--text-secondary)', lineHeight: '1.5' },
  link: { color: 'var(--neon-blue)', textDecoration: 'none', fontWeight: 'bold', textShadow: '0 0 8px rgba(0, 243, 255, 0.3)' }
};