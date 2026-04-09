import { db, doc, getDoc, setDoc, collection, query, where, getDocs, serverTimestamp } from "./firebase";

export interface ChannelData {
  uid: string;
  name: string;
  handle: string;
  avatar: string;
  description: string;
  subscribers: number;
  createdAt: any;
}

export const ChannelService = {
  async getChannel(uid: string): Promise<ChannelData | null> {
    const docRef = doc(db, "channels", uid);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? (docSnap.data() as ChannelData) : null;
  },

  async createChannel(uid: string, name: string, handle: string, avatar: string): Promise<void> {
    const docRef = doc(db, "channels", uid);
    const newChannel: ChannelData = {
      uid,
      name,
      handle: handle.toLowerCase().replace(/[^a-z0-9_]/g, ""),
      avatar,
      description: "",
      subscribers: 0,
      createdAt: serverTimestamp(),
    };
    await setDoc(docRef, newChannel);
  },

  async isHandleAvailable(handle: string): Promise<boolean> {
    const q = query(collection(db, "channels"), where("handle", "==", handle.toLowerCase()));
    const querySnapshot = await getDocs(q);
    return querySnapshot.empty;
  }
};
