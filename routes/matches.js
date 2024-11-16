const express = require("express");
const router = express.Router();
const { createMatch, getMatches } = require("../controllers/matchesController");

// Creare una nuova partita
router.post("/", createMatch);

// Ottenere tutte le partite
router.get("/", getMatches);

module.exports = router;
