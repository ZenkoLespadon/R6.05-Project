'use strict';

exports.up = async function(knex) {
    await knex.schema.alterTable('user', (table) => {
        table.string('email').notNullable().unique();
        table.string('username').notNullable().unique();
        table.string('password').notNullable();
    });
};

exports.down = async function(knex) {
    await knex.schema.alterTable('user', (table) => {
        table.dropColumn('email');
        table.dropColumn('username');
        table.dropColumn('password');
    });
};
