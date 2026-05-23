import { useState } from 'react';
import { motion } from 'framer-motion';

const MAPS_LINK = 'https://maps.app.goo.gl/8TbzXH217pZkZk3bA';

// Embed URL for College of Engineering Kidangoor, Kottayam
const EMBED_URL =
  'https://maps.google.com/maps?q=College+of+Engineering+Kidangoor+Kottayam&t=&z=15&ie=UTF8&iwloc=&output=embed';

export default function MapCard() {
  const [hovered, setHovered] = useState(false);
  const [ripples, setRipples] = useState([]);

  // --- Ripple on button click ---
  const handleButtonClick = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const id = Date.now();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipples((prev) => [...prev, { id, x, y }]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 700);
    window.open(MAPS_LINK, '_blank', 'noopener noreferrer');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{ gridColumn: '1 / -1' }}
    >
      {/* Animated gradient blob behind the card */}
      <div style={{ position: 'relative' }}>
        <div style={{
          position: 'absolute', inset: '-40px',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(139,92,246,0.18) 0%, rgba(0,243,255,0.08) 60%, transparent 100%)',
          filter: 'blur(40px)',
          zIndex: 0,
          pointerEvents: 'none',
          animation: 'mapBlobPulse 5s ease-in-out infinite alternate'
        }} />

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            position: 'relative',
            zIndex: 1,
            borderRadius: '20px',
            transition: 'box-shadow 0.4s ease, border-color 0.4s ease',
            border: hovered
              ? '1px solid rgba(139,92,246,0.6)'
              : '1px solid rgba(255,255,255,0.08)',
            boxShadow: hovered
              ? '0 0 40px rgba(139,92,246,0.35), 0 20px 60px rgba(0,0,0,0.6)'
              : '0 4px 30px rgba(0,0,0,0.5)',
            background: 'rgba(20,20,35,0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            overflow: 'hidden',
          }}
        >
          <div style={{ padding: '2.5rem 2.5rem 0', position: 'relative', zIndex: 1 }}>
            {/* Section heading */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              {/* Floating animated pin */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                style={{
                  width: '48px', height: '48px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, var(--neon-purple), #6d28d9)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.5rem',
                  boxShadow: '0 0 20px rgba(139,92,246,0.6), 0 8px 20px rgba(0,0,0,0.4)',
                }}
              >
                📍
              </motion.div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.8rem', color: 'white' }}>Find Us</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                  Visit our campus — we'd love to meet you in person.
                </p>
              </div>
            </div>
          </div>

          {/* Map iframe */}
          <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
            <div style={{
              position: 'relative',
              height: '340px',
              background: 'rgba(0,0,0,0.3)',
              margin: '0 2.5rem',
              borderRadius: '12px',
              overflow: 'hidden',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              <div style={{
                position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
                background: 'linear-gradient(180deg, transparent 60%, rgba(20,20,35,0.7) 100%)',
              }} />
              <iframe
                title="IEEE Student Branch Location"
                src={EMBED_URL}
                width="100%"
                height="100%"
                style={{ border: 0, display: 'block', filter: 'invert(90%) hue-rotate(180deg) saturate(0.7) brightness(0.85)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Footer strip with button */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap',
            gap: '1rem', padding: '1.8rem 2.5rem', position: 'relative', zIndex: 1,
          }}>
            <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              📌 <strong style={{ color: 'white' }}>College of Engineering Kidangoor</strong>, Kottayam, Kerala
            </p>

            {/* Premium "Open in Google Maps" button with ripple */}
            <motion.button
              whileHover={{ scale: 1.06, boxShadow: '0 0 30px rgba(139,92,246,0.7), 0 0 60px rgba(0,243,255,0.2)' }}
              whileTap={{ scale: 0.96 }}
              onClick={handleButtonClick}
              style={{
                position: 'relative', overflow: 'hidden',
                background: 'linear-gradient(135deg, var(--neon-purple), #4f46e5)',
                color: 'white', border: 'none', borderRadius: '10px',
                padding: '0.75rem 1.6rem',
                fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '0.95rem',
                cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem',
                boxShadow: '0 4px 20px rgba(139,92,246,0.4)',
                transition: 'box-shadow 0.3s ease',
                flexShrink: 0,
              }}
            >
              {ripples.map((r) => (
                <span
                  key={r.id}
                  style={{
                    position: 'absolute',
                    left: r.x, top: r.y,
                    width: '8px', height: '8px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.5)',
                    transform: 'translate(-50%,-50%) scale(0)',
                    animation: 'rippleEffect 0.7s ease-out forwards',
                    pointerEvents: 'none',
                  }}
                />
              ))}
              <span style={{ fontSize: '1.1rem' }}>🗺️</span>
              Open in Google Maps
              <motion.span
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
