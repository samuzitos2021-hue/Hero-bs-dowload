import React, { useEffect } from 'react';
import { CheckCircle2, Copy } from 'lucide-react';

interface ToastProps {
  message: string;
  code?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, code, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3200);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#111622] border border-red-500/50 text-white px-4 py-3 rounded-xl shadow-2xl shadow-red-950/40 animate-in slide-in-from-bottom-5 duration-200">
      <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 border border-red-500/30">
        <CheckCircle2 className="w-5 h-5 text-red-500" />
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-semibold text-slate-200">{message}</span>
        {code && (
          <span className="text-xs font-mono text-red-400 font-bold tracking-wider">
            {code}
          </span>
        )}
      </div>
    </div>
  );
};
