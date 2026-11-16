"use client";

import React, { useState } from "react";
import { QuizQuestion } from "@/types";
import { CheckCircle2, XCircle, HelpCircle, Trophy, RotateCcw } from "lucide-react";
import confetti from "canvas-confetti";

interface QuizSectionProps {
  quiz: QuizQuestion[];
}

export default function QuizSection({ quiz }: QuizSectionProps) {
  // Store user's selected option index for each question: { [questionIndex]: selectedOptionIndex }
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    // Only allow selecting once per question until reset
    if (selectedAnswers[qIdx] !== undefined) return;

    const updated = { ...selectedAnswers, [qIdx]: optIdx };
    setSelectedAnswers(updated);

    // If all questions answered, check if full marks and trigger confetti
    if (Object.keys(updated).length === quiz.length) {
      let correctCount = 0;
      quiz.forEach((q, idx) => {
        if (updated[idx] === q.correctIndex) correctCount++;
      });

      if (correctCount === quiz.length) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch (e) {
          // gracefully ignore if canvas not supported
        }
      }
    }
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
  };

  // Calculate score
  const answeredCount = Object.keys(selectedAnswers).length;
  const isFinished = answeredCount === quiz.length;
  let correctCount = 0;
  quiz.forEach((q, idx) => {
    if (selectedAnswers[idx] === q.correctIndex) correctCount++;
  });

  return (
    <div className="glass-card rounded-2xl p-5 sm:p-7 shadow-lg shadow-slate-200/50 border border-emerald-100/80 animate-fade-in mt-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-800">
              Quick Concept Quiz
            </h3>
            <p className="text-xs text-slate-500">
              3 Sawalat — Check karein aapko kitna samajh aaya
            </p>
          </div>
        </div>

        {/* Score pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Hal kiye: {answeredCount}/{quiz.length}
          </span>
          {answeredCount > 0 && (
            <button
              type="button"
              onClick={handleResetQuiz}
              title="Reset Quiz"
              className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div className="mt-6 space-y-6">
        {quiz.map((q, qIdx) => {
          const userAnswer = selectedAnswers[qIdx];
          const hasAnswered = userAnswer !== undefined;

          return (
            <div
              key={qIdx}
              className="p-4 sm:p-5 rounded-xl bg-slate-50/70 border border-slate-200/70 transition-all duration-200"
            >
              {/* Question text */}
              <p className="text-sm sm:text-base font-semibold text-slate-800 mb-3">
                <span className="inline-block w-6 h-6 rounded-md bg-emerald-600 text-white text-xs font-bold text-center leading-6 mr-2">
                  Q{qIdx + 1}
                </span>
                {q.question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isCorrect = optIdx === q.correctIndex;

                  let optionStyle =
                    "bg-white border-slate-200 text-slate-700 hover:border-emerald-400 hover:bg-emerald-50/40";
                  let icon = null;

                  if (hasAnswered) {
                    if (isCorrect) {
                      optionStyle =
                        "bg-emerald-50 border-emerald-500 text-emerald-900 font-medium shadow-sm";
                      icon = <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />;
                    } else if (isSelected) {
                      optionStyle =
                        "bg-red-50 border-red-400 text-red-900 font-medium";
                      icon = <XCircle className="w-4 h-4 text-red-500 shrink-0" />;
                    } else {
                      optionStyle = "bg-white/50 border-slate-200 text-slate-400 opacity-60";
                    }
                  }

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(qIdx, optIdx)}
                      disabled={hasAnswered}
                      className={`flex items-center justify-between text-left p-3 rounded-lg border text-xs sm:text-sm transition-all duration-150 ${optionStyle}`}
                    >
                      <span>{opt}</span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after answering */}
              {hasAnswered && (
                <div
                  className={`mt-3 p-3 rounded-lg text-xs animate-fade-in ${
                    userAnswer === q.correctIndex
                      ? "bg-emerald-100/70 text-emerald-900 border border-emerald-300"
                      : "bg-amber-50 text-amber-900 border border-amber-200"
                  }`}
                >
                  <p className="font-semibold mb-0.5">
                    {userAnswer === q.correctIndex
                      ? "✓ Sahi Jawab!"
                      : "✗ Galat Jawab (Sahi jawab dekhien):"}
                  </p>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Final Score Banner */}
      {isFinished && (
        <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-center shadow-md animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Trophy className="w-5 h-5 text-amber-300" />
            <h4 className="text-base sm:text-lg font-bold">
              Final Score: {correctCount}/{quiz.length}
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100">
            {correctCount === 3
              ? "🎉 Zabardast! 100% Score — Concept bilkul crystal clear hai!"
              : correctCount === 2
              ? "👏 Bohat Acha! Thori si revision se 3/3 ho jayega."
              : "📚 Koi baat nahi! Explanation dubara parhein aur dubara koshish karein."}
          </p>
          <button
            type="button"
            onClick={handleResetQuiz}
            className="mt-3 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold bg-white text-emerald-800 hover:bg-emerald-50 shadow transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Quiz Dobara Dein
          </button>
        </div>
      )}
    </div>
  );
}
