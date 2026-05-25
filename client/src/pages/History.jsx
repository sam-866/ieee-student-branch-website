import { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCard from '../components/AnimatedCard';

export default function History() {
  const [milestones, setMilestones] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/history`);
        const data = Array.isArray(res.data) ? res.data : [];
        // If DB is empty, show the default static milestones
        setMilestones(data.length > 0 ? data : [
          { id: 's1', year: '2018', title: 'Branch Inception', description: 'Our IEEE Student Branch was officially established, starting with just 25 passionate engineering students.', image: null },
          { id: 's2', year: '2019', title: 'First Hackathon', description: 'Hosted our inaugural 24-hour hackathon, attracting over 150 participants from universities nationwide.', image: null },
          { id: 's3', year: '2020', title: 'WIE Chapter Formed', description: 'Successfully launched the Women in Engineering affinity group to promote diversity in STEM.', image: null },
          { id: 's4', year: '2021', title: 'Excellence Award', description: "Awarded 'Best Emerging Student Branch' in our regional IEEE section.", image: null },
          { id: 's5', year: '2023', title: 'Global Summit', description: 'Our executive committee represented the branch at the international IEEE student summit.', image: null },
        ]);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setMilestones([]);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', margin: '0 0 0.5rem 0' }}>Our Journey</h1>
          <p className="subtitle">The milestones that shaped our student branch.</p>
        </div>
      </ScrollReveal>

      {loading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>Loading history…</div>
      ) : (
        <div style={{ position: 'relative' }}>
          {/* Vertical Timeline Line */}
          <div style={{
            position: 'absolute', left: '50px', top: 0, bottom: 0, width: '4px',
            background: 'linear-gradient(180deg, var(--neon-purple), var(--neon-blue))',
            borderRadius: '2px', boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)'
          }} />

          {milestones.map((milestone, index) => (
            <ScrollReveal key={milestone.id || index} delay={index * 0.12}>
              <AnimatedCard
                className="glass-panel"
                style={{
                  display: 'flex', flexDirection: 'column',
                  marginBottom: '3rem', padding: '2rem',
                  position: 'relative', marginLeft: '20px',
                  overflow: 'hidden',
                  borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
                }}
              >
                {/* Timeline Dot */}
                <div style={{
                  position: 'absolute', left: '-40px', top: '2.5rem',
                  width: '24px', height: '24px', borderRadius: '50%',
                  background: 'var(--bg-dark)', border: '4px solid var(--neon-blue)',
                  boxShadow: '0 0 10px var(--neon-blue)',
                }} />

                {/* Year + Title row */}
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1.5rem', marginBottom: milestone.image ? '1.5rem' : 0 }}>
                  <div style={{ minWidth: '90px', flexShrink: 0 }}>
                    <h2 className="text-gradient" style={{ margin: 0, fontSize: '2.2rem', lineHeight: 1 }}>{milestone.year}</h2>
                  </div>
                  <div style={{ flex: 1, borderLeft: '1px solid var(--card-border)', paddingLeft: '1.5rem' }}>
                    <h3 style={{ color: 'white', fontSize: '1.4rem', margin: '0 0 0.5rem 0' }}>{milestone.title}</h3>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', margin: 0, fontSize: '1rem' }}>{milestone.description}</p>
                  </div>
                </div>

                {/* Optional Image */}
                {milestone.image && (
                  <div style={{ marginTop: '0.5rem', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <img
                      src={milestone.image}
                      alt={milestone.title}
                      style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                      onMouseOver={e => e.currentTarget.style.transform = 'scale(1.03)'}
                      onMouseOut={e  => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                )}

                {/* Subtle neon corner accent */}
                <div style={{
                  position: 'absolute', top: 0, right: 0,
                  width: '80px', height: '80px',
                  background: 'radial-gradient(circle at top right, rgba(139,92,246,0.12), transparent 70%)',
                  pointerEvents: 'none',
                }} />
              </AnimatedCard>
            </ScrollReveal>
          ))}
        </div>
      )}
    </div>
  );
}