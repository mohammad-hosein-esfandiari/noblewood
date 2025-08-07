import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT), // 👈 اضافه کردن پورت
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD, // 👈 مطمئن شو این اسم با env یکیه
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
