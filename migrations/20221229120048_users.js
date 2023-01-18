exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("userId").primary();
    table.string("firstName").notNull();
    table.string("lastName").notNull();
    table.string("email").notNull();
    table.string("password").notNull();
    table.integer("phoneNumber");
    table.string("role").defaultTo("User");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
