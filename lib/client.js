const pg = require('pg');

const client = new pg.Client(process.env.DATABASE_URL);
client.on('error', err => {console.log('database error');throw err;});

module.exports = client;