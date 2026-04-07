import React from 'react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Bell, 
  Share2, 
  Megaphone,
  Settings, 
  HelpCircle, 
  LogOut
} from 'lucide-react';
import { cn } from '../lib/utils';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

const navGroups = [
  {
    title: 'Monitoring',
    items: [
      { name: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'Active Trends', icon: TrendingUp, path: '/dashboard/trends' },
      { name: 'Social Feeds', icon: Share2, path: '/dashboard/feeds' },
    ]
  },
  {
    title: 'Marketing',
    items: [
      { name: 'Alerts', icon: Bell, path: '/dashboard/alerts' },
      { name: 'Campaigns', icon: Megaphone, path: '/dashboard/campaigns' },
    ]
  },
  {
    title: 'System',
    items: [
      { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
      { name: 'Support', icon: HelpCircle, path: '/dashboard/support' },
    ]
  }
];

export function Sidebar() {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <aside className="w-56 bg-surface border-r border-[#333333] flex flex-col h-screen sticky top-0 shrink-0">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <TrendingUp size={18} className="text-black" />
        </div>
        <span className="text-white font-semibold tracking-tight">TrendPulse AI</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-2 overflow-y-auto">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-[#666666]">
              {group.title}
            </h3>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    end={item.path === '/dashboard'}
                    className={({ isActive }) => cn(
                      "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all duration-200 group",
                      isActive 
                        ? "bg-emerald-500/15 text-emerald-500" 
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    {({ isActive }) => (
                      <>
                        <item.icon size={18} className={cn(
                          "transition-colors",
                          isActive ? "text-emerald-500" : "text-[#666666] group-hover:text-white"
                        )} />
                        <span className="font-medium">{item.name}</span>
                        {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-emerald-500" />}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile Card */}
      <div className="p-4 border-t border-[#333333]">
        <div className="bg-[#2a2a2a] p-3 rounded-xl flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-emerald-400 p-[2px]">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="w-full h-full rounded-full border-2 border-[#2a2a2a] object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-white truncate">{user.name}</p>
            <div className="flex items-center gap-1">
              <span className="text-[10px] font-bold text-emerald-500 uppercase">{user.plan}</span>
            </div>
          </div>
          <button 
            onClick={logout}
            className="text-[#666666] hover:text-white transition-colors"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
}
