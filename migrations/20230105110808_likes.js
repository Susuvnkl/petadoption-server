exports.up = function (knex) {
  return knex.schema.createTable("likes", (table) => {
    table.increments("actionId").primary();
    table.integer("userId").notNull();
    table.integer("petId").notNull();
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
