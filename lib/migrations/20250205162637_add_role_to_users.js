'use strict';

exports.up = async function(knex) {
    await knex.schema.alterTable('user', (table) => {
        table.string('role').notNullable().defaultTo('user'); // Ajout du rôle avec valeur par défaut
    });
};

exports.down = async function(knex) {
    await knex.schema.alterTable('user', (table) => {
        table.dropColumn('role');
    });
};
