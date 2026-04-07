import React, { useState } from 'react';
import { motion } from 'motion/react';
import { BarChart3, TrendingUp, Users, Target, Sparkles, Activity, Filter, MousePointer2 } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { cn } from '../lib/utils';

const data7d = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 600 },
  { name: 'Thu', value: 800 },
  { name: 'Fri', value: 500 },
  { name: 'Sat', value: 900 },
  { name: 'Sun', value: 1100 },
];

const data30d = Array.from({ length: 30 }, (_, i) => ({
  name: `Day ${i + 1}`,
  value: Math.floor(Math.random() * 1000) + 500,
}));

const pieData7d = [
  { name: 'Twitter (X)', value: 400 },
  { name: 'TikTok', value: 300 },
  { name: 'WhatsApp', value: 100 },
];

const pieData30d = [
  { name: 'Twitter (X)', value: 1800 },
  { name: 'TikTok', value: 1450 },
  { name: 'WhatsApp', value: 450 },
];

const scatterData = Array.from({ length: 40 }, (_, i) => ({
  x: Math.floor(Math.random() * 60) + 10, // Time since origin
  y: Math.floor(Math.random() * 100) + 5,  // Reach in K
  z: Math.floor(Math.random() * 1000) + 100, // Velocity
}));

const heatmapData = [
  { day: 'Mon', hours: [2, 4, 1, 0, 5, 8, 12, 15, 18, 20, 14, 10] },
  { day: 'Tue', hours: [3, 2, 0, 1, 4, 9, 14, 18, 22, 25, 18, 12] },
  { day: 'Wed', hours: [1, 1, 2, 0, 6, 10, 15, 20, 24, 28, 20, 15] },
  { day: 'Thu', hours: [4, 3, 1, 2, 5, 12, 18, 25, 30, 32, 25, 18] },
  { day: 'Fri', hours: [5, 4, 2, 3, 8, 15, 22, 28, 35, 40, 30, 22] },
  { day: 'Sat', hours: [10, 8, 5, 4, 12, 20, 28, 35, 42, 45, 35, 28] },
  { day: 'Sun', hours: [8, 6, 4, 2, 10, 18, 25, 32, 38, 40, 32, 25] },
];

