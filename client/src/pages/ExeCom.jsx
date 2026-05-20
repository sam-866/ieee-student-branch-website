import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ExeCom() {
  const [members, setMembers] = useState([]);
  const [activeYear, setActiveYear] = useState('2026');

  // Fetch real data from MongoDB on page load
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/execom');
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching ExeCom members:", error);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = members.filter(member => member.year === activeYear);

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Executive Committee</h1>
      <p style={styles.subtext}>Meet the leaders driving our student branch forward.</p>

      <div style={styles.tabContainer}>
        <button style={activeYear === '2026' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveYear('2026')}>
          2026 Committee
        </button>
        <button style={activeYear === '2025' ? styles.activeTab : styles.inactiveTab} onClick={() => setActiveYear('2025')}>
          2025 Committee
        </button>
      </div>

      <div style={styles.grid}>
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member) => (
            <div key={member._id} style={styles.card}>
              <div style={styles.photoContainer}>
                <div style={styles.photoPlaceholder}>{member.name.charAt(0)}</div>
              </div>
              <h3 style={styles.name}>{member.name}</h3>
              <p style={styles.position}>{member.position}</p>
              <p style={styles.department}>{member.department}</p>
              <div style={styles.linksContainer}>
                <a href={member.linkedin} style={styles.link}>LinkedIn</a>
                <a href={member.ieee} style={styles.link}>IEEE Profile</a>
                <a href={`mailto:${member.email}`} style={styles.link}>Email</a>
              </div>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center', gridColumn: '1/-1'}}>No members added for this year yet.</p>
        )}
      </div>
    </div>
  );
}

// Keep the exact same styles you had before!
const styles = {
  container: { maxWidth: '1100px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' },
  header: { color: '#002855', textAlign: 'center', marginBottom: '0.5rem' },
  subtext: { textAlign: 'center', color: '#666', marginBottom: '2.5rem' },
  tabContainer: { display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' },
  activeTab: { backgroundColor: '#00629B', color: 'white', border: 'none', padding: '0.8rem 2rem', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
  inactiveTab: { backgroundColor: '#e0e0e0', color: '#333', border: 'none', padding: '0.8rem 2rem', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: '0.3s' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' },
  card: { backgroundColor: 'white', borderRadius: '12px', padding: '2rem 1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', transition: 'transform 0.2s', border: '1px solid #f0f0f0' },
  photoContainer: { display: 'flex', justifyContent: 'center', marginBottom: '1.2rem' },
  photoPlaceholder: { width: '120px', height: '120px', borderRadius: '50%', backgroundColor: '#002855', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '3rem', fontWeight: 'bold' },
  name: { margin: '0 0 0.2rem 0', color: '#002855', fontSize: '1.4rem' },
  position: { margin: '0 0 0.5rem 0', color: '#00629B', fontWeight: 'bold', fontSize: '1rem' },
  department: { margin: '0 0 1.5rem 0', color: '#666', fontSize: '0.9rem' },
  linksContainer: { display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' },
  link: { textDecoration: 'none', color: '#002855', fontSize: '0.85rem', fontWeight: 'bold', padding: '0.4rem 0.8rem', backgroundColor: '#f4f7f6', borderRadius: '4px' }
};