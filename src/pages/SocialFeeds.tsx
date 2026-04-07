import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  MoreVertical, 
  X, 
  Download, 
  Twitter, 
  TrendingUp, 
  MessageCircle, 
  Heart, 
  Share2, 
  MessageSquare,
  ExternalLink,
  AlertCircle,
  Filter,
  RefreshCw,
  Activity,
  BarChart3,
  Zap,
  Sparkles,
  Bookmark
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { cn } from '../lib/utils';
import { initialSignals, SocialSignal, initialAlerts } from '../constants';
interface AISummary {
  topic: string;
  platform: string;
  sentimentScore: number;
  summary: string;
}

const trendingData = [
  { time: '12:00', LagosTech: 400, JollofWars: 240, StartupFunding: 240, sentiment: 75 },
  { time: '13:00', LagosTech: 300, JollofWars: 139, StartupFunding: 221, sentiment: 68 },
  { time: '14:00', LagosTech: 200, JollofWars: 980, StartupFunding: 229, sentiment: 82 },
  { time: '15:00', LagosTech: 278, JollofWars: 390, StartupFunding: 200, sentiment: 70 },
  { time: '16:00', LagosTech: 189, JollofWars: 480, StartupFunding: 218, sentiment: 65 },
  { time: '17:00', LagosTech: 239, JollofWars: 380, StartupFunding: 250, sentiment: 78 },
  { time: '18:00', LagosTech: 349, JollofWars: 430, StartupFunding: 210, sentiment: 85 },
];

const extraMockSignals: SocialSignal[] = [
  {
    id: 101,
    platform: 'Twitter',
    author: '@TechNaija',
    content: 'The new startup funding round is a game changer for the ecosystem. #LagosTech',
    engagement: '8.1K',
    likes: 5200,
    shares: 1800,
    comments: 1100,
    totalEngagement: 8100,
    sentiment: 'Positive',
    sentimentScore: 94,
    timestamp: 'Just now',
    avatar: 'https://i.pravatar.cc/150?u=tech'
  },
  {
    id: 102,
    platform: 'TikTok',
    author: 'Chef_Chi',
    content: 'Jollof rice battle: Nigeria vs Ghana. Who wins? 🥘 #JollofWars',
    engagement: '120K',
    likes: 85000,
    shares: 25000,
    comments: 10000,
    totalEngagement: 120000,
    sentiment: 'Neutral',
    sentimentScore: 52,
    timestamp: 'Just now',
    avatar: 'https://i.pravatar.cc/150?u=chef'
  },
  {
    id: 103,
    platform: 'WhatsApp',
    author: 'Viral News',
    content: 'Breaking: Major road closure in Ikeja due to construction. Plan your route!',
    engagement: 'High',
    likes: 0,
    shares: 4500,
    comments: 0,
    totalEngagement: 4500,
    sentiment: 'Negative',
    sentimentScore: 12,
    timestamp: 'Just now',
    avatar: 'https://i.pravatar.cc/150?u=news'
  },
  {
    id: 104,
    platform: 'WhatsApp',
    author: 'Family Group',
    content: 'Did you guys see the new policy update? Everyone is talking about it in the other groups.',
    engagement: 'Viral',
    likes: 0,
    shares: 12000,
    comments: 0,
    totalEngagement: 12000,
    sentiment: 'Neutral',
    sentimentScore: 45,
    timestamp: 'Just now',
    avatar: 'https://i.pravatar.cc/150?u=family'
  },
  {
    id: 105,
    platform: 'WhatsApp',
    author: 'Market Updates',
    content: 'Price of tomatoes has dropped significantly in Mile 12 market today! 🍅',
    engagement: 'High',
    likes: 0,
    shares: 3200,
    comments: 0,
    totalEngagement: 3200,
    sentiment: 'Positive',
    sentimentScore: 85,
    timestamp: 'Just now',
    avatar: 'https://i.pravatar.cc/150?u=market'
  }
];

