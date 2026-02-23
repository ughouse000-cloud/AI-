document.addEventListener("DOMContentLoaded", () => {
  const omikuji = document.getElementById("omikuji");

  // 最新おみくじメッセージ
  const messages = [
    "かれえだの　からすひかくれ　ひむかいに　かしののはらに　ひかりたゆたう",
    "あめののち　いかずちわるたけ　みなかたの　さるたのあしはらに　にぎのさかえる",
    "あのよあり　いのよにてしり　うとうなる　えとうたがひて　おとふにおちる",
    "かんしゃから　きゅうにはじまる　くのないせかい　けろっとわすれて　こうかいはんせい",
    "さちのうみ　しずかにおよぐ　すのわたし　せつなをいきる　そのれんぞくを",
    "はりなくされて　ひたんにくれる　ふびんなあに　へたれなおとうと　ほんけをうけつぐ",
    "まほろばうつす八咫鏡　みくににかがやく八尺瓊勾玉　むらくもはらう草薙の剣　めざすはやまと　もくとはへいわ",
    "やまととはだいわとかきてやまとなり　ゆめまぼろしのやまとにあらず　よのばんぶつとよろづわのなす",
    "らくだのせに　りそうのおきょうしちだはん　るふのちかいひめ　れんかをこえて　ろうおもわざるまことのみちへ　わon",
    "たまよりいでて　ちにすべて　つながりてらす　てんのうたかた　とようみだしぬ",
    "ながれゆきて　ににぎおりたつ　ぬばたまの　ねてまつさるた　のどかなみちびき"
  ];

  // ランダムに表示
  omikuji.textContent = messages[Math.floor(Math.random() * messages.length)];

  // --- チャット送信処理 ---
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
      output.innerHTML += `<p style="color:red;">エラー: ${err}</p>`;
    }
  });
});