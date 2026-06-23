import React from 'react';
import { Doctor } from '../types';
import { Stethoscope, Phone, Award, Clock, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../utils';

interface DoctorsListProps {
  doctors: Doctor[];
}

export const DoctorsList: React.FC<DoctorsListProps> = ({ doctors }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Medical Staff Directory</h2>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">View and manage hospital doctor availability and details.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <motion.div
            key={doctor.id}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-sm overflow-hidden group"
          >
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img 
                    src={doctor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.name)}&background=random`} 
                    alt={doctor.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-zinc-100 dark:border-zinc-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className={cn(
                    "absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white dark:border-zinc-900",
                    doctor.availability === 'Available' ? "bg-emerald-500" :
                    doctor.availability === 'On Call' ? "bg-blue-500" :
                    doctor.availability === 'In Surgery' ? "bg-rose-500" : "bg-zinc-400"
                  )} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 transition-colors">{doctor.name}</h3>
                  <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider mt-0.5">{doctor.specialty}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                    <MapPin size={10} />
                    {doctor.department}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                    <Award size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Experience</span>
                  </div>
                  <span className="text-xs font-black text-zinc-900 dark:text-white">{doctor.experience}</span>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                    <Clock size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Status</span>
                  </div>
                  <span className={cn(
                    "text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full",
                    doctor.availability === 'Available' ? "bg-emerald-100 text-emerald-600" :
                    doctor.availability === 'On Call' ? "bg-blue-100 text-blue-600" :
                    doctor.availability === 'In Surgery' ? "bg-rose-100 text-rose-600" : "bg-zinc-100 text-zinc-600"
                  )}>
                    {doctor.availability}
                  </span>
                </div>

                <div className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-xl">
                  <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
                    <Phone size={14} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Contact</span>
                  </div>
                  <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">{doctor.contact}</span>
                </div>
              </div>

              <button className="w-full mt-6 py-3 bg-zinc-900 dark:bg-white dark:text-zinc-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2">
                <Stethoscope size={16} />
                Assign to Patient
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
