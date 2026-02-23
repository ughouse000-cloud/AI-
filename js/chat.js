document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("chat-form");
  const input = document.getElementById("chat-input");
  const output = document.getElementById("chat-output");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const message = input.value;
    if (!message) return;

    output.innerHTML += `<p><strong>あなた:</strong> ${message}</p>`;

    try {
      const res = await fetch("/.netlify/functions/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      output.innerHTML += `<p><strong>AI:</strong> ${data.reply}</p>`;
      output.scrollTop = output.scrollHeight;
      input.value = "";
    } catch (err) {
      output.innerHTML += `<p style="color:red;">エラーが発生しました: ${err}</p>`;
    }
  });
});