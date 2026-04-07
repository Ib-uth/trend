import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  Edit3, 
  Save, 
  X, 
  TrendingUp, 
  Globe, 
  Activity, 
  BarChart3, 
  ShieldCheck, 
  Zap, 
  Clock,
  Upload,
  MessageSquare
} from 'lucide-react';
import { initialAlerts, TrendAlert } from '../constants';
import { cn } from '../lib/utils';

export default function TrendDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [alert, setAlert] = useState<TrendAlert | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<TrendAlert | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const foundAlert = initialAlerts.find(a => a.id === Number(id));
    if (foundAlert) {
      setAlert(foundAlert);
      setEditForm(foundAlert);
    }
  }, [id]);

  if (!alert) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-surface border border-border rounded-full flex items-center justify-center mx-auto animate-pulse">
            <Activity className="text-[#666666]" />
          </div>
          <p className="text-gray-400">Loading trend details...</p>
        </div>
      </div>
    );
  }

  const handleSave = () => {
    if (editForm) {
      setAlert(editForm);
      setIsEditing(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => prev ? { ...prev, image: reader.result as string } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Navigation Header */}
      <div className="flex items-center justify-between">
        <Link 
          to="/alerts" 
          className="group flex items-center gap-2 text-[#666666] hover:text-white transition-colors"
        >
          <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-white/20 transition-colors">
            <ArrowLeft size={16} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Alerts</span>
        </Link>

        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 rounded-lg border border-border text-white text-xs font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
              >
                <Save size={14} />
                Save Changes
              </button>
            </>
          ) : (
            <button 
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 bg-surface border border-border hover:border-emerald-500/50 text-white px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors"
            >
              <Edit3 size={14} />
              Edit Trend
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Column: Image & Quick Stats */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div className="aspect-[4/3] rounded-3xl overflow-hidden border border-border bg-surface group relative">
            <img 
              src={isEditing ? editForm?.image : alert.image} 
              alt={alert.topic} 
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
            
            {isEditing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white text-black px-6 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0"
                >
                  <Upload size={16} />
                  Change Image
                </button>
                <input 
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                  accept="image/*"
                />
              </div>
            )}

            <div className="absolute top-6 left-6">
              <span className="bg-black/60 backdrop-blur-xl border border-white/10 text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest">
                {alert.source}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface border border-border p-6 rounded-2xl space-y-2">
              <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Velocity</p>
              <p className="text-2xl font-bold text-white">{alert.velocity}</p>
            </div>
            <div className="bg-surface border border-border p-6 rounded-2xl space-y-2">
              <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Status</p>
              <p className="text-2xl font-bold text-emerald-400">{alert.status}</p>
            </div>
            <div className="bg-surface border border-border p-6 rounded-2xl space-y-2">
              <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Reach</p>
              <p className="text-2xl font-bold text-white">{alert.reach}</p>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Details & Editing */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-10"
        >
          <div className="space-y-4">
            {isEditing ? (
              <input 
                type="text"
                value={editForm?.topic}
                onChange={e => setEditForm(prev => prev ? { ...prev, topic: e.target.value } : null)}
                className="text-4xl font-bold text-white bg-transparent border-b border-emerald-500/30 focus:border-emerald-500 outline-none w-full pb-2"
              />
            ) : (
              <h1 className="text-5xl font-bold text-white tracking-tight leading-tight">
                {alert.topic}
              </h1>
            )}
            <div className="flex items-center gap-4 text-sm text-[#666666]">
              <span className="flex items-center gap-1.5">
                <Globe size={14} />
                {alert.region}
              </span>
              <span className="w-1 h-1 rounded-full bg-[#333333]" />
              <span className="flex items-center gap-1.5">
                <TrendingUp size={14} />
                {alert.source}
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <h3 className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em]">Trend Context</h3>
              {isEditing ? (
                <textarea 
                  value={editForm?.description}
                  onChange={e => setEditForm(prev => prev ? { ...prev, description: e.target.value } : null)}
                  rows={6}
                  className="w-full bg-surface border border-border rounded-xl p-4 text-gray-300 text-sm leading-relaxed focus:border-emerald-500 outline-none resize-none"
                />
              ) : (
                <p className="text-gray-300 leading-relaxed text-lg">
                  {alert.description}
                </p>
              )}
            </div>

            {isEditing && (
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Velocity Rate</label>
                  <input 
                    type="text"
                    value={editForm?.velocity}
                    onChange={e => setEditForm(prev => prev ? { ...prev, velocity: e.target.value } : null)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Region</label>
                  <input 
                    type="text"
                    value={editForm?.region}
                    onChange={e => setEditForm(prev => prev ? { ...prev, region: e.target.value } : null)}
                    className="w-full bg-surface border border-border rounded-xl px-4 py-3 text-white text-sm focus:border-emerald-500 outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Features / Meta */}
          {!isEditing && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-10 border-t border-border">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <ShieldCheck className="text-emerald-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Verified Signal</h4>
                  <p className="text-xs text-[#666666] mt-1">Cross-checked across multiple social platforms.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Zap className="text-emerald-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">High Velocity</h4>
                  <p className="text-xs text-[#666666] mt-1">Rapidly growing engagement in local markets.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <Clock className="text-emerald-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Real-time Tracking</h4>
                  <p className="text-xs text-[#666666] mt-1">Updates every 60 seconds for maximum accuracy.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                  <MessageSquare className="text-emerald-500" size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Sentiment Analysis</h4>
                  <p className="text-xs text-[#666666] mt-1">AI-powered emotional context for marketing.</p>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Key Influencers Section */}
      {!isEditing && alert.influencers && alert.influencers.length > 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 pt-12 border-t border-border"
        >
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-white">Key Influencers</h3>
              <p className="text-sm text-[#666666]">Top accounts driving the conversation for this trend.</p>
            </div>
            <button className="text-xs font-bold text-emerald-500 uppercase tracking-widest hover:text-emerald-400 transition-colors">
              View All Influencers
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alert.influencers.map((influencer) => (
              <div 
                key={influencer.id}
                className="bg-surface border border-border p-6 rounded-3xl hover:border-emerald-500/30 transition-all group"
              >
                <div className="flex items-center gap-4">
                  <img 
                    src={influencer.avatar} 
                    alt={influencer.name} 
                    className="w-14 h-14 rounded-2xl object-cover border border-border group-hover:scale-105 transition-transform"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-white font-bold truncate">{influencer.name}</h4>
                    <p className="text-xs text-[#666666] truncate">{influencer.handle}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-border/50">
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Followers</p>
                    <p className="text-sm font-bold text-white">{influencer.followers}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Engagement</p>
                    <p className="text-sm font-bold text-emerald-400">{influencer.engagement}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
