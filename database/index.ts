import mysql2 from "mysql2/promise"

const pool = mysql2.createPool({
    host: 'localhost',
    user: 'root',
    port: 3306,
    password: "root",
    database: 'vacations',
});

export { pool }