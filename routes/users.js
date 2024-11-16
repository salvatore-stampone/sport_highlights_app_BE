const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/usersController");

// Rotta per ottenere tutti gli utenti
router.get("/", getUsers);

module.exports = router;
