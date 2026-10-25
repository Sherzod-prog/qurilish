import React from 'react';
import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  toastMessage: string | null;
}

export default function Toast({ toastMessage }: ToastProps) {
  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-xl shadow-2xl border border-emerald-500/40 flex items-center gap-3 animate-bounce">
      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
      <span className="text-sm font-medium">{toastMessage}</span>
    </div>
  );
}

