// backend/database/migrations/YYYYMMDDHHMMSS_create_users_table.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name', 255).notNullable();
    table.string('last_name', 255).notNullable();
    table.string('email', 255).notNullable().unique();
    table.string('password_hash', 255).notNullable();
    table.string('street_address', 255).notNullable(); 
    table.string('city', 255).notNullable();           
    table.string('state', 100).notNullable();          
    table.string('zip_code', 20).notNullable();        
    table.string('phone_number', 50).notNullable(); 
    table.string('profile_picture_url', 255);                           // Optional at sign-up
    table.string('role', 50).notNullable().defaultTo('user');
    table.boolean('is_verified').notNullable().defaultTo(false);
    table.timestamps(true, true);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('users');
};