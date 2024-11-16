const express = require("express");
const router = express.Router();
const {
    createHighlight,
    getHighlights,
} = require("../controllers/highlightsController");

// Creare un nuovo highlight
router.post("/", createHighlight);

// Ottenere tutti gli highlights
router.get("/", getHighlights);

module.exports = router;
