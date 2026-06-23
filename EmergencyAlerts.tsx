import React from 'react';
import { AlertCircle, Bell, ArrowRight } from 'lucide-react';
import { HospitalFacilities } from '../types';

interface EmergencyAlertsProps {
  facilities: HospitalFacilities;
}

export const EmergencyAlerts: React.FC<EmergencyAlertsProps> = ({ facilities }) => {
  const alerts = [];

  if (facilities.beds.available < facilities.beds.total * 0.1) {
    alerts.push({
      type: 'Critical',
      message: 'General Bed capacity below 10%. Immediate action required.',
      item: 'Beds'
    });
  }

  if (facilities.icus.available < 5) {
    alerts.push({
      type: 'High',
      message: 'ICU availability is critically low. Divert emergency cases.',
      item: 'ICU'
    });
  }

  if (facilities.oxygen.available < facilities.oxygen.required * 0.5) {
    alerts.push({
      type: 'Critical',
      message: 'Oxygen supply below 50% of required demand. Refill requested.',
      item: 'Oxygen'
    });
  }

  if (facilities.nurses.available < facilities.nurses.required) {
    alerts.push({
      type: 'Moderate',
      message: 'Nursing staff shortage detected for current patient load.',
      item: 'Staff'
    });
  }

  if (alerts.length === 0) return null;

  return (
    <div className="bg-white border border-zinc-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Bell className="text-rose-500" size={20} />
          <h3 className="text-lg font-bold">Emergency Alerts</h3>
        </div>
        <span className="bg-rose-100 text-rose-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
          {alerts.length} Active
        </span>
      </div>

      <div className="space-y-3">
        {alerts.map((alert, i) => (
          <div 
            key={i} 
            className={`p-3 rounded-xl border flex items-start gap-3 ${
              alert.type === 'Critical' 
                ? 'bg-rose-50 border-rose-100' 
                : alert.type === 'High'
                ? 'bg-orange-50 border-orange-100'
                : 'bg-amber-50 border-amber-100'
            }`}
          >
            <AlertCircle size={16} className={alert.type === 'Critical' ? 'text-rose-600' : 'text-orange-600'} />
            <div className="flex-1">
              <div className="flex items-center justify-between mb-1">
                <span className={`text-[10px] font-bold uppercase ${
                  alert.type === 'Critical' ? 'text-rose-600' : 'text-orange-600'
                }`}>
                  {alert.type} Shortage: {alert.item}
                </span>
              </div>
              <p className="text-xs text-zinc-700 leading-tight">{alert.message}</p>
              <button className="mt-2 text-[10px] font-bold flex items-center gap-1 hover:underline">
                View Protocol <ArrowRight size={10} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
