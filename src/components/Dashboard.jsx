import React, { useState, useEffect } from 'react';
import { Truck, TrendingUp, ShieldCheck, Bell } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { db } from '../firebase';
import { doc, onSnapshot, collection } from 'firebase/firestore';
import TableComponent from './TableComponent';

export default function Dashboard() {
  const [kpiData, setKpiData] = React.useState(null);
  const [chartData, setChartData] = React.useState([]);

  React.useEffect(() => {
    // Listen to KPIs
    const unsubKpis = onSnapshot(doc(db, "system", "kpis"), (doc) => {
      if (doc.exists()) setKpiData(doc.data());
    });

    // Listen to Chart Data
    const unsubChart = onSnapshot(collection(db, "wasteComposition"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      setChartData(data);
    });

    return () => {
      unsubKpis();
      unsubChart();
    };
  }, []);

  const kpiCards = [
    { title: "Total Waste Collected", value: kpiData?.totalWasteCollected || "---", icon: Truck, color: "text-blue-600", bg: "bg-blue-50" },
    { title: "Segregation Rate", value: kpiData ? `${kpiData.segregationRate}%` : "---", icon: ShieldCheck, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Compliance Growth", value: kpiData?.complianceGrowth || "---", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
    { title: "Active Alerts", value: kpiData?.activeAlerts || 0, icon: Bell, color: "text-amber-600", bg: "bg-amber-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          {/* KPI Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {kpiCards.map((kpi, index) => (
              <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-1">{kpi.title}</p>
                  <h4 className="text-2xl font-bold text-slate-800">{kpi.value}</h4>
                </div>
                <div className={`p-3 rounded-lg ${kpi.bg}`}>
                  <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Charts Section */}
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-800">Waste Composition by Zone</h3>
              <div className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">Live Updates</div>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData.length > 0 ? chartData : []}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="zone" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                  <Tooltip 
                    cursor={{ fill: '#f8fafc' }}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar dataKey="bio" name="Biodegradable" fill="#047857" radius={[4, 4, 0, 0]} barSize={32} />
                  <Bar dataKey="nonBio" name="Non-Biodegradable" fill="#94a3b8" radius={[4, 4, 0, 0]} barSize={32} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Quick Actions Panel - Crucial Content */}
        <div className="w-full lg:w-72 space-y-4">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              Quick Actions
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-emerald-600 text-white text-sm font-medium rounded-lg hover:bg-emerald-700 transition shadow-sm">
                Generate Weekly Report
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                Notify Irregular Households
              </button>
              <button className="w-full text-left px-4 py-3 border border-gray-200 text-slate-600 text-sm font-medium rounded-lg hover:bg-gray-50 transition">
                Update Zone Targets
              </button>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-50">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">System Status</div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                All Systems Operational
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Households Table */}
      <TableComponent />
    </div>
  );
}
