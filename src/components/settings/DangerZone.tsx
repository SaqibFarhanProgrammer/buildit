export default function DangerZone() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="font-['inter-bold'] text-xl sm:text-2xl text-red-600 tracking-tight mb-1">
          Danger Zone
        </h2>
        <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/40">
          Irreversible actions. Proceed with caution.
        </p>
      </div>

      <div className="space-y-4">
        <div className="p-5 sm:p-6 rounded-2xl border border-red-100 bg-red-50">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-['inter-bold'] text-sm sm:text-base text-[#0a0a0a]">
                Delete Account
              </h3>
              <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-1 max-w-md leading-relaxed">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
            </div>
            <button className="shrink-0 font-['inter-semi'] text-xs text-red-600 border border-red-200 bg-white px-5 py-2.5 rounded-xl hover:bg-red-100 transition-all">
              Delete Account
            </button>
          </div>
        </div>

        <div className="p-5 sm:p-6 rounded-2xl border border-[#0a0a0a]/5 bg-[#f9fafb]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-['inter-bold'] text-sm sm:text-base text-[#0a0a0a]">
                Export Data
              </h3>
              <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-1 max-w-md leading-relaxed">
                Download a copy of all your data including projects, code, and
                settings.
              </p>
            </div>
            <button className="shrink-0 font-['inter-semi'] text-xs text-[#0a0a0a] border border-[#0a0a0a]/10 bg-white px-5 py-2.5 rounded-xl hover:bg-[#0a0a0a]/5 transition-all">
              Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
