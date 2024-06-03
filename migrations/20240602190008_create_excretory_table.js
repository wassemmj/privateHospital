/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('excretories' , (table) => {
        table.increments('id').primary();
        table.boolean('dysuria');
        table.boolean('urethralStricture');
        table.boolean('urinaryIncontinence');
        table.boolean('overactiveBladder');
        table.integer('otherID').unsigned().notNullable();
        table.foreign('otherID').references('otherSystems.id');
        table.timestamps(true, true);
    }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('excretories') ;
};
