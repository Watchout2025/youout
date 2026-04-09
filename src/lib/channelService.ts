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

export const ChannelService = {
  async getChannel(uid: string): Promise<ChannelData | null> {
    const { data, error } = await supabase
      .from('channels')
      .select('*')
      .eq('uid', uid)
      .single();

    if (error) {
      if (error.code !== 'PGRST116') { // PGRST116 is "no rows returned"
        console.error("Error fetching channel:", error);
      }
      return null;
    }
    return data as ChannelData;
  },

  async createChannel(uid: string, name: string, handle: string, avatar: string): Promise<void> {
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
    const { data, error } = await supabase
      .from('channels')
      .select('handle')
      .eq('handle', handle.toLowerCase());

    if (error) {
      console.error("Error checking handle availability:", error);
      return false;
    }
    return data.length === 0;
  }
};
