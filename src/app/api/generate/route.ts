import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { topic, type } = await req.json();

    if (!process.env.GEMINI_API_KEY) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set" },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

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

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ content: text });
  } catch (error) {
    console.error("Error generating content:", error);
    return NextResponse.json(
      { error: "Failed to generate content" },
      { status: 500 }
    );
  }
}
