"use client";

import React, { useEffect, useState } from "react";
import { Loader2, Lightbulb, Sparkles, BookOpen } from "lucide-react";

const LOADING_STEPS = [
  "Ustaad aapka sawal samajh raha hai...",
  "Roman Urdu mein aasaan alfaz dhoond rahe hain...",
  "Desi Pakistani misaal create ho rahi hai...",
  "Interactive MCQ quiz tayyar kiya ja raha hai...",
];

export default function LoadingCard() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => (prev + 1) % LOADING_STEPS.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="glass-card rounded-2xl p-6 sm:p-8 text-center shadow-lg shadow-emerald-500/5 border border-emerald-100 animate-fade-in my-6">
      <div className="relative inline-flex items-center justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center animate-pulse">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
        </div>
        <div className="absolute -top-1 -right-1 bg-amber-400 text-white rounded-full p-1 shadow">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      <h3 className="text-lg font-bold text-slate-800 mb-2">
        Aapke Liye Tashreeh Tayyar Ho Rahi Hai
      </h3>

      <div className="h-6 flex items-center justify-center">
        <p className="text-sm font-medium text-emerald-700 transition-all duration-300">
          {LOADING_STEPS[currentStepIndex]}
        </p>
      </div>

      {/* Animated progress bar */}
      <div className="w-48 h-1.5 bg-slate-100 rounded-full mx-auto mt-5 overflow-hidden">
        <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-pulse-slow w-3/4"></div>
      </div>

      <p className="text-xs text-slate-400 mt-4">
        Minhaj University AI Hackathon • Quality Education (SDG 4)
      </p>
    </div>
  );
}
