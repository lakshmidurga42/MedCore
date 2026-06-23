import React from 'react';
import { NearbyHospital } from '../types';
import { Hospital, MapPin, Activity, Wind, Bed } from 'lucide-react';

interface NearbyHospitalsProps {
  hospitals: NearbyHospital[];
}

export const NearbyHospitals: React.FC<NearbyHospitalsProps> = ({ hospitals }) => {
  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold">Inter-Hospital Resource Sharing</h3>
          <p className="text-xs text-zinc-500">Nearby facilities with available resources</p>
        </div>
        <div className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold uppercase rounded-full">
          Smart Suggestion Active
        </div>
      </div>

      <div className="space-y-4">
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="p-4 border border-zinc-100 rounded-xl hover:bg-zinc-50 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-zinc-100 rounded-lg text-zinc-600">
                  <Hospital size={16} />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{hospital.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400">
                    <MapPin size={10} />
                    <span>{hospital.distance} km away</span>
                  </div>
                </div>
              </div>
              <button className="text-[10px] font-bold text-emerald-600 hover:underline">
                Request Transfer
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="bg-zinc-100/50 p-2 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 text-rose-600 mb-0.5">
                  <Activity size={12} />
                  <span className="text-xs font-bold">{hospital.icuAvailable}</span>
                </div>
                <p className="text-[8px] uppercase font-bold text-zinc-400">ICU Beds</p>
              </div>
              <div className="bg-zinc-100/50 p-2 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 text-blue-600 mb-0.5">
                  <Wind size={12} />
                  <span className="text-xs font-bold">{hospital.oxygenAvailable}</span>
                </div>
                <p className="text-[8px] uppercase font-bold text-zinc-400">Oxygen</p>
              </div>
              <div className="bg-zinc-100/50 p-2 rounded-lg text-center">
                <div className="flex items-center justify-center gap-1 text-emerald-600 mb-0.5">
                  <Bed size={12} />
                  <span className="text-xs font-bold">{hospital.bedsAvailable}</span>
                </div>
                <p className="text-[8px] uppercase font-bold text-zinc-400">Gen Beds</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
