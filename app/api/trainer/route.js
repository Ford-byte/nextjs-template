import { NextResponse } from "next/server";
import pool from "../config/route";

export async function GET() {
  try {
    const query = ` SELECT * FROM user_details ud
      JOIN user u ON u.id = ud.user_id
      WHERE ud.role = 'trainer' AND u.flag = true`;
    const [rows] = await pool.execute(query);
    if (rows.length === 0) {
      return NextResponse.json(
        { message: "No trainers found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Success", data: rows },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}
