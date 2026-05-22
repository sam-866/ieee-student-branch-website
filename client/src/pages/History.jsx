import { useState } from 'react';

// DUMMY DATA: The milestones of the IEEE branch
const milestones = [
  { id: 1, year: "2020", title: "Branch Established", description: "The IEEE Student Branch was officially inaugurated with a founding committee of 15 passionate engineering students." },
  { id: 2, year: "2022", title: "First National Hackathon", description: "Hosted 'CodeFest 2022', bringing in over 500 participants from across the state for a 48-hour coding marathon." },
  { id: 3, year: "2024", title: "Best Student Branch Award", description: "Awarded the prestigious 'Best Student Branch' in the regional section for outstanding community engagement and technical workshops." },
  { id: 4, year: "2025", title: "WIE Affinity Group Launched", description: "Successfully launched the Women in Engineering (WIE) affinity group to promote diversity and inclusion in STEM fields." },
  { id: 5, year: "2026", title: "Surpassed 500 Active Members", description: "Reached a massive milestone of 500 active student members, making us one of the largest branches in the region." }
];

export default function History() {
  return (
    <div className="page-container animate-slide-up" style={{ maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', margin: '0 0 0.5rem 0' }}>Our Journey</h1>
        <p className="subtitle">A look back at the milestones that define our IEEE Student Branch.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {milestones.map((milestone, index) => (
          <div key={milestone.id} style={{ display: 'flex', gap: '1.5rem' }} className={`animate-slide-up delay-${(index % 5) * 100}`}>
            
            {/* LEFT COLUMN: The Year Bubble and Connecting Line */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px', flexShrink: 0 }}>
              <div style={{ 
                background: 'linear-gradient(135deg, var(--neon-purple), #6d28d9)', 
                color: 'white', width: '70px', height: '70px', borderRadius: '50%', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)', zIndex: 2 
              }}>
                {milestone.year}
              </div>
              {index !== milestones.length - 1 && (
                <div style={{ width: '4px', background: 'linear-gradient(to bottom, var(--neon-purple), transparent)', flex: 1, margin: '10px 0', borderRadius: '2px', opacity: 0.5 }}></div>
              )}
            </div>

            {/* RIGHT COLUMN: The Content Card */}
            <div style={{ flex: 1, paddingBottom: '3rem' }}>
              <div className="glass-panel glow-hover" style={{ padding: '2rem', position: 'relative', top: '10px' }}>
                <h3 className="text-gradient" style={{ margin: '0 0 0.8rem 0', fontSize: '1.5rem' }}>{milestone.title}</h3>
                <p style={{ color: 'var(--text-secondary)', margin: 0, lineHeight: '1.6' }}>{milestone.description}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}