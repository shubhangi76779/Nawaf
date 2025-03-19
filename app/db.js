import dotenv from "dotenv";
import mysql from "mysql2/promise";

dotenv.config();

// Access environment variables
const config = {
  db: {
    host: process.env.MYSQL_HOST,
    port: process.env.DB_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 2,
    queueLimit: 0,
  },
};

const pool = mysql.createPool(config.db);

// Utility function to query the database
async function query(sql, params = []) {
  const [rows] = await pool.execute(sql, params);
  return rows;
}

// Function to test database connection
async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Successfully connected to the database!");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
  }
}

// Run test connection
testConnection();

// ✅ Correct Export for ES Modules
export default { query };
