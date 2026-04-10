"use client";

import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarContext";

export default function MainContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isWatchPage = pathname.startsWith("/watch/");
  const { isCollapsed } = useSidebar();

  return (
    <main className={`transition-all duration-300 ${
      isWatchPage || isCollapsed 
        ? "ml-0 px-0 sm:px-4" 
        : "md:ml-60 px-0 sm:px-4"
    }`}>
      {children}
    </main>
  );
}
