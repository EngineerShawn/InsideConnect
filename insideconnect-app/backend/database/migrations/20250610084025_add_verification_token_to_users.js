// backend/database/migrations/YYYYMMDDHHMMSS_add_verification_token_to_users.js

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.alterTable('users', (table) => {
        table.string('verification_token', 255).nullable();
        table.timestamp('token_expires_at').nullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
    return knex.schema.alterTable('users', (table) => {
        table.dropColumn('verification_token');
        table.dropColumn('token_expires_at');
    });
};