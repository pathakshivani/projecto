import mysql from "mysql2/promise";
import { DB_NAME } from "../utils/index.js";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: DB_NAME,
  // ssl: {
  //   ca: process.env.DB_SSL_CA,
  // },
});

const connectDB = async () => {
  try {
    await connection.connect((error) => {
      if (error) {
        console.log("MySQL Connection Error !!", error);
        return;
      }
    });
    console.log("MySQL Connected Successfully !!");
  } catch (error) {
    console.error("MySQL Connection Error:", error);
    process.exit(1);
  }
};

export { connection, connectDB };
