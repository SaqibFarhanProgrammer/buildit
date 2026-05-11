interface Task {
  id: number;
  title: string;
  status: string;
  priority: string;
}

const priorityColors: Record<string, string> = {
  high: 'bg-red-50 text-red-600 border-red-100',
  medium: 'bg-amber-50 text-amber-600 border-amber-100',
  low: 'bg-blue-50 text-blue-600 border-blue-100',
};

export default function TaskList({ tasks }: { tasks: Task[] }) {
  const pending = tasks.filter((t) => t.status === 'pending');
  const completed = tasks.filter((t) => t.status === 'completed');

  return (
    <div className="p-5 sm:p-6 rounded-2xl border border-[#0a0a0a]/5 bg-[#f9fafb]">
      <div className="flex items-center justify-between mb-5 sm:mb-6">
        <div>
          <h2 className="font-['inter-bold'] text-lg sm:text-xl text-[#0a0a0a] tracking-tight">
            Tasks
          </h2>
          <p className="font-['inter-rag'] text-xs text-[#0a0a0a]/40 mt-0.5">
            {pending.length} pending, {completed.length} done
          </p>
        </div>
        <button className="w-8 h-8 rounded-lg bg-[#0a0a0a] text-white flex items-center justify-center hover:bg-[#0a0a0a]/90 transition-all">
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </button>
      </div>

      {/* Pending */}
      <div className="mb-5">
        <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
          Pending
        </span>
        <div className="space-y-2">
          {pending.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#0a0a0a]/5 hover:border-[#0a0a0a]/10 transition-all"
            >
              <div className="w-4 h-4 rounded border-2 border-[#0a0a0a]/20 shrink-0" />
              <span className="font-['inter4-medium'] text-sm text-[#0a0a0a] flex-1 truncate">
                {task.title}
              </span>
              <span
                className={`text-[10px] font-['inter-semi'] px-2 py-0.5 rounded border ${priorityColors[task.priority]}`}
              >
                {task.priority}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Completed */}
      <div>
        <span className="font-['inter-semi'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider mb-2 block">
          Completed
        </span>
        <div className="space-y-2">
          {completed.map((task) => (
            <div
              key={task.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-white border border-[#0a0a0a]/5 opacity-60"
            >
              <div className="w-4 h-4 rounded bg-green-500 flex items-center justify-center shrink-0">
                <svg
                  className="w-2.5 h-2.5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <span className="font-['inter4-medium'] text-sm text-[#0a0a0a] line-through flex-1 truncate">
                {task.title}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
