import Link from 'next/link';
import { SiGithub, SiX, SiDiscord } from 'react-icons/si';
import { MdEmail, MdArrowOutward } from 'react-icons/md';
import {
  FaCode,
  FaTrophy,
  FaBookOpen,
  FaBolt,
  FaCheckCircle,
} from 'react-icons/fa';

const footerLinks = {
  product: [
    { name: 'AI Editor', href: '#', icon: FaCode },
    { name: 'Challenges', href: '#', icon: FaTrophy },
    { name: 'Learning', href: '#', icon: FaBookOpen },
    { name: 'Dashboard', href: '#', icon: FaBolt },
  ],
  company: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Careers', href: '#' },
    { name: 'Press', href: '#' },
  ],
  resources: [
    { name: 'Documentation', href: '#' },
    { name: 'API Reference', href: '#' },
    { name: 'Community', href: '#' },
    { name: 'Status', href: '#' },
  ],
  legal: [
    { name: 'Privacy', href: '#' },
    { name: 'Terms', href: '#' },
    { name: 'Security', href: '#' },
    { name: 'Cookies', href: '#' },
  ],
};

const socialLinks = [
  { name: 'GitHub', href: '#', icon: SiGithub },
  { name: 'X', href: '#', icon: SiX },
  { name: 'Discord', href: '#', icon: SiDiscord },
  { name: 'Email', href: '#', icon: MdEmail },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-white pt-16 md:pt-20 pb-8">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Top Section */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 lg:gap-16 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:w-[35%]">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#0004ff] rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                BuildIt
              </span>
            </Link>
            <p className="text-sm text-white/40 leading-relaxed mb-6 max-w-xs">
              The unified developer workspace. Code, debug, learn, and ship with
              AI assistance.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:bg-[#0004ff] hover:text-white transition-all duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links Grid */}
          <div className="lg:w-[60%] grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Product */}
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
                Product
              </h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <link.icon className="w-3.5 h-3.5 text-white/20 group-hover:text-[#0004ff] transition-colors" />
                      <span>{link.name}</span>
                      <MdArrowOutward className="w-3 h-3 opacity-0 group-hover:opacity-100 -ml-1 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <span>{link.name}</span>
                      <MdArrowOutward className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
                Resources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <span>{link.name}</span>
                      <MdArrowOutward className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">
                Legal
              </h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors duration-200"
                    >
                      <span>{link.name}</span>
                      <MdArrowOutward className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30">
            © 2026 BuildIt. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-xs text-white/30 flex items-center gap-2">
              <FaCheckCircle className="w-3 h-3 text-green-500" />
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
