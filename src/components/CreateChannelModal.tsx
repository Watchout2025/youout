"use client";

import { useState, useEffect } from "react";
import { X, Camera, Check, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ChannelService } from "@/lib/channelService";

interface CreateChannelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateChannelModal({ isOpen, onClose }: CreateChannelModalProps) {
  const { user, refreshChannel } = useAuth();
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [isCheckingHandle, setIsCheckingHandle] = useState(false);
  const [handleStatus, setHandleStatus] = useState<"none" | "available" | "taken">("none");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && isOpen) {
      setName(user.displayName || "");
      const initialHandle = (user.displayName || "").toLowerCase().replace(/[^a-z0-9_]/g, "");
      setHandle(initialHandle);
    }
  }, [user, isOpen]);

  useEffect(() => {
    if (!handle || handle.length < 3) {
      setHandleStatus("none");
      return;
    }

    const timer = setTimeout(async () => {
      setIsCheckingHandle(true);
      const available = await ChannelService.isHandleAvailable(handle);
      setHandleStatus(available ? "available" : "taken");
      setIsCheckingHandle(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [handle]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || handleStatus !== "available" || !name) return;

    setIsSubmitting(true);
    setError("");
    try {
      await ChannelService.createChannel(user.uid, name, handle, user.photoURL || "");
      await refreshChannel();
      onClose();
    } catch (err) {
      setError("Failed to create channel. Please try again.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-md bg-background border border-border-custom rounded-2xl shadow-2xl overflow-hidden transition-colors duration-300">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border-custom">
          <h2 className="text-xl font-bold text-foreground">How you'll appear</h2>
          <button onClick={onClose} className="p-2 hover:bg-sidebar-hover rounded-full transition-colors">
            <X className="w-6 h-6 text-foreground" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="flex flex-col items-center mb-8">
            <div className="relative group">
              <img 
                src={user?.photoURL || ""} 
                alt="Profile" 
                className="w-24 h-24 rounded-full border-2 border-border-custom"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="w-8 h-8 text-white" />
              </div>
            </div>
            <p className="mt-2 text-sm text-blue-400 font-medium cursor-pointer">Upload picture</p>
          </div>

          <div className="space-y-6">
            <div className="relative">
              <label className="block text-xs font-medium text-[#aaaaaa] mb-1">Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-background border border-border-custom rounded-lg px-4 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Channel name"
                required
              />
            </div>

            <div className="relative">
              <label className="block text-xs font-medium text-[#aaaaaa] mb-1">Handle</label>
              <div className="relative">
                <span className="absolute left-4 top-3.5 text-foreground">@</span>
                <input 
                  type="text" 
                  value={handle}
                  onChange={(e) => setHandle(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ""))}
                  className={`w-full bg-background border ${
                    handleStatus === "taken" ? "border-red-500" : "border-border-custom"
                  } rounded-lg pl-8 pr-10 py-3 text-foreground focus:border-blue-500 focus:outline-none transition-colors`}
                  placeholder="unique_handle"
                  required
                />
                <div className="absolute right-3 top-3.5">
                  {isCheckingHandle && <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>}
                  {handleStatus === "available" && !isCheckingHandle && <Check className="w-5 h-5 text-green-500" />}
                  {handleStatus === "taken" && !isCheckingHandle && <AlertCircle className="w-5 h-5 text-red-500" />}
                </div>
              </div>
              <p className="mt-1 text-[11px] text-[#aaaaaa]">
                {handleStatus === "taken" ? "This handle is already taken." : "Handles can contain letters, numbers, and underscores."}
              </p>
            </div>
          </div>

          {error && <p className="mt-4 text-sm text-red-500 text-center">{error}</p>}

          <div className="mt-8 flex gap-3 justify-end">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-foreground font-medium hover:bg-sidebar-hover rounded-full transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting || handleStatus !== "available" || !name}
              className="px-6 py-2 bg-[#3ea6ff] text-[#0f0f0f] font-bold rounded-full hover:bg-[#71bbff] disabled:bg-[#333333] disabled:text-[#717171] transition-all"
            >
              {isSubmitting ? "Creating..." : "Create channel"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
