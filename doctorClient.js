// doctorClient.js
const knex = require('./db');

const io = require('socket.io-client');
const socket = io('http://localhost:3000'); // Connect to your server

// Simulate joining a room for a specific doctor (replace 'doctorId' with actual ID)
const doctorId = 4 ; // replace with the actual doctor ID
socket.emit('join', doctorId); // first user login we emit this

socket.on('consult', async (data) => {
    console.log('Received notification:', data);
});
socket.on('Examination', async (data) => {
    console.log('Received notification:', data);
});

socket.on('Radiograph', async (data) => {
    console.log('Received notification:', data);
});

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});