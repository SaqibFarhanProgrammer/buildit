interface User {
  name: string;
  username: string;
  email: string;
  role: string;
  bio: string;
  avatar: string;
  joinDate: string;
  location: string;
}

export default function ProfileCard({ user }: { user: User }) {
  return (
    <div className="p-6 sm:p-7 rounded-2xl border border-[#0a0a0a]/5 bg-[#f9fafb]">
      {/* Avatar */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#0a0a0a] flex items-center justify-center shrink-0">
          <span className="font-['inter-bold'] text-xl sm:text-2xl text-white">
            {user.avatar}
          </span>
        </div>
        <div>
          <h2 className="font-['inter-bold'] text-lg sm:text-xl text-[#0a0a0a] tracking-tight">
            {user.name}
          </h2>
          <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/40">
            {user.username}
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 rounded-full bg-[#0004ff]" />
          <span className="font-['inter-semi'] text-xs text-[#0a0a0a]/60 uppercase tracking-wider">
            {user.role}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 rounded-full bg-[#0a0a0a]/20" />
          <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
            {user.location}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-1 h-1 rounded-full bg-[#0a0a0a]/20" />
          <span className="font-['inter-rag'] text-xs text-[#0a0a0a]/40">
            Joined {user.joinDate}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p className="font-['inter-rag'] text-sm text-[#0a0a0a]/50 leading-relaxed mb-6">
        {user.bio}
      </p>

      {/* Email */}
      <div className="p-3 rounded-lg bg-white border border-[#0a0a0a]/5 mb-6">
        <span className="font-['inter-light'] text-[10px] text-[#0a0a0a]/30 uppercase tracking-wider block mb-1">
          Email
        </span>
        <span className="font-['inter4-medium'] text-sm text-[#0a0a0a]">
          {user.email}
        </span>
      </div>

      {/* Edit Button */}
      <button className="w-full bg-[#0a0a0a] text-white py-3 rounded-xl font-['inter-semi'] text-sm hover:bg-[#0a0a0a]/90 transition-all">
        Edit Profile
      </button>
    </div>
  );
}
