import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Bell, 
  Shield, 
  CreditCard, 
  Globe, 
  Zap, 
  ChevronRight, 
  X, 
  Save, 
  Check,
  Smartphone,
  Mail,
  Lock,
  Plus,
  Trash2,
  Settings as SettingsIcon,
  Layout,
  Volume2,
  Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

type SectionId = 'profile' | 'notifications' | 'security' | 'billing' | 'integrations' | 'general' | 'preferences';

const settingsSections = [
  { id: 'profile' as SectionId, name: 'Profile', icon: User, description: 'Manage your personal information and avatar.' },
  { id: 'preferences' as SectionId, name: 'User Preferences', icon: SettingsIcon, description: 'Customize your dashboard layout and notification behavior.' },
  { id: 'notifications' as SectionId, name: 'Notifications', icon: Bell, description: 'Configure how you receive alerts and updates.' },
  { id: 'security' as SectionId, name: 'Security', icon: Shield, description: 'Update your password and enable 2FA.' },
  { id: 'billing' as SectionId, name: 'Billing', icon: CreditCard, description: 'Manage your subscription and payment methods.' },
  { id: 'integrations' as SectionId, name: 'Integrations', icon: Zap, description: 'Connect your favorite tools and services.' },
  { id: 'general' as SectionId, name: 'General', icon: Globe, description: 'Configure language, timezone and regional settings.' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState<SectionId | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Mock Settings Data
  const [profile, setProfile] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@trendpulse.ai',
    bio: 'Product Designer & SaaS Enthusiast',
    avatar: 'https://picsum.photos/seed/user123/100/100'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    marketing: false
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    sessionTimeout: '30m'
  });

  const [billing, setBilling] = useState({
    plan: 'Pro Plan',
    cycle: 'Monthly',
    nextBilling: 'April 12, 2026'
  });

  const [preferences, setPreferences] = useState({
    dashboardLayout: 'grid',
    compactMode: false,
    showLiveStream: true,
    notificationFrequency: 'realtime',
    soundEnabled: true
  });

  // Load preferences from local storage
  useEffect(() => {
    const savedPrefs = localStorage.getItem('user_preferences');
    if (savedPrefs) {
      try {
        setPreferences(JSON.parse(savedPrefs));
      } catch (e) {
        console.error('Failed to parse saved preferences', e);
      }
    }
  }, []);

  const handleSave = () => {
    setIsSaving(true);
    // Save to local storage
    localStorage.setItem('user_preferences', JSON.stringify(preferences));
    
    setTimeout(() => {
      setIsSaving(false);
      setActiveSection(null);
    }, 800);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="relative group">
                <img src={profile.avatar} alt="" className="w-24 h-24 rounded-full border-4 border-border object-cover" referrerPolicy="no-referrer" />
                <button className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold">
                  Change
                </button>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Profile Picture</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Full Name</label>
                <input 
                  type="text" 
                  value={profile.name}
                  onChange={e => setProfile({...profile, name: e.target.value})}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Email Address</label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={e => setProfile({...profile, email: e.target.value})}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Bio</label>
                <textarea 
                  rows={3}
                  value={profile.bio}
                  onChange={e => setProfile({...profile, bio: e.target.value})}
                  className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>
            </div>
          </div>
        );
      case 'preferences':
        return (
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Layout size={16} className="text-emerald-500" />
                <h4 className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Dashboard Layout</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {['grid', 'list'].map((layout) => (
                  <button
                    key={layout}
                    onClick={() => setPreferences({ ...preferences, dashboardLayout: layout })}
                    className={cn(
                      "p-4 rounded-xl border text-center transition-all",
                      preferences.dashboardLayout === layout 
                        ? "bg-emerald-500/10 border-emerald-500 text-emerald-500" 
                        : "bg-[#2a2a2a] border-[#3a3a3a] text-[#666666] hover:border-[#4a4a4a]"
                    )}
                  >
                    <p className="text-xs font-bold uppercase tracking-wider">{layout}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-emerald-500" />
                <h4 className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Notification Frequency</h4>
              </div>
              <select 
                value={preferences.notificationFrequency}
                onChange={(e) => setPreferences({ ...preferences, notificationFrequency: e.target.value })}
                className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500"
              >
                <option value="realtime">Real-time</option>
                <option value="daily">Daily Digest</option>
                <option value="weekly">Weekly Report</option>
              </select>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <SettingsIcon size={16} className="text-emerald-500" />
                <h4 className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Display & Sound</h4>
              </div>
              <div className="bg-[#2a2a2a] rounded-xl border border-[#3a3a3a] divide-y divide-[#3a3a3a]">
                {[
                  { id: 'compactMode', name: 'Compact Mode', icon: Layout },
                  { id: 'showLiveStream', name: 'Show Live Stream', icon: Zap },
                  { id: 'soundEnabled', name: 'Sound Notifications', icon: Volume2 },
                ].map((item) => (
                  <div key={item.id} className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-[#666666]"><item.icon size={18} /></div>
                      <span className="text-sm text-white">{item.name}</span>
                    </div>
                    <button 
                      onClick={() => setPreferences({ ...preferences, [item.id]: !preferences[item.id as keyof typeof preferences] })}
                      className={cn(
                        "w-10 h-5 rounded-full transition-colors relative",
                        preferences[item.id as keyof typeof preferences] ? "bg-emerald-500" : "bg-[#1a1a1a]"
                      )}
                    >
                      <div className={cn(
                        "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                        preferences[item.id as keyof typeof preferences] ? "right-1" : "left-1"
                      )} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="bg-[#2a2a2a] rounded-xl border border-[#3a3a3a] divide-y divide-[#3a3a3a]">
              {[
                { id: 'email', name: 'Email Notifications', icon: Mail },
                { id: 'push', name: 'Push Notifications', icon: Smartphone },
                { id: 'sms', name: 'SMS Alerts', icon: Smartphone },
                { id: 'marketing', name: 'Marketing Communications', icon: Bell },
              ].map((item) => (
                <div key={item.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-[#666666]"><item.icon size={18} /></div>
                    <span className="text-sm text-white">{item.name}</span>
                  </div>
                  <button 
                    onClick={() => setNotifications({...notifications, [item.id]: !notifications[item.id as keyof typeof notifications]})}
                    className={cn(
                      "w-10 h-5 rounded-full transition-colors relative",
                      notifications[item.id as keyof typeof notifications] ? "bg-emerald-500" : "bg-[#1a1a1a]"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-3 h-3 rounded-full bg-white transition-all",
                      notifications[item.id as keyof typeof notifications] ? "right-1" : "left-1"
                    )} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-emerald-500"><Shield size={20} /></div>
                  <div>
                    <p className="text-sm font-semibold text-white">Two-Factor Authentication</p>
                    <p className="text-[10px] text-[#666666] uppercase font-bold">Highly Recommended</p>
                  </div>
                </div>
                <button 
                  onClick={() => setSecurity({...security, twoFactor: !security.twoFactor})}
                  className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all",
                    security.twoFactor ? "bg-green-400/10 text-green-400 border-green-400/20" : "bg-red-400/10 text-red-400 border-red-400/20"
                  )}
                >
                  {security.twoFactor ? 'Enabled' : 'Disabled'}
                </button>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500" />
              </div>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-[#2a2a2a] to-[#1a1a1a] p-6 rounded-2xl border border-[#3a3a3a] relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4">
                <div className="bg-emerald-500/20 text-emerald-500 text-[10px] font-bold px-2 py-1 rounded-md border border-emerald-500/30 uppercase">Active</div>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Current Plan</p>
                  <h3 className="text-2xl font-bold text-white">{billing.plan}</h3>
                </div>
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Billing Cycle</p>
                    <p className="text-sm text-white font-medium">{billing.cycle}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Next Invoice</p>
                    <p className="text-sm text-white font-medium">{billing.nextBilling}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">Payment Methods</p>
              <div className="p-4 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-6 bg-[#1a1a1a] rounded flex items-center justify-center text-[8px] font-bold text-white">VISA</div>
                  <span className="text-sm text-white">•••• 4242</span>
                </div>
                <button className="text-[10px] font-bold uppercase text-emerald-500 hover:underline">Edit</button>
              </div>
            </div>
          </div>
        );
      case 'integrations':
        return (
          <div className="space-y-4">
            {[
              { name: 'Slack', status: 'Connected', icon: Zap },
              { name: 'GitHub', status: 'Connected', icon: Zap },
              { name: 'Discord', status: 'Not Connected', icon: Zap },
              { name: 'Notion', status: 'Not Connected', icon: Zap },
            ].map((app) => (
              <div key={app.name} className="p-4 bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center text-[#666666] group-hover:text-emerald-500 transition-colors">
                    <app.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">{app.name}</p>
                    <p className="text-[10px] text-[#666666] uppercase font-bold">{app.status}</p>
                  </div>
                </div>
                <button className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border transition-all",
                  app.status === 'Connected' ? "bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20" : "bg-emerald-500 text-black border-emerald-500 hover:bg-emerald-600"
                )}>
                  {app.status === 'Connected' ? 'Disconnect' : 'Connect'}
                </button>
              </div>
            ))}
          </div>
        );
      case 'general':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Language</label>
                <select className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500">
                  <option>English (US)</option>
                  <option>Spanish (ES)</option>
                  <option>French (FR)</option>
                  <option>German (DE)</option>
                </select>
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-[#666666]">Timezone</label>
                <select className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 px-3 text-sm text-white focus:outline-none focus:border-emerald-500">
                  <option>(GMT-08:00) Pacific Time</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT+01:00) Central European Time</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl relative">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold text-white">Settings</h1>
        <p className="text-sm text-[#666666]">Configure your account preferences and system settings.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4">
        {settingsSections.map((section, idx) => (
          <motion.div 
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            onClick={() => setActiveSection(section.id)}
            className="bg-surface border border-border p-4 rounded-xl flex items-center gap-4 group cursor-pointer hover:border-emerald-500/50 transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#2a2a2a] flex items-center justify-center text-[#666666] group-hover:text-emerald-500 transition-colors">
              <section.icon size={24} />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-white">{section.name}</h3>
              <p className="text-xs text-[#666666]">{section.description}</p>
            </div>
            <ChevronRight size={18} className="text-[#666666] group-hover:text-white transition-colors" />
          </motion.div>
        ))}
      </div>

      <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-xl space-y-4">
        <div className="flex items-center gap-3">
          <Shield className="text-emerald-500" size={20} />
          <h3 className="text-sm font-semibold text-white">Danger Zone</h3>
        </div>
        <p className="text-xs text-[#666666]">Once you delete your account, there is no going back. Please be certain.</p>
        <button className="px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-lg text-xs font-semibold hover:bg-red-500/20 transition-colors">
          Delete Account
        </button>
      </div>

      {/* Settings Configuration Slide-over */}
      <AnimatePresence>
        {activeSection && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSection(null)}
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
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2a2a2a] flex items-center justify-center text-emerald-500">
                    {React.createElement(settingsSections.find(s => s.id === activeSection)?.icon || User, { size: 18 })}
                  </div>
                  <h2 className="text-lg font-semibold text-white">
                    {settingsSections.find(s => s.id === activeSection)?.name}
                  </h2>
                </div>
                <button 
                  onClick={() => setActiveSection(null)}
                  className="text-[#666666] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6">
                {renderSectionContent()}
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-border flex items-center gap-3">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  {isSaving ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <Save size={16} />
                      Save Changes
                    </>
                  )}
                </button>
                <button 
                  onClick={() => setActiveSection(null)}
                  className="flex-1 bg-[#2a2a2a] border border-[#3a3a3a] text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-[#333333] transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
