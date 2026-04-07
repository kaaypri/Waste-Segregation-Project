import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { db } from '../../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

export default function Analytics() {
  const [monthlyData, setMonthlyData] = React.useState([]);

  React.useEffect(() => {
    const unsub = onSnapshot(collection(db, "monthlyTrends"), (snapshot) => {
      const data = snapshot.docs.map(doc => doc.data());
      // Sort by some criteria if needed, assuming they have a logical order
      setMonthlyData(data);
    });
    return () => unsub();
  }, []);
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Compliance Analytics</h2>
          <p className="text-slate-500 text-sm">Historical trends and zonal performance metrics.</p>
        </div>
        <div className="hidden sm:flex gap-4">
          <div className="text-right">
            <div className="text-xs font-bold text-slate-400 uppercase">Avg Compliance</div>
            <div className="text-lg font-bold text-emerald-600">74.5%</div>
          </div>
          <div className="text-right">
            <div className="text-xs font-bold text-slate-400 uppercase">Yearly Growth</div>
            <div className="text-lg font-bold text-blue-600">+12.8%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Segregation Compliance Trend</h3>
          <p className="text-sm text-slate-500 mb-6">Percentage of correctly segregated logs per month.</p>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} domain={[0, 100]} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line type="monotone" dataKey="compliance" stroke="#059669" strokeWidth={3} dot={{ r: 4, fill: '#059669', strokeWidth: 2, stroke: 'white' }} activeDot={{ r: 6 }} name="Compliance %" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Zones Leaderboard - Crucial Content */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-slate-800 mb-4">Top Performing Zones</h3>
          <div className="space-y-4">
            {[
              { zone: "Central District", score: 92, status: "increase" },
              { zone: "North Zone", score: 88, status: "increase" },
              { zone: "South Zone", score: 84, status: "stable" },
              { zone: "West Zone", score: 79, status: "decrease" },
              { zone: "East Zone", score: 72, status: "increase" },
            ].map((zone, i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-transparent hover:border-emerald-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                    {i + 1}
                  </div>
                  <span className="font-medium text-slate-700 text-sm">{zone.zone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-slate-800">{zone.score}%</span>
                  <div className={`w-1.5 h-1.5 rounded-full ${zone.status === 'increase' ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-semibold text-emerald-600 bg-emerald-50 rounded-lg hover:bg-emerald-100 transition">
            View Full Report
          </button>
        </div>

        {/* Collection Volume Chart */}
        <div className="lg:col-span-3 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Total Waste Collected (Tons)</h3>
          <p className="text-sm text-slate-500 mb-6">Volume of waste collected across all zones monthly.</p>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <defs>
                  <linearGradient id="colorCollection" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                <RechartsTooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Area type="monotone" dataKey="collection" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCollection)" name="Waste Volume" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
