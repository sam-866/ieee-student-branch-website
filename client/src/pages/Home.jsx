import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ minHeight: '100vh' }}>
      
      {/* 1. HERO SECTION */}
      <section className="animate-slide-up" style={{ padding: '8rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <h1 className="text-gradient" style={{ fontSize: '4.5rem', margin: '0 0 1.5rem 0', textShadow: '0 4px 15px rgba(0,0,0,0.5)' }}>
            Empowering Innovators of Tomorrow
          </h1>
          <p className="subtitle" style={{ fontSize: '1.3rem', marginBottom: '3rem' }}>
            Welcome to the official IEEE Student Branch website. Join a global community of engineers, scientists, and technology professionals dedicated to advancing technology for humanity.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
            <Link to="/events" className="btn-primary">Discover Events</Link>
            <Link to="/execom" className="glass-panel glow-hover" style={{ color: 'white', padding: '0.8rem 1.5rem', textDecoration: 'none', borderRadius: '8px', fontWeight: 'bold' }}>
              Meet the Team
            </Link>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section className="animate-slide-up delay-200" style={{ padding: '5rem 2rem' }}>
        <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '4rem 3rem' }}>
          <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>About Our Branch</h2>
          <div style={{ width: '80px', height: '4px', background: 'var(--neon-purple)', margin: '0 auto 2.5rem auto', borderRadius: '2px', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}></div>
          <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
            Established with a vision to foster technological innovation and excellence, our IEEE Student Branch serves as a dynamic hub for passionate students. We organize hands-on workshops, 48-hour hackathons, expert seminars, and networking events to bridge the gap between academic learning and real-world industry demands.
          </p>
        </div>
      </section>

      {/* 3. SOCIETIES QUICK-LINKS */}
      <section className="animate-slide-up delay-400" style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '2.5rem', textAlign: 'center', margin: '0 0 0.5rem 0' }}>Explore Our Societies</h2>
        <div style={{ width: '80px', height: '4px', background: 'var(--neon-purple)', margin: '0 auto 4rem auto', borderRadius: '2px', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}></div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Computer Society Card */}
          <div className="glass-panel glow-hover" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid #00f3ff' }}>
            <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Computer Society</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '2rem' }}>Empowering the computing professionals of tomorrow through coding bootcamps and algorithmic hackathons.</p>
            <Link to="/society/computer" className="text-neon-purple" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Learn More →</Link>
          </div>

          {/* WIE Card */}
          <div className="glass-panel glow-hover" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid #fca311' }}>
            <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Women in Engineering</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '2rem' }}>Inspiring and empowering women in STEM fields to achieve their academic and professional goals.</p>
            <Link to="/society/wie" className="text-neon-purple" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Learn More →</Link>
          </div>

          {/* RAS Card */}
          <div className="glass-panel glow-hover" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid #ef476f' }}>
            <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Robotics & Automation</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '2rem' }}>Building the machines of the future with hands-on hardware projects and robotics competitions.</p>
            <Link to="/society/ras" className="text-neon-purple" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Learn More →</Link>
          </div>
        </div>
      </section>

    </div>
  );
}