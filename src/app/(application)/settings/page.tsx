import SettingsHeader from '@/components/settings/SettingsHeader';
import SettingsContent from '@/components/settings/SettingsContent';

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <SettingsHeader />
      <SettingsContent />
    </div>
  );
}
