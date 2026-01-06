import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(bodyParser.json());
import path from "path";
import { fileURLToPath } from "url";

const __filename =
fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.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}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini", // rapide et pas cher
        messages: [{ role: "user", content: userMessage }]
      })
    });

    const data = await response.json();
    const reply = data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ reply: "❌ Erreur du serveur, réessayez plus tard." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));



