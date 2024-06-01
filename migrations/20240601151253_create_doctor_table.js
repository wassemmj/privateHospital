/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('doctors' , (table) => {
        table.increments('id').primary();
        table.integer('userID').unsigned().notNullable();
        table.integer('specialistsID').unsigned().notNullable();
        table.foreign('userID').references('users.id');
        table.foreign('specialistsID').references('specialists.id');
        table.timestamps(true, true);
    }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTable('doctors') ;
};
