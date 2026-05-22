import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Events() {
  const [events, setEvents] = useState([]); 
  const [activeTab, setActiveTab] = useState('All');
  const [modeFilter, setModeFilter] = useState('All');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/events');
        setEvents(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesTab = activeTab === 'All' || event.status === activeTab;
    const matchesMode = modeFilter === 'All' || event.mode === modeFilter;
    return matchesTab && matchesMode;
  });

  return (
    <div className="page-container animate-slide-up" style={{ maxWidth: '1200px' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', margin: '0 0 0.5rem 0' }}>IEEE Events</h1>
        <p className="subtitle">Discover what's happening in our student branch.</p>
      </div>

      {/* FILTER CONTROLS */}
      <div className="glass-panel" style={{ 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem', padding: '1.5rem',
        background: 'rgba(0,0,0,0.3)'
      }}>
        <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
          {['All', 'Upcoming', 'Ongoing', 'Past'].map((tab) => (
            <button 
              key={tab} 
              onClick={() => setActiveTab(tab)}
              style={{
                border: 'none', padding: '0.6rem 1.2rem', borderRadius: '8px', 
                cursor: 'pointer', fontWeight: 'bold', transition: 'all 0.3s',
                background: activeTab === tab ? 'linear-gradient(135deg, var(--neon-purple), #6d28d9)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab ? 'white' : 'var(--text-secondary)',
                boxShadow: activeTab === tab ? '0 0 15px rgba(139, 92, 246, 0.4)' : 'none',
                border: activeTab === tab ? '1px solid transparent' : '1px solid var(--card-border)'
              }}
            >
              {tab} Events
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ fontWeight: 'bold', color: 'var(--text-secondary)' }}>Mode:</label>
          <select 
            value={modeFilter} 
            onChange={(e) => setModeFilter(e.target.value)}
            className="glass-input"
            style={{ minWidth: '120px' }}
          >
            <option value="All" style={{ color: 'black' }}>All</option>
            <option value="Online" style={{ color: 'black' }}>Online</option>
            <option value="Offline" style={{ color: 'black' }}>Offline</option>
          </select>
        </div>
      </div>

      {/* EVENT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {filteredEvents.length > 0 ? (
          filteredEvents.map((event, index) => (
            <div key={event.id} className={`glass-panel glow-hover animate-slide-up delay-${(index % 5) * 100}`} style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                <span style={{ backgroundColor: 'rgba(139, 92, 246, 0.2)', color: 'var(--neon-purple)', border: '1px solid var(--neon-purple)', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {event.status}
                </span>
                <span style={{ backgroundColor: 'rgba(0, 243, 255, 0.1)', color: 'var(--neon-blue)', border: '1px solid var(--neon-blue)', padding: '0.3rem 0.8rem', borderRadius: '12px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                  {event.mode}
                </span>
              </div>

              {event.image ? (
                <img 
                  src={event.image} 
                  alt={event.title} 
                  style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px', marginBottom: '1.5rem' }} 
                />
              ) : (
                <div style={{ width: '100%', height: '200px', background: 'linear-gradient(135deg, rgba(255,255,255,0.02), rgba(255,255,255,0.05))', borderRadius: '8px', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-secondary)', fontWeight: 'bold', border: '1px solid var(--card-border)' }}>
                  No Image
                </div>
              )}

              <h3 style={{ margin: '0 0 1rem 0', color: 'white', fontSize: '1.4rem' }}>{event.title}</h3>
              <p style={{ margin: '0 0 0.5rem 0', color: 'var(--text-secondary)' }}><strong style={{ color: 'white' }}>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
              <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)', flex: 1 }}><strong style={{ color: 'white' }}>Type:</strong> {event.type}</p>
              
              <button className="btn-primary" style={{ width: '100%', background: 'transparent', border: '1px solid var(--neon-purple)', color: 'var(--neon-purple)' }}>
                View Details
              </button>
            </div>
          ))
        ) : (
          <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '1.2rem', padding: '3rem', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed var(--card-border)' }}>
            No events found for the selected filters.
          </p>
        )}
      </div>
    </div>
  );
}