"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ChannelData, ChannelService } from "@/lib/channelService";

export interface User {
  uid: string;
  displayName: string | null;
  photoURL: string | null;
  email: string | null;
}

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

const AUTH_KEY = "youout_auth_user";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [channel, setChannel] = useState<ChannelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isChannelLoading, setIsChannelLoading] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem(AUTH_KEY);
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      fetchChannel(parsedUser.uid);
    }
    setLoading(false);
  }, []);

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

  const refreshChannel = async () => {
    if (user) {
      await fetchChannel(user.uid);
    }
  };

  const signIn = async () => {
    // Generate a random anonymous user
    const anonymousUser: User = {
      uid: "anon_" + Math.random().toString(36).substring(2, 11),
      displayName: "Guest User",
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Math.random()}`,
      email: null,
    };
    setUser(anonymousUser);
    localStorage.setItem(AUTH_KEY, JSON.stringify(anonymousUser));
    await fetchChannel(anonymousUser.uid);
  };

  const logOut = async () => {
    setUser(null);
    setChannel(null);
    localStorage.removeItem(AUTH_KEY);
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
