import React from 'react';
import { MapPin, Navigation, Bed, Wind, Clock, ArrowRight } from 'lucide-react';
import { TransferRecommendation } from '../types';
import { motion } from 'motion/react';

interface TransferRecommendationsProps {
  recommendations: TransferRecommendation[];
  onInitiateTransfer: (hospitalId: string) => void;
}

export const TransferRecommendations: React.FC<TransferRecommendationsProps> = ({ recommendations, onInitiateTransfer }) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Transfer Recommendations</h3>
          <p className="text-xs text-zinc-500">Nearby facilities with available capacity</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recommendations.map((rec) => (
          <motion.div
            key={rec.id}
            whileHover={{ y: -4 }}
            className="bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-600">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{rec.hospitalName}</h4>
                  <p className="text-[10px] text-zinc-400 flex items-center gap-1">
                    <Navigation size={10} />
                    {rec.distance} away
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-emerald-600 font-bold text-xs">
                  <Clock size={12} />
                  {rec.eta}
                </div>
                <p className="text-[9px] text-zinc-400 uppercase tracking-tighter">Ambulance ETA</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-6">
              <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded-xl text-center">
                <Bed size={14} className="mx-auto mb-1 text-zinc-400" />
                <p className="text-[10px] font-bold">{rec.availableBeds}</p>
                <p className="text-[8px] text-zinc-500 uppercase">Beds</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded-xl text-center">
                <Navigation size={14} className="mx-auto mb-1 text-zinc-400" />
                <p className="text-[10px] font-bold">{rec.availableICUs}</p>
                <p className="text-[8px] text-zinc-500 uppercase">ICUs</p>
              </div>
              <div className="bg-zinc-50 dark:bg-zinc-800 p-2 rounded-xl text-center">
                <Wind size={14} className="mx-auto mb-1 text-zinc-400" />
                <p className="text-[10px] font-bold">{rec.oxygenLevel}</p>
                <p className="text-[8px] text-zinc-500 uppercase">Oxygen</p>
              </div>
            </div>

            <button
              onClick={() => onInitiateTransfer(rec.id)}
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              Initiate Transfer
              <ArrowRight size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
