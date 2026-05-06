/* ===================================
   MySQL Database Connection Pool
   =================================== */

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: process.env.MYSQLHOST || 'localhost',
    port: parseInt(process.env.MYSQLPORT) || 3306,
    user: process.env.MYSQLUSER || 'python',
    password: process.env.MYSQLPASSWORD || '12345',
    database: process.env.MYSQLDATABASE || 'o_an_quan_db',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
    charset: 'utf8mb4'
});

// Test connection on startup
async function testConnection() {
    try {
        const conn = await pool.getConnection();
        console.log('✅ MySQL connected successfully to o_an_quan_db');
        conn.release();
    } catch (err) {
        console.error('❌ MySQL connection failed:', err.message);
        console.error('   Make sure MySQL server is running and database "o_an_quan_db" exists.');
        console.error('   Run database/schema.sql first to create the database.');
    }
}

testConnection();

module.exports = pool;
