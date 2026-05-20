import { useParams, Link } from 'react-router-dom';

// DUMMY DATA: A dictionary holding data for different societies
const societyDatabase = {
  computer: {
    name: "IEEE Computer Society",
    abbreviation: "CS",
    tagline: "Empowering the computing professionals of tomorrow.",
    description: "The IEEE Computer Society is the premier source for information, inspiration, and collaboration in computer science and engineering. Our student chapter focuses on coding bootcamps, hackathons, and industry networking.",
    themeColor: "#FFA300", // CS Orange
    memberCount: 120
  },
  wie: {
    name: "Women in Engineering",
    abbreviation: "WIE",
    tagline: "Inspiring and empowering women in STEM.",
    description: "IEEE WIE is a global network of IEEE members and volunteers dedicated to promoting women engineers and scientists, and inspiring girls around the world to follow their academic interests in a career in engineering.",
    themeColor: "#782F40", // WIE Maroon
    memberCount: 85
  },
  ras: {
    name: "Robotics & Automation",
    abbreviation: "RAS",
    tagline: "Building the machines of the future.",
    description: "The Robotics and Automation Society strives to advance innovation, education, and fundamental and applied research in robotics and automation. We host hardware build days and robot-wars competitions.",
    themeColor: "#990000", // RAS Red
    memberCount: 60
  }
};

export default function Society() {
  // 1. GRAB THE ID FROM THE URL (e.g., if URL is /society/wie, then societyId = 'wie')
  const { societyId } = useParams();

  // 2. LOOK UP THE DATA IN OUR DATABASE
  // We use .toLowerCase() just in case the user types /society/WIE in caps
  const society = societyDatabase[societyId?.toLowerCase()];

  // 3. HANDLE 404 ERRORS (If they type a society that doesn't exist)
  if (!society) {
    return (
      <div style={styles.errorContainer}>
        <h2>Society Not Found</h2>
        <p>We couldn't find a society matching "{societyId}".</p>
        <Link to="/" style={styles.backButton}>Return Home</Link>
      </div>
    );
  }

  // 4. RENDER THE TEMPLATE WITH THE DYNAMIC DATA
  return (
    <div style={styles.container}>
      {/* Dynamic Header Box */}
      <div style={{ ...styles.headerBox, borderTop: `8px solid ${society.themeColor}` }}>
        <h1 style={styles.title}>{society.name}</h1>
        <h3 style={{ ...styles.abbreviation, color: society.themeColor }}>IEEE {society.abbreviation}</h3>
        <p style={styles.tagline}>{society.tagline}</p>
      </div>

      {/* Main Content Grid */}
      <div style={styles.grid}>
        <div style={styles.mainContent}>
          <h2 style={styles.sectionHeader}>About Us</h2>
          <p style={styles.description}>{society.description}</p>
          
          <h2 style={styles.sectionHeader}>Recent Activity</h2>
          <div style={styles.placeholderBox}>
            <p>No recent events posted for {society.abbreviation}.</p>
          </div>
        </div>

        {/* Sidebar */}
        <div style={styles.sidebar}>
          <div style={styles.statBox}>
            <h1 style={{ color: society.themeColor, margin: 0, fontSize: '3rem' }}>{society.memberCount}</h1>
            <p style={{ margin: 0, fontWeight: 'bold', color: '#666' }}>Active Members</p>
          </div>
          <button style={{ ...styles.joinButton, backgroundColor: society.themeColor }}>
            Join {society.abbreviation}
          </button>
        </div>
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: { maxWidth: '1000px', margin: '0 auto', padding: '3rem 2rem', fontFamily: 'sans-serif' },
  errorContainer: { textAlign: 'center', padding: '5rem 2rem', color: '#e63946' },
  backButton: { display: 'inline-block', marginTop: '1rem', padding: '0.8rem 1.5rem', backgroundColor: '#002855', color: 'white', textDecoration: 'none', borderRadius: '4px' },
  headerBox: { backgroundColor: 'white', padding: '3rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center', marginBottom: '2rem' },
  title: { margin: '0 0 0.5rem 0', color: '#002855', fontSize: '2.5rem' },
  abbreviation: { margin: '0 0 1rem 0', fontSize: '1.5rem' },
  tagline: { fontSize: '1.2rem', color: '#555', fontStyle: 'italic', margin: 0 },
  grid: { display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' },
  mainContent: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  sectionHeader: { color: '#002855', borderBottom: '2px solid #f0f0f0', paddingBottom: '0.5rem', marginBottom: '1rem' },
  description: { lineHeight: '1.8', color: '#444', fontSize: '1.05rem', marginBottom: '2rem' },
  placeholderBox: { backgroundColor: '#f9f9f9', border: '1px dashed #ccc', padding: '2rem', textAlign: 'center', color: '#888', borderRadius: '4px' },
  sidebar: { display: 'flex', flexDirection: 'column', gap: '1.5rem' },
  statBox: { backgroundColor: 'white', padding: '2rem', borderRadius: '8px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', textAlign: 'center' },
  joinButton: { color: 'white', padding: '1rem', border: 'none', borderRadius: '8px', fontSize: '1.2rem', fontWeight: 'bold', cursor: 'pointer', transition: 'opacity 0.2s' }
};