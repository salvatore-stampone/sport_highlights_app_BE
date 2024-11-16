const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL, // Usa la stringa da Supabase
    ssl: {
        rejectUnauthorized: false, // Necessario per connessioni SSL
    },
});

module.exports = pool;
