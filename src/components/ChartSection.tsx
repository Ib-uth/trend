import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Sparkles, Settings } from 'lucide-react';

const trendData = [
  { name: '00:00', velocity: 40 },
  { name: '02:00', velocity: 30 },
  { name: '04:00', velocity: 20 },
  { name: '06:00', velocity: 27 },
  { name: '08:00', velocity: 18 },
  { name: '10:00', velocity: 23 },
  { name: '12:00', velocity: 34 },
  { name: '14:00', velocity: 45 },
  { name: '16:00', velocity: 65 },
  { name: '18:00', velocity: 85 },
  { name: '20:00', velocity: 70 },
  { name: '22:00', velocity: 55 },
];

const sourceDistribution = [
  { name: 'Twitter (X)', value: 45, color: '#10b981' },
  { name: 'TikTok', value: 35, color: '#10b98166' },
  { name: 'WhatsApp', value: 20, color: '#10b98133' },
];

export function ChartSection() {
  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Main Chart: Trend Velocity */}
      <div className="col-span-12 lg:col-span-8 bg-surface border border-border p-6 rounded-xl">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="text-lg font-semibold text-white">Trend Velocity (24h)</h3>
            <p className="text-xs text-[#666666]">Aggregate growth rate of monitored topics</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <span className="text-[10px] font-bold uppercase text-[#666666]">Velocity Index</span>
            </div>
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={trendData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666666', fontSize: 10, fontWeight: 600 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#666666', fontSize: 10, fontWeight: 600 }}
              />
              <Tooltip 
                cursor={{ fill: '#2a2a2a' }}
                contentStyle={{ 
                  backgroundColor: '#2a2a2a', 
                  border: '1px solid #3a3a3a', 
                  borderRadius: '8px',
                  fontSize: '12px',
                  color: '#fff'
                }}
                itemStyle={{ color: '#10b981' }}
              />
              <Bar 
                dataKey="velocity" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
              >
                {trendData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={index >= 8 ? '#10b981' : '#10b98166'} 
                    className="transition-all duration-300 hover:fill-emerald-400"
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Secondary Chart: Source Distribution */}
      <div className="col-span-12 lg:col-span-4 bg-surface border border-border p-6 rounded-xl flex flex-col">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-white">Source Distribution</h3>
          <p className="text-xs text-[#666666]">Viral content origin breakdown</p>
        </div>

        <div className="flex-1 space-y-4">
          {sourceDistribution.map((item) => (
            <div key={item.name} className="space-y-1.5">
              <div className="flex justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="text-[#666666]">{item.name}</span>
                <span className="text-white">{item.value}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${item.value}%`, opacity: item.value / 100 + 0.2 }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI Insight Bar */}
        <div className="mt-8 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg p-3 flex items-center gap-3 group cursor-pointer hover:border-emerald-500/30 transition-all">
          <div className="text-emerald-500">
            <Sparkles size={16} />
          </div>
          <p className="text-[11px] text-gray-300 flex-1 leading-tight">
            <span className="text-white font-medium">TikTok</span> trends are peaking 40% faster than average this morning.
          </p>
          <button className="text-[#666666] group-hover:text-white transition-colors">
            <Settings size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
