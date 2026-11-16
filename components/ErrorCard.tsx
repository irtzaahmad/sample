"use client";

import React from "react";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ErrorCardProps {
  message: string;
  onRetry: () => void;
}

export default function ErrorCard({ message, onRetry }: ErrorCardProps) {
  return (
    <div className="glass-card rounded-2xl p-6 border border-rose-200 bg-rose-50/60 shadow-md my-6 text-center animate-fade-in">
      <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 mx-auto flex items-center justify-center mb-3">
        <AlertCircle className="w-6 h-6" />
      </div>
      <h3 className="text-base font-bold text-rose-900 mb-1">
        Koi Masla Pesha Aaya
      </h3>
      <p className="text-sm text-rose-700 max-w-md mx-auto mb-4">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 active:scale-95 transition-all shadow-sm"
      >
        <RefreshCw className="w-4 h-4" />
        Dubara Koshish Karein (Retry)
      </button>
    </div>
  );
}
