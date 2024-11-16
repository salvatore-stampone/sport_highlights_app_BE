const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const matchRoutes = require("./routes/matches");
const highlightRoutes = require("./routes/highlights");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Test route
app.get("/", (req, res) => {
    res.send("Soccer backend is running!");
});
// Users routes
app.use("/users", userRoutes);
// Matches routes
app.use("/matches", matchRoutes);
// Highlights routes
app.use("/highlights", highlightRoutes);

// Start server
app.listen(PORT, () => {
    const { use } = require("./routes/users");
    console.log(`Server is running on port ${PORT}`);
});
