import { useParams, Link } from 'react-router-dom';

const societyDatabase = {
  computer: {
    name: "IEEE Computer Society",
    abbreviation: "CS",
    tagline: "Empowering the computing professionals of tomorrow.",
    description: "The IEEE Computer Society is the premier source for information, inspiration, and collaboration in computer science and engineering. Our student chapter focuses on coding bootcamps, hackathons, and industry networking.",
    themeColor: "#00f3ff", 
    memberCount: 120
  },
  wie: {
    name: "Women in Engineering",
    abbreviation: "WIE",
    tagline: "Inspiring and empowering women in STEM.",
    description: "IEEE WIE is a global network of IEEE members and volunteers dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests in a career in engineering.",
    themeColor: "#fca311", 
    memberCount: 85
  },
  ras: {
    name: "Robotics & Automation",
    abbreviation: "RAS",
    tagline: "Building the machines of the future.",
    description: "The Robotics and Automation Society strives to advance innovation, education, and fundamental and applied research in robotics and automation. We host hardware build days and robot-wars competitions.",
    themeColor: "#ef476f", 
    memberCount: 60
  }
};

export default function Society() {
  const { societyId } = useParams();
  const society = societyDatabase[societyId?.toLowerCase()];

  if (!society) {
    return (
      <div className="page-container" style={{ textAlign: 'center', padding: '5rem 2rem' }}>
        <h2 style={{ color: '#ef4444', fontSize: '2.5rem', marginBottom: '1rem' }}>Society Not Found</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>We couldn't find a society matching "{societyId}".</p>
        <Link to="/" className="btn-primary" style={{ textDecoration: 'none' }}>Return Home</Link>
      </div>
    );
  }

  return (
    <div className="page-container animate-slide-up" style={{ maxWidth: '1100px' }}>
      
      {/* Dynamic Header Box */}
      <div className="glass-panel" style={{ 
        padding: '4rem 3rem', textAlign: 'center', marginBottom: '3rem',
        borderTop: `4px solid ${society.themeColor}`,
        background: `linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(20,20,35,0.65) 100%)`
      }}>
        <h1 style={{ margin: '0 0 0.5rem 0', color: 'white', fontSize: '3.5rem', textShadow: `0 0 20px ${society.themeColor}40` }}>
          {society.name}
        </h1>
        <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.8rem', color: society.themeColor, textShadow: `0 0 10px ${society.themeColor}60` }}>
          IEEE {society.abbreviation}
        </h3>
        <p style={{ fontSize: '1.3rem', color: 'var(--text-secondary)', fontStyle: 'italic', margin: 0 }}>
          "{society.tagline}"
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem' }}>
        
        {/* Main Content */}
        <div className="glass-panel" style={{ padding: '3rem', gridColumn: '1 / -1', '@media (minWidth: 768px)': { gridColumn: 'span 2' } }}>
          <h2 style={{ color: 'white', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.8rem' }}>About Us</h2>
          <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '3rem' }}>
            {society.description}
          </p>
          
          <h2 style={{ color: 'white', borderBottom: '1px solid var(--card-border)', paddingBottom: '1rem', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Recent Activity</h2>
          <div style={{ background: 'rgba(0,0,0,0.2)', border: '1px dashed var(--card-border)', padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)', borderRadius: '8px' }}>
            <p style={{ margin: 0 }}>No recent events posted for {society.abbreviation}.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div className="glass-panel glow-hover" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
            <h1 style={{ color: society.themeColor, margin: '0 0 0.5rem 0', fontSize: '4rem', textShadow: `0 0 20px ${society.themeColor}50` }}>
              {society.memberCount}
            </h1>
            <p style={{ margin: 0, fontWeight: 'bold', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Active Members
            </p>
          </div>
          
          <button 
            className="glow-hover"
            style={{ 
              color: 'black', padding: '1.2rem', border: 'none', borderRadius: '12px', 
              fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer',
              background: society.themeColor, boxShadow: `0 0 20px ${society.themeColor}40`
            }}
          >
            Join {society.abbreviation}
          </button>
        </div>
      </div>
    </div>
  );
}