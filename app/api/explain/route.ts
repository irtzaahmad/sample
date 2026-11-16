import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { ExplanationResponse } from "@/types";

export const maxDuration = 60; // Allow sufficient time for AI generation

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { topic, imageBase64, imageMime } = body;

    // 1. Validation
    const cleanTopic = typeof topic === "string" ? topic.trim() : "";
    const hasImage = Boolean(imageBase64 && typeof imageBase64 === "string");

    if (!cleanTopic && !hasImage) {
      return NextResponse.json(
        { error: "Baraye meharbani koi topic likhein ya image upload karein." },
        { status: 400 }
      );
    }

    // Validate image format and size if present (approx 4MB base64 limit = ~5.5MB string)
    if (hasImage) {
      const allowedMimes = ["image/jpeg", "image/png", "image/webp"];
      if (imageMime && !allowedMimes.includes(imageMime)) {
        return NextResponse.json(
          { error: "Sirf JPG, PNG ya WebP images allow hain." },
          { status: 400 }
        );
      }
      if (imageBase64.length > 6 * 1024 * 1024) {
        return NextResponse.json(
          { error: "Image ka size 4MB se kam hona chahiye." },
          { status: 400 }
        );
      }
    }

    // 2. Environment variables (Server-side only)
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            "GEMINI_API_KEY server par configure nahi hai. Baraye meharbani .env.local file mein apni API key add karein.",
        },
        { status: 500 }
      );
    }

    const modelName = process.env.GEMINI_MODEL || "gemini-2.5-flash";

    // 3. Prompt crafting
    const promptInstructions = `
You are "Samjhao", an AI study helper dedicated to Pakistani students (aligned with UN SDG 4: Quality Education).
Your goal is to break down complex academic concepts into easy-to-understand Roman Urdu (conversational Urdu written in Latin/English script with necessary English scientific/academic terms preserved).

The student has asked about: "${cleanTopic || "See attached diagram/problem"}"

You MUST respond strictly with a valid JSON object matching the following structure (do NOT enclose in markdown formatting or backticks if possible, or use standard raw JSON):
{
  "title": "Topic Name (with brief Urdu subtitle in brackets)",
  "explanation": "A simple, engaging, crystal-clear explanation in Roman Urdu. Break down the concept into 2-3 short, easily digestible paragraphs.",
  "example": "🇵🇰 Pakistani Misaal: Exactly one relatable, real-life Pakistani cultural/daily-life example (e.g. cricket, chai dhabas, solar panels/load shedding, rickshaw, biryani cooking, Eid shopping, local streets, etc.) that clearly mirrors the concept.",
  "quiz": [
    {
      "question": "Question 1 in Roman Urdu?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctIndex": 0,
      "explanation": "Brief Roman Urdu explanation of why this is correct."
    },
    {
      "question": "Question 2 in Roman Urdu?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctIndex": 1,
      "explanation": "Brief Roman Urdu explanation of why this is correct."
    },
    {
      "question": "Question 3 in Roman Urdu?",
      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
      "correctIndex": 2,
      "explanation": "Brief Roman Urdu explanation of why this is correct."
    }
  ]
}

Important Rules:
- Tone must be supportive, encouraging, respectful ("Aap", "Samjhein", "Dost").
- Make sure "correctIndex" is a zero-based number (0, 1, 2, or 3) corresponding to the correct option.
- Ensure the JSON is completely valid and parseable.
`;

    let rawResponseText = "";

    // 4. Call Gemini via @google/genai SDK (with fallback to @google/generative-ai)
    try {
      const ai = new GoogleGenAI({ apiKey });
      const contentsList: any[] = [{ text: promptInstructions }];

      if (hasImage) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
        contentsList.push({
          inlineData: {
            mimeType: imageMime || "image/jpeg",
            data: cleanBase64,
          },
        });
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: contentsList,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      rawResponseText = response.text || "";
    } catch (genAiError: any) {
      console.warn("Retrying with GoogleGenerativeAI fallback:", genAiError?.message);
      // Secondary fallback to standard @google/generative-ai SDK
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: { responseMimeType: "application/json" },
      });

      const parts: any[] = [promptInstructions];
      if (hasImage) {
        const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, "");
        parts.push({
          inlineData: {
            data: cleanBase64,
            mimeType: imageMime || "image/jpeg",
          },
        });
      }

      const result = await model.generateContent(parts);
      const res = await result.response;
      rawResponseText = res.text();
    }

    if (!rawResponseText) {
      throw new Error("Empty response received from Gemini.");
    }

    // 5. Clean and parse JSON safely
    let cleanJson = rawResponseText.trim();
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    let parsedData: ExplanationResponse;
    try {
      parsedData = JSON.parse(cleanJson);
    } catch (parseError) {
      console.error("Failed to parse Gemini JSON:", cleanJson);
      throw new Error("AI ne JSON format mein ghalti ki. Baraye meharbani dubara try karein.");
    }

    // Validate parsed structure
    if (!parsedData.title || !parsedData.explanation || !parsedData.example || !Array.isArray(parsedData.quiz)) {
      throw new Error("AI response structure incomplete hai.");
    }

    return NextResponse.json(parsedData);
  } catch (err: any) {
    console.error("Explain API Error:", err);
    return NextResponse.json(
      {
        error:
          err.message ||
          "Kuch masla ho gaya hai. Baraye meharbani thori der baad dubara koshish karein.",
      },
      { status: 500 }
    );
  }
}
