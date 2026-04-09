import { supabase } from "./supabase";

export interface ChannelData {
  uid: string;
  name: string;
  handle: string;
  avatar: string;
  description: string;
  subscribers: number;
  created_at: string;
}

const isSupabaseConfigured = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const ChannelService = {
  async getChannel(uid: string): Promise<ChannelData | null> {
    if (!isSupabaseConfigured) return null;

    try {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .eq('uid', uid)
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.error("Error fetching channel:", error);
        }
        return null;
      }
      return data as ChannelData;
    } catch (e) {
      return null;
    }
  },

  async createChannel(uid: string, name: string, handle: string, avatar: string): Promise<void> {
    if (!isSupabaseConfigured) throw new Error("Supabase is not configured");

    const newChannel = {
      uid,
      name,
      handle: handle.toLowerCase().replace(/[^a-z0-9_]/g, ""),
      avatar,
      description: "",
      subscribers: 0,
    };

    const { error } = await supabase
      .from('channels')
      .insert([newChannel]);

    if (error) {
      console.error("Error creating channel:", error);
      throw error;
    }
  },

  async isHandleAvailable(handle: string): Promise<boolean> {
    if (!isSupabaseConfigured) return true;

    try {
      const { data, error } = await supabase
        .from('channels')
        .select('handle')
        .eq('handle', handle.toLowerCase());

      if (error) {
        console.error("Error checking handle availability:", error);
        return true; // Assume available on error for better UX during outages/build
      }
      return data.length === 0;
    } catch (e) {
      return true;
    }
  }
};
