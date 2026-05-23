import { motion } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0, width = '100%', style = {} }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{ width, ...style }}
    >
      {children}
    </motion.div>
  );
}
