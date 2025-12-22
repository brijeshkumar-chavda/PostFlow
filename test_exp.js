const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded key for direct test
const apiKey = "AIzaSyD37LLIqWfNZxuknS675uOEf7qjeyyVMpk";
const genAI = new GoogleGenerativeAI(apiKey);

async function testExperimentalModels() {
  const models = [
    "gemini-2.0-flash-exp",
    "gemini-exp-1206",
    "gemini-pro-latest", // fallback
  ];

  console.log("Testing experimental models...");

  for (const modelName of models) {
    try {
      console.log(`\nTesting: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("hello");
      const response = await result.response;
      console.log(`✅ SUCCESS with ${modelName}: ${response.text()}`);
      return;
    } catch (e) {
      console.log(`❌ FAILED ${modelName}: ${e.message.split("\n")[0]}`);
    }
  }
}

testExperimentalModels();
