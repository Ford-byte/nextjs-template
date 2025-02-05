import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "../../config/route";

export async function POST(req) {
  const { username, password } = await req.json();

  if (!username || !password) {
    return NextResponse.json(
      { message: "All fields are required!" },
      { status: 400 }
    );
  }

  try {
    const query = `SELECT password, flag FROM user WHERE username = ?`;
    const [response] = await pool.query(query, [username]);

    if (response.length === 0) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    if (!response[0].flag) {
      return NextResponse.json(
        { message: "Your account has been deactivated by the Admin." },
        { status: 400 }
      );
    }

    const passwordCompare = await bcrypt.compare(
      password,
      response[0].password
    );

    if (!passwordCompare) {
      return NextResponse.json(
        { message: "Password is incorrect." },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "Welcome User" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}
