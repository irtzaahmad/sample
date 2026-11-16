"use client";

import React, { useRef, useState } from "react";
import { Sparkles, ImagePlus, X, Send, PlayCircle, Loader2 } from "lucide-react";

interface InputSectionProps {
  topic: string;
  setTopic: (t: string) => void;
  imagePreview: string | null;
  setImagePreview: (img: string | null) => void;
  imageMime: string | null;
  setImageMime: (mime: string | null) => void;
  onSubmit: () => void;
  onTrySample: () => void;
  isLoading: boolean;
}

export default function InputSection({
  topic,
  setTopic,
  imagePreview,
  setImagePreview,
  imageMime,
  setImageMime,
  onSubmit,
  onTrySample,
  isLoading,
}: InputSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileError, setFileError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate type
    const validTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setFileError("Sirf JPG, PNG ya WebP image upload karein.");
      return;
    }

    // Validate size (max 4MB)
    const maxSize = 4 * 1024 * 1024;
    if (file.size > maxSize) {
      setFileError("Image ka size 4MB se zyada nahi hona chahiye.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      setImageMime(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setImagePreview(null);
    setImageMime(null);
    setFileError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Button disabled until either topic text or an image exists
  const isSubmitDisabled = (!topic.trim() && !imagePreview) || isLoading;

  return (
    <div className="glass-card rounded-2xl p-4 sm:p-6 shadow-xl shadow-slate-200/50 mb-8 border border-white/80 transition-all duration-300">
      {/* Textarea */}
      <div className="relative">
        <label
          htmlFor="topic-input"
          className="block text-sm font-semibold text-slate-700 mb-2"
        >
          Aap kya seekhna chahte hain? (Topic ya Sawal likhein):
        </label>
        <textarea
          id="topic-input"
          rows={3}
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Misaal: 'Newton ka third law', 'DNA replication', 'Ohm's Law kya hai?' ya book ke question ki photo upload karein..."
          disabled={isLoading}
          className="w-full rounded-xl border border-slate-300 bg-white/90 px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-emerald-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 text-sm sm:text-base resize-none transition-all duration-200 disabled:opacity-60"
        />
      </div>

      {/* Image Upload Area & Preview */}
      <div className="mt-3">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFileChange}
          className="hidden"
          disabled={isLoading}
        />

        {imagePreview ? (
          <div className="relative inline-flex items-center gap-3 bg-emerald-50/80 border border-emerald-200 rounded-xl p-2 pr-4 shadow-sm animate-fade-in">
            <img
              src={imagePreview}
              alt="Uploaded preview"
              className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-emerald-300"
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-emerald-800">
                Image Attached ✓
              </p>
              <p className="text-[11px] text-slate-500">
                AI diagram/question ko analyze karega
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemoveImage}
              disabled={isLoading}
              title="Remove image"
              className="p-1 rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={isLoading}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-600 hover:text-emerald-700 bg-slate-50 hover:bg-emerald-50/60 border border-slate-200 hover:border-emerald-300 rounded-lg px-3 py-1.5 transition-all duration-200 disabled:opacity-50"
          >
            <ImagePlus className="w-4 h-4 text-emerald-600" />
            Photo/Diagram upload karein (Optional - Max 4MB)
          </button>
        )}

        {fileError && (
          <p className="text-xs text-red-500 mt-1.5 font-medium">{fileError}</p>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Try Sample Button (Zero API Call - Guaranteed demo safety) */}
        <button
          type="button"
          onClick={onTrySample}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 active:bg-emerald-200/80 border border-emerald-200 rounded-xl px-4 py-2.5 transition-all duration-200 disabled:opacity-50"
        >
          <PlayCircle className="w-4 h-4 text-emerald-600" />
          Try Sample (Photosynthesis)
        </button>

        {/* Primary "Samjhao" Action Button */}
        <button
          type="button"
          onClick={onSubmit}
          disabled={isSubmitDisabled}
          className="inline-flex items-center justify-center gap-2 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 active:scale-[0.98] rounded-xl px-6 py-2.5 shadow-md shadow-emerald-600/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Samjha raha hoon...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Samjhao
            </>
          )}
        </button>
      </div>
    </div>
  );
}
