require('dotenv').config();

const DB_CONFIG = {
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'pass',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'docker',
    port: process.env.DB_PORT || 5432,
}

const jwtSecret = process.env.jwt_secret || 'secret';

const SERVER_PORT = process.env.SERVER_PORT || 4000;

module.exports = {
    DB_CONFIG,
    jwtSecret,
    SERVER_PORT
}