import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ScrollReveal from '../components/ScrollReveal';
import AnimatedCard from '../components/AnimatedCard';

export default function Home() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden', minHeight: '100vh' }}>
      
      {/* Animated Background Orbs */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      <div style={{ position: 'absolute', top: '40%', right: '-5%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(0, 243, 255, 0.1) 0%, rgba(0,0,0,0) 70%)', filter: 'blur(60px)', zIndex: 0 }} />
      
      {/* 1. HERO SECTION */}
      <section style={{ padding: '8rem 2rem', textAlign: 'center', position: 'relative', zIndex: 1, minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.h1 
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-gradient" 
            style={{ fontSize: '5.5rem', margin: '0 0 1.5rem 0', textShadow: '0 4px 15px rgba(0,0,0,0.5)', lineHeight: 1.1 }}
          >
            Empowering Innovators of Tomorrow
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="subtitle" 
            style={{ fontSize: '1.4rem', marginBottom: '3rem', maxWidth: '800px', margin: '0 auto 3rem auto', lineHeight: 1.6 }}
          >
            Welcome to the official IEEE Student Branch website. Join a global community of engineers, scientists, and technology professionals dedicated to advancing technology for humanity.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
          >
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="https://www.ieee.org/membership/join" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-futuristic-primary" 
              style={{ textDecoration: 'none' }}
            >
              Join IEEE Now
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="#events" 
              className="btn-futuristic-glass" 
              style={{ textDecoration: 'none' }}
            >
              Discover Events
            </motion.a>
            <motion.a 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              href="#execom" 
              className="btn-futuristic-glass" 
              style={{ textDecoration: 'none' }}
            >
              Meet the Team
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section style={{ padding: '5rem 2rem', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <div className="glass-panel" style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center', padding: '4rem 3rem' }}>
            <h2 style={{ fontSize: '2.5rem', margin: '0 0 0.5rem 0' }}>About Our Branch</h2>
            <div style={{ width: '80px', height: '4px', background: 'var(--neon-purple)', margin: '0 auto 2.5rem auto', borderRadius: '2px', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}></div>
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              Established with a vision to foster technological innovation and excellence, our IEEE Student Branch serves as a dynamic hub for passionate students. We organize hands-on workshops, 48-hour hackathons, expert seminars, and networking events to bridge the gap between academic learning and real-world industry demands.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. SOCIETIES QUICK-LINKS */}
      <section style={{ padding: '5rem 2rem', maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <ScrollReveal>
          <h2 style={{ fontSize: '2.5rem', textAlign: 'center', margin: '0 0 0.5rem 0' }}>Explore Our Societies</h2>
          <div style={{ width: '80px', height: '4px', background: 'var(--neon-purple)', margin: '0 auto 4rem auto', borderRadius: '2px', boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)' }}></div>
        </ScrollReveal>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2.5rem' }}>
          {/* Computer Society Card */}
          <AnimatedCard delay={0.1} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid #00f3ff' }}>
            <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Computer Society</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '2rem' }}>Empowering the computing professionals of tomorrow through coding bootcamps and algorithmic hackathons.</p>
            <Link to="/society/computer" className="text-neon-purple" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Learn More →</Link>
          </AnimatedCard>

          {/* WIE Card */}
          <AnimatedCard delay={0.2} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid #fca311' }}>
            <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Women in Engineering</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '2rem' }}>Inspiring and empowering women in STEM fields to achieve their academic and professional goals.</p>
            <Link to="/society/wie" className="text-neon-purple" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Learn More →</Link>
          </AnimatedCard>

          {/* RAS Card */}
          <AnimatedCard delay={0.3} className="glass-panel" style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', borderTop: '4px solid #ef476f' }}>
            <h3 style={{ fontSize: '1.8rem', margin: '0 0 1rem 0' }}>Robotics & Automation</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '2rem' }}>Building the machines of the future with hands-on hardware projects and robotics competitions.</p>
            <Link to="/society/ras" className="text-neon-purple" style={{ textDecoration: 'none', fontWeight: 'bold' }}>Learn More →</Link>
          </AnimatedCard>
        </div>
      </section>

    </div>
  );
}