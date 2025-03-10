'use client';

import { motion } from 'framer-motion';

interface FadeInProps {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
  duration?: number;
}

const FadeIn = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  duration = 0.5
}: FadeInProps) => {
  const directions = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        ...directions[direction]
      }}
      animate={{
        opacity: 1,
        y: 0,
        x: 0
      }}
      transition={{
        duration: duration,
        delay: delay,
        ease: 'easeOut'
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default FadeIn; 