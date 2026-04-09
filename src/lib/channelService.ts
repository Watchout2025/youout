export interface ChannelData {
  uid: string;
  name: string;
  handle: string;
  avatar: string;
  description: string;
  subscribers: number;
  created_at: string;
}

const STORAGE_KEY = "youout_channels";

export const ChannelService = {
  _getAll(): Record<string, ChannelData> {
    if (typeof window === "undefined") return {};
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  },

  _saveAll(channels: Record<string, ChannelData>) {
    if (typeof window === "undefined") return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(channels));
  },

  async getChannel(uid: string): Promise<ChannelData | null> {
    const channels = this._getAll();
    return channels[uid] || null;
  },

  async createChannel(uid: string, name: string, handle: string, avatar: string): Promise<void> {
    const channels = this._getAll();
    channels[uid] = {
      uid,
      name,
      handle: handle.toLowerCase().replace(/[^a-z0-9_]/g, ""),
      avatar,
      description: "",
      subscribers: 0,
      created_at: new Date().toISOString(),
    };
    this._saveAll(channels);
  },

  async isHandleAvailable(handle: string): Promise<boolean> {
    const channels = this._getAll();
    const lowHandle = handle.toLowerCase();
    return !Object.values(channels).some(c => c.handle === lowHandle);
  }
};
