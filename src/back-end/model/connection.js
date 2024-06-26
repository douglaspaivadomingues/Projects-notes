import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  port: process.env.MYSQL_PORT || 3355,
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "root",
  database: process.env.DB_NAME || "logsdb",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default connection;