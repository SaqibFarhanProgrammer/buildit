'use client';

import { useState } from 'react';

interface ToggleProps {
  label: string;
  desc: string;
  enabled: boolean;
  onChange: () => void;
}

function ToggleRow({ label, desc, enabled, onChange }: ToggleProps) {
  return (
    <div className="flex items-center justify-between py-4 sm:py-5 border-b border-[#0a0a0a]/5 last:border-0">
      <div>
        <span className="font-['inter-semi'] text-sm text-[#0a0a0a] block">
          {label}
        </span>
        <span className="font-['inter-light'] text-xs text-[#0a0a0a]/40 mt-0.5 block">
          {desc}
        </span>
      </div>
      <button
        onClick={onChange}
        className={`w-12 h-7 rounded-full transition-all duration-300 relative shrink-0 ${
          enabled ? 'bg-[#0004ff]' : 'bg-[#0a0a0a]/10'
        }`}
      >
        <div
          className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
            enabled ? 'left-6' : 'left-1'
          }`}
        />
      </button>
    </div>
  );
}

export default function NotificationSettings() {
  const [settings, setSettings] = useState({
    emailDigest: true,
    newFeatures: true,
    teamActivity: false,
    marketing: false,
    securityAlerts: true,
  });

  const toggle = (key: keyof typeof settings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="font-['inter-bold'] text-xl sm:text-2xl text-[#0a0a0a] tracking-tight mb-1">
          Notifications
        </h2>
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/40">
          Choose what you want to be notified about.
        </p>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl border border-[#0a0a0a]/5 bg-[#f9fafb]">
        <ToggleRow
          label="Weekly Digest"
          desc="Summary of your activity every Monday"
          enabled={settings.emailDigest}
          onChange={() => toggle('emailDigest')}
        />
        <ToggleRow
          label="New Features"
          desc="Get notified when we ship something new"
          enabled={settings.newFeatures}
          onChange={() => toggle('newFeatures')}
        />
        <ToggleRow
          label="Team Activity"
          desc="Updates from your team members"
          enabled={settings.teamActivity}
          onChange={() => toggle('teamActivity')}
        />
        <ToggleRow
          label="Marketing"
          desc="Product updates and promotions"
          enabled={settings.marketing}
          onChange={() => toggle('marketing')}
        />
        <ToggleRow
          label="Security Alerts"
          desc="Important security notifications"
          enabled={settings.securityAlerts}
          onChange={() => toggle('securityAlerts')}
        />
      </div>
    </div>
  );
}
