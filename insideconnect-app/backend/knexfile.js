// backend/knexfile.js

// Link dotenv
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });





/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            // Add SSL configuration based on the .env variable
            ssl: process.env.DB_SSL ? { rejectUnauthorized: false } : false,
        },
        migrations: {
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds',
        }
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL, // Render provides this URL
        migrations: {
            directory: './database/migrations',
        },
        seeds: {
            directory: './database/seeds',
        },
        pool: {
            min: 2,
            max: 10
        }
    }
};