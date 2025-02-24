import { NextResponse } from "next/server";
import pool from "../config/route";

export async function GET() {
  try {
    const query = `SELECT * FROM role_permissions WHERE flag = true`;
    const [response] = await pool.query(query);

    return NextResponse.json(
      {
        message: "Data fetched successfully",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error.",
        error: error,
      },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { permission, description, keyword } = await req.json();

    const query = `INSERT INTO role_permissions (id, permission, description, keyword, flag) VALUES (null,?, ?, ?, 1)`;
    const [response] = await pool.query(query, [
      permission,
      description,
      keyword,
    ]);

    return NextResponse.json(
      {
        message: "Data inserted successfully",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { id } = await req.json();

    const query = `UPDATE role_permissions SET flag = 0 WHERE id = ? `;
    const [response] = await pool.query(query, [id]);

    return NextResponse.json(
      {
        message: "Data successfully deleted.",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal Server Error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
