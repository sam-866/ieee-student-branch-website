import ScrollReveal from '../components/ScrollReveal';
import AnimatedCard from '../components/AnimatedCard';
import MapCard from '../components/MapCard';

export default function Contact() {
  return (
    <div className="page-container" style={{ maxWidth: '1200px' }}>
      <ScrollReveal>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '3.5rem', margin: '0 0 0.5rem 0' }}>Get In Touch</h1>
          <p className="subtitle">Have questions or want to collaborate? Reach out to us.</p>
        </div>
      </ScrollReveal>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
        
        {/* Contact Information */}
        <AnimatedCard delay={0.2} className="glass-panel" style={{ padding: '3rem' }}>
          <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.8rem' }}>Contact Information</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                <span style={{ fontSize: '1.5rem' }}>📍</span>
              </div>
              <div>
                <p style={{ margin: '0 0 0.3rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Address</p>
                <p style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>College of Engineering Kidangoor<br/>Kottayam, Kerala</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(0, 243, 255, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(0, 243, 255, 0.3)' }}>
                <span style={{ fontSize: '1.5rem' }}>📧</span>
              </div>
              <div>
                <p style={{ margin: '0 0 0.3rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Email Us</p>
                <p style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>ieee@studentbranch.edu</p>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(252, 163, 17, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(252, 163, 17, 0.3)' }}>
                <span style={{ fontSize: '1.5rem' }}>📱</span>
              </div>
              <div>
                <p style={{ margin: '0 0 0.3rem 0', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Call Us</p>
                <p style={{ margin: 0, color: 'white', fontWeight: 'bold' }}>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Contact Form */}
        <AnimatedCard delay={0.4} className="glass-panel" style={{ padding: '3rem' }}>
          <h2 style={{ color: 'white', marginBottom: '2rem', fontSize: '1.8rem' }}>Send a Message</h2>
          <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <input type="text" placeholder="Your Name" className="glass-input" required />
            <input type="email" placeholder="Your Email" className="glass-input" required />
            <textarea placeholder="Your Message" className="glass-input" rows="5" required style={{ resize: 'vertical' }}></textarea>
            <button type="button" className="btn-primary" style={{ alignSelf: 'flex-start', padding: '1rem 2.5rem' }}>Send Message</button>
          </form>
        </AnimatedCard>

        {/* Interactive Map */}
        <MapCard />
      </div>
    </div>
  );
}