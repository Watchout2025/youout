"use client";

import { 
  Menu, Search, Mic, Video, Bell, ArrowLeft, 
  LogOut, Settings, HelpCircle, 
  MessageSquare, Languages, ShieldAlert, Globe, 
  Keyboard, SquareUser, PlaySquare, DollarSign, 
  UserCircle, Moon, ChevronRight, Sun
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { useSidebar } from "@/context/SidebarContext";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import VoiceSearchModal from "./VoiceSearchModal";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isVoiceSearchOpen, setIsVoiceSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const { user, signIn, logOut } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
      <nav className="fixed top-0 left-0 right-0 bg-background h-14 flex items-center px-2 z-50 gap-2 border-b border-border-custom">
        <button 
          onClick={() => setIsMobileSearchOpen(false)}
          className="p-2 hover:bg-sidebar-hover rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-foreground" />
        </button>
        <form onSubmit={handleSearch} className="flex-1 flex items-center bg-background rounded-full px-4 py-1.5 border border-border-custom">
          <input
            type="text"
            autoFocus
            placeholder="Search YouOut"
            className="w-full bg-transparent focus:outline-none text-base text-foreground placeholder-gray-400"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <button 
          onClick={() => setIsVoiceSearchOpen(true)}
          className="p-2 bg-sidebar-hover rounded-full hover:bg-sidebar-hover transition-colors"
        >
          <Mic className="w-5 h-5 text-foreground" />
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
    <nav className="fixed top-0 left-0 right-0 bg-background h-14 flex items-center justify-between px-4 z-50 border-b border-border-custom">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="p-2 hover:bg-sidebar-hover rounded-full hidden md:block transition-colors">
          <Menu className="w-6 h-6 text-foreground" />
        </button>
        <Link href="/" className="flex items-center gap-1 group">
          <div className="flex items-center">
            <svg width="32" height="22" viewBox="0 0 29 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="transition-transform group-active:scale-95">
              <path d="M14.4848 20C14.4848 20 23.5695 20 25.8229 19.4C27.0917 19.06 28.0459 18.08 28.3808 16.87C29 14.65 29 9.98 29 9.98C29 9.98 29 5.34 28.3808 3.14C28.0459 1.9 27.0917 0.94 25.8229 0.61C23.5695 0 14.4848 0 14.4848 0C14.4848 0 5.42037 0 3.17711 0.61C1.9286 0.94 0.954148 1.9 0.59888 3.14C0 5.34 0 9.98 0 9.98C0 9.98 0 14.65 0.59888 16.87C0.954148 18.08 1.9286 19.06 3.17711 19.4C5.42037 20 14.4848 20 14.4848 20Z" fill="#FF0033"></path>
              <path d="M19 10L11.5 5.75V14.25L19 10Z" fill="white"></path>
            </svg>
          </div>
          <span className="font-bold text-xl tracking-tighter text-foreground">YouOut</span>
        </Link>
      </div>

      <form onSubmit={handleSearch} className="flex-1 max-w-[600px] items-center gap-4 ml-10 hidden md:flex">
        <div className="flex flex-1 items-center">
          <div className="flex flex-1 items-center border border-border-custom bg-background rounded-l-full px-4 py-1.5 focus-within:border-blue-500 group transition-all duration-200 shadow-inner focus-within:shadow-[0_0_8px_rgba(59,130,246,0.3)]">
            <Search className="w-5 h-5 text-gray-400 mr-2 hidden group-focus-within:block" />
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-transparent focus:outline-none text-base text-foreground placeholder-gray-400"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="bg-sidebar-hover border border-l-0 border-border-custom rounded-r-full px-5 py-2 hover:bg-sidebar-hover/80 transition-colors">
            <Search className="w-5 h-5 text-foreground" />
          </button>
        </div>
        <button 
          type="button" 
          onClick={() => setIsVoiceSearchOpen(true)}
          className="p-2 bg-sidebar-hover hover:bg-sidebar-hover/80 rounded-full transition-colors"
        >
          <Mic className="w-5 h-5 text-foreground" />
        </button>
      </form>

      <div className="flex items-center gap-1 sm:gap-2">
        <button 
          onClick={() => setIsMobileSearchOpen(true)}
          className="p-2 hover:bg-sidebar-hover rounded-full md:hidden transition-colors"
        >
          <Search className="w-6 h-6 text-foreground" />
        </button>
        <button className="p-2 hover:bg-sidebar-hover rounded-full hidden sm:block transition-colors">
          <Video className="w-6 h-6 text-foreground" />
        </button>
        <button className="p-2 hover:bg-sidebar-hover rounded-full transition-colors">
          <Bell className="w-6 h-6 text-foreground" />
        </button>
        
        {user ? (
          <div className="relative" ref={userMenuRef}>
            <button 
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="p-1 hover:bg-sidebar-hover rounded-full ml-1 sm:ml-2 transition-colors"
            >
              <img 
                src={user.photoURL || ""} 
                alt={user.displayName || "User"} 
                className="w-8 h-8 rounded-full border border-border-custom"
              />
            </button>
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-background rounded-xl shadow-2xl border border-border-custom py-2 z-[60] overflow-y-auto max-h-[90vh]">
                {/* User Header */}
                <div className="flex gap-4 px-4 py-3 border-b border-border-custom mb-2 text-foreground">
                  <img 
                    src={user.photoURL || ""} 
                    alt={user.displayName || "User"} 
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex flex-col overflow-hidden">
                    <p className="text-base font-normal truncate">{user.displayName}</p>
                    <p className="text-sm text-[#aaaaaa] truncate mb-2">{user.email}</p>
                    <Link href="/channel" className="text-sm text-[#3ea6ff] hover:text-[#71bbff]">
                      View your channel
                    </Link>
                  </div>
                </div>

                {/* Section 1 */}
                <div className="border-b border-border-custom pb-2 mb-2">
                  <MenuButton icon={UserCircle} text="Google Account" />
                  <MenuButton icon={SquareUser} text="Switch account" />
                  <MenuButton 
                    icon={LogOut} 
                    text="Sign out" 
                    onClick={() => { logOut(); setIsUserMenuOpen(false); }} 
                  />
                </div>

                {/* Section 2 */}
                <div className="border-b border-border-custom pb-2 mb-2">
                  <MenuButton icon={PlaySquare} text="YouTube Studio" />
                  <MenuButton icon={DollarSign} text="Purchases and memberships" />
                </div>

                {/* Section 3 */}
                <div className="border-b border-border-custom pb-2 mb-2">
                  <MenuButton icon={ShieldAlert} text="Your data in YouOut" />
                  <MenuButton 
                    icon={resolvedTheme === 'dark' ? Moon : Sun} 
                    text={`Appearance: ${resolvedTheme === 'dark' ? 'Dark' : 'Light'}`} 
                    hasChevron 
                    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                  />
                  <MenuButton icon={Languages} text="Language: English" hasChevron />
                  <MenuButton icon={ShieldAlert} text="Restricted Mode: Off" hasChevron />
                  <MenuButton icon={Globe} text="Location: United States" hasChevron />
                  <MenuButton icon={Keyboard} text="Keyboard shortcuts" />
                </div>

                {/* Section 4 */}
                <div className="pb-2">
                  <MenuButton icon={Settings} text="Settings" />
                </div>
                
                <div className="border-t border-border-custom pt-2">
                  <MenuButton icon={HelpCircle} text="Help" />
                  <MenuButton icon={MessageSquare} text="Send feedback" />
                </div>
              </div>
            )}
          </div>
        ) : (
          <button 
            onClick={signIn}
            className="flex items-center gap-2 ml-1 sm:ml-2 px-3 py-1.5 border border-border-custom rounded-full text-[#3ea6ff] hover:bg-[#3ea6ff]/10 hover:border-[#3ea6ff] transition-all text-sm font-medium"
          >
            <div className="w-6 h-6 rounded-full border border-current flex items-center justify-center">
              <span className="text-[10px]">👤</span>
            </div>
            Sign in
          </button>
        )}
      </div>
      
      <VoiceSearchModal 
        isOpen={isVoiceSearchOpen} 
        onClose={() => setIsVoiceSearchOpen(false)} 
        onResult={handleVoiceResult}
      />
    </nav>
  );
}

function MenuButton({ icon: Icon, text, onClick, hasChevron }: { icon: any, text: string, onClick?: () => void, hasChevron?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 px-4 py-2 hover:bg-sidebar-hover transition-colors text-sm font-normal text-foreground"
    >
      <Icon className="w-6 h-6 stroke-[1.2px]" />
      <span className="flex-1 text-left">{text}</span>
      {hasChevron && <ChevronRight className="w-5 h-5 text-[#aaaaaa] stroke-[1px]" />}
    </button>
  );
}
