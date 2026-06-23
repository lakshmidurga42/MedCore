import React from 'react';
import { motion } from 'motion/react';
import { X, Info, Shield, Zap, Database, Cpu, Activity, Users } from 'lucide-react';

interface AppInfoProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AppInfo: React.FC<AppInfoProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-zinc-900/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 border-b border-zinc-100 flex items-center justify-between bg-zinc-50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <Info size={20} />
            </div>
            <div>
              <h2 className="text-xl font-bold">MedCore Intelligence</h2>
              <p className="text-xs text-zinc-500 font-medium uppercase tracking-wider">System Information & Version 2.4.0</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-zinc-200 rounded-xl transition-colors text-zinc-400"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-emerald-50 text-emerald-600 rounded-lg">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Facility Intelligence</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Advanced tracking of bed occupancy rates, ICU availability, and critical care capacity across all hospital wings.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-lg">
                  <Cpu size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">AI-Driven Predictions</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Utilizes Gemini 3 Flash models to forecast resource demand and provide procurement recommendations based on real-time trends.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-rose-50 text-rose-600 rounded-lg">
                  <Activity size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Emergency Response</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Instant resource allocation protocols for trauma and emergency departments during high-strain periods.</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-amber-50 text-amber-600 rounded-lg">
                  <Database size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Centralized Inventory</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Unified tracking for oxygen cylinders, vaccine doses, and diagnostic kits with automated low-stock alerts.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-purple-50 text-purple-600 rounded-lg">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Staff Optimization</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Monitoring of nursing and medical staff availability to ensure optimal patient-to-provider ratios.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 p-2 bg-indigo-50 text-indigo-600 rounded-lg">
                  <Zap size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">Instant Admissions</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">Streamlined patient intake workflow that immediately updates global facility availability metrics.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-zinc-50 rounded-2xl p-6 border border-zinc-100">
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">System Capabilities & Metrics</h4>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="p-3 bg-white rounded-xl border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Data Refresh Rate</p>
                <p className="text-sm font-bold text-emerald-600">Real-time ( &lt; 2s )</p>
              </div>
              <div className="p-3 bg-white rounded-xl border border-zinc-100">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">AI Model</p>
                <p className="text-sm font-bold text-blue-600">Gemini 3 Flash</p>
              </div>
            </div>
            <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4">Operational Guidelines</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-xs text-zinc-600">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Always verify patient contact details before confirming admission.
              </li>
              <li className="flex items-center gap-3 text-xs text-zinc-600">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Restock inventory when levels fall below 20% of capacity.
              </li>
              <li className="flex items-center gap-3 text-xs text-zinc-600">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                Run AI predictions daily to ensure optimal procurement planning.
              </li>
            </ul>
          </div>
        </div>

        <div className="p-6 bg-zinc-50 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-[10px] text-zinc-400 font-medium">© 2026 Hospital Management Solutions. All rights reserved.</p>
          <button 
            onClick={onClose}
            className="px-6 py-2 bg-zinc-900 text-white rounded-xl text-xs font-bold hover:bg-zinc-800 transition-colors"
          >
            Got it
          </button>
        </div>
      </motion.div>
    </div>
  );
};
