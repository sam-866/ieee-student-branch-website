import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Events() {
  // 1. STATE: Start with an empty array instead of dummy data
  const [events, setEvents] = useState([]); 
  const [activeTab, setActiveTab] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');

  // 2. FETCH DATA: This runs once when the page loads
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Calling your local Node.js server!
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  // 3. FILTERING LOGIC: Now filters the real data from MongoDB
  const filteredEvents = events.filter((event) => {
    const matchesTab = activeTab === 'All' || event.status === activeTab;
    const matchesMode = modeFilter === 'All' || event.mode === modeFilter;
    return matchesTab && matchesMode;
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>IEEE Events</h1>
      <p style={styles.subHeader}>Discover what's happening in our student branch.</p>

      {/* FILTER CONTROLS */}
      <div style={styles.controlsContainer}>
        <div style={styles.tabs}>
          {['All', 'Upcoming', 'Ongoing', 'Past'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{
                ...styles.tabButton,
                backgroundColor: activeTab === tab ? '#00629B' : '#e0e0e0',
                color: activeTab === tab ? 'white' : 'black'
              }}
            >
              {tab} Events
            </button>
          ))}
        </div>

        <div style={styles.dropdownContainer}>
          <label style={{ fontWeight: 'bold', marginRight: '10px' }}>Mode:</label>
          <select 
            value={modeFilter} 
            onChange={(e) => setModeFilter(e.target.value)}
            style={styles.selectInput}
          >
            <option value="All">All</option>
            <option value="Online">Online</option>
            <option value="Offline">Offline</option>
          </select>
        </div>
      </div>

      {/* EVENT GRID */}
      <div style={styles.grid}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event) => (
            <div key={event._id} style={styles.card}>
              <div style={styles.cardHeader}>
                <span style={styles.badge}>{event.status}</span>
                <span style={{...styles.badge, backgroundColor: '#333'}}>{event.mode}</span>
              </div>

              {/* 📸 ADD THE IMAGE RIGHT HERE 📸 */}
              {event.image ? (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  style={{ width: '100%', height: '180px', objectFit: 'cover', borderRadius: '6px', marginBottom: '1rem' }} 
                />
              ) : (
                <div style={{ width: '100%', height: '180px', backgroundColor: '#f0f4f8', borderRadius: '6px', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a0b2c6', fontWeight: 'bold' }}>
                  No Image
                </div>
              )}
              {/* 📸 END OF IMAGE BLOCK 📸 */}

              <h3 style={styles.cardTitle}>{event.title}</h3>
              {/* Note: I added new Date().toLocaleDateString() here to make the MongoDB date look pretty! */}
              <p style={{ margin: '0 0 0.5rem 0' }}><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p style={{ margin: '0 0 1rem 0' }}><strong>Type:</strong> {event.type}</p>
              <button style={styles.detailsButton}>View Details</button>
            </div>
          ))
        ) : (
          <p style={styles.noResults}>No events found for the selected filters.</p>
        )}
      </div>
    </div>
  );
}

// Basic inline styles (Same as before)
const styles = {
  container: { fontFamily: 'sans-serif', maxWidth: '1000px', margin: '0 auto', padding: '2rem' },
  header: { color: '#002855', textAlign: 'center', marginBottom: '0.5rem' },
  subHeader: { textAlign: 'center', color: '#666', marginBottom: '2rem' },
  controlsContainer: { 
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem', backgroundColor: '#f8f9fa',
    padding: '1rem', borderRadius: '8px'
  },
  tabs: { display: 'flex', gap: '0.5rem' },
  tabButton: { 
    border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', 
    cursor: 'pointer', fontWeight: 'bold', transition: '0.3s'
  },
  dropdownContainer: { display: 'flex', alignItems: 'center' },
  selectInput: { padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' },
  card: { 
    border: '1px solid #eaeaea', borderRadius: '8px', padding: '1.5rem', 
    boxShadow: '0 4px 6px rgba(0,0,0,0.05)', backgroundColor: 'white'
  },
  cardHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' },
  badge: { 
    backgroundColor: '#002855', color: 'white', padding: '0.2rem 0.5rem', 
    borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold'
  },
  cardTitle: { margin: '0 0 1rem 0', color: '#002855' },
  detailsButton: { 
    marginTop: '1rem', width: '100%', padding: '0.5rem', backgroundColor: '#f0f4f8', 
    border: '1px solid #00629B', color: '#00629B', borderRadius: '4px', 
    cursor: 'pointer', fontWeight: 'bold'
  },
  noResults: { gridColumn: '1 / -1', textAlign: 'center', color: '#666', fontSize: '1.2rem' }
};