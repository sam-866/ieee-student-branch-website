import { motion, useScroll, useAnimationControls } from 'framer-motion';
import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const { scrollY } = useScroll();
  const controls = useAnimationControls();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    return scrollY.on('change', (latest) => {
      if (latest > 500 && !isVisible) {
        setIsVisible(true);
        controls.start({ opacity: 1, scale: 1, y: 0 });
      } else if (latest <= 500 && isVisible) {
        setIsVisible(false);
        controls.start({ opacity: 0, scale: 0.5, y: 20 });
      }
    });
  }, [scrollY, isVisible, controls]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    window.history.pushState(null, '', '/');
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={controls}
      whileHover={{ scale: 1.1, boxShadow: '0 0 25px rgba(139, 92, 246, 0.6)' }}
      whileTap={{ scale: 0.9 }}
      onClick={scrollToTop}
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, var(--neon-purple), #6d28d9)',
        color: 'white',
        border: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        zIndex: 99,
        boxShadow: '0 4px 15px rgba(139, 92, 246, 0.4)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <ArrowUp size={24} />
    </motion.button>
  );
}
