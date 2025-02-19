import { NextResponse } from "next/server";
import pool from "../../config/route";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Missing 'id' parameter" },
        { status: 400 }
      );
    }

    const query = `
      SELECT gr.*, ud.*, r.*, gp.*, rp.*
      FROM granted_role AS gr
      LEFT JOIN user_details AS ud ON ud.user_id = gr.user_id
      LEFT JOIN role AS r ON r.id = gr.role_id
      LEFT JOIN granted_permission AS gp ON r.id = gp.role_id
      LEFT JOIN role_permissions AS rp ON gp.permission_id = rp.id
      WHERE ud.user_id = ?`;

    const [response] = await pool.query(query, [id]);

    if (!response.length) {
      return NextResponse.json(
        { message: "No data found for the given 'id'" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Data fetched successfully.",
        data: response,
        id: id,
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
