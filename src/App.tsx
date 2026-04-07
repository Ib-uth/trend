import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import Dashboard from './pages/Dashboard';
import ActiveTrends from './pages/ActiveTrends';
import SocialFeeds from './pages/SocialFeeds';
import Alerts from './pages/Alerts';
import Campaigns from './pages/Campaigns';
import TrendDetail from './pages/TrendDetail';
import Settings from './pages/Settings';
import Support from './pages/Support';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import LandingPage from './pages/LandingPage';
import { AuthProvider, useAuth } from './lib/AuthContext';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function AppLayout() {
  return (
    <div className="flex min-h-screen bg-bg">
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        <Header />
        
        <div className="flex-1 overflow-y-auto p-6">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/trends" element={<ActiveTrends />} />
            <Route path="/feeds" element={<SocialFeeds />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/campaigns" element={<Campaigns />} />
            <Route path="/trends/:id" element={<TrendDetail />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/support" element={<Support />} />
          </Routes>

          {/* Global Footer Info */}
          <footer className="mt-12 pt-8 pb-4 flex items-center justify-between border-t border-border">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#666666]">
              &copy; 2026 TrendPulse AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-[#666666]">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route 
            path="/dashboard/*" 
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            } 
          />
          {/* Redirect old root to dashboard */}
          <Route path="/home" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
