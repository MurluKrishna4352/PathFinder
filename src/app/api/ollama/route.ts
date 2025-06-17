import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  try {
    const { journey, feeling, peakState, extraNote } = await req.json();

const prompt =  `
You are a career discovery assistant.

A user has submitted their life reflections. Based on this, your task is to:

1. Write a 2–3 sentence **Personality Summary**.
2. Suggest **three creative and relevant career niches** (with explanations).
3. Then, ask the user 2–3 thoughtful **Follow-Up Questions** to deepen their self-reflection.

Avoid repeating tech roles unless clearly aligned. Suggest from fields like education, psychology, sustainability, community work, media, arts, entrepreneurship, etc.

Use this format:

**Personality Summary:** [your summary]

**Career Niches:**
1. [title] – [reason]
2. [title] – [reason]
3. [title] – [reason]

**Follow-Up Questions:**
1. ...
2. ...
3. ...

User reflections:
- Journey: ${journey}
- Feeling: ${feeling}
- Productive moment: ${peakState}
- Extra: ${extraNote}
`;


    // Call Ollama API
    const res = await fetch("http://localhost:11434/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama3",
        prompt,
        stream: false,
      }),
    });

    const data = await res.json();
    const aiOutput = data.response;

    // Save to Supabase
    const { error } = await supabase.from("reflections").insert([
      {
        journey,
        feeling,
        peak_state: peakState,
        extra_note: extraNote,
        personality: aiOutput,
        niche: aiOutput,
      },
    ]);

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      return NextResponse.json({ error: "DB insert failed" }, { status: 500 });
    }

    return NextResponse.json({ suggestions: aiOutput });
  } catch (error) {
    console.error("❌ API error:", error);
    return NextResponse.json(
      { error: "Something went wrong." },
      { status: 500 }
    );
  }
}
