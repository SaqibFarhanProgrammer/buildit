import Link from 'next/link';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Link
        className="fixed left-5 text-black top-5 flex justify-center items-center gap-2 "
        href="/"
      >
        <IoIosArrowRoundBack
          size={30}
          className="text-[#0a0a0a] hover:text-[#000] transition-colors duration-200"
        />
        back to home
      </Link>
      {children}
    </div>
  );
}
