const knex = require('knex');
const dbConfig = require('../config.json')['database'];

const db = knex(dbConfig);

module.exports = db;