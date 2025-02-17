import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "../../config/route";

export async function POST(req) {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    const query = `SELECT id, password, flag FROM user WHERE username = ?`;
    const [response] = await pool.query(query, [username]);

    if (response.length === 0) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 400 }
      );
    }

    const { id, password: hashedPassword, flag } = response[0];

    if (!flag) {
      return NextResponse.json(
        { message: "Your account has been deactivated by the Admin." },
        { status: 403 }
      );
    }

    const passwordMatch = await bcrypt.compare(password, hashedPassword);

    if (!passwordMatch) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      return NextResponse.json(
        { message: "Invalid credentials." },
        { status: 400 }
      );
    }

    const queryTwo = `SELECT user_id, fullname, email, role FROM user_details WHERE user_id = ? AND flag = true`;
    const [responseTwo] = await pool.query(queryTwo, [id]);

    return NextResponse.json(
      { message: "Welcome User", data: responseTwo },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}
