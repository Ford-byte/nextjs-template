import { NextResponse } from "next/server";
import pool from "../config/route";

export async function GET() {
  try {
    const query = `SELECT * FROM role`;
    const [response] = await pool.query(query);

    return NextResponse.json(
      {
        message: "Data fetched successfully.",
        data: response,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error.",
        error: error,
      },
      {
        status: 500,
      }
    );
  }
}
