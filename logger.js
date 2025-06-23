const axios = require("axios");

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlI";

async function Log(stack, level, packageName, message) {
  const validStacks = ["backend", "frontend"];
  const validLevels = ["info", "warning", "error"];
  const validPackages = ["controller", "service", "handler", "repository"];

  if (
    !validStacks.includes(stack) ||
    !validLevels.includes(level) ||
    !validPackages.includes(packageName)
  ) {
    console.error(" Invalid input. Please follow constraints exactly.");
    return;
  }

  try {
    await axios.post(
      "http://20.244.56.144/evaluation-service/logs",
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );
    console.log(" Log sent successfully.");
  } catch (error) {
    console.error(" Logging failed:", error.message);
  }
}

module.exports = Log;
