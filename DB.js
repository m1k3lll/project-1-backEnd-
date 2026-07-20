const postgres = require('postgres');
const dotenv = require('dotenv');

dotenv.config();
const sql = postgres(process.env.POSTGRES_DB);

module.exports = sql;