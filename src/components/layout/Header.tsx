"use client";
import Link from "next/link";
import { FiUser, FiLogOut } from "react-icons/fi";

export default function Header() {
  async function handleLogout() {}
  return (
    <header className="w-full flex items-center px-2 py-4 bg-white h-20 shadow-sm">
      <div className="w-full flex items-center justify-between max-w-7xl mx-auto">
        <Link href="/">
          <h1 className="font-bold text-2x-l pl-1 hover:tracking-widest duration-300">
            <span className="text-blue-500">DEV </span>
            CONTROLE
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/dashboard">
            <FiUser size={26} color="#4b5563" />
          </Link>
          <button onClick={handleLogout}>
            <FiLogOut size={26} color="#4b5563" />
          </button>
        </div>
      </div>
    </header>
  );
}
