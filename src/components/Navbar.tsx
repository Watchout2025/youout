"use client";

import { Menu, Search, Mic, Video, Bell, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSidebar } from "@/context/SidebarContext";
import VoiceSearchModal from "./VoiceSearchModal";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();

  const handleSearch = (e?: React.FormEvent, query?: string) => {
    e?.preventDefault();
    const finalQuery = query || searchQuery;
    if (finalQuery.trim()) {
      router.push(`/results?search_query=${encodeURIComponent(finalQuery)}`);
      setIsMobileSearchOpen(false);
    }
  };

  const handleVoiceResult = (text: string) => {
    setSearchQuery(text);
    handleSearch(undefined, text);
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
        <button 
          onClick={() => setIsVoiceSearchOpen(true)}
          className="p-2 bg-[#181818] rounded-full hover:bg-[#272727] transition-colors"
        >
          <Mic className="w-5 h-5 text-white" />
        </button>
        <VoiceSearchModal 
          isOpen={isVoiceSearchOpen} 
          onClose={() => setIsVoiceSearchOpen(false)} 
          onResult={handleVoiceResult}
        />
      </nav>
    );
  }

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#0f0f0f] h-14 flex items-center justify-between px-4 z-50">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-[#272727] rounded-full hidden md:block">
          <Menu className="w-6 h-6 text-white" />
        </button>
        <Link href="/" className="flex items-center gap-1 group">
          <div className="flex items-center">
            <svg width="32" height="22" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-active:scale-95">
              <path d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z" fill="#FF0033"></path>
              <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tighter text-white">YouOut</span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-[600px] items-center gap-4 ml-10 hidden md:flex">
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center border border-[#303030] bg-[#121212] rounded-l-full px-4 py-1.5 focus-within:border-blue-500 group transition-all duration-200 shadow-inner focus-within:shadow-[0_0_8px_rgba(59,130,246,0.5)]">
            <Search className="w-5 h-5 text-gray-400 mr-2 hidden group-focus-within:block" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-base text-white placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-[#222222] border border-l-0 border-[#303030] rounded-r-full px-5 py-2 hover:bg-[#272727] transition-colors">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
        <button 
          type="button" 
          onClick={() => setIsVoiceSearchOpen(true)}
          className="p-2 bg-[#181818] hover:bg-[#272727] rounded-full transition-colors"
        >
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
      
      <VoiceSearchModal 
        isOpen={isVoiceSearchOpen} 
        onClose={() => setIsVoiceSearchOpen(false)} 
        onResult={handleVoiceResult}
      />
    </nav>
  );
}
