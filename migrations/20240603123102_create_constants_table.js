/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    await knex.schema.createTable('constants',(table)=>{
        table.increments('id').primary();
        table.string('currentProblem').notNullable();
        table.string('allergies');
        table.string('activity');
        table.string('neuro');
        table.string('diet');
        table.string('resp');
        table.string('GL');
        table.string('skin');
        table.string('cardiac');
        table.string('pain');
        table.string('M_S');
        table.string('RUE');
        table.string('RLE');
        table.string('LUE');
        table.string('LLE');
        table.string('GU');
        table.string('voidStatus');
        table.string('lastBM');
        table.string('medicalHistory');
        table.string('recentProcedure');
        table.string('IONote');
        table.string('other');
        table.integer('IntensiveCareID').unsigned().notNullable();
        table.foreign('IntensiveCareID').references('intensiveCares.id');
        table.timestamps(true,true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
    await knex.schema.dropTable('constants');
};
