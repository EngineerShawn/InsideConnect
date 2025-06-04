// backend/knexfile.js
require('dotenv').config({ path: './.env' }); // Load .env for Knex

module.exports = {
  development: {
    client: 'pg', // PostgreSQL client
    connection: {
      host: process.env.DB_HOST || '127.0.0.1', // Your local Postgres host
      port: process.env.DB_PORT || 5432,       // Your local Postgres port
      user: process.env.DB_USER || 'postgres', // Your Postgres username
      password: process.env.DB_PASSWORD || 'your_postgres_password', // !!! IMPORTANT: Change this
      database: process.env.DB_NAME || 'insideconnect_dev', // Database name
    },
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
  },

  // You would add production configuration here later for Render
  // production: {
  //   client: 'pg',
  //   connection: process.env.DATABASE_URL, // Render provides DATABASE_URL
  //   migrations: {
  //     directory: './database/migrations',
  //   },
  //   seeds: {
  //     directory: './database/seeds',
  //   }
  // }
};