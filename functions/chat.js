// functions/chat.js
import fetch from "node-fetch"; // 必要なら npm install node-fetch

export async function handler(event, context) {
  try {
    const data = JSON.parse(event.body);
    const userMessage = data.message;

    // Google API Key（環境変数に設定しておくのが安全）
    const API_KEY = process.env.GOOGLE_API_KEY;

    // Google API に問い合わせ（例：自然言語APIやCustom Search API）
    const response = await fetch(
      `https://language.googleapis.com/v1/documents:analyzeSentiment?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          document: { type: "PLAIN_TEXT", content: userMessage },
          encodingType: "UTF8"
        })
      }
    );

    const result = await response.json();

    // 結果を返す（今回は簡単に sentiment score を返す）
    const score = result.documentSentiment?.score ?? 0;
    const reply = `AI解析結果（感情スコア）: ${score}`;

    return {
      statusCode: 200,
      body: JSON.stringify({ reply })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
}