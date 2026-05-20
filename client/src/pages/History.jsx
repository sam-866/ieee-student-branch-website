import React from 'react';

// DUMMY DATA: The milestones of the IEEE branch
const milestones = [
  {
    id: 1,
    year: "2020",
    title: "Branch Established",
    description: "The IEEE Student Branch was officially inaugurated with a founding committee of 15 passionate engineering students."
  },
  {
    id: 2,
    year: "2022",
    title: "First National Hackathon",
    description: "Hosted 'CodeFest 2022', bringing in over 500 participants from across the state for a 48-hour coding marathon."
  },
  {
    id: 3,
    year: "2024",
    title: "Best Student Branch Award",
    description: "Awarded the prestigious 'Best Student Branch' in the regional section for outstanding community engagement and technical workshops."
  },
  {
    id: 4,
    year: "2025",
    title: "WIE Affinity Group Launched",
    description: "Successfully launched the Women in Engineering (WIE) affinity group to promote diversity and inclusion in STEM fields."
  },
  {
    id: 5,
    year: "2026",
    title: "Surpassed 500 Active Members",
    description: "Reached a massive milestone of 500 active student members, making us one of the largest branches in the region."
  }
];

export default function History() {
  return (
    <div style={styles.container}>
      <div style={styles.headerContainer}>
        <h1 style={styles.header}>Our Journey</h1>
        <p style={styles.subtext}>A look back at the milestones that define our IEEE Student Branch.</p>
      </div>

      <div style={styles.timelineWrapper}>
        {milestones.map((milestone, index) => (
          <div key={milestone.id} style={styles.timelineItem}>
            
            {/* LEFT COLUMN: The Year Bubble and Connecting Line */}
            <div style={styles.dateColumn}>
              <div style={styles.yearBubble}>
                {milestone.year}
              </div>
              {/* Only show the line if it's NOT the last item in the array */}
              {index !== milestones.length - 1 && (
                <div style={styles.connectingLine}></div>
              )}
            </div>

            {/* RIGHT COLUMN: The Content Card */}
            <div style={styles.contentColumn}>
              <div style={styles.card}>
                <h3 style={styles.cardTitle}>{milestone.title}</h3>
                <p style={styles.cardDescription}>{milestone.description}</p>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

// Inline Styles
const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '3rem 1.5rem', fontFamily: 'sans-serif' },
  headerContainer: { textAlign: 'center', marginBottom: '4rem' },
  header: { color: '#002855', margin: '0 0 0.5rem 0', fontSize: '2.5rem' },
  subtext: { color: '#666', fontSize: '1.1rem' },
  timelineWrapper: { display: 'flex', flexDirection: 'column' },
  timelineItem: { display: 'flex', gap: '1.5rem' },
  
  // Controls the vertical alignment of the bubble and line
  dateColumn: { display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80px', flexShrink: 0 },
  yearBubble: { 
    backgroundColor: '#002855', color: 'white', width: '70px', height: '70px', 
    borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', 
    fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 4px 10px rgba(0,40,85,0.3)', zIndex: 2 
  },
  connectingLine: { width: '4px', backgroundColor: '#e0e0e0', flex: 1, margin: '10px 0', borderRadius: '2px' },
  
  contentColumn: { flex: 1, paddingBottom: '3rem' }, // Padding bottom creates the gap between cards
  card: { 
    backgroundColor: 'white', padding: '2rem', borderRadius: '12px', 
    boxShadow: '0 4px 15px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0',
    position: 'relative', top: '10px' // Slightly pushes the card down to align with the middle of the circle
  },
  cardTitle: { color: '#00629B', margin: '0 0 0.8rem 0', fontSize: '1.4rem' },
  cardDescription: { color: '#555', margin: 0, lineHeight: '1.6' }
};