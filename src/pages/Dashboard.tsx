import React from 'react';
import { motion } from 'motion/react';
import { MetricCard } from '../components/MetricCard';
import { ChartSection } from '../components/ChartSection';
import { DataTable } from '../components/DataTable';

const metrics = [
  {
    title: 'Active Trends',
    value: '24',
    change: '12.5%',
    isPositive: true,
    sparklineData: [30, 45, 35, 60, 85]
  },
  {
    title: 'Viral Reach',
    value: '1.2M',
    change: '8.2%',
    isPositive: true,
    sparklineData: [40, 30, 55, 45, 70]
  },
  {
    title: 'Alert Accuracy',
    value: '98.4%',
    change: '1.1%',
    isPositive: true,
    sparklineData: [80, 85, 90, 95, 98]
  },
  {
    title: 'Avg. Response',
    value: '4.2m',
    change: '5.4%',
    isPositive: true,
    sparklineData: [20, 40, 60, 50, 90]
  }
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold text-white">Trend Monitoring Overview</h1>
        <p className="text-sm text-[#666666]">Real-time AI analysis of Nigerian & African viral content.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
          >
            <MetricCard {...metric} />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <ChartSection />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <DataTable />
      </motion.div>
    </div>
  );
}
