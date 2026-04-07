import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import HouseholdLogs from './components/views/HouseholdLogs';
import Analytics from './components/views/Analytics';
import Alerts from './components/views/Alerts';
import Settings from './components/views/Settings';
import UserAccount from './components/views/UserAccount';
import WasteEducation from './components/views/WasteEducation';
import ProjectOverview from './components/views/ProjectOverview';
import { Menu, User, Bell, Info } from 'lucide-react';
import { db } from './firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { migrateData } from './migrateToFirestore';

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [userProfile, setUserProfile] = useState({ fullName: 'Loading...', role: 'Officer' });

  React.useEffect(() => {
    // Listen to admin profile for the header
    const unsub = onSnapshot(doc(db, "users", "admin_default"), (doc) => {
      if (doc.exists()) setUserProfile(doc.data());
    });
    return () => unsub();
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview': return <ProjectOverview />;
      case 'dashboard': return <Dashboard />;
      case 'householdLogs': return <HouseholdLogs />;
      case 'analytics': return <Analytics />;
      case 'alerts': return <Alerts />;
      case 'settings': return <Settings />;
      case 'userAccount': return <UserAccount />;
      case 'wasteEducation': return <WasteEducation />;
      default: return <ProjectOverview />;
    }
  };

  const getPageTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Project Overview';
      case 'dashboard': return 'Management Dashboard';
      case 'householdLogs': return 'Waste Logs';
      case 'analytics': return 'Compliance Analytics';
      case 'alerts': return 'System Alerts';
      case 'settings': return 'System Settings';
      case 'userAccount': return 'Officer Profile';
      case 'wasteEducation': return 'Education Portal';
      default: return 'Project Overview';
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
      <Sidebar 
        isOpen={sidebarOpen} 
        setIsOpen={setSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 sm:px-6 z-10 shadow-sm shrink-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 text-slate-500 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-800 to-emerald-600 hidden sm:block leading-tight">
              Waste Segregation Management System
            </h2>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-4">
            <button 
              onClick={() => setActiveTab('alerts')}
              className="relative p-2 text-slate-400 hover:text-emerald-600 transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full border-2 border-white"></span>
            </button>
            <div 
              onClick={() => setActiveTab('userAccount')}
              className="h-8 w-8 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center text-slate-600 cursor-pointer overflow-hidden hover:ring-2 hover:ring-emerald-500/30 transition-all"
            >
              <User className="w-5 h-5" />
            </div>
            <div className="hidden sm:block cursor-pointer" onClick={() => setActiveTab('userAccount')}>
              <p className="text-sm font-semibold text-slate-700 hover:text-emerald-700 transition">{userProfile.fullName}</p>
              <p className="text-xs text-slate-500">{userProfile.role}</p>
            </div>
          </div>
        </header>

        {/* Developer Migration Tool (Only visible in dev or via specific interaction) */}
        <div className="fixed bottom-4 right-4 z-50">
          <button 
            onClick={async () => {
              if(confirm("Start data migration to Firestore?")) {
                await migrateData();
                alert("Migration finished. Please refresh.");
              }
            }}
            className="p-2 bg-slate-800 text-white rounded-full opacity-20 hover:opacity-100 transition-opacity shadow-lg"
            title="Migrate Mock Data"
          >
            <Info className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content Area */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50/50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto h-full">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}
