const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const matchRoutes = require("./routes/matches");
const highlightRoutes = require("./routes/highlights");
const schedule = require("node-schedule");
const { deleteOldFiles } = require("./utils/cleanup");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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

schedule.scheduleJob("0 0 * * *", deleteOldFiles);
