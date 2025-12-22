import { AzureOpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, type } = await req.json();

    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION;

    if (!apiKey || !endpoint || !deployment) {
      console.error("Azure OpenAI configuration is missing");
      return NextResponse.json(
        { error: "Azure OpenAI configuration is missing on server" },
        { status: 500 }
      );
    }

    const client = new AzureOpenAI({
      apiKey,
      endpoint,
      apiVersion,
      deployment,
    });

    let systemPrompt = "You are a helpful AI assistant.";
    let userPrompt = "";

    if (type === "post") {
      systemPrompt = `
        You are an expert social media manager. Your goal is to write a highly engaging, viral-style LinkedIn/Instagram post.
        
        Formatting Rules:
        1. Return ONLY the raw HTML content suitable for a Tiptap editor (using <p>, <strong>, etc).
        2. Do NOT include markdown code blocks (like \`\`\`html).
        3. Do NOT include introductory text like "Here is your post". Return ONLY the post itself.
      `;
      userPrompt = `
        Topic: "${topic}"
        
        Requirements:
        1. Strong hook (first 2 lines).
        2. Short paragraphs.
        3. Use bolding (<strong>) for key phrases.
        4. 3-5 actionable points.
        5. End with a question.
        6. Include 3-5 hashtags at the end.
      `;
    } else if (type === "hashtags") {
      systemPrompt =
        "You are a social media growth expert. Return ONLY a string of hashtags separated by spaces.";
      userPrompt = `Generate 10 trending hashtags for a post about "${topic}". Return ONLY the hashtags.`;
    }

    console.log(`Generating ${type} with Azure OpenAI...`);

    const completion = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: deployment, // In Azure, model arg takes the deployment name
      temperature: 0.7,
      max_tokens: 1024,
    });

    const text = completion.choices[0]?.message?.content || "";

    // Clean up any potential markdown code blocks if the model ignores instruction
    const cleanText = text
      .replace(/```html/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Generation successful, length:", cleanText.length);

    return NextResponse.json({ content: cleanText });
  } catch (error: any) {
    console.error("Detailed Azure API Error:", error);
    return NextResponse.json(
      {
        error: "Failed to generate content",
        details: error.message || String(error),
      },
      { status: 500 }
    );
  }
}
