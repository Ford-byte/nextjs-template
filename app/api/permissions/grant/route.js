import { NextResponse } from "next/server";
import pool from "../../config/route";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const role_id = searchParams.get("role_id");

    if (!role_id) {
      return NextResponse.json(
        { message: "Missing role_id parameter." },
        { status: 400 }
      );
    }

    const query = `
      SELECT * FROM granted_permission AS gp 
      LEFT JOIN role_permissions AS rp 
      ON gp.permission_id = rp.id 
      WHERE role_id = ?`;

    const [response] = await pool.query(query, [role_id]);

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

export async function POST(req) {
  try {
    const { role_id, permission_id } = await req.json();

    if (!role_id || !permission_id || !Array.isArray(permission_id)) {
      return NextResponse.json(
        {
          message:
            "role_id should be a single value and permission_id should be an array.",
        },
        { status: 400 }
      );
    }

    const values = permission_id.map((permission) => [
      role_id,
      permission,
      true,
    ]);

    const query = `INSERT INTO granted_permission (role_id, permission_id, flag) VALUES ?`;
    const [response] = await pool.query(query, [values]);

    if (response && response.affectedRows > 0) {
      return NextResponse.json(
        {
          message: "Permissions granted successfully.",
          affectedRows: response.affectedRows,
        },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to grant permissions." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error occurred during permission grant:", error);
    return NextResponse.json(
      {
        message: "Internal Server Error.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const query = `UPDATE granted_permission SET flag = 0 WHERE id = ?`;
    const [response] = await pool.query(query, [id]);

    return NextResponse.json(
      {
        message: "Permission deleted successfully.",
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
