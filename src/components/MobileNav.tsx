"use client";

import { Home, ThumbsUp, Plus, History, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { name: "Home", icon: Home, href: "/" },
  { name: "Liked", icon: ThumbsUp, href: "/liked" },
  { name: "Create", icon: Plus, href: "/create", isCreate: true },
  { name: "History", icon: History, href: "/history" },
  { name: "You", icon: UserCircle, href: "/profile" },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f0f0f] border-t border-[#272727] h-[50px] flex items-center justify-around z-50 md:hidden">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        if (item.isCreate) {
          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center">
              <div className="w-9 h-9 border border-white/40 rounded-full flex items-center justify-center hover:bg-[#272727]">
                <Plus className="w-7 h-7 text-white" strokeWidth={1.5} />
              </div>
            </Link>
          );
        }

        return (
          <Link 
            key={item.name} 
            href={item.href} 
            className="flex flex-col items-center justify-center gap-0.5 min-w-[50px]"
          >
            <Icon 
              className={`w-6 h-6 text-white`} 
              strokeWidth={isActive ? 2.5 : 1.5}
              fill={isActive ? "currentColor" : "none"}
            />
            <span className={`text-[10px] ${isActive ? "text-white font-medium" : "text-[#f1f1f1]"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
