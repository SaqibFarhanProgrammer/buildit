interface Stat {
  label: string;
  value: string;
  unit: string;
  trend: string;
}

export default function StatsBar({ stats }: { stats: Stat[] }) {
  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-8 -mt-8 relative z-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="group p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-white border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:shadow-lg hover:shadow-[#0a0a0a]/[0.03] transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="font-['inter-semi'] text-[10px] text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                {stat.trend}
              </span>
            </div>
            <div className="flex items-baseline gap-1">
              <span className="font-['inter-bold'] text-2xl sm:text-3xl text-[#0a0a0a] tracking-tight">
                {stat.value}
              </span>
              {stat.unit && (
                <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
                  {stat.unit}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
