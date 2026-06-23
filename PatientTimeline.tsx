import React from 'react';
import { CheckCircle2, Circle, Clock, ArrowRight } from 'lucide-react';
import { PatientTimelineEvent } from '../types';
import { format } from 'date-fns';

interface PatientTimelineProps {
  events: PatientTimelineEvent[];
}

export const PatientTimeline: React.FC<PatientTimelineProps> = ({ events }) => {
  return (
    <div className="relative pl-8 space-y-8 before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-0.5 before:bg-zinc-100 dark:before:bg-zinc-800">
      {events.map((event, i) => (
        <div key={event.id} className="relative">
          <div className={`absolute -left-[29px] top-1 w-6 h-6 rounded-full border-4 border-white dark:border-zinc-950 flex items-center justify-center ${
            event.status === 'completed' ? 'bg-emerald-500 text-white' :
            event.status === 'current' ? 'bg-blue-500 text-white animate-pulse' :
            'bg-zinc-200 dark:bg-zinc-800 text-zinc-400'
          }`}>
            {event.status === 'completed' ? <CheckCircle2 size={12} /> : <Circle size={12} />}
          </div>
          
          <div className={`p-4 rounded-2xl border ${
            event.status === 'current' 
              ? 'bg-blue-50/50 dark:bg-blue-500/5 border-blue-100 dark:border-blue-500/20' 
              : 'bg-white dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800'
          }`}>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-sm font-bold">{event.stage}</h4>
              <span className="text-[10px] text-zinc-400 font-mono">
                {format(event.timestamp, 'MMM dd, HH:mm')}
              </span>
            </div>
            {event.note && (
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">{event.note}</p>
            )}
            {event.status === 'current' && (
              <div className="mt-3 flex items-center gap-2 text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                In Progress
                <ArrowRight size={10} />
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
