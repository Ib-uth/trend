import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { modules } from '../lib/modulesData';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Download, 
  AlertCircle,
  ChevronRight,
  Share2
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function ModulePage() {
  const { id } = useParams<{ id: string }>();
  const module = id ? modules[id] : null;

  if (!module) {
    return <Navigate to="/module/01" replace />;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Open':
      case 'Stable':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Conditional':
      case 'Elevated':
        return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'Restricted':
      case 'Crisis':
        return 'text-red-500 bg-red-500/10 border-red-500/20';
      default:
        return 'text-gray-500 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Module Header */}
      <div className="flex items-end justify-between border-b border-border pb-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-1"
        >
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-emerald-500 mono">
            <span>Module {module.id}</span>
            <ChevronRight size={10} />
            <span>{module.subtitle}</span>
          </div>
          <h1 className="text-4xl font-bold text-white tracking-tighter italic">{module.title}</h1>
        </motion.div>

        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded text-[10px] font-bold uppercase tracking-widest text-[#888888] hover:text-white hover:border-emerald-500/30 transition-all mono">
            <Share2 size={14} />
            Share
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-black rounded text-[10px] font-bold uppercase tracking-widest hover:bg-emerald-600 transition-all mono shadow-lg shadow-emerald-500/10">
            <Download size={14} />
            Export Brief
          </button>
        </div>
      </div>

      {/* Situation Briefing - Language Before Charts */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface border-l-2 border-emerald-500 p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5">
              <AlertCircle size={120} />
            </div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500 mb-4 mono">Situation Briefing</h3>
            <p className="text-xl text-white leading-relaxed serif italic">
              "{module.briefing}"
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {module.sections.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444] mono">{section.title}</h4>
                <p className="text-sm text-[#888888] leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Intelligence Sidebar */}
        <div className="space-y-6">
          <div className="bg-surface border border-border p-6 rounded">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444] mb-6 mono text-center">Intelligence Score</h3>
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="transparent"
                    stroke="#1a1a1a"
                    strokeWidth="4"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="60"
                    fill="transparent"
                    stroke="var(--color-emerald-accent)"
                    strokeWidth="4"
                    strokeDasharray={377}
                    strokeDashoffset={377 - (377 * module.score) / 100}
                    className="transition-all duration-1000 ease-out"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-bold text-white mono">{module.score}</span>
                  <span className="text-[8px] font-bold text-[#444444] uppercase mono">Index Points</span>
                </div>
              </div>
              
              <div className={cn(
                "px-3 py-1 rounded border text-[10px] font-bold uppercase tracking-widest mono",
                getStatusColor(module.status)
              )}>
                {module.status} Signal
              </div>

              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#666666] mono">
                Trend: 
                {module.trend === 'up' && <TrendingUp size={14} className="text-emerald-500" />}
                {module.trend === 'down' && <TrendingDown size={14} className="text-red-500" />}
                {module.trend === 'stable' && <Minus size={14} className="text-emerald-500" />}
                <span className={cn(
                  module.trend === 'up' ? 'text-emerald-500' : 
                  module.trend === 'down' ? 'text-red-500' : 'text-emerald-500'
                )}>
                  {module.trend}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#0a0a0a] border border-border p-6 rounded space-y-4">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#444444] mb-2 mono">Illustrative Example</h3>
            <p className="text-xs text-emerald-500 italic leading-relaxed serif">
              {module.example}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Intelligence Layers - Every Number Has A So-What */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#444444] mono">Intelligence Layers</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {module.layers.map((layer, idx) => (
            <div key={idx} className="bg-surface border border-border p-6 hover:border-emerald-500/30 transition-all group">
              <div className="flex items-start justify-between mb-4">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#666666] mono">{layer.name}</span>
                <span className="text-xl font-bold text-white mono group-hover:text-emerald-500 transition-colors">{layer.score}</span>
              </div>
              <p className="text-xs text-[#888888] leading-relaxed">
                {layer.description}
              </p>
              <div className="mt-4 h-1 bg-[#1a1a1a] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${layer.score}%`, transitionDelay: `${idx * 200}ms` }} 
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cross-Signal Intelligence Layer */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-[#0a0a0a] border border-border p-4 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="px-2 py-1 bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-bold text-emerald-500 uppercase tracking-widest mono">
            Cross-Signal Intel
          </div>
          <p className="text-[10px] text-[#666666] mono uppercase tracking-tight">
            Economic stress + Political stress interaction: <span className="text-white">Elevated Risk Correlation (72%)</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-bold text-[#444444] uppercase tracking-widest mono">Live Monitoring Active</span>
        </div>
      </motion.div>
    </div>
  );
}
