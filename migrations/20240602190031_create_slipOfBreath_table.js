/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('slipOfBreaths' , (table) => {
        table.increments('id').primary();
        table.enu('type',['exertion' , 'paroxysmal nocturnal' , 'orthopedic']);
        table.enu('degree',['1' , '2' , '3' , '4']);
        table.string('improvement');
        table.integer('chestID').unsigned().notNullable();
        table.foreign('chestID').references('chests.id');
        table.timestamps(true, true);
    }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('slipOfBreaths') ;
};
