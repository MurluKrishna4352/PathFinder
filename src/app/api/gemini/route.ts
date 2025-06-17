import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  const { personality } = await req.json();

  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro-preview-06-05" });

  const prompt = `Suggest 3 unique and modern career niches for a person with a ${personality} personality. Be creative but realistic.`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ suggestions: text });
  } catch (error: any) {
    console.error("❌ Gemini API Error:", error);
    return NextResponse.json({ error: "Could not fetch suggestions." }, { status: 500 });
  }
}
