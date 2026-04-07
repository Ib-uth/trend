import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Zap, 
  Shield, 
  BarChart3, 
  Globe, 
  MessageSquare, 
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Users,
  Star
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { cn } from '../lib/utils';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-emerald-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <TrendingUp size={18} className="text-black" />
            </div>
            <span className="text-xl font-bold tracking-tighter uppercase italic">TrendPulse AI</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Features</a>
            <a href="#solutions" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Solutions</a>
            <a href="#pricing" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Pricing</a>
            <a href="#about" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">About</a>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">Sign In</Link>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-emerald-500 hover:bg-emerald-600 text-black px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-500/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6">
              Next-Gen Trend Intelligence
            </span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-8 leading-[0.9]">
              Predict the <span className="text-emerald-500 italic">Unpredictable</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-400 mb-10 leading-relaxed">
              TrendPulse AI leverages advanced neural networks to identify viral signals across African social media before they hit the mainstream.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 transition-all shadow-xl shadow-emerald-500/20"
              >
                Start Free Trial
                <ArrowRight size={18} />
              </button>
              <button className="w-full sm:w-auto bg-white/5 hover:bg-white/10 border border-white/10 px-8 py-4 rounded-full text-base font-bold flex items-center justify-center gap-2 transition-all">
                <PlayCircle size={18} />
                Watch Demo
              </button>
            </div>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-20 relative"
          >
            <div className="relative z-10 bg-[#0a0a0a] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <img 
                src="https://picsum.photos/seed/dashboard/1200/800?blur=2" 
                alt="Dashboard Preview" 
                className="w-full opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
              
              {/* Floating UI Elements */}
              <div className="absolute top-10 left-10 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    <Zap size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Live Signal</p>
                    <p className="text-sm font-bold">#DettyDecember +120%</p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-10 right-10 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-xl hidden lg:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-500">
                    <BarChart3 size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Sentiment</p>
                    <p className="text-sm font-bold">82% Positive Index</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 blur-[60px] rounded-full" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Active Users', value: '50K+' },
              { label: 'Signals/Day', value: '1.2M' },
              { label: 'Accuracy', value: '98.4%' },
              { label: 'Regions', value: '15+' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-5xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Engineered for <span className="text-emerald-500 italic">Speed</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Our platform combines real-time data ingestion with proprietary AI models to give you an unfair advantage in the attention economy.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="text-emerald-500" />,
                title: 'Cross-Platform Ingestion',
                desc: 'Monitor Twitter, TikTok, WhatsApp, and Instagram in a single unified stream.'
              },
              {
                icon: <Zap className="text-blue-500" />,
                title: 'Real-time Velocity',
                desc: 'Track how fast a trend is spreading with our proprietary velocity index.'
              },
              {
                icon: <Shield className="text-purple-500" />,
                title: 'Risk Mitigation',
                desc: 'Identify negative sentiment early to protect your brand reputation.'
              },
              {
                icon: <MessageSquare className="text-orange-500" />,
                title: 'Influencer Mapping',
                desc: 'Discover the key accounts driving the conversation in any niche.'
              },
              {
                icon: <BarChart3 className="text-pink-500" />,
                title: 'Deep Analytics',
                desc: 'Export comprehensive reports with engagement, reach, and ROI metrics.'
              },
              {
                icon: <Users className="text-yellow-500" />,
                title: 'Team Collaboration',
                desc: 'Share insights and coordinate campaigns across your entire agency.'
              }
            ].map((feature, i) => (
              <div key={i} className="p-8 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.05] transition-all group">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-32 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Simple, <span className="text-emerald-500 italic">Transparent</span> Pricing</h2>
            <p className="text-gray-400">Choose the plan that fits your agency's scale.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: 'Starter',
                price: '$49',
                features: ['5 Active Trends', 'Standard Support', 'Basic Analytics', '1 User']
              },
              {
                name: 'Professional',
                price: '$149',
                popular: true,
                features: ['Unlimited Trends', 'Priority Support', 'Advanced AI Insights', '5 Users', 'Custom Reports']
              },
              {
                name: 'Enterprise',
                price: 'Custom',
                features: ['Full API Access', 'Dedicated Manager', 'White-labeling', 'Unlimited Users', 'SLA Guarantee']
              }
            ].map((plan, i) => (
              <div 
                key={i} 
                className={cn(
                  "p-8 rounded-3xl border transition-all",
                  plan.popular 
                    ? "bg-white/5 border-emerald-500/50 shadow-2xl shadow-emerald-500/10 scale-105" 
                    : "bg-white/[0.03] border-white/10"
                )}
              >
                {plan.popular && (
                  <span className="inline-block px-3 py-1 rounded-full bg-emerald-500 text-black text-[10px] font-bold uppercase tracking-widest mb-4">
                    Most Popular
                  </span>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  {plan.price !== 'Custom' && <span className="text-gray-500 text-sm">/mo</span>}
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-gray-400">
                      <CheckCircle2 size={16} className="text-emerald-500" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => navigate('/signup')}
                  className={cn(
                    "w-full py-3 rounded-full text-sm font-bold transition-all",
                    plan.popular 
                      ? "bg-emerald-500 hover:bg-emerald-600 text-black shadow-lg shadow-emerald-500/20" 
                      : "bg-white/10 hover:bg-white/20 text-white"
                  )}
                >
                  Get Started
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <TrendingUp size={18} className="text-black" />
                </div>
                <span className="text-xl font-bold tracking-tighter uppercase italic">TrendPulse AI</span>
              </div>
              <p className="text-gray-500 max-w-sm leading-relaxed">
                The leading trend intelligence platform for modern marketing agencies in Africa. Built for speed, accuracy, and impact.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Roadmap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Company</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 border-t border-white/5">
            <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
              &copy; 2026 TrendPulse AI. All rights reserved.
            </p>
            <div className="flex items-center gap-8 text-[10px] font-bold text-gray-600 uppercase tracking-[0.2em]">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
