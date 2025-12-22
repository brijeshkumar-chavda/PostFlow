import { AzureOpenAI } from "openai";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { topic, type } = await req.json();

    const azureApiKey = process.env.AZURE_OPENAI_API_KEY;
    const azureEndpoint = process.env.AZURE_OPENAI_ENDPOINT;
    const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT;
    const azureApiVersion = process.env.AZURE_OPENAI_API_VERSION;
    const geminiApiKey = process.env.GEMINI_API_KEY;

    // --- IMAGE GENERATION ---
    if (type === "image") {
      console.log(`Generating image for prompt: "${topic}"...`);

      // 1. Try Azure DALL-E
      if (azureApiKey && azureEndpoint) {
        try {
          const client = new AzureOpenAI({
            apiKey: azureApiKey,
            endpoint: azureEndpoint,
            apiVersion: azureApiVersion,
            deployment: azureDeployment,
          });

          const dalleDeployment =
            process.env.AZURE_OPENAI_DALLE_DEPLOYMENT || "dall-e-3";

          const imageResponse = await client.images.generate({
            model: dalleDeployment,
            prompt: topic,
            n: 1,
            size: "1024x1024",
            style: "vivid",
          });

          const imageUrl = imageResponse.data?.[0]?.url;
          if (imageUrl) {
            console.log("Image generation successful (Azure DALL-E)");
            return NextResponse.json({ content: imageUrl });
          }
        } catch (azureError: any) {
          console.warn(
            "Azure DALL-E failed, trying fallback:",
            azureError.message
          );
          // Continue to fallback
        }
      }

      // 2. Fallback: Pollinations.ai (Free, No Key)
      console.log("Using Pollinations.ai fallback for image...");
      const encodedTopic = encodeURIComponent(topic);
      const pollinationsUrl = `https://image.pollinations.ai/prompt/${encodedTopic}?width=1080&height=1080&model=flux`;

      return NextResponse.json({ content: pollinationsUrl });
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
    }

    // 1. Try Azure OpenAI (GPT-4)
    if (azureApiKey && azureEndpoint && azureDeployment) {
      try {
        const client = new AzureOpenAI({
          apiKey: azureApiKey,
          endpoint: azureEndpoint,
          apiVersion: azureApiVersion,
          deployment: azureDeployment,
        });

        console.log(`Generating ${type} with Azure OpenAI...`);
        const completion = await client.chat.completions.create({
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: userPrompt },
          ],
          model: azureDeployment,
          temperature: 0.7,
        });
        const text = completion.choices[0]?.message?.content || "";
        return NextResponse.json({ content: cleanTextResponse(text) });
      } catch (azureError: any) {
        console.warn(
          "Azure OpenAI Text failed, trying fallback:",
          azureError.message
        );
      }
    }

    // 2. Fallback: Gemini (Google Generative AI)
    if (geminiApiKey) {
      try {
        console.log(`Generating ${type} with Google Gemini...`);
        const genAI = new GoogleGenerativeAI(geminiApiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const combinedPrompt = `${systemPrompt}\n\n${userPrompt}`;
        const result = await model.generateContent(combinedPrompt);
        const text = result.response.text();

        return NextResponse.json({ content: cleanTextResponse(text) });
      } catch (geminiError: any) {
        console.error("Gemini Generation Error:", geminiError);
        throw new Error(`Gemini Error: ${geminiError.message}`);
      }
    }

    throw new Error("No valid AI configuration found (Azure or Gemini).");
  } catch (error: any) {
    console.error("Detailed API Error:", error);
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
