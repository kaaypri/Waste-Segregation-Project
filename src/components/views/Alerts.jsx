import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { AlertCircle, AlertTriangle, Info, CheckCircle, Clock } from 'lucide-react';

export default function Alerts() {
  const [alerts, setAlerts] = React.useState([]);

  React.useEffect(() => {
    const q = query(collection(db, "alerts"), orderBy("time", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAlerts(data);
    });
    return () => unsub();
  }, []);
  const getAlertStyle = (type) => {
    switch(type) {
      case 'critical': return { bg: 'bg-red-50', border: 'border-red-100', text: 'text-red-800', icon: AlertCircle, iconColor: 'text-red-500' };
      case 'warning': return { bg: 'bg-amber-50', border: 'border-amber-100', text: 'text-amber-800', icon: AlertTriangle, iconColor: 'text-amber-500' };
      case 'info': return { bg: 'bg-blue-50', border: 'border-blue-100', text: 'text-blue-800', icon: Info, iconColor: 'text-blue-500' };
      case 'success': return { bg: 'bg-emerald-50', border: 'border-emerald-100', text: 'text-emerald-800', icon: CheckCircle, iconColor: 'text-emerald-500' };
      default: return { bg: 'bg-gray-50', border: 'border-gray-100', text: 'text-gray-800', icon: Info, iconColor: 'text-gray-500' };
    }
  };

  const [filter, setFilter] = useState('all');

  const filteredAlerts = alerts.filter(a => filter === 'all' || a.type === filter);

  return (
    <div className="space-y-6 max-w-5xl pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Alerts</h2>
          <p className="text-slate-500 text-sm">Real-time operational notifications and compliance triggers.</p>
        </div>
        <div className="flex bg-gray-50 p-1 rounded-xl border border-gray-100">
          {['all', 'critical', 'warning', 'info'].map((f) => (
            <button 
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${filter === f ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredAlerts.map((alert) => {
          const style = getAlertStyle(alert.type);
          const IconStyle = style.icon;
          return (
            <div key={alert.id} className={`flex gap-5 p-6 rounded-2xl border ${style.bg} ${style.border} items-start shadow-sm border-l-4 transition-transform hover:-translate-y-0.5`}>
              <div className={`p-3 rounded-xl bg-white shadow-sm ${style.iconColor}`}>
                <IconStyle className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-lg ${style.text}`}>{alert.title}</h3>
                  <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-slate-400 group">
                    <Clock className="w-3 h-3"/> {alert.time}
                  </span>
                </div>
                <p className={`text-sm leading-relaxed mb-4 ${style.text} opacity-80`}>{alert.desc}</p>
                <div className="flex items-center gap-3">
                  {(alert.type === 'critical' || alert.type === 'warning') ? (
                    <button className="px-4 py-2 bg-white rounded-lg shadow-sm font-bold text-xs uppercase tracking-wider border border-gray-100 hover:bg-slate-50 transition-colors text-slate-700">
                      Take Action
                    </button>
                  ) : null}
                  <button className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors">
                    Mark as Read
                  </button>
                </div>
              </div>
            </div>
          )
        })}
        {filteredAlerts.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-dashed border-gray-200">
             <Info className="w-12 h-12 text-slate-200 mx-auto mb-4" />
             <p className="text-slate-400 font-medium">No alerts found for the selected category</p>
          </div>
        )}
      </div>
    </div>
  );
}
