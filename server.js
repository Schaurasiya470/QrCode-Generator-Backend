const express = require("express");
const QRCode = require("qrcode");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Temporary in-memory storage (no DB)
let lastCard = null;

// Generate QR route
app.post("/api/generate", async (req, res) => {
  try {
    const { name, phone, email, company, website, role } = req.body;

    // Save latest card details
    lastCard = { name, phone, email, company, website, role };

    // Generate QR that points to /card
    const qrUrl = await QRCode.toDataURL("https://web-qr-code-generator.onrender.com/card");

    res.json({ qrUrl, card: lastCard });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "QR generation failed" });
  }
});

// Business card page (dynamic)
app.get("/card", (req, res) => {
  if (!lastCard) {
    return res.send("<h3>No card generated yet</h3>");
  }

  const { name, phone, email, company, website, role } = lastCard;

  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${name}'s Business Card</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"></script>
  <style>
    body {
      font-family: "Segoe UI", sans-serif;
      background: #f2f4f7;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .card {
      width: 420px;
      max-width: 95%;
      background: #fff;
      border-radius: 15px;
      box-shadow: 0 6px 18px rgba(0,0,0,0.15);
      display: flex;
      overflow: hidden;
    }

    /* Left Section */
    .card-left {
      background: #e63946;
      color: #fff;
      padding: 20px;
      width: 40%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .qr-code {
      width: 110px;
      height: 110px;
      background: #fff;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    .qr-code img {
      width: 100px;
      height: 100px;
    }

    .scan-text {
      font-size: 14px;
      font-weight: bold;
    }

    /* Right Section */
    .card-right {
      padding: 20px;
      width: 60%;
    }

    .card-right h2 {
      margin: 0;
      font-size: 20px;
      color: #222;
    }

    .role {
      font-size: 14px;
      color: #e63946;
      margin: 3px 0 12px;
      font-weight: 600;
    }

    .info {
      font-size: 14px;
      color: #444;
      margin: 6px 0;
    }

    .info strong {
      color: #111;
    }

    .info a {
      color: #007bff;
      text-decoration: none;
    }

    .info a:hover {
      text-decoration: underline;
    }

    /* Download button */
    .download-btn {
      margin-top: 20px;
      padding: 10px 20px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      transition: 0.3s;
    }

    .download-btn:hover {
      background: #0056b3;
    }
  </style>
</head>
<body>

  <div id="card" class="card">
    <!-- Left Side with QR -->
    <div class="card-left">
      <div class="qr-code">
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${website}" alt="QR Code">
      </div>
      <div class="scan-text">SCAN ME</div>
    </div>

    <!-- Right Side with Info -->
    <div class="card-right">
      <h2>${name}</h2>
      <div class="role">${role || "Professional"}</div>
      <p class="info"><strong>Company:</strong> ${company}</p>
      <p class="info"><strong>Phone:</strong> <a href="tel:${phone}">${phone}</a></p>
      <p class="info"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p class="info"><strong>Website:</strong> <a href="${website}" target="_blank">${website}</a></p>
    </div>
  </div>

  <button class="download-btn" onclick="downloadCard()">⬇️ Download Card</button>

  <script>
    function downloadCard() {
      const card = document.getElementById("card");
      html2canvas(card).then(canvas => {
        const link = document.createElement("a");
        link.download = "business-card.png";
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    }
  </script>
</body>
</html>
`);
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
