const pool = require("../db");

const getMatches = async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT id, date FROM matches ORDER BY date DESC"
        );
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore durante il recupero delle partite");
    }
};

const createMatch = async (req, res) => {
    const { date } = req.body; // riceviamo solo la data
    try {
        const result = await pool.query(
            "INSERT INTO matches (date) VALUES ($1) RETURNING *",
            [date]
        );
        res.status(201).json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore durante la creazione della partita");
    }
};

module.exports = { getMatches, createMatch };
