const mysql = require('mysql2/promise');

const db = mysql.createPool({
    socketPath: '/var/run/mysqld/mysqld.sock',
    host: '127.0.0.1', // was localhost before
    user: 'root',
    password: 'root',
    database: 'bookMarketplace'
});

module.exports = db;