# Samjhao (سمجھاؤ) 🇵🇰

> **An AI Study Helper for Pakistani Students (UN SDG 4: Quality Education)**  
> *Built for Minhaj University AI Hackathon*

---

## 🌟 Overview
**Samjhao** is a modern, mobile-first web app designed to bridge learning gaps for Pakistani students. It translates complex academic topics (Physics, Chemistry, Biology, Math, Computer Science, etc.) into friendly, easily digestible **Roman Urdu**, accompanies them with **relatable real-life Pakistani cultural examples** (such as cricket, load shedding, solar panels, chai dhabas), and tests concept retention with an **interactive 3-question MCQ quiz** providing immediate feedback.

### ✨ Key Features
1. **Bilingual Academic Tutor:** Clear, conversational explanation in Roman Urdu.
2. **Pakistani Desi References:** Every concept is tied to a real-life Pakistani situation for crystal-clear intuition.
3. **Interactive MCQ Quiz:** 3 questions per topic with instant correct/wrong feedback, detailed rationale, and score tallying (with celebratory confetti on full marks!).
4. **Interactive 3D Study Background:** Smooth, educational 3D animations (geometry polyhedra, atomic orbitals, 3D book, floating knowledge particles) created in Three.js with mouse parallax.
5. **Image Upload:** Upload textbook questions, diagrams, or handwritten notes (JPG, PNG, WebP up to 4MB) for AI explanation.
6. **"Try Sample" (Photosynthesis):** Instant pre-written demo with **0 API calls**, guaranteeing the hackathon demo never fails even offline.
7. **Production Error Handling:** Clear Roman Urdu error messages and one-click Retry button.

---

## 🛠️ Tech Stack
- **Framework:** [Next.js](https://nextjs.org/) (App Router, React 18, TypeScript)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with custom calm emerald palette and glassmorphism
- **3D Graphics:** [Three.js](https://threejs.org/)
- **AI Engine:** Google Gemini API (`@google/genai` with fallback support)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Celebration Effects:** Canvas Confetti

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)
- Google Gemini API Key ([Google AI Studio](https://aistudio.google.com/))

### 2. Setup Environment
Copy the example environment file and add your Gemini API key:
```bash
cp .env.example .env.local
```
Inside `.env.local`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm run start
```

---

## 🏛️ Hackathon Note
Developed with ❤️ at **Minhaj University AI Hackathon** in support of **UN Sustainable Development Goal 4: Quality Education**.
