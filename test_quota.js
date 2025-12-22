const { GoogleGenerativeAI } = require("@google/generative-ai");

// Hardcoded key for direct test
const apiKey = "AIzaSyD37LLIqWfNZxuknS675uOEf7qjeyyVMpk";
const genAI = new GoogleGenerativeAI(apiKey);

async function testQuota() {
  // Trying models that are known to have generous free tiers
  const candidateModels = [
    "gemini-1.5-flash",
    "gemini-1.5-flash-latest",
    "gemini-1.5-pro-latest",
    "gemini-1.0-pro",
  ];

  console.log("Testing quota for various models...");

  for (const modelName of candidateModels) {
    try {
      console.log(`\nTesting: ${modelName}`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say hi");
      const response = await result.response;
      console.log(`✅ SUCCESS with ${modelName}: ${response.text()}`);
      // Found a working one with quota
      console.log(`\n!!! USE THIS MODEL: ${modelName} !!!`);
      return;
    } catch (e) {
      console.log(`❌ FAILED ${modelName}: ${e.message.split("\n")[0]}`);
    }
  }
}

testQuota();
