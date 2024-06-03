/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    await knex.schema.createTable('labs',(table)=>{
        table.increments('id').primary();
        table.integer('k').notNullable();
        table.integer('MG');
        table.integer('NA');
        table.integer('CA');
        table.integer('Troponin');
        table.integer('BNP');
        table.integer('EF');
        table.integer('PT');
        table.integer('INR');
        table.integer('ALT');
        table.integer('AST');
        table.integer('HGP');
        table.integer('HCT');
        table.integer('RBC');
        table.integer('WBC');
        table.integer('Albumin');
        table.integer('Platelet');
        table.integer('CR');
        table.integer('BUN');
        table.integer('GFR');
        table.integer('PO2');
        table.integer('PCO2');
        table.integer('HCO3');
        table.integer('PH');
        table.integer('chol');
        table.integer('lipid');
        table.integer('LDL');
        table.integer('HDL');
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
    await knex.schema.dropTable('labs');
};
