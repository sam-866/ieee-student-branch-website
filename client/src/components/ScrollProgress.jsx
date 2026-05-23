import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '4px',
        background: 'linear-gradient(90deg, var(--neon-blue), var(--neon-purple))',
        transformOrigin: '0%',
        scaleX,
        zIndex: 1000,
        boxShadow: '0 0 15px var(--neon-blue)'
      }}
    />
  );
}
