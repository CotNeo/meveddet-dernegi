'use client';

import { motion } from 'framer-motion';

interface HoverScaleProps {
  children: React.ReactNode;
  scale?: number;
  className?: string;
}

const HoverScale = ({ children, scale = 1.05, className = '' }: HoverScaleProps) => {
  return (
    <motion.div
      whileHover={{ scale }}
      whileTap={{ scale: 0.95 }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 20
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default HoverScale; 