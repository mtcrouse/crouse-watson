'use strict';

exports.up = function(knex) {
  return knex.schema.createTable('scores', (table) => {
    table.increments();
    table.integer('user_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .index();
    table.integer('scores').defaultTo(0);
    table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('scores');
};
