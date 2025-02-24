import pool from "@/app/api/config/route";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { message: "Missing user_id parameter." },
        { status: 400 }
      );
    }

    const query = `
      SELECT rp.keyword 
FROM granted_permission AS gp
LEFT JOIN role_permissions AS rp 
  ON gp.permission_id = rp.id 
LEFT JOIN granted_role AS gr
  ON gr.role_id = gp.role_id
LEFT JOIN role AS r
  ON r.id = gr.role_id  
WHERE gr.user_id = ? 
  AND gp.flag = true
    `;

    const [response] = await pool.query(query, [user_id]);

    return NextResponse.json(
      {
        message: "Data fetched successfully.",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
