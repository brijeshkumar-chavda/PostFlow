import { OpenAI, AzureOpenAI } from "openai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, type } = await req.json();

    const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT;
    const azureApiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const azureDalleDeployment =
      process.env.AZURE_OPENAI_DALLE_DEPLOYMENT || "dall-e-3";

    const standardOpenAiKey = process.env.OPENAI_API_KEY;

    // --- SETUP CLIENT ---
    let client: OpenAI | AzureOpenAI | null = null;
    let isAzure = false;

    if (azureApiKey && azureEndpoint) {
      client = new AzureOpenAI({
        apiKey: azureApiKey,
        endpoint: azureEndpoint,
        apiVersion: azureApiVersion || "2024-02-15-preview",
        // Do NOT set deployment here, as it may override the "model" parameter in DALL-E calls
      });
      isAzure = true;
    } else if (standardOpenAiKey) {
      client = new OpenAI({
        apiKey: standardOpenAiKey,
      });
    }

    if (!client) {
      throw new Error(
        "No OpenAI configuration found. Please set AZURE_OPENAI_API_KEY or OPENAI_API_KEY in your environment."
      );
    }

    // --- IMAGE GENERATION ---
    if (type === "image") {
      console.log(
        `Generating image for prompt: "${topic}" using ${
          isAzure ? "Azure " + azureDalleDeployment : "Standard OpenAI"
        }...`
      );

      const imageResponse = await client.images.generate({
        model: isAzure ? azureDalleDeployment : "dall-e-3",
        prompt: topic,
        n: 1,
        size: "1024x1024",
        style: "vivid",
      });

      const imageUrl = imageResponse.data?.[0]?.url;
      if (!imageUrl) throw new Error("No image URL returned from OpenAI.");

      return NextResponse.json({ content: imageUrl });
    }

    // --- TEXT GENERATION (Post / Hashtags) ---
    let systemPrompt = "You are a helpful AI assistant.";
    let userPrompt = "";

    if (type === "post") {
      systemPrompt = `
        You are an expert social media manager. Your goal is to write a highly engaging, viral-style LinkedIn/Instagram post.
        Formatting Rules:
        1. Return ONLY the raw HTML content suitable for a Tiptap editor (using <p>, <strong>, etc).
        2. Do NOT include markdown code blocks.
        3. Do NOT include introductory text.
      `;
      userPrompt = `Topic: "${topic}"\n\nWrite a post with a strong hook, short paragraphs, and 3-5 hashtags.`;
    } else if (type === "hashtags") {
      systemPrompt =
        "You are a social media expert. Return ONLY a string of hashtags separated by spaces.";
      userPrompt = `Generate 10 trending hashtags for: "${topic}". Return ONLY the hashtags.`;
    } else if (type === "visual_description") {
      systemPrompt = `
        You are a creative director and prompt engineering expert for AI image generators (like DALL-E 3). 
        Your goal is to take a social media post and describe a vivid, high-quality, and symbolic image that represents the core message of the post.
        Guidelines:
        - Focus on lighting, composition, mood, and specific subjects.
        - The description should be 1-2 sentences.
        - DO NOT include text, logos, or watermarks in the description.
        - Return ONLY the visual description itself.
      `;
      userPrompt = `Post Content: "${topic}"\n\nCreate a vivid visual description for this post.`;
    }

    console.log(
      `Generating ${type} with ${isAzure ? "Azure" : "Standard"} OpenAI...`
    );

    const completion = await client.chat.completions.create({
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      model: isAzure ? azureDeployment! : "gpt-4",
      temperature: 0.7,
    });

    const text = completion.choices[0]?.message?.content || "";
    return NextResponse.json({ content: cleanTextResponse(text) });
  } catch (error: any) {
    console.error("AI API Error:", error);
    const errorMessage = error.message || String(error);
    return NextResponse.json(
      {
        error: "Failed to generate content",
        details: errorMessage,
      },
      { status: 500 }
    );
  }
}

function cleanTextResponse(text: string) {
  return text
    .replace(/```html/g, "")
    .replace(/```/g, "")
    .trim();
}
