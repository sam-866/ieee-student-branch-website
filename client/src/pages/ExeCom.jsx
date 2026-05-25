import { useState, useEffect } from 'react';
import axios from 'axios';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCard from '../components/AnimatedCard';

export default function ExeCom() {
  const [members, setMembers] = useState([]);
  const [activeYear, setActiveYear] = useState('2026');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/execom`);
        setMembers(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching ExeCom members:", error);
        setMembers([]);
      }
    };
    fetchMembers();
  }, []);

  const filteredMembers = Array.isArray(members) ? members.filter(member => member.year === activeYear) : [];

  return (
    <div className="page-container" style={{ maxWidth: '1200px' }}>
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', margin: '0 0 0.5rem 0' }}>Executive Committee</h1>
          <p className="subtitle">Meet the leaders driving our student branch forward.</p>
        </div>
      </ScrollReveal>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
        <button 
          onClick={() => setActiveYear('2026')}
          style={{
            background: activeYear === '2026' ? 'linear-gradient(135deg, var(--neon-purple), #6d28d9)' : 'rgba(255,255,255,0.05)',
            color: activeYear === '2026' ? 'white' : 'var(--text-secondary)',
            border: activeYear === '2026' ? '1px solid transparent' : '1px solid var(--card-border)',
            padding: '0.8rem 2.5rem', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: activeYear === '2026' ? '0 0 20px rgba(139, 92, 246, 0.4)' : 'none'
          }}
        >
          2026 Committee
        </button>
        <button 
          onClick={() => setActiveYear('2025')}
          style={{
            background: activeYear === '2025' ? 'linear-gradient(135deg, var(--neon-purple), #6d28d9)' : 'rgba(255,255,255,0.05)',
            color: activeYear === '2025' ? 'white' : 'var(--text-secondary)',
            border: activeYear === '2025' ? '1px solid transparent' : '1px solid var(--card-border)',
            padding: '0.8rem 2.5rem', borderRadius: '30px', fontSize: '1.1rem', fontWeight: 'bold', cursor: 'pointer', transition: 'all 0.3s',
            boxShadow: activeYear === '2025' ? '0 0 20px rgba(139, 92, 246, 0.4)' : 'none'
          }}
        >
          2025 Committee
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2.5rem' }}>
        {filteredMembers.length > 0 ? (
          filteredMembers.map((member, index) => (
            <AnimatedCard key={member.id} delay={(index % 4) * 0.15} className="glass-panel" style={{ padding: '2.5rem 1.5rem', textAlign: 'center' }}>
              
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    style={{
                      width: '120px', height: '120px', borderRadius: '50%',
                      objectFit: 'cover',
                      border: '3px solid var(--neon-purple)',
                      boxShadow: '0 0 25px rgba(139, 92, 246, 0.5), 0 0 50px rgba(139, 92, 246, 0.15)',
                      transition: 'box-shadow 0.3s ease',
                    }}
                  />
                ) : (
                  <div style={{
                    width: '120px', height: '120px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(0, 243, 255, 0.2))',
                    border: '2px solid var(--neon-purple)',
                    color: 'var(--neon-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '3.5rem', fontWeight: 'bold', fontFamily: 'Playfair Display, serif',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.3)'
                  }}>
                    {member.name.charAt(0)}
                  </div>
                )}
              </div>
              
              <h3 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '1.5rem' }}>{member.name}</h3>
              <p className="text-neon-purple" style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', fontSize: '1.05rem' }}>{member.position}</p>
              <p style={{ margin: '0 0 2rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{member.department}</p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={member.linkedin} style={{ textDecoration: 'none', color: 'white', fontSize: '0.85rem', fontWeight: 'bold', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: '1px solid var(--card-border)', transition: 'all 0.2s' }} onMouseOver={e => Object.assign(e.target.style, {background: 'rgba(255,255,255,0.1)', borderColor: 'var(--neon-blue)'})} onMouseOut={e => Object.assign(e.target.style, {background: 'rgba(255,255,255,0.05)', borderColor: 'var(--card-border)'})}>LinkedIn</a>
                <a href={member.ieee} style={{ textDecoration: 'none', color: 'white', fontSize: '0.85rem', fontWeight: 'bold', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: '1px solid var(--card-border)', transition: 'all 0.2s' }} onMouseOver={e => Object.assign(e.target.style, {background: 'rgba(255,255,255,0.1)', borderColor: 'var(--neon-purple)'})} onMouseOut={e => Object.assign(e.target.style, {background: 'rgba(255,255,255,0.05)', borderColor: 'var(--card-border)'})}>IEEE</a>
                <a href={`mailto:${member.email}`} style={{ textDecoration: 'none', color: 'white', fontSize: '0.85rem', fontWeight: 'bold', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', border: '1px solid var(--card-border)', transition: 'all 0.2s' }} onMouseOver={e => Object.assign(e.target.style, {background: 'rgba(255,255,255,0.1)'})} onMouseOut={e => Object.assign(e.target.style, {background: 'rgba(255,255,255,0.05)'})}>Email</a>
              </div>
            </AnimatedCard>
          ))
        ) : (
          <p style={{ textAlign: 'center', gridColumn: '1/-1', padding: '3rem', color: 'var(--text-secondary)', background: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px dashed var(--card-border)' }}>
            No members added for this year yet.
          </p>
        )}
      </div>
    </div>
  );
}