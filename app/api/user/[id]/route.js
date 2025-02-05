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

    const query = "SELECT * FROM user WHERE id = ? AND flag = true";
    const [rows] = await pool.query(query, [id]);

    return NextResponse.json({ message: "Success", data: rows });
  } catch (error) {
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const query = `UPDATE user SET flag = false WHERE id = ?`;
    const [response] = await pool.query(query, [id]);

    if (response.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "No matching account found or account already deactivated.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Account successfully deactivated." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}
