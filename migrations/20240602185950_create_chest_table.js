/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('chests' , (table) => {
        table.increments('id').primary();
        table.enu('chestPain',['tightness' , 'pleuritic']);
        table.enu('palm',['atrial fibrillation' , 'sinus arrhythmia']);
        table.enu('cough',['dry ' , 'productive']);
        table.string('other');
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
    await knex.schema.dropTable('chests') ;
};
