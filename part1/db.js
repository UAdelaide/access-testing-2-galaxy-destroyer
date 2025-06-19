const mysql = require('mysql2/promise');

const db = mysql.createPool({
    socketPath: '/var/run/mysqld/mysqld.sock',
    host: '127.0.0.1', // was localhost before
    user: 'root',
    password: 'root',
    database: 'bookMarketplace'
});

db.getConnection()
  .then(() => console.log('✅ MySQL pool connected'))
  .catch(err() => console.error('❌ MySQL connection error:', err));

module.exports = db;
