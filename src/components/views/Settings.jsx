import React from 'react';
import { Bell, Globe, Moon, Shield, Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold p-3 text-slate-800">Settings</h2>
          <p className="px-3 text-slate-500 text-sm">Manage your preferences and platform configuration.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm font-medium">
          <Save className="w-4 h-4" />
          Save Changes
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
        {/* Notifications Setting */}
        <div className="p-6 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-lg">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Email Notifications</h3>
              <p className="text-sm text-slate-500">Receive daily summary reports and critical alerts via email.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Region Setting */}
        <div className="p-6 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg">
              <Globe className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">System Language Region</h3>
              <p className="text-sm text-slate-500">Set the default language used across the dashboard.</p>
            </div>
          </div>
          <select className="bg-gray-50 border border-gray-200 text-slate-900 text-sm rounded-lg focus:ring-emerald-500 focus:border-emerald-500 block p-2.5 outline-none font-medium">
            <option>English (US)</option>
            <option>Hindi (IN)</option>
            <option>Spanish (ES)</option>
          </select>
        </div>

        {/* Theme Setting */}
        <div className="p-6 flex items-start sm:items-center justify-between gap-4 flex-col sm:flex-row">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-lg">
              <Moon className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-800">Dark Mode (Beta)</h3>
              <p className="text-sm text-slate-500">Switch the visual theme of the dashboard to dark mode.</p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
          </label>
        </div>

        {/* Security Info */}
        <div className="p-6 flex items-center gap-4">
          <div className="p-3 bg-slate-100 text-slate-600 rounded-lg">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">Security & Privacy</h3>
            <p className="text-sm text-slate-500 mb-2">Your account is secured with 2FA. Last login was 2 hours ago.</p>
            <button className="text-sm text-emerald-600 font-medium hover:underline">Manage Security Settings ↗</button>
          </div>
        </div>
      </div>
    </div>
  );
}
