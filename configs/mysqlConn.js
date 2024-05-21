const mysql = require('mysql2');
require('dotenv').config();


const conn = mysql.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    port: process.env.DATABASE_PORT
});


conn.getConnection((err) => {
    if (err) {
        return console.log(`connect to database fiel : ${err}`);
    }
        return console.log('connect database successfully');
})

module.exports = conn.promise();

