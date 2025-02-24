import { NextResponse } from "next/server";
import pool from "../config/route";

export async function GET() {
  try {
    const query = ` SELECT * 
FROM granted_role AS gr 
LEFT JOIN role AS r ON gr.role_id = r.id 
LEFT JOIN user_details AS ud ON gr.user_id = ud.user_id 
LEFT JOIN user as u ON ud.user_id = u.id
WHERE gr.role_id = 2 AND gr.flag = true`;
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
