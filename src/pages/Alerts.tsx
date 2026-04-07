import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Bell, TrendingUp, Globe, ArrowUpRight, X, Save, Trash2, Activity, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';
import { initialAlerts, TrendAlert } from '../constants';

export default function Alerts() {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState<TrendAlert[]>(initialAlerts);
  const [selectedAlert, setSelectedAlert] = useState<TrendAlert | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TrendAlert | null>(null);

  const handleAlertClick = (alert: TrendAlert) => {
    navigate(`/trends/${alert.id}`);
  };

  const handleSave = () => {
    if (editForm) {
      setAlerts(prev => prev.map(a => a.id === editForm.id ? editForm : a));
      setSelectedAlert(editForm);
      setIsEditing(false);
    }
  };

  const handleDelete = (id: number) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
    setSelectedAlert(null);
  };

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-semibold text-white">Trend Alerts</h1>
          <p className="text-sm text-[#666666]">Monitor and manage real-time viral triggers across Africa.</p>
        </motion.div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors">
          <Plus size={14} />
          Create Alert
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {alerts.map((alert, idx) => (
          <motion.div 
            key={alert.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => handleAlertClick(alert)}
            className="bg-surface border border-border rounded-xl overflow-hidden group hover:border-emerald-500/50 transition-all cursor-pointer"
          >
            <div className="aspect-square relative overflow-hidden">
              <img src={alert.image} alt={alert.topic} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
              <div className="absolute top-2 right-2">
                <div className={cn(
                  "backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md border border-white/10 uppercase",
                  alert.status === 'Active' ? 'bg-emerald-500/50' : alert.status === 'Emerging' ? 'bg-blue-500/50' : 'bg-gray-500/50'
                )}>
                  {alert.status}
                </div>
              </div>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex justify-between items-start">
                <h3 className="font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">{alert.topic}</h3>
                <ArrowUpRight size={16} className="text-[#666666]" />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-lg font-bold text-white">{alert.velocity}</span>
                  <Activity size={12} className="text-emerald-500" />
                </div>
                <span className="text-[10px] font-bold text-[#666666] uppercase tracking-wider">{alert.reach} Reach</span>
              </div>
              <div className="pt-3 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#666666] uppercase">
                  <Globe size={12} />
                  <span>{alert.region}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#666666] uppercase">
                  <TrendingUp size={12} />
                  <span>{alert.source}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Alert Detail Slide-over */}
      <AnimatePresence>
        {selectedAlert && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAlert(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-surface border-l border-border z-50 flex flex-col shadow-2xl"
            >
              {/* Header */}
              <div className="p-6 border-b border-border flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">
                  {isEditing ? 'Edit Alert' : 'Alert Details'}
                </h2>
                <button 
                  onClick={() => setSelectedAlert(null)}
                  className="text-[#666666] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Alert Preview */}
                <div className="space-y-4">
                  <div className="aspect-video rounded-xl overflow-hidden border border-border">
                    <img src={selectedAlert.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedAlert.topic}</h3>
                    <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest">{selectedAlert.source} • {selectedAlert.region}</p>
                  </div>
                </div>

                {/* Form / Info */}
                <div className="space-y-6">
                  {isEditing ? (
                    <div className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Topic</label>
                        <input 
                          type="text" 
                          value={editForm?.topic}
                          onChange={e => setEditForm(prev => prev ? { ...prev, topic: e.target.value } : null)}
                          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Velocity</label>
                          <input 
                            type="text" 
                            value={editForm?.velocity}
                            onChange={e => setEditForm(prev => prev ? { ...prev, velocity: e.target.value } : null)}
                            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Source</label>
                          <input 
                            type="text" 
                            value={editForm?.source}
                            onChange={e => setEditForm(prev => prev ? { ...prev, source: e.target.value as any } : null)}
                            className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Description</label>
                        <textarea 
                          rows={4}
                          value={editForm?.description}
                          onChange={e => setEditForm(prev => prev ? { ...prev, description: e.target.value } : null)}
                          className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-[#2a2a2a] p-4 rounded-xl space-y-1">
                          <div className="flex items-center gap-2 text-[#666666]">
                            <Activity size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Velocity</span>
                          </div>
                          <p className="text-lg font-bold text-white">{selectedAlert.velocity}</p>
                        </div>
                        <div className="bg-[#2a2a2a] p-4 rounded-xl space-y-1">
                          <div className="flex items-center gap-2 text-[#666666]">
                            <BarChart3 size={14} />
                            <span className="text-[10px] font-bold uppercase tracking-wider">Reach</span>
                          </div>
                          <p className="text-lg font-bold text-white">{selectedAlert.reach}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Context</label>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          {selectedAlert.description}
                        </p>
                      </div>

                      <div className="pt-6 border-t border-border space-y-4">
                        <div className="flex justify-between text-xs">
                          <span className="text-[#666666]">Sentiment</span>
                          <span className={cn(
                            "font-medium",
                            selectedAlert.sentiment === 'Positive' ? 'text-emerald-400' : selectedAlert.sentiment === 'Negative' ? 'text-red-400' : 'text-blue-400'
                          )}>{selectedAlert.sentiment}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-[#666666]">Status</span>
                          <span className="text-emerald-400 font-medium">{selectedAlert.status}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-border flex items-center gap-3">
                {isEditing ? (
                  <>
                    <button 
                      onClick={handleSave}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <Save size={16} />
                      Save Changes
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333333] transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333333] transition-colors"
                    >
                      Edit Alert
                    </button>
                    <button 
                      onClick={() => handleDelete(selectedAlert.id)}
                      className="w-12 h-10 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
