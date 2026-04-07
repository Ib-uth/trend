import React, { useState, useMemo } from 'react';
import { MoreHorizontal, Search, Plus, ArrowUpDown, ArrowUp, ArrowDown, Filter, Share2, TrendingUp } from 'lucide-react';
import { cn } from '../lib/utils';
import { initialAlerts, TrendAlert } from '../constants';

type Status = TrendAlert['status'];

function StatusBadge({ status }: { status: Status }) {
  const styles = {
    Peak: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    Emerging: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    Fading: "bg-[#666666]/10 text-[#666666] border-[#666666]/20"
  };

  const dotColors = {
    Peak: "bg-emerald-500",
    Emerging: "bg-blue-500",
    Fading: "bg-[#666666]"
  };

  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider",
      styles[status]
    )}>
      <div className={cn("w-1.5 h-1.5 rounded-full", dotColors[status])} />
      {status}
    </div>
  );
}

function SentimentBadge({ sentiment }: { sentiment: TrendAlert['sentiment'] }) {
  const colors = {
    Positive: "text-emerald-400",
    Neutral: "text-gray-400",
    Negative: "text-red-400"
  };

  return (
    <span className={cn("text-xs font-medium", colors[sentiment])}>
      {sentiment}
    </span>
  );
}

export function DataTable() {
  const [data] = useState<TrendAlert[]>(initialAlerts);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<Status | 'All'>('All');
  const [sortConfig, setSortConfig] = useState<{ key: keyof TrendAlert; direction: 'asc' | 'desc' | null }>({
    key: 'velocity',
    direction: 'desc',
  });
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (key: keyof TrendAlert) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    } else if (sortConfig.key === key && sortConfig.direction === 'desc') {
      direction = null;
    }
    setSortConfig({ key, direction });
  };

  const filteredAndSortedData = useMemo(() => {
    let result = [...data];

    if (searchQuery) {
      result = result.filter(trend => 
        trend.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
        trend.source.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'All') {
      result = result.filter(trend => trend.status === statusFilter);
    }

    if (sortConfig.key && sortConfig.direction) {
      result.sort((a, b) => {
        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, statusFilter, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedData, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedData.length / itemsPerPage);

  const SortIcon = ({ columnKey }: { columnKey: keyof TrendAlert }) => {
    if (sortConfig.key !== columnKey || !sortConfig.direction) {
      return <ArrowUpDown size={12} className="ml-1 opacity-20 group-hover:opacity-50 transition-opacity" />;
    }
    return sortConfig.direction === 'asc' 
      ? <ArrowUp size={12} className="ml-1 text-emerald-500" /> 
      : <ArrowDown size={12} className="ml-1 text-emerald-500" />;
  };

  return (
    <div className="bg-surface border border-border rounded-xl overflow-hidden">
      <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-white">Active Trends</h3>
          <p className="text-xs text-[#666666]">Real-time monitoring of viral topics across Africa</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            <input 
              type="text" 
              placeholder="Search trends..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50 w-full sm:w-48"
            />
          </div>
          
          <div className="flex items-center bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2">
            <Filter size={14} className="text-[#666666] mr-2" />
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as Status | 'All')}
              className="bg-transparent py-2 text-xs text-white focus:outline-none cursor-pointer"
            >
              <option value="All" className="bg-[#2a2a2a]">All Status</option>
              <option value="Emerging" className="bg-[#2a2a2a]">Emerging</option>
              <option value="Peak" className="bg-[#2a2a2a]">Peak</option>
              <option value="Fading" className="bg-[#2a2a2a]">Fading</option>
            </select>
          </div>

          <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors shrink-0">
            <Plus size={14} />
            Create Alert
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-y border-border bg-[#1a1a1a]/50">
              <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666] cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('topic')}>
                <div className="flex items-center">Trend Topic <SortIcon columnKey="topic" /></div>
              </th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666] cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('source')}>
                <div className="flex items-center">Source <SortIcon columnKey="source" /></div>
              </th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666] cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('sentiment')}>
                <div className="flex items-center">Sentiment <SortIcon columnKey="sentiment" /></div>
              </th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666] cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('velocity')}>
                <div className="flex items-center">Velocity <SortIcon columnKey="velocity" /></div>
              </th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666] cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('reach')}>
                <div className="flex items-center">Est. Reach <SortIcon columnKey="reach" /></div>
              </th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666] cursor-pointer group hover:text-white transition-colors" onClick={() => handleSort('status')}>
                <div className="flex items-center">Status <SortIcon columnKey="status" /></div>
              </th>
              <th className="p-4 text-[10px] font-bold uppercase tracking-[0.15em] text-[#666666]"></th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((trend) => (
              <tr key={trend.id} className="border-b border-border hover:bg-white/[0.02] transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                      <TrendingUp size={16} />
                    </div>
                    <span className="text-xs font-semibold text-white">{trend.topic}</span>
                  </div>
                </td>
                <td className="p-4 text-xs text-gray-300">
                  <div className="flex items-center gap-2">
                    <Share2 size={12} className="text-[#666666]" />
                    {trend.source}
                  </div>
                </td>
                <td className="p-4">
                  <SentimentBadge sentiment={trend.sentiment} />
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white font-medium">+{trend.velocity}%</span>
                    <div className="w-12 h-1 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${Math.min(trend.velocity / 5, 100)}%` }} />
                    </div>
                  </div>
                </td>
                <td className="p-4 text-xs text-gray-300">{trend.reach}</td>
                <td className="p-4">
                  <StatusBadge status={trend.status} />
                </td>
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

      <div className="p-4 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-wider text-[#666666]">
        <span>
          Showing {Math.min((currentPage - 1) * itemsPerPage + 1, filteredAndSortedData.length)} to {Math.min(currentPage * itemsPerPage, filteredAndSortedData.length)} of {filteredAndSortedData.length} trends
        </span>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1.5 rounded border border-border hover:bg-[#2a2a2a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={cn(
                  "w-8 h-8 rounded flex items-center justify-center border transition-all",
                  currentPage === page 
                    ? "bg-emerald-500 border-emerald-500 text-white" 
                    : "border-border hover:bg-[#2a2a2a] text-[#666666] hover:text-white"
                )}
              >
                {page}
              </button>
            ))}
          </div>

          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-3 py-1.5 rounded border border-border hover:bg-[#2a2a2a] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
