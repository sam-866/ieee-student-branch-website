import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const { scrollY } = useScroll();
  const navPadding = useTransform(scrollY, [0, 100], ['1.5rem 2rem', '0.8rem 2rem']);
  const navBackground = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0)', 'rgba(20, 20, 35, 0.85)']);
  const navBackdropFilter = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(16px)']);
  const navBorder = useTransform(scrollY, [0, 100], ['1px solid transparent', '1px solid rgba(255,255,255,0.05)']);

  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'events', 'execom', 'history', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top >= -150 && rect.top <= 300) {
            setActiveSection(section);
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    alert('You have been securely logged out.');
    navigate('/');
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);
    if (location.pathname !== '/') {
      navigate('/#' + targetId);
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        window.history.pushState(null, '', '#' + targetId);
      } else if (targetId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        window.history.pushState(null, '', '/');
      }
    }
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'events', label: 'Events' },
    { id: 'execom', label: 'ExeCom' },
    { id: 'history', label: 'History' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
      <motion.nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        padding: navPadding,
        background: navBackground,
        backdropFilter: navBackdropFilter,
        borderBottom: navBorder,
        width: '100%'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            style={{ fontSize: '1.5rem', fontWeight: 'bold' }}
          >
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className="text-gradient" style={{ textDecoration: 'none' }}>
              IEEE Student Branch
            </a>
          </motion.div>

          <ul style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0, alignItems: 'center' }}>
            {navLinks.map((link, index) => (
              <motion.li 
                key={link.id}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                style={{ position: 'relative' }}
              >
                <a 
                  href={`#${link.id}`} 
                  onClick={(e) => handleNavClick(e, link.id)} 
                  style={{
                    color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)', 
                    textDecoration: 'none', 
                    fontSize: '1rem', 
                    fontWeight: activeSection === link.id ? '600' : '500', 
                    transition: 'color 0.3s'
                  }}
                >
                  {link.label}
                </a>
                {activeSection === link.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    style={{
                      position: 'absolute',
                      bottom: '-5px',
                      left: 0,
                      right: 0,
                      height: '2px',
                      background: 'var(--neon-purple)',
                      borderRadius: '2px',
                      boxShadow: '0 0 8px var(--neon-purple)'
                    }}
                  />
                )}
              </motion.li>
            ))}
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}
            >
              {token ? (
                <>
                  <Link to="/dashboard" style={{ color: 'var(--neon-purple)', fontWeight: '700', textDecoration: 'none' }}>
                    {role} Dashboard
                  </Link>
                  <button onClick={handleLogout} className="glow-hover" style={{ backgroundColor: 'rgba(255, 77, 77, 0.1)', border: '1px solid rgba(255, 77, 77, 0.5)', padding: '0.6rem 1.2rem', borderRadius: '8px', color: '#ff8080', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/auth" className="btn-primary glow-hover" style={{ textDecoration: 'none' }}>
                  Login
                </Link>
              )}
            </motion.div>
          </ul>
        </div>
      </motion.nav>
    </div>
  );
}