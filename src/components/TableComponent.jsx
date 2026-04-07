import React, { useState, useEffect } from 'react';
import { Search, AlertTriangle, CheckCircle, MailWarning } from 'lucide-react';
import clsx from 'clsx';
import { db } from '../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

export default function TableComponent() {
  const [searchTerm, setSearchTerm] = useState('');
  const [households, setHouseholds] = useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "householdLogs"), orderBy("lastLog", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHouseholds(data);
    });
    return () => unsub();
  }, []);

  const filteredData = households.filter(item => 
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    (item.ward && item.ward.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mt-6">
      <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Household Management Logs</h3>
          <p className="text-sm text-slate-500">Monitor segregation status and trigger notifications.</p>
        </div>
        <div className="relative relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by ID or Zone..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-shadow bg-gray-50"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-gray-50 text-slate-700 font-medium">
            <tr>
              <th className="px-6 py-4">Household ID</th>
              <th className="px-6 py-4">Zone / Ward</th>
              <th className="px-6 py-4">Last Log Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-800">{row.id}</td>
                <td className="px-6 py-4">{row.ward}</td>
                <td className="px-6 py-4 text-slate-500">{row.lastLog}</td>
                <td className="px-6 py-4">
                  <span className={clsx(
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold",
                    row.status === 'Correct' 
                      ? "bg-emerald-100 text-emerald-700" 
                      : "bg-amber-100 text-amber-700"
                  )}>
                    {row.status === 'Correct' ? <CheckCircle className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    disabled={row.status === 'Correct'}
                    className={clsx(
                      "inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                      row.status === 'Correct'
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-amber-200 text-amber-700 hover:bg-amber-50 shadow-sm"
                    )}
                  >
                    <MailWarning className="w-4 h-4" />
                    Trigger Warning
                  </button>
                </td>
              </tr>
            ))}
            {filteredData.length === 0 && (
              <tr>
                <td colSpan="5" className="px-6 py-8 text-center text-slate-500">
                  No households found matching "{searchTerm}"
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
