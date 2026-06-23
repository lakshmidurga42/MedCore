import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Info, XCircle, X } from 'lucide-react';
import { cn } from '../utils';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type?: ToastType;
  isVisible: boolean;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  const icons = {
    success: <CheckCircle2 className="text-emerald-500" size={18} />,
    error: <XCircle className="text-rose-500" size={18} />,
    info: <Info className="text-blue-500" size={18} />
  };

  const bgColors = {
    success: 'bg-white border-emerald-100',
    error: 'bg-white border-rose-100',
    info: 'bg-white border-blue-100'
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className={cn(
            "fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg min-w-[300px]",
            bgColors[type]
          )}
        >
          {icons[type]}
          <p className="text-sm font-medium text-zinc-900 flex-1">{message}</p>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600 transition-colors">
            <X size={16} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
