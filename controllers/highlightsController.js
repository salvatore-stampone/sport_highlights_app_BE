const pool = require("../db");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

const createHighlight = async (req, res) => {
    const { match_id, click_timestamp } = req.body;

    if (!match_id || !click_timestamp) {
        return res
            .status(400)
            .json({ message: "match_id e click_timestamp sono obbligatori" });
    }

    // Calcola il tempo di inizio e fine della clip
    const start_time = click_timestamp - 10;
    const end_time = click_timestamp + 10;

    // Percorsi video
    const inputVideoPath = path.join(__dirname, "../assets/videos/test.mp4");
    const outputVideoFileName = `${match_id}_${Date.now()}.mp4`; // Nome del file estratto
    const outputVideoPath = path.join(
        __dirname,
        "../uploads",
        outputVideoFileName
    );

    // Estrazione del video con FFmpeg
    ffmpeg(inputVideoPath)
        .setStartTime(start_time)
        .setDuration(end_time - start_time)
        .output(outputVideoPath)
        .on("end", async () => {
            try {
                // Salva il percorso del video nel database
                const videoPath = `/uploads/${outputVideoFileName}`;
                const result = await pool.query(
                    "INSERT INTO highlights (match_id, click_timestamp, video_path) VALUES ($1, $2, $3) RETURNING *",
                    [match_id, click_timestamp, videoPath]
                );

                res.status(201).json(result.rows[0]);
            } catch (err) {
                console.error(
                    "Errore durante la creazione dell'highlight:",
                    err
                );
                res.status(500).json({
                    message: "Errore durante la creazione dell'highlight",
                });
            }
        })
        .on("error", (err) => {
            console.error("Errore durante l'estrazione del video:", err);
            res.status(500).json({
                message: "Errore durante l'estrazione del video",
            });
        })
        .run();
};

const getHighlights = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM highlights");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore durante il recupero delle highlights");
    }
};

const getHighlightsByMatchId = async (req, res) => {
    const { match_id } = req.query;

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

const getHighlightById = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            "SELECT * FROM highlights WHERE id = $1",
            [id]
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore durante il recupero delle highlights");
    }
};

module.exports = {
    createHighlight,
    getHighlights,
    getHighlightsByMatchId,
    getHighlightById,
};
