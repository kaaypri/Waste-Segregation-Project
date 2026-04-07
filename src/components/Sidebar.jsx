import { LayoutDashboard, FileText, BarChart2, BellRing, Settings, X, Leaf, BookOpen, User, Info } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { id: 'overview', name: 'Project Overview', icon: Info },
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'householdLogs', name: 'Waste Logs', icon: FileText },
  { id: 'analytics', name: 'Compliance', icon: BarChart2 },
  { id: 'alerts', name: 'Alerts', icon: BellRing },
  { id: 'wasteEducation', name: 'Education Portal', icon: BookOpen },
  { id: 'settings', name: 'Settings', icon: Settings },
];

export default function Sidebar({ isOpen, setIsOpen, activeTab, setActiveTab }) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={clsx(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl lg:static lg:block transform transition-transform duration-300 ease-in-out border-r border-gray-100 flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 bg-emerald-700 text-white rounded-tr-xl lg:rounded-none shrink-0">
          <div className="flex items-center gap-2 font-bold text-lg tracking-wide">
            <Leaf className="w-6 h-6 text-amber-400" />
            <span>Waste Segregation</span>
          </div>
          <button 
            className="lg:hidden text-white/80 hover:text-white"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2 flex-col flex-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if(window.innerWidth < 1024) setIsOpen(false);
              }}
              className={clsx(
                "flex items-center w-full gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors",
                activeTab === item.id
                  ? "bg-emerald-50 text-emerald-700 shadow-sm" 
                  : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
              )}
            >
              <item.icon className={clsx("w-5 h-5", activeTab === item.id ? "text-emerald-600" : "text-slate-400")} />
              {item.name}
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-100 shrink-0">
          <button
            onClick={() => {
              setActiveTab('userAccount');
              if(window.innerWidth < 1024) setIsOpen(false);
            }}
            className={clsx(
              "flex items-center w-full gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-colors mb-4",
              activeTab === 'userAccount'
                ? "bg-emerald-50 text-emerald-700 shadow-sm" 
                : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
            )}
          >
            <User className={clsx("w-5 h-5", activeTab === 'userAccount' ? "text-emerald-600" : "text-slate-400")} />
            Officer Profile
          </button>

          <div className="bg-emerald-50 rounded-xl p-4 text-center">
            <Leaf className="w-8 h-8 mx-auto text-emerald-600 mb-2" />
            <p className="text-xs font-medium text-emerald-800">Together for a greener tomorrow.</p>
          </div>
        </div>
      </aside>
    </>
  );
}
