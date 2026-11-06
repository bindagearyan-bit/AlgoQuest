'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';
import { Zap } from 'lucide-react';

interface XPCounterProps {
  value: number;
  showIcon?: boolean;
  className?: string;
}

export const XPCounter: React.FC<XPCounterProps> = ({
  value,
  showIcon = true,
  className = '',
}) => {
  const spring = useSpring(value, { mass: 0.8, stiffness: 75, damping: 15 });
  const display = useTransform(spring, (current) => Math.round(current));
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return display.on('change', (latest) => {
      setDisplayValue(latest);
    });
  }, [display]);

  return (
    <div className={`inline-flex items-center gap-1.5 font-pixel text-sm text-[#8B7FD9] ${className}`}>
      {showIcon && <Zap className="w-4 h-4 fill-[#8B7FD9]" />}
      <motion.span>{displayValue} XP</motion.span>
    </div>
  );
};

