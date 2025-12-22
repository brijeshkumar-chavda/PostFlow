const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded key for direct test
const apiKey = "AIzaSyD37LLIqWfNZxuknS675uOEf7qjeyyVMpk";
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    console.log("Fetching available models...");
    // For older SDK versions without listModels, we might fail here, but let's try standard approach
    // Note: The SDK might not expose listModels directly.
    // If this fails, we will try a direct fetch.

    // Attempting a simple generation with a very safe model name first to see if ANY work
    const safeModels = [
      "gemini-1.5-flash",
      "gemini-1.5-pro",
      "gemini-pro",
      "gemini-1.0-pro",
    ];

    for (const modelName of safeModels) {
      try {
        console.log(`Testing model: ${modelName}`);
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Hello");
        const response = await result.response;
        console.log(
          `SUCCESS: ${modelName} works! Response: ${response.text()}`
        );
        return; // We found a working one
      } catch (e) {
        console.log(`FAILED: ${modelName} - ${e.message.split("\n")[0]}`);
      }
    }

    console.log("All common model names failed.");
  } catch (error) {
    console.error("Critical Error:", error);
  }
}

listModels();
