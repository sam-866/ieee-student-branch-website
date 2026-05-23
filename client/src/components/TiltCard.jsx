import { useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

/**
 * TiltCard — wraps any content in a 3D tilt effect on hover.
 * Combines the scroll-reveal entrance from AnimatedCard with
 * a per-card mouse-tracking tilt.
 */
export default function TiltCard({ children, delay = 0, className = '', style = {} }) {
  const cardRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    rotateX.set(-y * 12);
    rotateY.set(x * 12);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setHovered(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      style={{ perspective: 800 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={className}
        style={{
          ...style,
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          transition: 'box-shadow 0.3s ease, border-color 0.3s ease',
          boxShadow: hovered
            ? '0 20px 40px rgba(139, 92, 246, 0.25), 0 0 0 1px rgba(139, 92, 246, 0.4)'
            : '0 4px 30px rgba(0, 0, 0, 0.5)',
          borderColor: hovered ? 'rgba(139, 92, 246, 0.4)' : undefined,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
