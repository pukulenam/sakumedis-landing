'use client';

import { useState, useEffect } from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose: () => void;
}

export default function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Slide in
    setTimeout(() => setIsVisible(true), 10);

    // Auto close
    const timer = setTimeout(() => {
      handleClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const configs = {
    success: {
      bg: 'bg-gradient-to-r from-green-500 to-emerald-600',
      icon: 'check_circle',
      iconBg: 'bg-white/20'
    },
    error: {
      bg: 'bg-gradient-to-r from-red-500 to-rose-600',
      icon: 'error',
      iconBg: 'bg-white/20'
    },
    warning: {
      bg: 'bg-gradient-to-r from-orange-500 to-amber-600',
      icon: 'warning',
      iconBg: 'bg-white/20'
    },
    info: {
      bg: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      icon: 'info',
      iconBg: 'bg-white/20'
    }
  };

  const config = configs[type];

  return (
    <div
      className={`fixed top-6 right-6 z-50 transition-all duration-300 transform ${
        isVisible && !isExiting 
          ? 'translate-x-0 opacity-100' 
          : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`${config.bg} text-white rounded-xl shadow-2xl p-4 pr-12 min-w-[300px] max-w-md relative`}>
        <div className="flex items-center gap-3">
          <div className={`${config.iconBg} rounded-full p-2`}>
            <span className="material-icons text-xl">{config.icon}</span>
          </div>
          <p className="font-medium text-sm leading-relaxed flex-1">{message}</p>
        </div>
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
        >
          <span className="material-icons text-lg">close</span>
        </button>
      </div>
    </div>
  );
}
