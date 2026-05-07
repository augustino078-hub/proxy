const express = require("express");
const https = require("https");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/playtime/:userId", (req, res) => {
    const userId = req.params.userId;
    const url = `https://userstatistics.roblox.com/v1/users/${userId}/stats`;

    https.get(url, { headers: { "Accept": "application/json" } }, (response) => {
        let data = "";

        response.on("data", (chunk) => { data += chunk; });

        response.on("end", () => {
            try {
                const parsed = JSON.parse(data);
                res.json(parsed);
            } catch (e) {
                res.status(500).json({ error: "Failed to parse response", raw: data });
            }
        });

    }).on("error", (err) => {
        res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});
