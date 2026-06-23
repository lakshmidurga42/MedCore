import React from 'react';
import { Shield, Clock, User, Filter, Search } from 'lucide-react';
import { AuditLogEntry } from '../types';
import { format } from 'date-fns';

interface AuditLogProps {
  logs: AuditLogEntry[];
}

export const AuditLog: React.FC<AuditLogProps> = ({ logs }) => {
  return (
    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold">System Audit Log</h3>
          <p className="text-xs text-zinc-500">Track all administrative and clinical actions</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" size={14} />
            <input 
              type="text" 
              placeholder="Filter by user or action..." 
              className="pl-9 pr-4 py-2 bg-zinc-50 dark:bg-zinc-800 border-none rounded-xl text-xs outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
          <button className="p-2 bg-zinc-50 dark:bg-zinc-800 rounded-xl text-zinc-500 hover:text-emerald-500 transition-colors">
            <Filter size={16} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-zinc-50/50 dark:bg-zinc-800/50 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Action</th>
              <th className="px-6 py-4">Details</th>
              <th className="px-6 py-4">Department</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50 dark:divide-zinc-800">
            {logs.map((log) => (
              <tr key={log.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-xs text-zinc-500">
                    <Clock size={12} />
                    {format(log.timestamp, 'MMM dd, HH:mm:ss')}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-emerald-100 dark:bg-emerald-500/20 rounded-full flex items-center justify-center text-[10px] font-bold text-emerald-600">
                      {log.userName.charAt(0)}
                    </div>
                    <span className="text-xs font-bold">{log.userName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    log.action.includes('Update') ? 'bg-blue-100 text-blue-600 dark:bg-blue-500/10' :
                    log.action.includes('Delete') ? 'bg-rose-100 text-rose-600 dark:bg-rose-500/10' :
                    'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10'
                  }`}>
                    {log.action}
                  </span>
                </td>
                <td className="px-6 py-4 text-xs text-zinc-500 dark:text-zinc-400 max-w-xs truncate">
                  {log.details}
                </td>
                <td className="px-6 py-4 text-xs text-zinc-400">
                  {log.department}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-4 bg-zinc-50 dark:bg-zinc-800/50 text-center">
        <button className="text-[10px] font-bold text-zinc-400 hover:text-emerald-600 uppercase tracking-widest">
          Load More Activity
        </button>
      </div>
    </div>
  );
};
