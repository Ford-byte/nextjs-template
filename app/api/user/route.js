import { NextResponse } from "next/server";
import pool from "../config/route";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    const query = "SELECT * FROM user WHERE flag = true";
    const [rows] = await pool.query(query);

    if (!rows.length) {
      return NextResponse.json({ message: "No users found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Success", data: rows });
  } catch (error) {
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "All fields are required" },
      { status: 400 }
    );
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const id = uuidv4();

  try {
    const queryOne = `SELECT * from user WHERE username = ?`;
    const [res] = await pool.query(queryOne, [username]);

    if (res.length > 0) {
      return NextResponse.json(
        { message: "User already created." },
        { status: 409 }
      );
    }

    const queryTwo = `INSERT INTO user(id, username, password, flag) VALUES (?, ?, ?, ?)`;
    const [response] = await pool.query(queryTwo, [
      id,
      username,
      hashPassword,
      true,
    ]);

    if (response.affectedRows === 0) {
      return NextResponse.json(
        { message: "Error Creating Account!" },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Account Successfully Created." });
  } catch (error) {
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}
