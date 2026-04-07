import React from 'react';
import { motion } from 'motion/react';
import { HelpCircle, MessageCircle, FileText, Book, ExternalLink } from 'lucide-react';

const faqs = [
  { q: 'How do I upgrade my plan?', a: 'You can upgrade your plan at any time from the Billing section in Settings. Changes take effect immediately.' },
  { q: 'Can I export my data?', a: 'Yes, you can export your analytics and customer data in CSV or JSON format from their respective pages.' },
  { q: 'Is there a mobile app?', a: 'We are currently developing our mobile app. For now, our dashboard is fully responsive on mobile browsers.' },
];

export default function Support() {
  return (
    <div className="space-y-8 max-w-4xl">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl font-semibold text-white">Support Center</h1>
        <p className="text-sm text-[#666666]">We're here to help you get the most out of TrendPulse AI.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border p-6 rounded-xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <MessageCircle size={24} />
          </div>
          <h3 className="text-lg font-semibold text-white">Live Chat</h3>
          <p className="text-sm text-[#666666]">Talk to our support team in real-time. Average response time: 5 minutes.</p>
          <button className="w-full py-2 bg-emerald-500 text-black rounded-lg text-sm font-semibold hover:bg-emerald-600 transition-colors">
            Start Conversation
          </button>
        </div>

        <div className="bg-surface border border-border p-6 rounded-xl space-y-4">
          <div className="w-12 h-12 rounded-xl bg-blue-400/10 flex items-center justify-center text-blue-400">
            <FileText size={24} />
          </div>
          <h3 className="text-lg font-semibold text-white">Documentation</h3>
          <p className="text-sm text-[#666666]">Browse our extensive guides and API documentation to solve common issues.</p>
          <button className="w-full py-2 bg-[#2a2a2a] border border-[#3a3a3a] text-white rounded-lg text-sm font-semibold hover:bg-[#333333] transition-colors flex items-center justify-center gap-2">
            Read Docs
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <Book size={20} className="text-emerald-500" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-surface border border-border p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-white mb-2">{faq.q}</h4>
              <p className="text-xs text-[#666666] leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[#2a2a2a] border border-[#3a3a3a] rounded-xl p-6 text-center space-y-4">
        <h3 className="text-lg font-semibold text-white">Still need help?</h3>
        <p className="text-sm text-[#666666]">If you couldn't find what you were looking for, send us an email.</p>
        <a href="mailto:support@trendpulse.ai" className="inline-block text-emerald-500 font-semibold hover:underline">
          support@trendpulse.ai
        </a>
      </div>
    </div>
  );
}
