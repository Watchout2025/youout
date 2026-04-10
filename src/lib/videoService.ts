"use client";

import { Video } from "./data";

const STORAGE_KEYS = {
  HISTORY: "youout_history",
  WATCH_LATER: "youout_watch_later",
  LIKED: "youout_liked",
  SEARCHES: "youout_recent_searches",
  PROGRESS: "youout_progress",
};

export interface VideoProgress {
  currentTime: number;
  duration: number;
}

export const VideoService = {
  // Common internal methods
  _get(key: string): any[] {
    if (typeof window === "undefined") return [];
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  _save(key: string, data: any[]) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
  },

  _getObj(key: string): Record<string, any> {
    if (typeof window === "undefined") return {};
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : {};
  },

  _saveObj(key: string, data: Record<string, any>) {
    if (typeof window === "undefined") return;
    localStorage.setItem(key, JSON.stringify(data));
  },

  // Progress Management
  saveProgress(videoId: string, currentTime: number, duration: number) {
    if (duration <= 0) return;
    const progress = this._getObj(STORAGE_KEYS.PROGRESS);
    progress[videoId] = { currentTime, duration, updatedAt: Date.now() };
    this._saveObj(STORAGE_KEYS.PROGRESS, progress);
  },

  getProgress(videoId: string): VideoProgress | null {
    const progress = this._getObj(STORAGE_KEYS.PROGRESS);
    return progress[videoId] || null;
  },

  getAllProgress(): Record<string, VideoProgress> {
    return this._getObj(STORAGE_KEYS.PROGRESS);
  },

  // Recent Searches
  addRecentSearch(query: string) {
    if (!query.trim()) return;
    const searches = this._get(STORAGE_KEYS.SEARCHES);
    const filtered = searches.filter((s) => s !== query);
    this._save(STORAGE_KEYS.SEARCHES, [query, ...filtered].slice(0, 10));
  },

  getRecentSearches(): string[] {
    return this._get(STORAGE_KEYS.SEARCHES);
  },

  removeRecentSearch(query: string) {
    const searches = this._get(STORAGE_KEYS.SEARCHES);
    this._save(STORAGE_KEYS.SEARCHES, searches.filter((s) => s !== query));
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
