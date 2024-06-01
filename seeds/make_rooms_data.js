/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('rooms').del()
  await knex('rooms').insert([
    {floorID: 2, roomNumber: 101},
    {floorID: 2, roomNumber: 102},
    {floorID: 2, roomNumber: 103},
    {floorID: 2, roomNumber: 104},
    {floorID: 2, roomNumber: 105},
    {floorID: 2, roomNumber: 106},
    {floorID: 2, roomNumber: 107},
    {floorID: 2, roomNumber: 108},
    {floorID: 2, roomNumber: 109},
    {floorID: 2, roomNumber: 110},
  ]);
};
