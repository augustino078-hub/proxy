// server.js — Deploy this on Railway, Render, Replit, etc.
// Then put your deployed URL into the Roblox LocalScript.

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/playtime/:userId", async (req, res) => {
    const userId = req.params.userId;

    try {
        // Fetch player stats from Roblox's stats API
        const response = await fetch(
            `https://userstatistics.roblox.com/v1/users/${userId}/stats`,
            {
                headers: {
                    "Accept": "application/json"
                }
            }
        );

        if (!response.ok) {
            return res.status(response.status).json({ error: "Roblox API error" });
        }

        const data = await response.json();
        return res.json(data);

    } catch (err) {
        console.error("Error fetching playtime:", err);
        return res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`Playtime proxy running on port ${PORT}`);
});
