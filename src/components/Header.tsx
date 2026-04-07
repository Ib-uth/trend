import React from 'react';
import { Search, Bell, Monitor, ChevronRight } from 'lucide-react';
import { useAuth } from '../lib/AuthContext';

export function Header() {
  const { user } = useAuth();

  return (
    <header className="h-14 bg-surface border-b border-border flex items-center justify-between px-6 sticky top-0 z-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm">
        <span className="text-[#666666]">Monitoring</span>
        <ChevronRight size={14} className="text-[#666666]" />
        <span className="text-emerald-500 font-medium">Overview</span>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666] group-focus-within:text-emerald-500 transition-colors">
            <Search size={16} />
          </div>
          <input 
            type="text" 
            placeholder="Search anything..." 
            className="w-56 bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-1.5 pl-10 pr-12 text-xs text-white placeholder:text-[#666666] focus:outline-none focus:border-emerald-500/50 transition-all"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 px-1.5 py-0.5 bg-[#1a1a1a] border border-[#3a3a3a] rounded text-[9px] font-bold text-[#666666]">
            <span>⌘</span>
            <span>K</span>
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-2">
          <button className="w-8 h-8 flex items-center justify-center bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-[#666666] hover:text-white hover:border-emerald-500/30 transition-all">
            <Monitor size={16} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-[#666666] hover:text-white hover:border-emerald-500/30 transition-all relative">
            <Bell size={16} />
            <div className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-emerald-500 rounded-full border border-surface" />
          </button>
        </div>

        {/* Avatar */}
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 p-[1.5px] cursor-pointer hover:scale-105 transition-transform">
          <img 
            src={user?.avatar || "https://picsum.photos/seed/avatar99/100/100"} 
            alt="Profile" 
            className="w-full h-full rounded-full border-2 border-surface object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>
    </header>
  );
}
