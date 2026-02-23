const fetch = require("node-fetch");

exports.handler = async function(event, context) {
  const { message } = JSON.parse(event.body);

  // Google API キー（Netlify 環境変数に登録する）
  const apiKey = process.env.GOOGLE_API_KEY;

  // Google PaLM API のエンドポイント
  const url = `https://us-central1-aiplatform.googleapis.com/v1/projects/YOUR_PROJECT_ID/locations/us-central1/publishers/google/models/text-bison-001:generateText?key=${apiKey}`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: message,
        temperature: 0.7,
        candidateCount: 1
      })
    });

    const data = await response.json();
    const reply = data?.candidates?.[0]?.content || "AI 応答がありませんでした";

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };

  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ reply: "AI 応答中にエラーが発生しました" })
    };
  }
};