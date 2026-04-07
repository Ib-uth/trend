import React from 'react';
import { Info } from 'lucide-react';
import { cn } from '../lib/utils';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  isPositive?: boolean;
  sparklineData: number[];
}

export function MetricCard({ title, value, change, isPositive = true, sparklineData }: MetricCardProps) {
  return (
    <div className="bg-surface border border-border p-4 rounded-xl flex flex-col gap-4">
      <div className="flex justify-between items-start">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666]">
          {title}
        </h3>
        <button className="text-[#666666] hover:text-white transition-colors">
          <Info size={14} />
        </button>
      </div>

      <div className="flex items-end justify-between">
        <span className="text-2xl font-semibold text-white">{value}</span>
        
        {/* Sparkline */}
        <div className="flex items-end gap-[2px] h-10">
          {sparklineData.map((height, idx) => (
            <div 
              key={idx}
              className={cn(
                "w-1.5 rounded-sm transition-all duration-500",
                idx < 2 ? "bg-emerald-500/40" : "bg-emerald-500"
              )}
              style={{ height: `${height}%` }}
            />
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-border flex items-center gap-2">
        <span className={cn(
          "text-xs font-medium",
          isPositive ? "text-emerald-400" : "text-red-400"
        )}>
          {isPositive ? '+' : ''}{change}
        </span>
        <span className="text-[10px] text-[#666666] uppercase font-bold tracking-wider">vs last month</span>
      </div>
    </div>
  );
}
