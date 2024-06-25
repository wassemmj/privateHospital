/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('diarrheals' , (table) => {
        table.increments('id').primary();
        table.string('quantity');
        table.string('frequency');
        table.string('smell');
        table.string('qualities');
        table.string('lmsqa');
        table.integer('abdomenAreaID').unsigned().notNullable();
        table.foreign('abdomenAreaID').references('abdomenAreas.id');
        table.timestamps(true, true);
    }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('diarrheals') ;
};
