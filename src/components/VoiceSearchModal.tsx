"use client";

import { Mic, X } from "lucide-react";
import { useEffect, useState } from "react";

interface VoiceSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onResult: (text: string) => void;
}

export default function VoiceSearchModal({ isOpen, onClose, onResult }: VoiceSearchModalProps) {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setError("Your browser does not support voice search.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onstart = () => {
      setIsListening(true);
      setTranscript("Listening...");
      setError(null);
    };

    recognition.onresult = (event: any) => {
      const current = event.resultIndex;
      const text = event.results[current][0].transcript;
      setTranscript(text);

      if (event.results[current].isFinal) {
        setTimeout(() => {
          onResult(text);
          onClose();
        }, 800);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      if (event.error === "not-allowed") {
        setError("Microphone access denied. Please enable it in your browser settings.");
      } else {
        setError("Could not hear anything. Please try again.");
      }
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();

    return () => {
      recognition.stop();
    };
  }, [isOpen, onResult, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="relative w-full max-w-lg bg-[#212121] rounded-lg shadow-2xl p-8 flex flex-col items-center animate-in fade-in zoom-in duration-200">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-[#383838] rounded-full transition-colors"
        >
          <X className="w-6 h-6 text-white" />
        </button>

        <div className="w-full mb-12 min-h-[80px]">
          <h2 className={`text-2xl font-normal text-white mb-4 ${isListening && transcript === "Listening..." ? "opacity-60" : "opacity-100"}`}>
            {transcript}
          </h2>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </div>

        <div className="relative">
          {isListening && (
            <div className="absolute inset-0 bg-red-600/20 rounded-full animate-ping scale-150"></div>
          )}
          <button 
            className={`relative p-8 rounded-full transition-all duration-300 ${
              isListening ? "bg-red-600 scale-110 shadow-[0_0_20px_rgba(220,38,38,0.5)]" : "bg-[#383838] hover:bg-[#4d4d4d]"
            }`}
          >
            <Mic className={`w-10 h-10 text-white ${isListening ? "animate-pulse" : ""}`} />
          </button>
        </div>

        <p className="mt-8 text-[#aaaaaa] text-sm">
          {isListening ? "Listening..." : "Tap the microphone to try again"}
        </p>
      </div>
    </div>
  );
}
