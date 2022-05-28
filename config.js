require('dotenv').config();

const DB_CONFIG = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASS || 'pass',
    host: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || 'docker',
    port: process.env.DB_PORT || 5432,
}

const jwtSecret = process.env.jwt_secret || 'secret'

module.exports = {
    DB_CONFIG,
    jwtSecret
}