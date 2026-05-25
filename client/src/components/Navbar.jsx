import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Menu, X, LayoutDashboard, LogOut, LogIn, Home, Calendar, Users, BookOpen, Mail } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const { scrollY } = useScroll();
  const navPadding = useTransform(scrollY, [0, 100], ['1.5rem 2rem', '0.8rem 2rem']);
  const navBackground = useTransform(scrollY, [0, 100], ['rgba(0,0,0,0)', 'rgba(10, 10, 20, 0.88)']);
  const navBackdropFilter = useTransform(scrollY, [0, 100], ['blur(0px)', 'blur(20px)']);
  const navBorder = useTransform(scrollY, [0, 100], ['1px solid transparent', '1px solid rgba(255,255,255,0.06)']);

  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

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
    setIsMobileMenuOpen(false);
    alert('You have been securely logged out.');
    navigate('/');
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setActiveSection(targetId);
    setIsMobileMenuOpen(false);
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
    { id: 'home',    label: 'Home',    icon: Home },
    { id: 'events',  label: 'Events',  icon: Calendar },
    { id: 'execom',  label: 'ExeCom',  icon: Users },
    { id: 'history', label: 'History', icon: BookOpen },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  /* ─── animation variants ─── */
  const backdropVariants = {
    hidden:  { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit:    { opacity: 0, transition: { duration: 0.25, delay: 0.15 } },
  };

  const panelVariants = {
    hidden:  { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 } },
    exit:    { x: '100%', opacity: 0, transition: { type: 'spring', stiffness: 400, damping: 35 } },
  };

  const itemVariants = {
    hidden:  { x: 40, opacity: 0 },
    visible: (i) => ({ x: 0, opacity: 1, transition: { delay: 0.12 + i * 0.07, type: 'spring', stiffness: 300, damping: 25 } }),
    exit:    { x: 40, opacity: 0, transition: { duration: 0.15 } },
  };

  return (
    <>
      {/* ── sticky wrapper ── */}
      <div style={{ position: 'sticky', top: 0, zIndex: 200, width: '100%' }}>
        <motion.nav style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: navPadding,
          background: navBackground,
          backdropFilter: navBackdropFilter,
          WebkitBackdropFilter: navBackdropFilter,
          borderBottom: navBorder,
          width: '100%',
          boxSizing: 'border-box',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>

            {/* ── LOGO ── */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <a href="#home" onClick={(e) => handleNavClick(e, 'home')} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                <img
                  src="/ieee-logo.png"
                  alt="IEEE Student Branch"
                  style={{ height: '40px', width: 'auto', objectFit: 'contain', filter: 'brightness(1.1)', transition: 'opacity 0.2s' }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.8'}
                  onMouseOut={e  => e.currentTarget.style.opacity = '1'}
                />
              </a>
            </motion.div>

            {/* ── DESKTOP MENU ── */}
            <ul className="desktop-only" style={{ display: 'flex', listStyle: 'none', gap: '2rem', margin: 0, alignItems: 'center' }}>
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
                      transition: 'color 0.3s',
                    }}
                  >
                    {link.label}
                  </a>
                  {activeSection === link.id && (
                    <motion.div
                      layoutId="activeIndicator"
                      style={{
                        position: 'absolute', bottom: '-5px', left: 0, right: 0,
                        height: '2px', background: 'var(--neon-purple)', borderRadius: '2px',
                        boxShadow: '0 0 8px var(--neon-purple)',
                      }}
                    />
                  )}
                </motion.li>
              ))}

              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}
                style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
                {token ? (
                  <>
                    <Link to="/dashboard" style={{ color: 'var(--neon-purple)', fontWeight: '700', textDecoration: 'none' }}>{role}</Link>
                    <button onClick={handleLogout} className="glow-hover" style={{ backgroundColor: 'rgba(255,77,77,0.1)', border: '1px solid rgba(255,77,77,0.5)', padding: '0.6rem 1.2rem', borderRadius: '8px', color: '#ff8080', fontWeight: 'bold', cursor: 'pointer', fontSize: '1rem' }}>
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/auth" className="btn-primary glow-hover" style={{ textDecoration: 'none' }}>Login</Link>
                )}
              </motion.div>
            </ul>

            {/* ── HAMBURGER BUTTON (mobile) ── */}
            <div className="mobile-only">
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                style={{
                  background: isMobileMenuOpen
                    ? 'rgba(139, 92, 246, 0.15)'
                    : 'rgba(255,255,255,0.05)',
                  border: `1px solid ${isMobileMenuOpen ? 'rgba(139,92,246,0.5)' : 'rgba(255,255,255,0.1)'}`,
                  borderRadius: '10px',
                  color: 'white',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '42px',
                  height: '42px',
                  transition: 'background 0.3s, border 0.3s',
                }}
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isMobileMenuOpen
                    ? <motion.span key="x"    initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><X size={22} /></motion.span>
                    : <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><Menu size={22} /></motion.span>
                  }
                </AnimatePresence>
              </motion.button>
            </div>

          </div>
        </motion.nav>
      </div>

      {/* ── MOBILE FULLSCREEN MENU (rendered outside sticky div so it overlays everything) ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Frosted backdrop */}
            <motion.div
              key="backdrop"
              variants={backdropVariants}
              initial="hidden" animate="visible" exit="exit"
              onClick={() => setIsMobileMenuOpen(false)}
              style={{
                position: 'fixed', inset: 0, zIndex: 190,
                background: 'rgba(5, 5, 15, 0.7)',
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            />

            {/* Sliding panel from right */}
            <motion.div
              key="panel"
              className="mobile-only"
              variants={panelVariants}
              initial="hidden" animate="visible" exit="exit"
              style={{
                position: 'fixed', top: 0, right: 0, bottom: 0,
                width: 'min(85vw, 340px)',
                zIndex: 300,
                background: 'rgba(12, 12, 22, 0.92)',
                backdropFilter: 'blur(30px)',
                WebkitBackdropFilter: 'blur(30px)',
                borderLeft: '1px solid rgba(139, 92, 246, 0.2)',
                boxShadow: '-20px 0 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
              }}
            >
              {/* Panel header */}
              <div style={{
                padding: '1.5rem 1.75rem',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <img src="/ieee-logo.png" alt="IEEE" style={{ height: '32px', opacity: 0.9 }} />
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '36px', height: '36px' }}
                >
                  <X size={18} />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav style={{ padding: '1.5rem 1rem', flex: 1, overflowY: 'auto' }}>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0.75rem 0.75rem', fontFamily: 'Inter, sans-serif' }}>
                  Navigation
                </p>
                {navLinks.map((link, i) => {
                  const Icon = link.icon;
                  const isActive = activeSection === link.id;
                  return (
                    <motion.a
                      key={link.id}
                      custom={i}
                      variants={itemVariants}
                      initial="hidden" animate="visible" exit="exit"
                      href={`#${link.id}`}
                      onClick={(e) => handleNavClick(e, link.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.9rem',
                        padding: '0.9rem 0.75rem',
                        borderRadius: '12px',
                        marginBottom: '0.25rem',
                        textDecoration: 'none',
                        color: isActive ? 'white' : 'rgba(255,255,255,0.65)',
                        fontWeight: isActive ? '600' : '500',
                        fontSize: '1.05rem',
                        fontFamily: 'Inter, sans-serif',
                        background: isActive
                          ? 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,243,255,0.08))'
                          : 'transparent',
                        border: isActive
                          ? '1px solid rgba(139,92,246,0.3)'
                          : '1px solid transparent',
                        transition: 'background 0.2s, color 0.2s, border 0.2s',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="mobileActiveBar"
                          style={{
                            position: 'absolute', left: 0, top: '20%', bottom: '20%',
                            width: '3px', borderRadius: '0 3px 3px 0',
                            background: 'linear-gradient(180deg, var(--neon-purple), var(--neon-blue))',
                            boxShadow: '0 0 8px var(--neon-purple)',
                          }}
                        />
                      )}
                      <span style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        width: '36px', height: '36px', borderRadius: '9px',
                        background: isActive ? 'rgba(139,92,246,0.25)' : 'rgba(255,255,255,0.05)',
                        border: isActive ? '1px solid rgba(139,92,246,0.4)' : '1px solid rgba(255,255,255,0.06)',
                        color: isActive ? 'var(--neon-purple)' : 'rgba(255,255,255,0.4)',
                        flexShrink: 0,
                        transition: 'all 0.2s',
                      }}>
                        <Icon size={16} />
                      </span>
                      {link.label}
                    </motion.a>
                  );
                })}
              </nav>

              {/* Auth section */}
              <div style={{
                padding: '1.25rem 1.5rem 2rem',
                borderTop: '1px solid rgba(255,255,255,0.06)',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', fontWeight: '700', letterSpacing: '0.12em', textTransform: 'uppercase', margin: '0 0 0.9rem', fontFamily: 'Inter, sans-serif' }}>
                  Account
                </p>
                {token ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <motion.div custom={6} variants={itemVariants} initial="hidden" animate="visible">
                      <Link
                        to="/dashboard"
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.9rem 1rem', borderRadius: '12px',
                          background: 'linear-gradient(135deg, rgba(139,92,246,0.2), rgba(0,243,255,0.08))',
                          border: '1px solid rgba(139,92,246,0.35)',
                          color: 'white', textDecoration: 'none',
                          fontWeight: '700', fontSize: '1rem', fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <LayoutDashboard size={18} color="var(--neon-purple)" />
                        {role} Dashboard
                      </Link>
                    </motion.div>
                    <motion.div custom={7} variants={itemVariants} initial="hidden" animate="visible">
                      <button
                        onClick={handleLogout}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '0.75rem',
                          padding: '0.9rem 1rem', borderRadius: '12px', width: '100%',
                          background: 'rgba(255,77,77,0.08)',
                          border: '1px solid rgba(255,77,77,0.3)',
                          color: '#ff8080', cursor: 'pointer',
                          fontWeight: '700', fontSize: '1rem', fontFamily: 'Inter, sans-serif',
                        }}
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  </div>
                ) : (
                  <motion.div custom={6} variants={itemVariants} initial="hidden" animate="visible">
                    <Link
                      to="/auth"
                      onClick={() => setIsMobileMenuOpen(false)}
                      style={{
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.6rem',
                        padding: '1rem', borderRadius: '12px', width: '100%',
                        background: 'linear-gradient(135deg, var(--neon-purple), #6d28d9)',
                        boxShadow: '0 4px 20px rgba(139,92,246,0.35)',
                        color: 'white', textDecoration: 'none',
                        fontWeight: '700', fontSize: '1.05rem', fontFamily: 'Inter, sans-serif',
                        boxSizing: 'border-box',
                      }}
                    >
                      <LogIn size={18} />
                      Login / Sign Up
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}