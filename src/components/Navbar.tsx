"use client";

import { Menu, Search, Mic, Video, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/results?search_query=${encodeURIComponent(searchQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  if (isMobileSearchOpen) {
    return (
      <nav className="fixed top-0 left-0 right-0 bg-[#0f0f0f] h-14 flex items-center px-2 z-50 gap-2">
        <button 
          onClick={() => setIsMobileSearchOpen(false)}
          className="p-2 hover:bg-[#272727] rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <form onSubmit={handleSearch} className="flex-1 flex items-center bg-[#121212] rounded-full px-4 py-1.5 border border-[#303030]">
          <input
            type="text"
            autoFocus
            placeholder="Search YouOut"
            className="w-full bg-transparent focus:outline-none text-base text-white placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <button className="p-2 bg-[#181818] rounded-full">
          <Mic className="w-5 h-5 text-white" />
        </button>
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0f0f0f] h-14 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-[#272727] rounded-full hidden md:block">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <Link href="/" className="flex items-center gap-1">
          <div className="bg-red-600 p-1 rounded-lg">
            <div className="w-4 h-3 bg-white" style={{ clipPath: "polygon(0% 0%, 100% 50%, 0% 100%)" }}></div>
          </div>
          <span className="font-bold text-xl tracking-tighter text-white">YouOut</span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-[720px] items-center gap-4 ml-10 hidden md:flex">
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center border border-[#303030] bg-[#121212] rounded-l-full px-4 py-1.5 focus-within:border-blue-500 ml-4 focus-within:ml-0 group transition-all">
            <Search className="w-5 h-5 text-gray-400 mr-2 hidden group-focus-within:block" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-base text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-2 hover:bg-[#272727]">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
        <button type="button" className="p-2 bg-[#181818] hover:bg-[#272727] rounded-full">
          <Mic className="w-5 h-5 text-white" />
        </button>
      </form>

      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="p-2 hover:bg-[#272727] rounded-full md:hidden"
        >
          <Search className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-[#272727] rounded-full hidden sm:block">
          <Video className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-[#272727] rounded-full">
          <Bell className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-[#272727] rounded-full ml-1 sm:ml-2">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
            J
          </div>
        </button>
      </div>
    </nav>
  );
}
