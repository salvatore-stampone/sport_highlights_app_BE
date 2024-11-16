const pool = require("../db");

const createHighlight = async (req, res) => {
    const { match_id, click_timestamp } = req.body;

    if (!match_id || !click_timestamp) {
        return res
            .status(400)
            .json({ message: "match_id e click_timestamp sono obbligatori" });
    }

    // Calcoliamo i tempi dinamicamente (10 secondi prima e dopo)
    const start_time = click_timestamp - 10;
    const end_time = click_timestamp + 10;

    try {
        const result = await pool.query(
            "INSERT INTO highlights (match_id, click_timestamp, video_path) VALUES ($1, $2, $3) RETURNING *",
            [match_id, click_timestamp, "link_video_da_gcs"]
        );

        const highlight = result.rows[0];
        res.status(201).json({
            id: highlight.id,
            match_id: highlight.match_id,
            click_timestamp: highlight.click_timestamp,
            video_path: highlight.video_path,
            created_at: highlight.created_at,
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore durante la creazione dell'highlight");
    }
};

const getHighlights = async (req, res) => {
    const { match_id } = req.params;
    try {
        const result = await pool.query(
            "SELECT * FROM highlights WHERE match_id = $1",
            [match_id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore durante il recupero delle highlights");
    }
};

module.exports = { createHighlight, getHighlights };
