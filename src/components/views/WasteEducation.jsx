import React from 'react';
import { wasteEducationContent } from '../../data/mockData';
import { Leaf, Recycle, AlertOctagon, Battery, CheckCircle2, XCircle, Info } from 'lucide-react';

export default function WasteEducation() {
  const getIconForType = (title) => {
    if (title.includes('Biodegradable')) return <Leaf className="w-8 h-8" />;
    if (title.includes('Non-Bio')) return <Recycle className="w-8 h-8" />;
    if (title.includes('Hazardous')) return <AlertOctagon className="w-8 h-8" />;
    return <Battery className="w-8 h-8" />;
  };

  return (
    <div className="space-y-8 max-w-6xl pb-10">
      
      {/* Header section */}
      <div className="bg-gradient-to-br from-emerald-800 to-emerald-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">Waste Education Center</h1>
          <p className="text-emerald-50 text-lg opacity-90 leading-relaxed">
            Understanding waste segregation is the first step towards a sustainable urban ecosystem. 
            Learn about different waste categories and the crucial role you play in environmental preservation.
          </p>
        </div>
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-1/4 -translate-y-1/4">
          <Leaf className="w-96 h-96" />
        </div>
      </div>

      {/* Types of Waste */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Info className="w-6 h-6 text-emerald-600" /> Types of Waste
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {wasteEducationContent.types.map((type, i) => (
            <div key={i} className={`p-6 rounded-xl border ${type.color} flex flex-col items-center text-center transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer`}>
              <div className="mb-4 p-3 bg-white/50 rounded-full shadow-sm">
                {getIconForType(type.title)}
              </div>
              <h3 className="font-bold text-lg mb-2">{type.title}</h3>
              <p className="text-sm opacity-90">{type.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Problem & Solution Split */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-red-50 p-8 rounded-2xl border border-red-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <XCircle className="w-48 h-48 text-red-500" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-red-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                <XCircle className="w-5 h-5"/>
              </span>
              The Problem
            </h3>
            <p className="text-red-700 leading-relaxed">{wasteEducationContent.problem}</p>
          </div>
        </div>

        <div className="bg-emerald-50 p-8 rounded-2xl border border-emerald-100 relative overflow-hidden group">
          <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <CheckCircle2 className="w-48 h-48 text-emerald-500" />
          </div>
          <div className="relative z-10">
            <h3 className="text-xl font-bold text-emerald-800 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <CheckCircle2 className="w-5 h-5"/>
              </span>
              The Solution
            </h3>
            <p className="text-emerald-700 leading-relaxed">{wasteEducationContent.solution}</p>
          </div>
        </div>
      </div>

      {/* Dos and Don'ts */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Segregation Guidelines</h2>
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            
            {/* Dos */}
            <div className="p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 bg-emerald-500 rounded-full"></div>
                DOs
              </h3>
              <ul className="space-y-4">
                {wasteEducationContent.dos.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don'ts */}
            <div className="p-8">
              <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                <div className="w-2 h-8 bg-red-500 rounded-full"></div>
                DON'Ts
              </h3>
              <ul className="space-y-4">
                {wasteEducationContent.donts.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
}
