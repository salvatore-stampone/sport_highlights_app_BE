const pool = require("../db");

// Funzione per ottenere gli utenti
const getUsers = async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM users");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send("Errore server");
    }
};

module.exports = { getUsers };
