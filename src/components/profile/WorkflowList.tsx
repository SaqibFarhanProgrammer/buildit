interface Workflow {
  id: number;
  title: string;
  desc: string;
  type: string;
  time: string;
  status: string;
}

const typeColors: Record<string, string> = {
  ai: 'bg-[#0004ff]/5 text-[#0004ff] border-[#0004ff]/10',
  project: 'bg-[#0a0a0a]/5 text-[#0a0a0a] border-[#0a0a0a]/10',
  bug: 'bg-red-50 text-red-600 border-red-100',
  feature: 'bg-green-50 text-green-600 border-green-100',
};

const typeLabels: Record<string, string> = {
  ai: 'AI',
  project: 'Project',
  bug: 'Bug',
  feature: 'Feature',
};

export default function WorkflowCard({ workflows }: { workflows: Workflow[] }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <h2 className="font-['inter-bold'] text-lg sm:text-xl text-[#0a0a0a] tracking-tight">
            Recent Workflows
          </h2>
          <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-0.5">
            Your latest activity and contributions
          </p>
        </div>
        <button className="font-['inter-semi'] text-xs text-[#0004ff] hover:underline">
          View all
        </button>
      </div>

      <div className="space-y-2 sm:space-y-3">
        {workflows.map((wf) => (
          <div
            key={wf.id}
            className="group flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 hover:bg-[#f9fafb] transition-all duration-200"
          >
            {/* Type Badge */}
            <div
              className={`shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-lg flex items-center justify-center text-xs font-['inter-semi'] border ${typeColors[wf.type] || typeColors.project}`}
            >
              {typeLabels[wf.type]}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <h4 className="font-['inter-semi'] text-sm text-[#0a0a0a] truncate">
                  {wf.title}
                </h4>
                <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 shrink-0">
                  {wf.time}
                </span>
              </div>
              <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 truncate mt-0.5">
                {wf.desc}
              </p>
            </div>

            {/* Status Dot */}
            <div
              className={`shrink-0 w-2 h-2 rounded-full ${wf.status === 'completed' ? 'bg-green-500' : 'bg-amber-500'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
