const fs = require("fs");
const path = require("path");

exports.handler = async function(event, context) {
  const filePath = path.join(__dirname, "../../entries.json");

  if (event.httpMethod === "POST") {
    const { name, message } = JSON.parse(event.body);

    if (!name || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Brak danych" }),
      };
    }

    const entries = JSON.parse(fs.readFileSync(filePath, "utf8"));
    entries.push({ name, message, date: new Date().toISOString() });
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2));

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  }

  if (event.httpMethod === "GET") {
    const entries = JSON.parse(fs.readFileSync(filePath, "utf8"));
    return {
      statusCode: 200,
      body: JSON.stringify(entries),
    };
  }

  return {
    statusCode: 405,
    body: JSON.stringify({ error: "Method not allowed" }),
  };
};

