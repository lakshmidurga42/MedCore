import React from 'react';
import { LucideIcon, AlertCircle } from 'lucide-react';
import { cn } from '../utils';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  required?: number | string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isUp: boolean;
  };
  className?: string;
  onClick?: () => void;
  isActive?: boolean;
}

export const StatCard: React.FC<StatCardProps & { onIncrement?: () => void; onDecrement?: () => void }> = ({ 
  label, value, unit, required, icon: Icon, trend, className, onClick, isActive, onIncrement, onDecrement 
}) => {
  const isShortage = required && Number(value) < Number(required);

  return (
    <div 
      className={cn(
        "bg-white dark:bg-zinc-900 border p-5 rounded-[1.5rem] shadow-sm transition-all text-left w-full group relative overflow-hidden",
        isActive 
          ? "border-emerald-500 ring-1 ring-emerald-500 bg-emerald-50/10 dark:bg-emerald-500/5" 
          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/50",
        isShortage && !isActive && "border-rose-200 dark:border-rose-500/20 bg-rose-50/30 dark:bg-rose-500/5",
        className
      )}
    >
      {isShortage && (
        <div className="absolute top-0 right-0 w-16 h-16 -mr-8 -mt-8 bg-rose-500/10 rounded-full flex items-end justify-start p-3">
          <AlertCircle size={12} className="text-rose-500" />
        </div>
      )}
      <div className="flex items-start justify-between mb-4">
        <div className={cn(
          "p-2.5 rounded-xl border transition-colors",
          isActive ? "bg-emerald-500 border-emerald-400 text-white shadow-lg shadow-emerald-500/20" : 
          isShortage ? "bg-rose-100 dark:bg-rose-500/20 border-rose-200 dark:border-rose-500/30 text-rose-600 dark:text-rose-400" : "bg-zinc-50 dark:bg-zinc-800 border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 group-hover:bg-white dark:group-hover:bg-zinc-700"
        )}>
          <Icon size={20} />
        </div>
        <div className="flex flex-col items-end gap-2">
          {trend && (
            <span className={cn(
              "text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg",
              trend.isUp ? "bg-rose-50 dark:bg-rose-500/10 text-rose-600 dark:text-rose-400" : "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            )}>
              {trend.isUp ? '↑' : '↓'} {trend.value}%
            </span>
          )}
          <div className="flex items-center gap-1">
            <button 
              onClick={(e) => { e.stopPropagation(); onDecrement?.(); }}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              -
            </button>
            <button 
              onClick={(e) => { e.stopPropagation(); onIncrement?.(); }}
              className="w-6 h-6 flex items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
            >
              +
            </button>
          </div>
        </div>
      </div>
      <div onClick={onClick} className="cursor-pointer">
        <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mb-1">{label}</p>
        <div className="flex items-baseline gap-1">
          <span className={cn(
            "text-2xl font-black tracking-tight",
            isShortage ? "text-rose-600 dark:text-rose-400" : "text-zinc-900 dark:text-white"
          )}>{value}</span>
          {unit && <span className="text-xs font-bold text-zinc-400 dark:text-zinc-600">{unit}</span>}
        </div>
        {required && (
          <div className="mt-3 pt-3 border-t border-zinc-50 dark:border-zinc-800">
            <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
              Required: <span className={cn("font-black", isShortage ? "text-rose-500" : "text-zinc-600 dark:text-zinc-400")}>{required}</span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
