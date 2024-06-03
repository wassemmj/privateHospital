/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    await knex.schema.createTable('changables',(table)=>{
        table.increments('id').primary();
        table.string('shift');
        table.integer('PIV');
        table.integer('CVC');
        table.integer('PICC');
        table.enum('site',['Right','Left']);
        table.integer('fluidRate');
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
    await knex.schema.dropTable('changables');
};
