const express = require("express");
const router = express.Router();
const {
    createHighlight,
    getHighlights,
    getHighlightsByMatchId,
    getHighlightById,
} = require("../controllers/highlightsController");

const handleGetHighlights = (req, res, next) => {
    if (req.query.match_id) {
        return getHighlightsByMatchId(req, res, next); // Se c'è un query param matchId
    }
    return getHighlights(req, res, next); // Altrimenti, ottieni tutti gli highlights
};

// Creare un nuovo highlight
router.post("/", createHighlight);

// Ottenere tutti gli highlights
router.get("/", handleGetHighlights);

// Ottenere un highlight specifico per ID
router.get("/:id", getHighlightById);

module.exports = router;
