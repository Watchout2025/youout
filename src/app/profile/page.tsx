"use client";

import { useAuth } from "@/context/AuthContext";
import { useTheme } from "next-themes";
import Link from "next/link";
import { 
  UserCircle, SquareUser, LogOut, PlaySquare, 
  DollarSign, ShieldAlert, Moon, Languages, 
  Globe, Keyboard, Settings, HelpCircle, MessageSquare, Sun, ChevronRight 
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { user, channel, logOut, signIn } = useAuth();
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] px-6 text-center">
        <UserCircle className="w-20 h-20 text-[#aaaaaa] mb-6" />
        <h1 className="text-2xl font-bold mb-2">You're not signed in</h1>
        <p className="text-[#aaaaaa] mb-8 text-sm">Sign in to create a channel, like videos, and save your history.</p>
        <button 
          onClick={signIn}
          className="bg-[#3ea6ff] text-[#0f0f0f] px-6 py-2 rounded-full font-bold transition-all active:scale-95"
        >
          Sign in
        </button>
      </div>
    );
  }

  return (
    <div className="pb-20 bg-background min-h-screen transition-colors duration-300">
      {/* Header Profile Section */}
      <div className="flex items-center gap-4 p-6 border-b border-border-custom">
        <img 
          src={user.photoURL || ""} 
          alt="Profile" 
          className="w-16 h-16 rounded-full border border-border-custom"
        />
        <div className="flex flex-col overflow-hidden">
          <h1 className="text-xl font-bold truncate">{channel?.name || user.displayName}</h1>
          <p className="text-sm text-[#aaaaaa] truncate mb-2">{channel ? `@${channel.handle}` : "Guest Account"}</p>
          {channel ? (
            <Link href={`/channel/@${channel.handle}`} className="text-sm text-[#3ea6ff] font-medium">
              View channel
            </Link>
          ) : (
            <Link href="/" className="text-sm text-[#3ea6ff] font-medium">
              Create a channel
            </Link>
          )}
        </div>
      </div>

      {/* Menu Sections */}
      <div className="mt-2">
        <div className="border-b border-border-custom pb-2">
          <ProfileMenuItem icon={UserCircle} text="Google Account" />
          <ProfileMenuItem icon={SquareUser} text="Switch account" />
          <ProfileMenuItem 
            icon={LogOut} 
            text="Sign out" 
            onClick={() => { logOut(); router.push('/'); }} 
          />
        </div>

        <div className="border-b border-border-custom py-2">
          <ProfileMenuItem icon={PlaySquare} text="Creator Studio" />
          <ProfileMenuItem icon={DollarSign} text="Purchases and memberships" />
        </div>

        <div className="border-b border-border-custom py-2">
          <ProfileMenuItem icon={ShieldAlert} text="Your data in YouOut" />
          <ProfileMenuItem 
            icon={resolvedTheme === 'dark' ? Moon : Sun} 
            text={`Appearance: ${resolvedTheme === 'dark' ? 'Dark' : 'Light'}`} 
            hasChevron 
            onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
          />
          <ProfileMenuItem icon={Languages} text="Language: English" hasChevron />
          <ProfileMenuItem icon={Globe} text="Location: United States" hasChevron />
          <ProfileMenuItem icon={Keyboard} text="Keyboard shortcuts" />
        </div>

        <div className="py-2">
          <ProfileMenuItem icon={Settings} text="Settings" />
          <ProfileMenuItem icon={HelpCircle} text="Help" />
          <ProfileMenuItem icon={MessageSquare} text="Send feedback" />
        </div>
      </div>
    </div>
  );
}

function ProfileMenuItem({ icon: Icon, text, onClick, hasChevron }: { icon: any, text: string, onClick?: () => void, hasChevron?: boolean }) {
  return (
    <button 
      onClick={onClick}
      className="w-full flex items-center gap-4 px-6 py-3 hover:bg-sidebar-hover transition-colors text-base text-foreground active:bg-sidebar-hover"
    >
      <Icon className="w-6 h-6 stroke-[1.2px]" />
      <span className="flex-1 text-left">{text}</span>
      {hasChevron && <ChevronRight className="w-5 h-5 text-[#aaaaaa] stroke-[1px]" />}
    </button>
  );
}
