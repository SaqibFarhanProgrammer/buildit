'use client';

import { useState } from 'react';
import ProfileForm from './ProfileForm';
import AppearanceSettings from './AppearanceSettings';
import NotificationSettings from './NotificationSettings';
import DangerZone from './DangerZone';

const tabs = [
  { id: 'profile', label: 'Profile', desc: 'Personal information' },
  { id: 'appearance', label: 'Appearance', desc: 'Theme & display' },
  { id: 'notifications', label: 'Notifications', desc: 'Email & alerts' },
  { id: 'danger', label: 'Danger Zone', desc: 'Delete account' },
];

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-4xl bgr mx-auto px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="w-full lg:w-[240px] shrink-0 ">
          <div className="flex lg:flex-col gap-1 mt-10 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 -mx-2 px-2 lg:mx-0 lg:px-0">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-start  gap-0.5 px-4 py-3 rounded-xl text-left transition-all duration-200 shrink-0 lg:w-full ${
                  activeTab === tab.id
                    ? 'bg-[#0a0a0a] text-white'
                    : 'text-[#0a0a0a]/50 hover:text-[#0a0a0a] hover:bg-[#f9fafb]'
                }`}
              >
                <span
                  className={`font-['inter-semi'] text-sm ${activeTab === tab.id ? 'text-white' : 'text-[#0a0a0a]'}`}
                >
                  {tab.label}
                </span>
                <span
                  className={`font-['inter-light'] text-[10px] ${activeTab === tab.id ? 'text-white/50' : 'text-[#0a0a0a]/30'}`}
                >
                  {tab.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          {activeTab === 'profile' && <ProfileForm />}
          {activeTab === 'appearance' && <AppearanceSettings />}
          {activeTab === 'notifications' && <NotificationSettings />}
          {activeTab === 'danger' && <DangerZone />}
        </div>
      </div>
    </div>
  );
}
