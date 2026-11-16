"use client";

import React, { useState, useRef } from "react";
import Header from "@/components/Header";
import InputSection from "@/components/InputSection";
import ResultCard from "@/components/ResultCard";
import LoadingCard from "@/components/LoadingCard";
import ErrorCard from "@/components/ErrorCard";
import { ExplanationResponse } from "@/types";
import { SAMPLE_DATA } from "@/lib/sampleData";

export default function Home() {
  const [topic, setTopic] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExplanationResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resultRef = useRef<HTMLDivElement>(null);

  const scrollToResult = () => {
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 150);
  };

  // Submit to Gemini API
  const handleSubmit = async () => {
    if (!topic.trim() && !imagePreview) return;

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: topic.trim(),
          imageBase64: imagePreview,
          imageMime: imageMime,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Server se ghalat response aaya hai.");
      }

      setResult(data);
      scrollToResult();
    } catch (err: any) {
      console.error("Submit Error:", err);
      setError(
        err.message ||
          "Internet ya server ka masla hai. Baraye meharbani dubara koshish karein."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Pre-written sample (Guaranteed demo safety - zero API call)
  const handleTrySample = () => {
    setError(null);
    setTopic("Photosynthesis (روشنی سے خوراک بنانا)");
    setImagePreview(null);
    setImageMime(null);
    setResult(SAMPLE_DATA);
    scrollToResult();
  };

  return (
    <main className="w-full max-w-4xl mx-auto px-4 py-6 sm:py-10 flex-1 flex flex-col justify-start">
      {/* Header with Title, SDG 4 Badge and Urdu branding */}
      <Header />

      {/* Input Section for prompt & optional image */}
      <InputSection
        topic={topic}
        setTopic={setTopic}
        imagePreview={imagePreview}
        setImagePreview={setImagePreview}
        imageMime={imageMime}
        setImageMime={setImageMime}
        onSubmit={handleSubmit}
        onTrySample={handleTrySample}
        isLoading={isLoading}
      />

      {/* Result Container Anchor */}
      <div ref={resultRef} className="scroll-mt-6">
        {/* Loading State with animated steps */}
        {isLoading && <LoadingCard />}

        {/* Friendly Error with Retry */}
        {error && !isLoading && (
          <ErrorCard message={error} onRetry={handleSubmit} />
        )}

        {/* Generated or Sample Cards */}
        {result && !isLoading && <ResultCard data={result} />}
      </div>
    </main>
  );
}
