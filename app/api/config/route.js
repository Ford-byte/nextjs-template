import mysql from "mysql2/promise";
import { NextResponse } from "next/server";

const pool = mysql.createPool({
  host: process.env.APP_DATABASE_HOST,
  user: process.env.APP_DATABASE_USERNAME,
  password: process.env.APP_DATABASE_PASSWORD,
  database: process.env.APP_DATABASE_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function GET() {
  try {
    const connection = await pool.getConnection();
    await connection.ping();
    connection.release();

    return NextResponse.json({
      message: "Connected to the database successfully!",
    });
  } catch (err) {
    return NextResponse.json(
      {
        message: "Database connection failed!",
        error: err.message,
      },
      { status: 500 }
    );
  }
}

export default pool;
