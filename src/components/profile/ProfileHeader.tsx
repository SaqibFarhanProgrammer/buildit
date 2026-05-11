interface User {
  name: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  avatar: string;
  location: string;
  joinDate: string;
}

export default function ProfileHeader({ user }: { user: User }) {
  return (
    <div className="relative bg-[#0a0a0a] text-white">
      {/* Top bar */}
      <div className="max-w-6xl mx-auto px-6 lg:px-8 pt-8 pb-16 sm:pt-12 sm:pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <div className="w-6 h-[1px] bg-white/20" />
          <span className="font-['inter4-medium'] text-[10px] text-white/40 uppercase tracking-[0.2em]">
            Profile
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-start gap-6 sm:gap-8">
          {/* Large Avatar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0004ff] flex items-center justify-center shrink-0 border-2 border-white/10">
            <span className="font-['inter-bold'] text-3xl sm:text-4xl text-white">
              {user.avatar}
            </span>
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
              <h1 className="font-['inter-bold'] text-2xl sm:text-3xl lg:text-4xl tracking-tight">
                {user.name}
              </h1>
              <span className="font-['inter-rag'] text-sm text-white/40">
                {user.username}
              </span>
            </div>

            <p className="font-['inter-rag'] text-sm text-white/50 leading-relaxed max-w-xl mb-4">
              {user.bio}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="font-['inter-semi'] text-[10px] text-white/40 uppercase tracking-wider px-2 py-1 rounded bg-white/5 border border-white/10">
                {user.role}
              </span>
              <span className="font-['inter-light'] text-xs text-white/30 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/20" />
                {user.location}
              </span>
              <span className="font-['inter-light'] text-xs text-white/30 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-white/20" />
                Joined {user.joinDate}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 shrink-0">
            <button className="font-['inter-semi'] text-xs bg-white text-[#0a0a0a] px-5 py-2.5 rounded-full hover:bg-white/90 transition-all">
              Edit Profile
            </button>
            <button className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 transition-all">
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
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom curve */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-white rounded-t-2xl" />
    </div>
  );
}
