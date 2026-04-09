"use client";

import { Video } from "./data";

const STORAGE_KEYS = {
  HISTORY: "youout_history",
  WATCH_LATER: "youout_watch_later",
  LIKED: "youout_liked",
};

export const VideoService = {
  // Common internal methods
  _get(key: string): Video[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  _save(key: string, videos: Video[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(videos));
  },

  // History
  addToHistory(video: Video) {
    const history = this._get(STORAGE_KEYS.HISTORY);
    // Remove if exists to move to top (most recent)
    const filtered = history.filter((v) => v.id !== video.id);
    this._save(STORAGE_KEYS.HISTORY, [video, ...filtered].slice(0, 100));
  },

  getHistory(): Video[] {
    return this._get(STORAGE_KEYS.HISTORY);
  },

  // Watch Later
  toggleWatchLater(video: Video) {
    const list = this._get(STORAGE_KEYS.WATCH_LATER);
    const exists = list.some((v) => v.id === video.id);
    if (exists) {
      this._save(STORAGE_KEYS.WATCH_LATER, list.filter((v) => v.id !== video.id));
      return false;
    } else {
      this._save(STORAGE_KEYS.WATCH_LATER, [video, ...list]);
      return true;
    }
  },

  isInWatchLater(videoId: string): boolean {
    return this._get(STORAGE_KEYS.WATCH_LATER).some((v) => v.id === videoId);
  },

  getWatchLater(): Video[] {
    return this._get(STORAGE_KEYS.WATCH_LATER);
  },

  // Liked
  toggleLiked(video: Video) {
    const list = this._get(STORAGE_KEYS.LIKED);
    const exists = list.some((v) => v.id === video.id);
    if (exists) {
      this._save(STORAGE_KEYS.LIKED, list.filter((v) => v.id !== video.id));
      return false;
    } else {
      this._save(STORAGE_KEYS.LIKED, [video, ...list]);
      return true;
    }
  },

  isLiked(videoId: string): boolean {
    return this._get(STORAGE_KEYS.LIKED).some((v) => v.id === videoId);
  },

  getLiked(): Video[] {
    return this._get(STORAGE_KEYS.LIKED);
  },
};
