exports.up = function (knex) {
  return knex.schema.createTable("pets", (table) => {
    table.increments("petId").primary();
    table.string("type").notNull();
    table.string("name").notNull();
    table.string("adoptionStatus").notNull();
    table.float("age");
    table.string("photos");
    table.string("breed");
    table.string("gender");
    table.float("height");
    table.float("weight");
    table.string("color");
    table.text("bio");
    table.boolean("hypoallergenic");
    table.string("dietaryRestrictions");
    table.integer("ownerId");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {};
