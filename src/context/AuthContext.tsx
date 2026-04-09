"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  auth, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged,
  User 
} from "@/lib/firebase";
import { ChannelData, ChannelService } from "@/lib/channelService";

interface AuthContextType {
  user: User | null;
  channel: ChannelData | null;
  loading: boolean;
  isChannelLoading: boolean;
  signIn: () => Promise<void>;
  logOut: () => Promise<void>;
  refreshChannel: () => Promise<void>;
  setChannel: (channel: ChannelData | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [channel, setChannel] = useState<ChannelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChannelLoading, setIsChannelLoading] = useState(false);

  const fetchChannel = async (uid: string) => {
    setIsChannelLoading(true);
    try {
      const channelData = await ChannelService.getChannel(uid);
      setChannel(channelData);
    } catch (error) {
      console.error("Error fetching channel:", error);
    } finally {
      setIsChannelLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchChannel(currentUser.uid);
      } else {
        setChannel(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshChannel = async () => {
    if (user) {
      await fetchChannel(user.uid);
    }
  };

  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Sign in error:", error);
    }
  };

  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, channel, loading, isChannelLoading, signIn, logOut, refreshChannel, setChannel }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
