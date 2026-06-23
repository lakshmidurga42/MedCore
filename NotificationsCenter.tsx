import React from 'react';
import { Bell, AlertTriangle, Info, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Notification } from '../types';
import { format } from 'date-fns';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationsCenterProps {
  notifications: Notification[];
  onMarkRead: (id: string) => void;
  onClose: () => void;
}

export const NotificationsCenter: React.FC<NotificationsCenterProps> = ({ notifications, onMarkRead, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      className="absolute top-16 right-4 w-96 bg-white dark:bg-zinc-900 rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-50 overflow-hidden"
    >
      <div className="p-4 border-b border-zinc-100 dark:border-zinc-800 flex items-center justify-between bg-zinc-50 dark:bg-zinc-800/50">
        <div className="flex items-center gap-2">
          <Bell size={18} className="text-emerald-600" />
          <h3 className="font-bold text-sm">Alerts & Notifications</h3>
        </div>
        <span className="text-[10px] font-bold bg-rose-500 text-white px-2 py-0.5 rounded-full">
          {notifications.filter(n => !n.read).length} New
        </span>
      </div>

      <div className="max-h-[400px] overflow-y-auto">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => onMarkRead(n.id)}
              className={`p-4 border-b border-zinc-50 dark:border-zinc-800/50 cursor-pointer transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${!n.read ? 'bg-emerald-50/30 dark:bg-emerald-500/5' : ''}`}
            >
              <div className="flex gap-3">
                <div className={`mt-1 shrink-0 ${
                  n.severity === 'critical' ? 'text-rose-500' :
                  n.severity === 'warning' ? 'text-amber-500' :
                  'text-blue-500'
                }`}>
                  {n.severity === 'critical' ? <AlertCircle size={18} /> :
                   n.severity === 'warning' ? <AlertTriangle size={18} /> :
                   <Info size={18} />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{n.title}</span>
                    <span className="text-[10px] text-zinc-400">{format(n.timestamp, 'HH:mm')}</span>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{n.message}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                      {n.category}
                    </span>
                    {!n.read && (
                      <span className="flex items-center gap-1 text-[9px] font-bold text-emerald-600">
                        <CheckCircle2 size={10} />
                        New Alert
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-10 text-center">
            <Bell size={40} className="mx-auto text-zinc-200 dark:text-zinc-800 mb-4" />
            <p className="text-sm text-zinc-400">No new notifications</p>
          </div>
        )}
      </div>

      <div className="p-3 bg-zinc-50 dark:bg-zinc-800/50 border-t border-zinc-100 dark:border-zinc-800 text-center">
        <button className="text-[10px] font-bold text-emerald-600 hover:text-emerald-700 uppercase tracking-widest">
          View All Activity Logs
        </button>
      </div>
    </motion.div>
  );
};
