import React from 'react';
import { AIInsight } from '../types';
import { Sparkles, CheckCircle2, Package, Info } from 'lucide-react';
import { motion } from 'motion/react';

interface AIInsightsPanelProps {
  insight: AIInsight | null;
  loading: boolean;
}

export const AIInsightsPanel: React.FC<AIInsightsPanelProps> = ({ insight, loading }) => {
  if (loading) {
    return (
      <div className="bg-zinc-900 text-white rounded-2xl p-6 h-full flex flex-col items-center justify-center gap-4 border border-zinc-800">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-emerald-500 rounded-full animate-spin" />
        <p className="text-zinc-400 text-sm font-medium">Gemini is analyzing facility data...</p>
      </div>
    );
  }

  if (!insight) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900 text-white rounded-2xl p-6 border border-zinc-800 shadow-2xl overflow-hidden relative"
    >
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <Sparkles size={120} />
      </div>

      <div className="flex items-center gap-2 mb-6">
        <div className="p-2 bg-emerald-500/20 rounded-lg">
          <Sparkles size={20} className="text-emerald-400" />
        </div>
        <h3 className="text-lg font-bold tracking-tight">Facility Intelligence</h3>
      </div>

      <div className="space-y-6 relative z-10">
        <section>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-2">Facility Summary</h4>
          <p className="text-zinc-300 leading-relaxed text-sm">{insight.summary}</p>
        </section>

        <section>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Key Recommendations</h4>
          <ul className="space-y-2">
            {insight.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Resource Allocation Priority</h4>
          <div className="grid grid-cols-1 gap-3">
            {insight.resourceAllocation.map((res, i) => (
              <div key={i} className="bg-zinc-800/50 border border-zinc-700/50 p-3 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-zinc-800 rounded-lg">
                  <Package size={16} className="text-zinc-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-semibold text-sm">{res.item}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                      res.priority === 'High' ? 'bg-rose-500/20 text-rose-400' :
                      res.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                      'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {res.priority}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500 leading-tight">{res.reason}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Government Facility Procurement</h4>
          <div className="space-y-3">
            {insight.facilityPredictions.map((fac, i) => (
              <div key={i} className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Info size={14} className={
                      fac.urgency === 'Critical' ? 'text-rose-400' :
                      fac.urgency === 'High' ? 'text-amber-400' :
                      'text-emerald-400'
                    } />
                    <span className="text-sm font-bold text-zinc-100">{fac.facilityType}</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-1.5 py-0.5 rounded">
                    {fac.quantityNeeded}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="text-[11px] text-zinc-400">
                    <span className="text-zinc-500 font-bold uppercase tracking-tighter mr-1">Request:</span>
                    {fac.governmentRequest}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    <span className="text-zinc-500 font-bold uppercase tracking-tighter mr-1">Impact:</span>
                    {fac.impact}
                  </div>
                  <button 
                    onClick={() => {
                      // This would ideally be passed as a prop from App.tsx
                      // For now, we'll assume a global event or just a mock action
                      window.dispatchEvent(new CustomEvent('procurement-request', { detail: fac }));
                    }}
                    className="w-full mt-2 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-zinc-700 transition-colors"
                  >
                    Submit Procurement Request
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </motion.div>
  );
};
