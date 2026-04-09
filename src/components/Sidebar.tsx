"use client";

import { Home, Play, Library, History, Clock, ThumbsUp, Flame, ShoppingBag, Music2, Gamepad2, Trophy, Settings, Flag, HelpCircle, MessageSquare } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

const MAIN_LINKS = [
  { name: "Home", icon: Home, href: "/" },
];

const YOU_LINKS = [
  { name: "History", icon: History, href: "/history" },
  { name: "Watch later", icon: Clock, href: "/watch-later" },
  { name: "Liked videos", icon: ThumbsUp, href: "/liked" },
];

const EXPLORE_LINKS = [
  { name: "Trending", icon: Flame, href: "/trending" },
  { name: "Shopping", icon: ShoppingBag, href: "/shopping" },
  { name: "Music", icon: Music2, href: "/music" },
  { name: "Gaming", icon: Gamepad2, href: "/gaming" },
  { name: "Sports", icon: Trophy, href: "/sports" },
];

const SETTINGS_LINKS = [
  { name: "Settings", icon: Settings, href: "/settings" },
  { name: "Report history", icon: Flag, href: "/report" },
  { name: "Help", icon: HelpCircle, href: "/help" },
  { name: "Send feedback", icon: MessageSquare, href: "/feedback" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const isWatchPage = pathname === "/watch";
  const { isCollapsed } = useSidebar();

  if (isWatchPage || isCollapsed) return null;

  return (
    <aside 
      className="fixed left-0 top-14 bottom-0 w-60 bg-[#0f0f0f] overflow-y-auto hidden md:block px-3 py-2 z-40 text-white"
    >
      <div className="space-y-1 pb-4 border-b border-[#303030]">
        {MAIN_LINKS.map((link) => (
          <SidebarItem 
            key={link.name} 
            {...link} 
            isActive={pathname === link.href} 
          />
        ))}
      </div>

      <div className="pt-4 space-y-1 pb-4 border-b border-[#303030]">
        <h3 className="px-3 py-2 font-semibold text-white">You</h3>
        {YOU_LINKS.map((link) => (
          <SidebarItem key={link.name} {...link} isActive={pathname === link.href} />
        ))}
      </div>

      <div className="pt-4 space-y-1 pb-4 border-b border-[#303030]">
        <h3 className="px-3 py-2 font-semibold text-white">Explore</h3>
        {EXPLORE_LINKS.map((link) => (
          <SidebarItem key={link.name} {...link} isActive={pathname === link.href} />
        ))}
      </div>

      <div className="pt-4 space-y-1 pb-4">
        {SETTINGS_LINKS.map((link) => (
          <SidebarItem key={link.name} {...link} isActive={pathname === link.href} />
        ))}
      </div>
    </aside>
  );
}

function SidebarItem({ name, icon: Icon, href, isActive }: { name: string; icon: React.ElementType; href: string; isActive: boolean }) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-5 px-3 py-2.5 rounded-xl hover:bg-[#272727] transition-all ${
        isActive ? "bg-[#272727] font-medium" : ""
      }`}
    >
      <Icon className={`w-6 h-6 ${isActive ? "fill-white" : ""}`} />
      <span className="text-[14px] leading-5">
        {name}
      </span>
    </Link>
  );
}
