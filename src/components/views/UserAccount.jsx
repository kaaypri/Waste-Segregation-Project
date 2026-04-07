import React, { useState, useEffect } from 'react';
import { User, Mail, MapPin, Building, Key, Shield, HardDrive, Save } from 'lucide-react';
import { db } from '../../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';

export default function UserAccount() {
  const [profile, setProfile] = React.useState({
    fullName: "Admin User",
    email: "admin.zonal@ecomonitor.gov",
    role: "Zonal Officer",
    zone: "Central District",
    department: "Waste Management Dept.",
    storageUsed: 45,
    storageTotal: 100
  });
  const [isEditing, setIsEditing] = React.useState(false);
  const [message, setMessage] = React.useState('');

  React.useEffect(() => {
    // Listen to admin profile
    const unsub = onSnapshot(doc(db, "users", "admin_default"), (doc) => {
      if (doc.exists()) setProfile(doc.data());
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    try {
      await setDoc(doc(db, "users", "admin_default"), profile);
      setIsEditing(false);
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage('Failed to update profile.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold p-3 text-slate-800">User Profile</h2>
        <p className="px-3 text-slate-500 text-sm">Manage your profile information and system roles.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Profile Card */}
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center">
            <div className="w-24 h-24 rounded-full bg-slate-100 border-4 border-white shadow-lg overflow-hidden flex items-center justify-center mb-4">
              <User className="w-12 h-12 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">{profile.fullName}</h3>
            <p className="text-emerald-600 font-medium text-sm mb-4">{profile.role}</p>
            
            <div className="w-full flex flex-col gap-2">
              <button 
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition text-sm font-medium flex items-center justify-center gap-2"
              >
                {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : 'Edit Profile'}
              </button>
              {isEditing && (
                <button 
                  onClick={() => setIsEditing(false)}
                  className="w-full py-2 bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 rounded-lg transition text-sm font-medium"
                >
                  Cancel
                </button>
              )}
            </div>
          </div>
          
          {message && (
            <div className={`p-3 rounded-lg text-sm text-center font-medium ${message.includes('success') ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'}`}>
              {message}
            </div>
          )}
          
          <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-5">
            <div className="flex items-center gap-2 text-emerald-800 font-semibold mb-2">
              <Shield className="w-5 h-5" />
              Access Level
            </div>
            <p className="text-sm text-emerald-700">You have <strong>Level 3 (Admin)</strong> access. You can view, modify, and delete records for all wards in your assigned zone.</p>
          </div>
        </div>

        {/* Details Form */}
        <div className="md:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-gray-100 pb-3">Personal Information</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    name="fullName"
                    value={profile.fullName} 
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50 border-transparent cursor-not-allowed'}`} 
                    readOnly={!isEditing} 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="email" 
                    name="email"
                    value={profile.email} 
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50 border-transparent cursor-not-allowed'}`} 
                    readOnly={!isEditing} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Assigned Zone</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    name="zone"
                    value={profile.zone} 
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50 border-transparent cursor-not-allowed'}`} 
                    readOnly={!isEditing} 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                <div className="relative">
                  <Building className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="text" 
                    name="department"
                    value={profile.department} 
                    onChange={handleChange}
                    className={`w-full pl-9 pr-3 py-2 border rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 ${isEditing ? 'bg-white border-gray-200' : 'bg-gray-50 border-transparent cursor-not-allowed'}`} 
                    readOnly={!isEditing} 
                  />
                </div>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-gray-100 pb-3 mt-8">System Storage Quota</h3>
            <div className="mb-2 flex justify-between text-sm">
              <span className="font-semibold text-slate-700">Storage Used</span>
              <span className="text-slate-500">{profile.storageUsed} GB / {profile.storageTotal} GB</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5 mb-2">
              <div className="bg-emerald-600 h-2.5 rounded-full" style={{ width: `${(profile.storageUsed / profile.storageTotal) * 100}%` }}></div>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1"><HardDrive className="w-3 h-3"/> Database auto-archives logs older than 5 years.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