const COLORS = ['#10b981', '#3b82f6', '#f43f5e'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#1a1a1a] border border-[#3a3a3a] p-3 rounded-lg shadow-xl backdrop-blur-md">
        {label && <p className="text-[10px] font-bold uppercase tracking-wider text-[#666666] mb-2">{label}</p>}
        <div className="space-y-1">
          {payload.map((entry: any, index: number) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color || entry.fill || '#10b981' }} />
              <p className="text-xs font-medium text-white">
                <span className="text-[#999999]">{entry.name}:</span> {entry.value}
                {entry.unit ? ` ${entry.unit}` : ''}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export default function ActiveTrends() {
  const [userGrowthRange, setUserGrowthRange] = useState<'7d' | '30d'>('7d');
  const [deviceDistRange, setDeviceDistRange] = useState<'7d' | '30d'>('7d');
  const [selectedRegion, setSelectedRegion] = useState<string>('All Regions');

  const regions = ['All Regions', 'Nigeria', 'Ghana', 'Kenya', 'South Africa'];

  const growthData = userGrowthRange === '7d' ? data7d : data30d;
  const currentPieData = deviceDistRange === '7d' ? pieData7d : pieData30d;

  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">Active Trends Analytics</h1>
          <p className="text-sm text-[#666666]">Deep dive into viral velocity and platform distribution across Africa.</p>
        </div>

        <div className="flex items-center gap-3 bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl px-3 py-2">
          <Filter size={14} className="text-emerald-500" />
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#666666] mr-2">Region:</span>
          <select 
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="bg-transparent text-xs font-semibold text-white outline-none cursor-pointer focus:text-emerald-400 transition-colors"
          >
            {regions.map(region => (
              <option key={region} value={region} className="bg-[#1a1a1a] text-white">
                {region}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      {/* Top Row: Trend Velocity & Platform Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface border border-border p-6 rounded-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
            <div>
              <h3 className="text-lg font-semibold text-white">Trend Velocity Index</h3>
              <div className="flex items-center gap-2 mt-1">
                <TrendingUp size={14} className="text-emerald-400" />
                <span className="text-xs text-gray-400">+145% aggregate growth vs yesterday</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex bg-[#1a1a1a] p-1 rounded-lg border border-[#2a2a2a]">
                {(['7d', '30d'] as const).map((range) => (
                  <button
                    key={range}
                    onClick={() => setUserGrowthRange(range)}
                    className={cn(
                      "px-3 py-1 text-[10px] font-bold uppercase rounded-md transition-all",
                      userGrowthRange === range 
                        ? "bg-emerald-500 text-white shadow-lg" 
                        : "text-[#666666] hover:text-white"
                    )}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={growthData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#666666', fontSize: 10}} 
                  interval={userGrowthRange === '30d' ? 5 : 0}
                />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#666666', fontSize: 10}} />
                <Tooltip content={<CustomTooltip />} />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  name="Velocity" 
                  stroke="#10b981" 
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                  strokeWidth={2} 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Source Breakdown</h3>
            <select 
              value={deviceDistRange}
              onChange={(e) => setDeviceDistRange(e.target.value as any)}
              className="bg-[#1a1a1a] border border-[#2a2a2a] text-[10px] font-bold uppercase text-white rounded-lg px-2 py-1 outline-none focus:border-emerald-500 transition-colors"
            >
              <option value="7d">Last 7 Days</option>
              <option value="30d">Last 30 Days</option>
            </select>
          </div>
          
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={currentPieData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {currentPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {currentPieData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[idx] }} />
                  <span className="text-gray-400">{item.name}</span>
                </div>
                <span className="text-white font-medium">{item.value} signals</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle Row: Sentiment & Engagement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface border border-border p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-6">
            <Filter size={18} className="text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Sentiment Funnel</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={[
                  { name: 'Awareness', value: 5000, fill: '#10b981' },
                  { name: 'Engagement', value: 3200, fill: '#10b981ee' },
                  { name: 'Positive', value: 1800, fill: '#10b981cc' },
                  { name: 'Viral', value: 900, fill: '#10b981aa' },
                ]}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#ffffff', fontSize: 12, fontWeight: 500}}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#666666', fontSize: 10}}
                />
                <Tooltip 
                  cursor={{fill: 'rgba(16, 185, 129, 0.05)'}}
                  content={<CustomTooltip />}
                />
                <Bar dataKey="value" name="Signals" radius={[4, 4, 0, 0]} barSize={60} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface border border-border p-6 rounded-xl">
          <div className="flex items-center gap-2 mb-6">
            <MousePointer2 size={18} className="text-emerald-400" />
            <h3 className="text-lg font-semibold text-white">Viral Correlation</h3>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" />
                <XAxis 
                  type="number" 
                  dataKey="x" 
                  name="Time" 
                  unit="h" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#666666', fontSize: 10}}
                  label={{ value: 'Hours Since Origin', position: 'insideBottom', offset: -10, fill: '#666666', fontSize: 10 }}
                />
                <YAxis 
                  type="number" 
                  dataKey="y" 
                  name="Shares" 
                  unit="k" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#666666', fontSize: 10}}
                  label={{ value: 'Shares (K)', angle: -90, position: 'insideLeft', fill: '#666666', fontSize: 10 }}
                />
                <ZAxis type="number" dataKey="z" range={[60, 400]} name="Impact" />
                <Tooltip 
                  cursor={{ strokeDasharray: '3 3' }}
                  content={<CustomTooltip />}
                />
                <Scatter name="Trends" data={scatterData} fill="#10b981" fillOpacity={0.6} />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Heatmap: Viral Activity */}
      <div className="bg-surface border border-border p-6 rounded-xl">
        <div className="flex items-center gap-2 mb-6">
          <Activity size={18} className="text-emerald-400" />
          <h3 className="text-lg font-semibold text-white">Viral Activity Heatmap</h3>
        </div>
        <div className="overflow-x-auto">
          <div className="min-w-[600px]">
            <div className="flex mb-2">
              <div className="w-12" />
              <div className="flex-1 flex justify-between px-2">
                {['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'].map(h => (
                  <span key={h} className="text-[10px] text-[#666666] font-bold uppercase">{h}</span>
                ))}
              </div>
            </div>
            <div className="space-y-1">
              {heatmapData.map((row, i) => (
                <div key={row.day} className="flex items-center gap-2">
                  <span className="w-12 text-[10px] text-[#666666] font-bold uppercase">{row.day}</span>
                  <div className="flex-1 flex gap-1">
                    {row.hours.map((val, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: (i * 12 + j) * 0.005 }}
                        className="flex-1 h-8 rounded-sm"
                        style={{ 
                          backgroundColor: '#10b981',
                          opacity: Math.max(0.1, val / 50)
                        }}
                        title={`${row.day} block ${j}: ${val} signals`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Avg. Sentiment', value: '78%', icon: Target, color: 'text-emerald-400' },
          { label: 'Peak Velocity', value: '840/hr', icon: BarChart3, color: 'text-blue-400' },
          { label: 'Cross-Platform Rate', value: '62%', icon: Users, color: 'text-red-400' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-surface border border-border p-4 rounded-xl flex items-center gap-4">
            <div className={cn("w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">{stat.label}</p>
              <p className="text-xl font-semibold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* AI Insight Bar */}
      <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-400">
          <Sparkles size={20} />
        </div>
        <div className="flex-1">
          <p className="text-sm text-white font-medium">AI Insight: High velocity detected on TikTok ({selectedRegion === 'All Regions' ? 'Lagos Region' : `${selectedRegion} Region`})</p>
          <p className="text-xs text-[#666666]">A new dance challenge is gaining traction. Recommended action: Deploy "Gara Challenge" campaign within 2 hours.</p>
        </div>
        <button className="px-4 py-2 bg-emerald-500 text-white text-xs font-semibold rounded-lg hover:bg-emerald-600 transition-colors">
          Deploy Campaign
        </button>
      </div>
    </div>
  );
}
