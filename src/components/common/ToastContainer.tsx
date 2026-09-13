import React from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col space-y-2 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => {
        let bgColor = 'bg-[#2D4628] text-white border-[#EEDCC6]/30';
        let Icon = CheckCircle2;
        let iconColor = 'text-[#FDE68A]';

        if (toast.type === 'success') {
          bgColor = 'bg-[#2D4628] text-white border-[#EEDCC6]/30';
          Icon = CheckCircle2;
          iconColor = 'text-[#FDE68A]';
        } else if (toast.type === 'warning') {
          bgColor = 'bg-[#D97706] text-white border-[#EEDCC6]/30';
          Icon = AlertCircle;
          iconColor = 'text-amber-100';
        } else if (toast.type === 'error') {
          bgColor = 'bg-rose-900 text-white border-rose-700';
          Icon = XCircle;
          iconColor = 'text-rose-200';
        } else if (toast.type === 'info') {
          bgColor = 'bg-[#2D4628] text-white border-[#EEDCC6]/30';
          Icon = Info;
          iconColor = 'text-[#FDE68A]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-2xl shadow-xl border ${bgColor} text-xs sm:text-sm font-medium animate-in slide-in-from-bottom-5 duration-200 backdrop-blur-md`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 shrink-0 ${iconColor}`} />
              <span className="leading-snug">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-white/70 hover:text-white p-1 rounded-md transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
