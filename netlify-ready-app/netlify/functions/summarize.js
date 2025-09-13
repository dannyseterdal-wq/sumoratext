// netlify/functions/summarize.js
// Minimal Netlify Function to call OpenAI and return a JSON summary.
// Requires env var: OPENAI_API_KEY
const OpenAI = require("openai");

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") {
      return { statusCode: 405, body: "Method Not Allowed" };
    }
    if (!event.body) {
      return { statusCode: 400, body: "Missing body" };
    }
    const { content, fileName } = JSON.parse(event.body);

    if (!content || !content.trim()) {
      return { statusCode: 400, body: "Missing content" };
    }

    const system = "Du er en norsk tekstoppsummerer. Svar som JSON med nøklene: summary, keyPoints[], wordCount, originalLength.";
    const user = `Fil: ${fileName ?? "Ukjent"}
Tekst:
${content}

Lag et kort sammendrag (120–180 ord) og 4 punktliste med nøkkelpunkter.`;

    // Use OpenAI Responses API
    const resp = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
    });

    const text = resp.output_text || JSON.stringify(resp);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = {
        summary: text,
        keyPoints: [],
        wordCount: (content.match(/\S+/g) || []).length,
        originalLength: content.length,
      };
    }

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "AI error" };
  }
};
