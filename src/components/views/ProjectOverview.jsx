import React from 'react';
import { Target, Lightbulb, FileText, CheckCircle2 } from 'lucide-react';

export default function ProjectOverview() {
  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4">
           <span className="bg-emerald-400/20 text-emerald-100 text-xs font-bold px-3 py-1 rounded-full border border-emerald-400/30">v1.2 Live</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight">
          Tech-Enabled Waste Segregation Management System
        </h1>
        <p className="text-emerald-100 text-lg max-w-2xl opacity-90">
          Reducing urban landfill burden through real-time monitoring, automated classification, and community engagement.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Problem Statement */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center mb-6">
            <FileText className="w-6 h-6 text-amber-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Problem Description</h3>
          <p className="text-slate-600 leading-relaxed">
            Urban local bodies face significant challenges in managing municipal solid waste due to improper segregation at the household level. 
            Despite continuous awareness campaigns, many households fail to separate waste, leading to contamination of recyclable materials and increased landfill burden.
          </p>
        </div>

        {/* Objectives */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6">
            <Target className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-4">Core Objectives</h3>
          <ul className="space-y-3">
            {[
              "Enable source-level waste segregation monitoring.",
              "Provide real-time compliance analytics for authorities.",
              "Implement image-based classification for accuracy.",
              "Reduce operational costs of waste processing."
            ].map((obj, i) => (
              <li key={i} className="flex items-start gap-2 text-slate-600">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* How It Works - Crucial Content */}
        <div className="md:col-span-2 bg-slate-900 rounded-3xl p-8 text-white">
          <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <Lightbulb className="text-amber-400 w-7 h-7" />
            System Architecture & Lifecycle
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-emerald-400 font-bold mb-2">01. Collection</div>
              <p className="text-sm text-slate-400">Waste is captured at the household level via the mobile app with ML classification.</p>
            </div>
            <div className="relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-emerald-400 font-bold mb-2">02. Data Sync</div>
              <p className="text-sm text-slate-400">Logs are instantly synced to our Secure Firestore Cloud infrastructure.</p>
            </div>
            <div className="relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-emerald-400 font-bold mb-2">03. Analytics</div>
              <p className="text-sm text-slate-400">Compliance trends are calculated in real-time for all urban zones.</p>
            </div>
            <div className="relative p-6 bg-slate-800/50 rounded-2xl border border-slate-700">
              <div className="text-emerald-400 font-bold mb-2">04. Action</div>
              <p className="text-sm text-slate-400">Zonal officers trigger warnings or initiate collection route optimizations.</p>
            </div>
          </div>
        </div>

        {/* Key Stakeholders */}
        <div className="md:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Key Project Partners</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div className="flex flex-col items-center p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Government</div>
               <div className="font-semibold text-slate-700">CPCB India</div>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Database</div>
               <div className="font-semibold text-slate-700">Firebase</div>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Mission</div>
               <div className="font-semibold text-slate-700">Swachh Bharat</div>
            </div>
            <div className="flex flex-col items-center p-4 border border-gray-50 rounded-xl hover:bg-gray-50 transition-colors">
               <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Standard</div>
               <div className="font-semibold text-slate-700">NITI Aayog</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
