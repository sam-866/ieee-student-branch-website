import { motion } from 'framer-motion';

export default function AnimatedCard({ children, delay = 0, className = '', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: 'easeOut' }}
      whileHover={{ 
        y: -10, 
        scale: 1.02,
        boxShadow: '0 20px 40px rgba(139, 92, 246, 0.15)',
        borderColor: 'rgba(139, 92, 246, 0.4)'
      }}
      className={className}
      style={{
        ...style,
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease'
      }}
    >
      {children}
    </motion.div>
  );
}
