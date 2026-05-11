'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  RiMenuLine,
  RiCloseLine,
  RiMessage3Line,
  RiCodeBoxLine,
  RiKanbanView2,
  RiTrophyLine,
  RiDashboardLine,
  RiBookOpenLine,
  RiSettings4Line,
  RiLogoutBoxLine,
  RiArrowRightSLine,
} from 'react-icons/ri';
import { CgProfile } from 'react-icons/cg';

const menuItems = [
  {
    name: 'Profile',
    href: '/profile',
    icon: CgProfile,
  },
  {
    name: 'AI Chat',
    href: '/ai-chat',
    icon: RiMessage3Line,
  },
  {
    name: 'Code Editor',
    href: '/editor',
    icon: RiCodeBoxLine,
  },
  {
    name: 'Project Tracking',
    href: '/projects',
    icon: RiKanbanView2,
  },
  {
    name: 'Challenges',
    href: '/challenges',
    icon: RiTrophyLine,
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: RiDashboardLine,
  },
  {
    name: 'Learning',
    href: '/learning',
    icon: RiBookOpenLine,
  },
];

const bottomItems = [
  {
    name: 'Settings',
    href: '/settings',
    icon: RiSettings4Line,
  },
  {
    name: 'Logout',
    href: '/logout',
    icon: RiLogoutBoxLine,
  },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" z-50 w-10 h-10 bg-[#0a0a0a] text-white rounded-lg flex items-center justify-center lg:hidden"
      >
        {isOpen ? (
          <RiCloseLine className="w-5 h-5" />
        ) : (
          <RiMenuLine className="w-5 h-5" />
        )}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-[#0a0a0a] text-white z-40 transition-all duration-300 z-50 ease-in-out flex flex-col ${
          isOpen
            ? 'w-64 translate-x-0'
            : 'w-64 -translate-x-full lg:translate-x-0 lg:w-20'
        }`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute -right-3 top-8 w-6 h-6 bg-[#0004ff] rounded-full flex items-center justify-center text-white hidden lg:flex hover:bg-[#0004ff]/90 transition-colors"
        >
          <RiArrowRightSLine
            className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          />
        </button>

        <div
          className={`p-6 border-b border-white/10 ${isOpen ? '' : 'lg:flex lg:justify-center'}`}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0004ff] flex items-center justify-center shrink-0">
              <span className="font-['inter-semi'] text-sm">JD</span>
            </div>
            {isOpen && (
              <div className="overflow-hidden">
                <p className="font-['inter-semi'] text-sm truncate">John Doe</p>
                <p className="font-['inter-light'] text-[10px] text-white/40 truncate">
                  john@buildit.dev
                </p>
              </div>
            )}
          </div>
        </div>

        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                      isActive
                        ? 'bg-[#0004ff] text-white'
                        : 'text-white/50 hover:text-white hover:bg-white/5'
                    } ${isOpen ? '' : 'lg:justify-center'}`}
                  >
                    <item.icon
                      className={`w-5 h-5 shrink-0 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white'}`}
                    />
                    {isOpen && (
                      <span className="font-['inter4-medium'] text-sm truncate">
                        {item.name}
                      </span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="p-3 border-t border-white/10">
          <ul className="space-y-1">
            {bottomItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group text-white/50 hover:text-white hover:bg-white/5 ${
                    isOpen ? '' : 'lg:justify-center'
                  }`}
                >
                  <item.icon className="w-5 h-5 shrink-0 text-white/40 group-hover:text-white" />
                  {isOpen && (
                    <span className="font-['inter4-medium'] text-sm truncate">
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      <div
        className={`transition-all duration-300 ${isOpen ? 'lg:ml-64' : 'lg:ml-20'}`}
      />
    </>
  );
}
