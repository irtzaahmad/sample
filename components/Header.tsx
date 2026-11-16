import React from "react";
import { BookOpen, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="text-center pt-8 pb-6 px-4">
      {/* SDG 4 & Hackathon Badges */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100/90 text-emerald-800 border border-emerald-300 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          SDG 4: Quality Education
        </span>
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-white/80 text-slate-700 border border-slate-200 shadow-sm backdrop-blur-sm">
          🇵🇰 For Pakistani Students
        </span>
      </div>

      {/* Main Logo & Title */}
      <div className="flex items-center justify-center gap-3 mb-2">
        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 transform hover:scale-105 transition-transform duration-300">
          <BookOpen className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
          Samjhao <span className="text-emerald-600 font-serif font-normal text-2xl sm:text-4xl">سمجھاؤ</span>
        </h1>
      </div>

      {/* Tagline */}
      <p className="max-w-xl mx-auto text-base sm:text-lg text-slate-600 mt-2 font-normal">
        Mushkil academic concepts ko <span className="font-semibold text-emerald-700">Roman Urdu</span>, desi misalon aur interactive quiz ke sath minute-on mein samjhein!
      </p>
    </header>
  );
}
