import React from 'react';
import { motion } from 'motion/react';
import { Megaphone, Plus, Target, BarChart2, MoreHorizontal } from 'lucide-react';
import { cn } from '../lib/utils';
import { initialCampaigns } from '../constants';

export default function Campaigns() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl font-semibold text-white">Campaigns</h1>
          <p className="text-sm text-[#666666]">Manage your real-time marketing campaigns based on active trends.</p>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors shrink-0">
          <Plus size={18} />
          New Campaign
        </button>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Active Campaigns', value: '12', icon: Megaphone, color: 'text-emerald-400' },
          { label: 'Total Reach', value: '4.5M', icon: Target, color: 'text-blue-400' },
          { label: 'Avg. ROI', value: '3.8x', icon: BarChart2, color: 'text-emerald-400' },
        ].map((stat, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-surface border border-border p-4 rounded-xl flex items-center gap-4"
          >
            <div className={cn("w-10 h-10 rounded-lg bg-[#2a2a2a] flex items-center justify-center", stat.color)}>
              <stat.icon size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">{stat.label}</p>
              <p className="text-xl font-semibold text-white">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-white">Campaign Management</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-[#1a1a1a]/50">
                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]">Campaign Name</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]">Target Trend</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]">Status</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]">Spend</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]">ROI</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]">Reach</th>
                <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]"></th>
              </tr>
            </thead>
            <tbody>
              {initialCampaigns.map((campaign) => (
                <tr key={campaign.id} className="border-b border-border hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <p className="text-xs font-semibold text-white">{campaign.name}</p>
                    <p className="text-[10px] text-[#666666]">{campaign.id}</p>
                  </td>
                  <td className="p-4 text-xs text-emerald-400 font-medium">{campaign.trend}</td>
                  <td className="p-4">
                    <span className={cn(
                      "px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      campaign.status === 'Active' ? "bg-emerald-400/10 text-emerald-400" :
                      campaign.status === 'Scheduled' ? "bg-blue-400/10 text-blue-400" :
                      "bg-gray-400/10 text-gray-400"
                    )}>
                      {campaign.status}
                    </span>
                  </td>
                  <td className="p-4 text-xs text-gray-300">{campaign.spend}</td>
                  <td className="p-4 text-xs text-gray-300">{campaign.roi}</td>
                  <td className="p-4 text-xs text-gray-300">{campaign.reach}</td>
                  <td className="p-4 text-right">
                    <button className="text-[#666666] hover:text-white transition-colors">
                      <MoreHorizontal size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
