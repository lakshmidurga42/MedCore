import React from 'react';
import { CheckCircle2, Circle, Clock, User, Bed, ClipboardList } from 'lucide-react';
import { WardTask } from '../types';
import { motion } from 'motion/react';

interface TaskManagementProps {
  tasks: WardTask[];
  onToggleTask: (id: string) => void;
  onAddTask?: () => void;
}

export const TaskManagement: React.FC<TaskManagementProps> = ({ tasks, onToggleTask, onAddTask }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Shift Tasks</h3>
          <p className="text-xs text-zinc-500">Manage your current ward assignments</p>
        </div>
        <div className="flex items-center gap-2 bg-emerald-100 dark:bg-emerald-500/20 px-3 py-1 rounded-full">
          <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">
            {tasks.filter(t => t.status === 'completed').length} / {tasks.length} Done
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            whileHover={{ scale: 1.01 }}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              task.status === 'completed' 
                ? 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-100 dark:border-zinc-800 opacity-70' 
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm'
            }`}
            onClick={() => onToggleTask(task.id)}
          >
            <div className="flex items-start gap-4">
              <div className={`mt-1 ${task.status === 'completed' ? 'text-emerald-500' : 'text-zinc-300'}`}>
                {task.status === 'completed' ? <CheckCircle2 size={20} /> : <Circle size={20} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h4 className={`text-sm font-bold ${task.status === 'completed' ? 'line-through text-zinc-400' : ''}`}>
                    {task.title}
                  </h4>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                    <Clock size={12} />
                    {task.dueTime}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <User size={12} />
                    {task.patientName}
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-zinc-500">
                    <Bed size={12} />
                    Bed {task.bedNumber}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <button 
        onClick={onAddTask}
        className="w-full py-3 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-2xl text-zinc-400 text-xs font-bold hover:border-emerald-500 hover:text-emerald-500 transition-all flex items-center justify-center gap-2"
      >
        <ClipboardList size={14} />
        Add New Shift Task
      </button>
    </div>
  );
};
