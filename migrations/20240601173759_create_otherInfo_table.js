/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable('otherInfos' , (table) => {
        table.increments('id').primary();
        table.string('injuryType').notNullable();
        table.string('ASA');
        table.string('surgerySituation').notNullable();
        table.string('surgeryDuration').notNullable();
        table.boolean('antipathetic');
        table.date('antipatheticStartDate');
        table.date('antipatheticStopDate');
        table.integer('surgeryFileID').unsigned().notNullable();
        table.foreign('surgeryFileID').references('surgeryFiles.id');
        table.timestamps(true, true);
    }) ;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('otherInfos') ;
};
