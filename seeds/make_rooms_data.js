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
    // -----------------
    {floorID: 3, roomNumber: 201},
    {floorID: 3, roomNumber: 202},
    {floorID: 3, roomNumber: 203},
    {floorID: 3, roomNumber: 204},
    {floorID: 3, roomNumber: 205},
    {floorID: 3, roomNumber: 206},
    {floorID: 3, roomNumber: 207},
    {floorID: 3, roomNumber: 208},
    {floorID: 3, roomNumber: 209},
    {floorID: 3, roomNumber: 210},
    // -----------------
    {floorID: 4, roomNumber: 301},
    {floorID: 4, roomNumber: 302},
    {floorID: 4, roomNumber: 303},
    {floorID: 4, roomNumber: 304},
    {floorID: 4, roomNumber: 305},
    {floorID: 4, roomNumber: 306},
    {floorID: 4, roomNumber: 307},
    {floorID: 4, roomNumber: 308},
    {floorID: 4, roomNumber: 309},
    {floorID: 4, roomNumber: 310},
    // -----------------
    {floorID: 5, roomNumber: 401},
    {floorID: 5, roomNumber: 402},
    {floorID: 5, roomNumber: 403},
    {floorID: 5, roomNumber: 404},
    {floorID: 5, roomNumber: 405},
    {floorID: 5, roomNumber: 406},
    {floorID: 5, roomNumber: 407},
    {floorID: 5, roomNumber: 408},
    {floorID: 5, roomNumber: 409},
    {floorID: 5, roomNumber: 410},
    // -----------------
    {floorID: 6, roomNumber: 501},
    {floorID: 6, roomNumber: 502},
    {floorID: 6, roomNumber: 503},
    {floorID: 6, roomNumber: 504},
    {floorID: 6, roomNumber: 505},
    {floorID: 6, roomNumber: 506},
    {floorID: 6, roomNumber: 507},
    {floorID: 6, roomNumber: 508},
    {floorID: 6, roomNumber: 509},
    {floorID: 6, roomNumber: 510},
    // -----------------
    {floorID: 7, roomNumber: 1},
    {floorID: 7, roomNumber: 2},
    {floorID: 7, roomNumber: 3},
    {floorID: 7, roomNumber: 4},
    {floorID: 7, roomNumber: 5},
    {floorID: 7, roomNumber: 6},
    {floorID: 7, roomNumber: 7},
    {floorID: 7, roomNumber: 8},
    {floorID: 7, roomNumber: 9},
    {floorID: 7, roomNumber: 0},
    // -----------------
  ]);
};
