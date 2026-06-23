import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Bed, ArrowRight, Calendar, Phone, ClipboardList } from 'lucide-react';

interface PatientAdmissionProps {
  onAdmit: (patientData: any) => void;
  onCancel: () => void;
}

export const PatientAdmission: React.FC<PatientAdmissionProps> = ({ onAdmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    department: 'General Medicine',
    reason: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.age && formData.contact) {
      onAdmit(formData);
    } else {
      setError('Please fill in all required fields (Name, Age, Contact)');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 flex items-center justify-center p-6 transition-colors duration-500">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-emerald-600 rounded-[2rem] text-white shadow-2xl shadow-emerald-600/20 mb-6">
            <Bed size={40} />
          </div>
          <h1 className="text-3xl font-black text-zinc-900 dark:text-white tracking-tight">Patient Admission Portal</h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-2 font-medium">Authorized hospital personnel only. Please verify all details.</p>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-10 rounded-[2.5rem] shadow-2xl border border-zinc-100 dark:border-zinc-800 transition-colors duration-300">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 px-1">Patient Full Name *</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all dark:text-white text-sm"
                    placeholder="John Doe"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 px-1">Age *</label>
                <div className="relative group">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="number"
                    required
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all dark:text-white text-sm"
                    placeholder="e.g. 45"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 px-1">Gender</label>
                <select 
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer dark:text-white text-sm"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 px-1">Contact Number *</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                  <input 
                    type="tel"
                    required
                    value={formData.contact}
                    onChange={(e) => setFormData({...formData, contact: e.target.value})}
                    className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all dark:text-white text-sm"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 px-1">Department</label>
              <select 
                value={formData.department}
                onChange={(e) => setFormData({...formData, department: e.target.value})}
                className="w-full px-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all appearance-none cursor-pointer dark:text-white text-sm"
              >
                <option>General Medicine</option>
                <option>Emergency & Trauma</option>
                <option>ICU / Critical Care</option>
                <option>Maternity Wing</option>
                <option>Pediatrics</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-500 px-1">Reason for Admission</label>
              <div className="relative group">
                <ClipboardList className="absolute left-4 top-4 text-zinc-400 group-focus-within:text-emerald-500 transition-colors" size={18} />
                <textarea 
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full pl-12 pr-4 py-4 bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-2xl focus:bg-white dark:focus:bg-zinc-800 focus:border-emerald-500 outline-none transition-all min-h-[120px] dark:text-white text-sm"
                  placeholder="Briefly describe the symptoms or reason..."
                />
              </div>
            </div>

            {error && (
              <p className="text-rose-500 text-xs font-bold bg-rose-50 dark:bg-rose-500/10 p-4 rounded-xl border border-rose-100 dark:border-rose-500/20">{error}</p>
            )}

            <div className="flex gap-4">
              <button 
                type="button"
                onClick={onCancel}
                className="flex-1 py-4 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-2xl font-bold text-sm hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="flex-[2] py-4 bg-emerald-600 text-white rounded-2xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-600/20 flex items-center justify-center gap-3 group"
              >
                Confirm Admission
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        <p className="text-center text-zinc-400 dark:text-zinc-600 text-[10px] font-bold uppercase tracking-[0.3em] mt-12">
          MedCore Secure Registration • Ministry of Health
        </p>
      </motion.div>
    </div>
  );
};
