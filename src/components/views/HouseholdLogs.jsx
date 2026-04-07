import React, { useState, useEffect } from 'react';
import { Search, Filter, Download } from 'lucide-react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function HouseholdLogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [households, setHouseholds] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "householdLogs"), orderBy("lastLog", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHouseholds(data);
    });
    return () => unsub();
  }, []);

  const filteredLogs = households.filter(log =>
    log.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (log.ward && log.ward.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold p-3 text-slate-800">Household Logs</h2>
          <p className="px-3 text-slate-500 text-sm">Detailed segregation records for all registered households.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-white transition text-slate-600 bg-gray-50/50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition shadow-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Quick Stats - Crucial Content */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-lg flex items-center justify-center font-bold">
            {households.length}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Total Households</div>
            <div className="text-sm font-semibold text-slate-700">Monitored Weekly</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-lg flex items-center justify-center font-bold">
            {households.filter(h => h.status === 'Warning' || h.status === 'Incorrect').length}
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Need Attention</div>
            <div className="text-sm font-semibold text-slate-700">Warning Status</div>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center font-bold">
            94%
          </div>
          <div>
            <div className="text-xs font-bold text-slate-400 uppercase">Reporting Rate</div>
            <div className="text-sm font-semibold text-slate-700">Active Sensors</div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by ID, Ward or Zone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow bg-white"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Streaming live data from Firestore
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-gray-50/50 border-b border-gray-100 font-bold tracking-wider">
              <tr>
                <th className="px-6 py-5">Household ID</th>
                <th className="px-6 py-5">Ward / Zone</th>
                <th className="px-6 py-5">Last Logged</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-6 py-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredLogs.map((row) => (
                <tr key={row.id} className="hover:bg-emerald-50/20 transition-colors group">
                  <td className="px-6 py-4 font-bold text-slate-700">{row.id}</td>
                  <td className="px-6 py-4 text-slate-600">{row.ward || row.zone || "N/A"}</td>
                  <td className="px-6 py-4 text-slate-500">{row.lastLog}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${row.status === 'Correct' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      row.status === 'Warning' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-red-50 text-red-700 border-red-100'
                      }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-emerald-600 hover:text-emerald-800 font-bold text-xs uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                      View full history
                    </button>
                  </td>
                </tr>
              ))}
              {filteredLogs.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center gap-2">
                      <Search className="w-8 h-8 opacity-20" />
                      <p>No results found matching your search</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-slate-400 bg-gray-50/50 uppercase tracking-widest">
          <div>Showing 1 to {filteredLogs.length} entries</div>
          <div className="flex gap-2 text-slate-600">
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 bg-emerald-600 text-white rounded-lg">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-lg hover:bg-white">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