export default function SocialFeeds() {
  const [signals, setSignals] = useState<SocialSignal[]>(initialSignals);
  const [selectedSignal, setSelectedSignal] = useState<SocialSignal | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<'All' | 'Twitter' | 'TikTok' | 'WhatsApp'>('All');
  const [sentimentFilter, setSentimentFilter] = useState<'All' | 'Positive' | 'Neutral' | 'Negative'>('All');
  const [engagementFilter, setEngagementFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');
  const [sortBy, setSortBy] = useState<'Newest' | 'Engagement'>('Newest');
  const [isLive, setIsLive] = useState(true);
  const [aiSummaries, setAiSummaries] = useState<AISummary[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [bookmarkedSignals, setBookmarkedSignals] = useState<Set<number>>(new Set());

  const toggleBookmark = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setBookmarkedSignals(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  useEffect(() => {
    async function generateSummaries() {
      setIsLoadingAI(true);
      try {
        // Mock AI summaries for demo purposes
        const summaries: AISummary[] = initialAlerts.slice(0, 3).map((alert, index) => ({
          topic: alert,
          platform: ['Twitter', 'Reddit', 'LinkedIn'][index % 3],
          sentimentScore: Math.floor(Math.random() * 40) + 60,
          summary: `Analysis of ${alert} trends shows ${Math.floor(Math.random() * 50) + 50}% positive sentiment across social platforms.`
        }));
        setAiSummaries(summaries);
      } catch (error) {
        console.error("Failed to generate AI summaries:", error);
        // Fallback data if AI fails
        setAiSummaries([
          { topic: "#DettyDecember", platform: "Twitter", sentimentScore: 92, summary: "Festive vibes peaking in Lagos as holiday events drive massive engagement." },
          { topic: "Ojapiano Challenge", platform: "TikTok", sentimentScore: 88, summary: "Viral dance trend sweeping across Nigeria with high velocity growth." },
          { topic: "Fuel Subsidy", platform: "Twitter", sentimentScore: 35, summary: "Economic policy debates continue to spark intense conversations online." }
        ]);
      } finally {
        setIsLoadingAI(false);
      }
    }

    generateSummaries();
  }, []);

  // Simulate real-time updates
  useEffect(() => {
    if (!isLive) return;

    const interval = setInterval(() => {
      const randomExtra = extraMockSignals[Math.floor(Math.random() * extraMockSignals.length)];
      
      const likes = randomExtra.platform === 'WhatsApp' ? 0 : Math.floor(Math.random() * 5000);
      const shares = Math.floor(Math.random() * 2000);
      const comments = randomExtra.platform === 'WhatsApp' ? 0 : Math.floor(Math.random() * 1000);
      const total = likes + shares + comments;

      const newSignal: SocialSignal = {
        ...randomExtra,
        id: Date.now(),
        likes,
        shares,
        comments,
        totalEngagement: total,
        engagement: total > 1000 ? `${(total / 1000).toFixed(1)}K` : total.toString(),
        sentimentScore: randomExtra.sentiment === 'Positive' ? Math.floor(Math.random() * 20) + 80 :
                        randomExtra.sentiment === 'Negative' ? Math.floor(Math.random() * 20) + 5 :
                        Math.floor(Math.random() * 20) + 40,
        timestamp: 'Just now'
      };
      
      setSignals(prev => [newSignal, ...prev.slice(0, 14)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isLive]);

  const filteredSignals = useMemo(() => {
    let result = signals.filter(s => {
      const matchesSearch = s.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           s.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPlatform = platformFilter === 'All' || s.platform === platformFilter;
      const matchesSentiment = sentimentFilter === 'All' || s.sentiment === sentimentFilter;
      
      let matchesEngagement = true;
      if (engagementFilter === 'High') matchesEngagement = s.totalEngagement >= 10000;
      else if (engagementFilter === 'Medium') matchesEngagement = s.totalEngagement >= 1000 && s.totalEngagement < 10000;
      else if (engagementFilter === 'Low') matchesEngagement = s.totalEngagement < 1000;

      return matchesSearch && matchesPlatform && matchesSentiment && matchesEngagement;
    });

    if (sortBy === 'Engagement') {
      result = [...result].sort((a, b) => b.totalEngagement - a.totalEngagement);
    } else {
      // Newest is default as they are added to the front of the array
      // But for initial signals we might need explicit sort if they have real timestamps
      // For now, the simulation handles Newest by unshifting
    }

    return result;
  }, [signals, searchQuery, platformFilter, sentimentFilter, sortBy]);

  return (
    <div className="space-y-6 relative">
      <div className="flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-2xl font-semibold text-white">Social Feeds</h1>
          <p className="text-sm text-[#666666]">Real-time stream of viral signals across African social media.</p>
        </motion.div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-[#1a1a1a] border border-border rounded-lg px-3 py-1.5">
            <div className={cn(
              "w-2 h-2 rounded-full",
              isLive ? "bg-emerald-500 animate-pulse" : "bg-red-500"
            )} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-white">
              {isLive ? 'Live Stream' : 'Paused'}
            </span>
            <button 
              onClick={() => setIsLive(!isLive)}
              className="ml-2 text-[#666666] hover:text-white transition-colors"
            >
              <RefreshCw size={12} className={cn(isLive && "animate-spin-slow")} />
            </button>
          </div>
          <button 
            className="bg-[#2a2a2a] border border-[#3a3a3a] hover:bg-[#333333] text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <Download size={14} />
            Export Feed
          </button>
        </div>
      </div>

      {/* Trending Analysis Chart */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 bg-surface border border-border p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <BarChart3 size={20} />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Engagement Peaks</h3>
                <p className="text-xs text-[#666666]">Hourly volume of top viral hashtags</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#666666]">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>#LagosTech</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span>#JollofWars</span>
              </div>
            </div>
          </div>

          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorLagos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorJollof" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a2a" vertical={false} />
                <XAxis 
                  dataKey="time" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666666', fontSize: 10, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#666666', fontSize: 10, fontWeight: 600 }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #333', 
                    borderRadius: '12px',
                    fontSize: '12px',
                    color: '#fff'
                  }}
                  itemStyle={{ fontSize: '11px', fontWeight: 600 }}
                />
                <Area 
                  type="monotone" 
                  dataKey="LagosTech" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorLagos)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="JollofWars" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorJollof)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-4 bg-surface border border-border p-6 rounded-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
              <Zap size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Sentiment Pulse</h3>
              <p className="text-xs text-[#666666]">Real-time audience mood index</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-bold text-white">82%</span>
                <span className="text-xs text-emerald-500 ml-2 font-bold">+5.2%</span>
              </div>
              <span className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Positive Index</span>
            </div>

            <div className="h-2 w-full bg-[#2a2a2a] rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '82%' }}
                className="h-full bg-emerald-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Top Topic</p>
                <p className="text-sm font-bold text-white">#JollofWars</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Velocity</p>
                <p className="text-sm font-bold text-blue-400">Extreme</p>
              </div>
            </div>

            <div className="bg-blue-500/5 border border-blue-500/10 p-4 rounded-xl">
              <p className="text-[11px] text-blue-400 leading-relaxed">
                <strong>AI Alert:</strong> Sentiment for #JollofWars has spiked in the last 15 minutes. High engagement from West African regions detected.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Trend Summaries Section */}
      <div className="bg-surface border border-border rounded-xl p-6 space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">AI Trend Intelligence</h3>
            <p className="text-xs text-[#666666]">Automated summaries of top trending topics from the last 24h</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {isLoadingAI ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-[#1a1a1a] border border-border rounded-2xl p-5 space-y-4 animate-pulse">
                <div className="h-4 w-24 bg-[#2a2a2a] rounded" />
                <div className="h-3 w-full bg-[#2a2a2a] rounded" />
                <div className="h-3 w-2/3 bg-[#2a2a2a] rounded" />
              </div>
            ))
          ) : (
            aiSummaries.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#1a1a1a] border border-border rounded-2xl p-5 space-y-4 hover:border-emerald-500/30 transition-colors group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{item.topic}</span>
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">{item.platform}</span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  {item.summary}
                </p>
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-[#2a2a2a] rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          item.sentimentScore > 70 ? "bg-emerald-500" : item.sentimentScore > 40 ? "bg-blue-500" : "bg-red-500"
                        )}
                        style={{ width: `${item.sentimentScore}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-[#666666]">{item.sentimentScore}%</span>
                  </div>
                  <span className="text-[10px] font-bold text-[#666666] uppercase tracking-widest">Sentiment</span>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>

      {/* Live Twitter Pulse Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20">
              <Twitter size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live Twitter Pulse</h3>
              <p className="text-xs text-[#666666]">Real-time signals from the X ecosystem</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-400 bg-blue-500/5 px-3 py-1 rounded-full border border-blue-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Streaming Live
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {signals
              .filter(s => s.platform === 'Twitter')
              .slice(0, 3)
              .map((tweet, i) => (
                <motion.div 
                  key={tweet.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-surface border border-border rounded-2xl p-5 space-y-4 hover:border-blue-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={tweet.avatar} 
                        alt="" 
                        className="w-10 h-10 rounded-full object-cover border border-border" 
                        referrerPolicy="no-referrer" 
                      />
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">{tweet.author}</p>
                        <p className="text-[10px] text-[#666666]">{tweet.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(e, tweet.id);
                        }}
                        className={cn(
                          "transition-colors",
                          bookmarkedSignals.has(tweet.id) ? "text-emerald-500" : "text-[#666666] hover:text-white"
                        )}
                      >
                        <Bookmark size={14} fill={bookmarkedSignals.has(tweet.id) ? "currentColor" : "none"} />
                      </button>
                      <Twitter size={14} className="text-blue-400/50" />
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 italic">
                    "{tweet.content}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[#666666]">
                        <Heart size={10} className="group-hover:text-pink-500 transition-colors" />
                        <span className="text-[9px] font-bold">{tweet.likes > 1000 ? `${(tweet.likes/1000).toFixed(1)}K` : tweet.likes}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#666666]">
                        <Share2 size={10} className="group-hover:text-blue-400 transition-colors" />
                        <span className="text-[9px] font-bold">{tweet.shares > 1000 ? `${(tweet.shares/1000).toFixed(1)}K` : tweet.shares}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#666666]">
                        <MessageSquare size={10} className="group-hover:text-emerald-400 transition-colors" />
                        <span className="text-[9px] font-bold">{tweet.comments > 1000 ? `${(tweet.comments/1000).toFixed(1)}K` : tweet.comments}</span>
                      </div>
                    </div>
                    <div className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-tighter",
                      tweet.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      tweet.sentiment === 'Negative' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    )}>
                      {tweet.sentiment}
                    </div>
                  </div>

                  {/* Decorative background element */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/10 transition-colors" />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Live WhatsApp Pulse Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 border border-emerald-500/20">
              <MessageCircle size={20} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Live WhatsApp Pulse</h3>
              <p className="text-xs text-[#666666]">Real-time signals from private groups and communities</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/5 px-3 py-1 rounded-full border border-emerald-500/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Monitoring Streams
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {signals
              .filter(s => s.platform === 'WhatsApp')
              .slice(0, 3)
              .map((wa, i) => (
                <motion.div 
                  key={wa.id}
                  layout
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  className="bg-surface border border-border rounded-2xl p-5 space-y-4 hover:border-emerald-500/30 transition-all group relative overflow-hidden"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img 
                        src={wa.avatar} 
                        alt="" 
                        className="w-10 h-10 rounded-full object-cover border border-border" 
                        referrerPolicy="no-referrer" 
                      />
                      <div>
                        <p className="text-sm font-bold text-white group-hover:text-emerald-400 transition-colors">{wa.author}</p>
                        <p className="text-[10px] text-[#666666]">{wa.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(e, wa.id);
                        }}
                        className={cn(
                          "transition-colors",
                          bookmarkedSignals.has(wa.id) ? "text-emerald-500" : "text-[#666666] hover:text-white"
                        )}
                      >
                        <Bookmark size={14} fill={bookmarkedSignals.has(wa.id) ? "currentColor" : "none"} />
                      </button>
                      <MessageCircle size={14} className="text-emerald-400/50" />
                    </div>
                  </div>

                  <p className="text-xs text-gray-300 leading-relaxed line-clamp-3 italic">
                    "{wa.content}"
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-[#666666]">
                        <Share2 size={10} className="group-hover:text-emerald-400 transition-colors" />
                        <span className="text-[9px] font-bold">{wa.shares > 1000 ? `${(wa.shares/1000).toFixed(1)}K` : wa.shares}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[#666666]">
                        <Activity size={10} className="group-hover:text-emerald-400 transition-colors" />
                        <span className="text-[9px] font-bold">Velocity</span>
                      </div>
                    </div>
                    <div className={cn(
                      "text-[9px] font-bold px-2 py-0.5 rounded-md border uppercase tracking-tighter",
                      wa.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                      wa.sentiment === 'Negative' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                      'bg-blue-500/10 text-blue-500 border-blue-500/20'
                    )}>
                      {wa.sentiment}
                    </div>
                  </div>

                  {/* Decorative background element */}
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-colors" />
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex-1 w-full">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]" />
            <input 
              type="text" 
              placeholder="Search viral content, handles or keywords..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-emerald-500/50"
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="flex items-center bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2 flex-1 md:flex-none">
              <Filter size={14} className="text-[#666666] mr-2" />
              <select 
                value={platformFilter}
                onChange={(e) => setPlatformFilter(e.target.value as any)}
                className="bg-transparent py-2 text-xs text-white focus:outline-none cursor-pointer w-full"
              >
                <option value="All" className="bg-[#2a2a2a]">All Platforms</option>
                <option value="Twitter" className="bg-[#2a2a2a]">Twitter (X)</option>
                <option value="TikTok" className="bg-[#2a2a2a]">TikTok</option>
                <option value="WhatsApp" className="bg-[#2a2a2a]">WhatsApp</option>
              </select>
            </div>

            <div className="flex items-center bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2 flex-1 md:flex-none">
              <Activity size={14} className="text-[#666666] mr-2" />
              <select 
                value={sentimentFilter}
                onChange={(e) => setSentimentFilter(e.target.value as any)}
                className="bg-transparent py-2 text-xs text-white focus:outline-none cursor-pointer w-full"
              >
                <option value="All" className="bg-[#2a2a2a]">All Sentiment</option>
                <option value="Positive" className="bg-[#2a2a2a]">Positive</option>
                <option value="Neutral" className="bg-[#2a2a2a]">Neutral</option>
                <option value="Negative" className="bg-[#2a2a2a]">Negative</option>
              </select>
            </div>

            <div className="flex items-center bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2 flex-1 md:flex-none">
              <Zap size={14} className="text-[#666666] mr-2" />
              <select 
                value={engagementFilter}
                onChange={(e) => setEngagementFilter(e.target.value as any)}
                className="bg-transparent py-2 text-xs text-white focus:outline-none cursor-pointer w-full"
              >
                <option value="All" className="bg-[#2a2a2a]">All Engagement</option>
                <option value="High" className="bg-[#2a2a2a]">High (&gt;10K)</option>
                <option value="Medium" className="bg-[#2a2a2a]">Medium (1K-10K)</option>
                <option value="Low" className="bg-[#2a2a2a]">Low (&lt;1K)</option>
              </select>
            </div>

            <div className="flex items-center bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg px-2 flex-1 md:flex-none">
              <BarChart3 size={14} className="text-[#666666] mr-2" />
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent py-2 text-xs text-white focus:outline-none cursor-pointer w-full"
              >
                <option value="Newest" className="bg-[#2a2a2a]">Newest First</option>
                <option value="Engagement" className="bg-[#2a2a2a]">Top Engagement</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#1a1a1a]/50 text-[10px] font-bold uppercase tracking-widest text-[#666666]">
                <th className="p-4">Author</th>
                <th className="p-4">Platform</th>
                <th className="p-4">Content</th>
                <th className="p-4">Engagement</th>
                <th className="p-4">Sentiment</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <AnimatePresence initial={false}>
                {filteredSignals.map((signal) => (
                  <motion.tr 
                    key={signal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    layout
                    onClick={() => setSelectedSignal(signal)}
                    className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={signal.avatar} alt="" className="w-10 h-10 rounded-full object-cover border border-border" referrerPolicy="no-referrer" />
                        <span className="text-sm font-medium text-white group-hover:text-emerald-400 transition-colors">{signal.author}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {signal.platform === 'Twitter' ? <Twitter size={14} className="text-blue-400" /> : 
                         signal.platform === 'TikTok' ? <TrendingUp size={14} className="text-pink-400" /> : 
                         <MessageCircle size={14} className="text-emerald-400" />}
                        <span className="text-[10px] font-bold text-[#666666] uppercase">{signal.platform}</span>
                      </div>
                    </td>
                    <td className="p-4 max-w-xs">
                      <p className="text-xs text-gray-300 line-clamp-2">{signal.content}</p>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm text-emerald-400 font-medium">{signal.engagement}</span>
                        <div className="flex items-center gap-2 text-[9px] text-[#666666] font-bold uppercase tracking-tighter">
                          <span className="flex items-center gap-0.5"><Heart size={8} /> {signal.likes > 1000 ? `${(signal.likes/1000).toFixed(1)}K` : signal.likes}</span>
                          <span className="flex items-center gap-0.5"><Share2 size={8} /> {signal.shares > 1000 ? `${(signal.shares/1000).toFixed(1)}K` : signal.shares}</span>
                          <span className="flex items-center gap-0.5"><MessageSquare size={8} /> {signal.comments > 1000 ? `${(signal.comments/1000).toFixed(1)}K` : signal.comments}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex items-center gap-2">
                          <span className={cn(
                            "text-[10px] font-bold px-2 py-0.5 rounded-md border uppercase",
                            signal.sentiment === 'Positive' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                            signal.sentiment === 'Negative' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                            'bg-blue-500/10 text-blue-500 border-blue-500/20'
                          )}>
                            {signal.sentiment}
                          </span>
                          <span className="text-[10px] font-bold text-white/50">{signal.sentimentScore}%</span>
                        </div>
                        <div className="h-1 w-20 bg-[#2a2a2a] rounded-full overflow-hidden">
                          <div 
                            className={cn(
                              "h-full transition-all duration-500",
                              signal.sentiment === 'Positive' ? 'bg-emerald-500' :
                              signal.sentiment === 'Negative' ? 'bg-red-500' :
                              'bg-blue-500'
                            )}
                            style={{ width: `${signal.sentimentScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={(e) => toggleBookmark(e, signal.id)}
                          className={cn(
                            "transition-colors",
                            bookmarkedSignals.has(signal.id) ? "text-emerald-500" : "text-[#666666] hover:text-white"
                          )}
                        >
                          <Bookmark size={16} fill={bookmarkedSignals.has(signal.id) ? "currentColor" : "none"} />
                        </button>
                        <button className="text-[#666666] hover:text-white transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
              {filteredSignals.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center">
                    <div className="flex flex-col items-center gap-2 text-[#666666]">
                      <Search size={24} />
                      <p className="text-sm">No signals found matching your filters.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Signal Detail Slide-over */}
      <AnimatePresence>
        {selectedSignal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSignal(null)}
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
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-white">Signal Analysis</h2>
                  <button 
                    onClick={(e) => toggleBookmark(e, selectedSignal.id)}
                    className={cn(
                      "transition-colors",
                      bookmarkedSignals.has(selectedSignal.id) ? "text-emerald-500" : "text-[#666666] hover:text-white"
                    )}
                  >
                    <Bookmark size={18} fill={bookmarkedSignals.has(selectedSignal.id) ? "currentColor" : "none"} />
                  </button>
                </div>
                <button 
                  onClick={() => setSelectedSignal(null)}
                  className="text-[#666666] hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                <div className="flex items-center gap-4">
                  <img src={selectedSignal.avatar} alt="" className="w-16 h-16 rounded-2xl border border-border shadow-lg object-cover" referrerPolicy="no-referrer" />
                  <div>
                    <h3 className="text-xl font-bold text-white">{selectedSignal.author}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-emerald-400 font-bold uppercase tracking-widest">{selectedSignal.platform}</span>
                      <span className="w-1 h-1 rounded-full bg-[#333333]" />
                      <span className="text-xs text-[#666666]">{selectedSignal.timestamp}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white/[0.02] border border-border rounded-2xl p-6 space-y-4">
                  <p className="text-lg text-gray-200 leading-relaxed italic">
                    "{selectedSignal.content}"
                  </p>
                  <div className="flex items-center gap-8 pt-4 border-t border-border/50">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[#666666]">
                        <Heart size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Likes</span>
                      </div>
                      <p className="text-lg font-bold text-white">{selectedSignal.likes.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[#666666]">
                        <Share2 size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Shares</span>
                      </div>
                      <p className="text-lg font-bold text-white">{selectedSignal.shares.toLocaleString()}</p>
                    </div>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-[#666666]">
                        <MessageSquare size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Replies</span>
                      </div>
                      <p className="text-lg font-bold text-white">{selectedSignal.comments.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-bold text-[#666666] uppercase tracking-[0.2em]">AI Insights</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#2a2a2a] p-4 rounded-xl space-y-1 border border-border/50">
                      <div className="flex items-center gap-2 text-emerald-400">
                        <TrendingUp size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Viral Potential</span>
                      </div>
                      <p className="text-lg font-bold text-white">High</p>
                    </div>
                    <div className="bg-[#2a2a2a] p-4 rounded-xl space-y-1 border border-border/50">
                      <div className="flex items-center gap-2 text-blue-400">
                        <AlertCircle size={14} />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Sentiment</span>
                      </div>
                      <div className="flex items-end justify-between">
                        <p className="text-lg font-bold text-white">{selectedSignal.sentiment}</p>
                        <p className="text-sm font-bold text-white/50">{selectedSignal.sentimentScore}%</p>
                      </div>
                      <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden mt-2">
                        <div 
                          className={cn(
                            "h-full transition-all duration-500",
                            selectedSignal.sentiment === 'Positive' ? 'bg-emerald-500' :
                            selectedSignal.sentiment === 'Negative' ? 'bg-red-500' :
                            'bg-blue-500'
                          )}
                          style={{ width: `${selectedSignal.sentimentScore}%` }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/10 p-4 rounded-xl">
                    <p className="text-xs text-emerald-400 leading-relaxed">
                      <strong>Marketing Advice:</strong> This signal indicates a strong resonance with local trends. Recommend immediate engagement via brand-relevant responses.
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="p-6 border-t border-border flex items-center gap-3">
                <button className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 transition-colors">
                  <TrendingUp size={16} />
                  Track Trend
                </button>
                <button className="flex-1 bg-surface border border-border text-white py-2.5 rounded-lg text-sm font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                  <ExternalLink size={16} />
                  View Original
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
