"use client";

import { Home, ThumbsUp, Plus, History, UserCircle } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();

  const NAV_ITEMS = [
    { name: "Home", icon: Home, href: "/" },
    { name: "Liked", icon: ThumbsUp, href: "/liked" },
    { name: "Create", icon: Plus, href: "/create", isCreate: true },
    { name: "History", icon: History, href: "/history" },
    { name: "You", icon: UserCircle, href: "/profile", isProfile: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border-custom h-[50px] flex items-center justify-around z-50 md:hidden transition-colors duration-300">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === item.href;
        const Icon = item.icon;
        
        if (item.isCreate) {
          return (
            <Link key={item.name} href={item.href} className="flex flex-col items-center justify-center">
              <div className="w-9 h-9 border border-foreground/40 rounded-full flex items-center justify-center hover:bg-sidebar-hover">
                <Plus className="w-7 h-7 text-foreground" strokeWidth={1.5} />
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
            {item.isProfile && user ? (
              <img 
                src={user.photoURL || ""} 
                alt="You" 
                className={`w-6 h-6 rounded-full border ${isActive ? 'border-foreground' : 'border-transparent'}`}
              />
            ) : (
              <Icon 
                className={`w-6 h-6 text-foreground`} 
                strokeWidth={isActive ? 2.5 : 1.5}
                fill={isActive ? "currentColor" : "none"}
              />
            )}
            <span className={`text-[10px] ${isActive ? "text-foreground font-medium" : "text-foreground/70"}`}>
              {item.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
