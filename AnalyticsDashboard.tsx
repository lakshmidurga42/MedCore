import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { TrendingUp, Users, Activity, Wind } from 'lucide-react';

const ADMISSION_DATA = [
  { day: 'Mon', count: 45, predicted: 48 },
  { day: 'Tue', count: 52, predicted: 50 },
  { day: 'Wed', count: 48, predicted: 55 },
  { day: 'Thu', count: 61, predicted: 58 },
  { day: 'Fri', count: 55, predicted: 62 },
  { day: 'Sat', count: 68, predicted: 65 },
  { day: 'Sun', count: 72, predicted: 70 },
];

const RESOURCE_USAGE = [
  { name: 'ICU', value: 88, color: '#10b981' },
  { name: 'Oxygen', value: 65, color: '#3b82f6' },
  { name: 'Staff', value: 92, color: '#f59e0b' },
  { name: 'Ventilators', value: 45, color: '#8b5cf6' },
];

export const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admission Trends */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold">Admission Trends</h3>
              <p className="text-[10px] text-zinc-500">Daily patient inflow vs AI prediction</p>
            </div>
            <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
              <TrendingUp size={14} />
              +12% vs last week
            </div>
          </div>
          
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMISSION_DATA}>
                <defs>
                  <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94a3b8'}}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94a3b8'}}
                />
                <Tooltip 
                  contentStyle={{ 
                    borderRadius: '12px', 
                    border: 'none', 
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    fontSize: '12px'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorCount)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="predicted" 
                  stroke="#94a3b8" 
                  strokeDasharray="5 5"
                  strokeWidth={1}
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Resource Utilization */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold">Resource Utilization</h3>
              <p className="text-[10px] text-zinc-500">Current capacity usage percentage</p>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RESOURCE_USAGE} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#f1f5f9" />
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fontSize: 10, fill: '#94a3b8'}}
                  width={70}
                />
                <Tooltip 
                  cursor={{fill: 'transparent'}}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={20}>
                  {RESOURCE_USAGE.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Avg Wait Time', value: '14 min', icon: Activity, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Staff Ratio', value: '1:4', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Oxygen Flow', value: '98%', icon: Wind, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Bed Turnaround', value: '45m', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
        ].map((stat, i) => (
          <div key={i} className="bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 flex items-center gap-3">
            <div className={`w-8 h-8 ${stat.bg} dark:bg-zinc-800 rounded-lg flex items-center justify-center ${stat.color}`}>
              <stat.icon size={16} />
            </div>
            <div>
              <p className="text-[10px] text-zinc-500 uppercase font-bold tracking-tighter">{stat.label}</p>
              <p className="text-sm font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
