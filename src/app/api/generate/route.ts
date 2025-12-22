import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { topic, type } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    console.log(
      "API Key configured:",
      !!apiKey,
      apiKey ? `(starts with ${apiKey.substring(0, 4)}...)` : ""
    );

    if (!apiKey) {
      console.error("GEMINI_API_KEY is missing from environment variables");
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set on server" },
        { status: 500 }
      );
    }

    // Re-initialize per request to ensure env var is picked up
    const genAI = new GoogleGenerativeAI(apiKey);

    // Using gemini-2.0-flash as confirmed available via API list check
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    let prompt = "";
    if (type === "post") {
      prompt = `
        You are an expert social media manager. Write a highly engaging, viral-style LinkedIn/Instagram post about the following topic: "${topic}".
        
        The post should:
        1. Have a strong, scroll-stopping hook (first 2 lines).
        2. Be formatted with short, readable paragraphs.
        3. Use bolding (surround with <strong> </strong> tags) for key phrases.
        4. Include 3-5 specific, actionable points.
        5. End with a question to drive engagement.
        6. Include 3-5 relevant hashtags at the end.
        
        Return the response as raw HTML content (using <p>, <strong>, etc) suitable for a Tiptap editor. Do not include markdown code blocks.
      `;
    } else if (type === "hashtags") {
      prompt = `
        Generate 10 trending, high-visibility hashtags for a post about "${topic}". 
        Return ONLY the hashtags separated by spaces.
      `;
    }

    console.log(`Generating ${type} for topic: "${topic.substring(0, 20)}..."`);
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log("Generation successful, length:", text.length);

    return NextResponse.json({ content: text });
  } catch (error: any) {
    console.error("Detailed API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate content",
        details: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
