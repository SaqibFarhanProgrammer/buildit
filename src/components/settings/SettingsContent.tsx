'use client';

import { useState } from 'react';
import ProfileSettings from './ProfileSettings';
import AppearanceSettings from './AppearanceSettings';
import NotificationSettings from './NotificationSettings';
import DangerZone from './DangerZone';

const tabs = [
  { id: 'profile', label: 'Profile', count: null },
  { id: 'appearance', label: 'Appearance', count: null },
  { id: 'notifications', label: 'Notifications', count: 3 },
  { id: 'danger', label: 'Danger Zone', count: null },
];

export default function SettingsContent() {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8  relative z-10 pb-12">
      <div className="flex items-center gap-1 p-1 rounded-xl bg-[#f9fafb] border border-[#0a0a0a]/5 w-fit mb-8 sm:mb-10 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative px-4 sm:px-5 py-2.5 rounded-lg text-sm font-['inter-semi'] transition-all duration-200 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-[#0a0a0a] text-white'
                : 'text-[#0a0a0a]/40 hover:text-[#0a0a0a]'
            }`}
          >
            {tab.label}
            {tab.count && (
              <span
                className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full ${
                  activeTab === tab.id
                    ? 'bg-white/20 text-white'
                    : 'bg-[#0004ff]/10 text-[#0004ff]'
                }`}
              >
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="max-w-3xl">
        {activeTab === 'profile' && <ProfileSettings />}
        {activeTab === 'appearance' && <AppearanceSettings />}
        {activeTab === 'notifications' && <NotificationSettings />}
        {activeTab === 'danger' && <DangerZone />}
      </div>
    </div>
  );
}
