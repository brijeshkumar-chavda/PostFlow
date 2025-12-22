const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded key for direct test
const apiKey = "AIzaSyD37LLIqWfNZxuknS675uOEf7qjeyyVMpk";

// We'll use a raw fetch to list models since the SDK wrapper is hiding the list
async function fetchModelsDirectly() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Available Models:");
    if (data.models) {
      data.models.forEach((m) => {
        // only print those that support generateContent
        if (
          m.supportedGenerationMethods &&
          m.supportedGenerationMethods.includes("generateContent")
        ) {
          console.log(`- ${m.name}`);
        }
      });
    } else {
      console.log("No models returned. API Key might have restricted scope?");
      console.log(JSON.stringify(data, null, 2));
    }
  } catch (e) {
    console.error("Fetch failed", e);
  }
}

fetchModelsDirectly();
