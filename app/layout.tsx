import type { Metadata } from "next";
import "./globals.css";
import ThreeBackground from "@/components/ThreeBackground";

export const metadata: Metadata = {
  title: "Samjhao - AI Study Helper for Pakistani Students",
  description:
    "An AI study helper for Pakistani students (SDG 4: Quality Education). Explaining complex concepts in easy Roman Urdu with real Pakistani examples and instant quizzes.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col justify-between selection:bg-emerald-100 selection:text-emerald-900">
        {/* 3D Education & Science Background */}
        <ThreeBackground />

        {/* Content Wrapper */}
        <div className="relative z-10 flex-1 flex flex-col">{children}</div>

        {/* Footer */}
        <footer className="relative z-10 py-6 text-center text-sm text-slate-500 border-t border-slate-200/60 bg-white/60 backdrop-blur-md">
          <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="font-medium text-slate-600">
              🇵🇰 <span className="font-bold text-emerald-700">Samjhao</span> — SDG 4: Quality Education
            </p>
            <p className="text-xs text-slate-500">
              Built at <span className="font-semibold text-slate-700">Minhaj University AI Hackathon</span>
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
