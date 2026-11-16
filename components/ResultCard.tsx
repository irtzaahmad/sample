"use client";

import React from "react";
import { ExplanationResponse } from "@/types";
import { BookMarked, Compass, Sparkles } from "lucide-react";
import QuizSection from "./QuizSection";

interface ResultCardProps {
  data: ExplanationResponse;
}

export default function ResultCard({ data }: ResultCardProps) {
  return (
    <div className="space-y-6 animate-fade-in pb-12">
      {/* 1. Header & Simple Explanation Card */}
      <div className="glass-card rounded-2xl p-5 sm:p-7 shadow-lg shadow-slate-200/50 border border-emerald-100/80">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <BookMarked className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
              Aasaan Tashreeh (Simple Explanation)
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              {data.title}
            </h2>
          </div>
        </div>

        <div className="mt-4 text-slate-700 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-white/60 p-4 sm:p-5 rounded-xl border border-slate-100">
          {data.explanation}
        </div>
      </div>

      {/* 2. Real-life Pakistani Example Card */}
      <div className="glass-card rounded-2xl p-5 sm:p-7 shadow-lg shadow-emerald-500/5 border border-emerald-200 bg-gradient-to-br from-emerald-50/70 via-white/80 to-teal-50/50">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800">
              Rozmarra Zindagi Ka Reference
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-emerald-950">
              🇵🇰 Pakistani Desi Misaal
            </h3>
          </div>
        </div>

        <div className="mt-4 p-4 sm:p-5 rounded-xl bg-white/90 border border-emerald-200/80 shadow-sm text-slate-800 text-sm sm:text-base leading-relaxed">
          {data.example}
        </div>
      </div>

      {/* 3. Interactive Quiz Component */}
      <QuizSection quiz={data.quiz} />
    </div>
  );
}
