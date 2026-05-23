import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCard from '../components/AnimatedCard';

export default function History() {
  const milestones = [
    { year: "2018", title: "Branch Inception", description: "Our IEEE Student Branch was officially established, starting with just 25 passionate engineering students." },
    { year: "2019", title: "First Hackathon", description: "Hosted our inaugural 24-hour hackathon, attracting over 150 participants from universities nationwide." },
    { year: "2020", title: "WIE Chapter Formed", description: "Successfully launched the Women in Engineering affinity group to promote diversity in STEM." },
    { year: "2021", title: "Excellence Award", description: "Awarded 'Best Emerging Student Branch' in our regional IEEE section." },
    { year: "2023", title: "Global Summit", description: "Our executive committee represented the branch at the international IEEE student summit." },
  ];

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3rem', margin: '0 0 0.5rem 0' }}>Our Journey</h1>
          <p className="subtitle">The milestones that shaped our student branch.</p>
        </div>
      </ScrollReveal>

      <div style={{ position: 'relative' }}>
        {/* Vertical Timeline Line */}
        <div style={{ position: 'absolute', left: '50px', top: 0, bottom: 0, width: '4px', background: 'linear-gradient(180deg, var(--neon-purple), var(--neon-blue))', borderRadius: '2px', boxShadow: '0 0 15px rgba(139, 92, 246, 0.4)' }}></div>

        {milestones.map((milestone, index) => (
          <ScrollReveal key={index} delay={index * 0.15}>
            <AnimatedCard className="glass-panel" style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '3rem', padding: '2rem', position: 'relative', marginLeft: '20px' }}>
              
              {/* Timeline Dot */}
              <div style={{ position: 'absolute', left: '-40px', top: '2.5rem', width: '24px', height: '24px', borderRadius: '50%', background: 'var(--bg-dark)', border: '4px solid var(--neon-blue)', boxShadow: '0 0 10px var(--neon-blue)' }}></div>

              <div style={{ minWidth: '100px', paddingRight: '2rem' }}>
                <h2 className="text-gradient" style={{ margin: 0, fontSize: '2.5rem' }}>{milestone.year}</h2>
              </div>

              <div style={{ flex: 1, borderLeft: '1px solid var(--card-border)', paddingLeft: '2rem' }}>
                <h3 style={{ color: 'white', fontSize: '1.5rem', margin: '0 0 0.5rem 0' }}>{milestone.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', margin: 0, fontSize: '1.05rem' }}>{milestone.description}</p>
              </div>
              
            </AnimatedCard>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}