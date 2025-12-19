import { Knex } from "knex";

export async function up(knex: Knex) {
  return knex.schema.createTable("users", table => {
    table.increments("id").primary();
    table.string("userName", 30).notNullable();
    table.string("email").unique().notNullable();
    table.string("password").notNullable();
    table.dateTime("createdAt").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable("users");
}
