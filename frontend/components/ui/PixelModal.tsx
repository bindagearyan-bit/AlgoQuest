'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PixelButton } from './PixelButton';
import { X } from 'lucide-react';

interface PixelModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export const PixelModal: React.FC<PixelModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-lg bg-white rounded-2xl border-4 border-[#1A2744] shadow-[0_12px_0_0_#1A2744] overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#EAF4FC] border-b-2 border-[#1A2744]">
              <h3 className="font-pixel text-xs text-[#1A2744] tracking-wider uppercase">
                {title}
              </h3>
              <button
                onClick={onClose}
                className="p-1 rounded-md text-[#1A2744] hover:bg-slate-200 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

