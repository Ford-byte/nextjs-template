import { NextResponse } from "next/server";
import pool from "../config/route";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

export async function GET() {
  try {
    // const query = `SELECT u.id,u.username,ud.fullname,ud.email,ud.profile,ud.role FROM user u JOIN user_details ud ON u.id = ud.user_id WHERE u.flag = true;`;
    const query = `
        SELECT * 
FROM granted_role AS gr 
LEFT JOIN role AS r ON gr.role_id = r.id 
LEFT JOIN user_details AS ud ON gr.user_id = ud.user_id 
LEFT JOIN user as u ON ud.user_id = u.id
WHERE gr.role_id = 1 AND gr.flag = true AND ud.flag = true AND u.flag = true
`;

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

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "User ID is required" },
        { status: 400 }
      );
    }

    const query = `UPDATE user SET flag = false WHERE id = ?`;
    const queryTwo = `UPDATE user_details SET flag = false WHERE user_id = ?`;

    const [result, resultTwo] = await Promise.all([
      pool.query(query, [id]),
      pool.query(queryTwo, [id]),
    ]);

    if (result.affectedRows === 0 && resultTwo.affectedRows === 0) {
      return NextResponse.json(
        { message: "User not found or already deleted" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "User data deleted successfully." });
  } catch (error) {
    console.log("Error during DELETE request:", error);
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const { username, fullname, email, profile, role } = await req.json();

  if (!id) {
    return NextResponse.json({ message: "ID is required" }, { status: 400 });
  }

  try {
    const updateUserQuery = `UPDATE user SET username = ? WHERE id = ?`;
    const [userResponse] = await pool.query(updateUserQuery, [username, id]);

    const updateDetailsQuery = `UPDATE user_details SET fullname = ?, email = ?, profile = ?, role = ? WHERE user_id = ?`;
    const [detailsResponse] = await pool.query(updateDetailsQuery, [
      fullname,
      email,
      profile,
      role,
      id,
    ]);

    if (userResponse.affectedRows === 0 || detailsResponse.affectedRows === 0) {
      return NextResponse.json(
        {
          message: "No matching account found or account already deactivated.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Account successfully updated." },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Database query failed", error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  try {
    const { username, password, fullname, email } = await req.json();

    if (!username || !password || !fullname || !email) {
      return NextResponse.json(
        { message: "All fields are required" },
        { status: 400 }
      );
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const detailsId = uuidv4();

    const checkUsernameQuery = `SELECT id FROM user WHERE username = ?`;
    const [existingUser] = await pool.query(checkUsernameQuery, [username]);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { message: "Username is already taken." },
        { status: 409 }
      );
    }

    const checkEmailQuery = `SELECT id FROM user_details WHERE email = ?`;
    const [existingEmail] = await pool.query(checkEmailQuery, [email]);

    if (existingEmail.length > 0) {
      return NextResponse.json(
        { message: "Email is already in use." },
        { status: 409 }
      );
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      const userQuery = `INSERT INTO user (id, username, password, flag) VALUES (?, ?, ?, ?)`;
      const [userResponse] = await connection.query(userQuery, [
        userId,
        username,
        hashPassword,
        true,
      ]);

      if (userResponse.affectedRows === 0) {
        throw new Error("Failed to create user.");
      }
      const roleQuery = `INSERT INTO granted_role(user_id,role_id,flag) VALUES(?,1,true)`;
      const [roleResponse] = await pool.query(roleQuery, [userId]);

      if (roleResponse.affectedRows === 0) {
        throw new Error("Failed to create user.");
      }

      const detailsQuery = `INSERT INTO user_details (id, user_id, fullname, email,profile,wallpic,role, flag) VALUES (?, ?, ?, ?,'','','user', ?)`;
      const [detailsResponse] = await connection.query(detailsQuery, [
        detailsId,
        userId,
        fullname,
        email,
        true,
      ]);

      if (detailsResponse.affectedRows === 0) {
        throw new Error("Failed to create user details.");
      }

      await connection.commit();
      connection.release();

      return NextResponse.json({ message: "Account Successfully Created." });
    } catch (error) {
      await connection.rollback();
      connection.release();
      return NextResponse.json(
        { message: "Database transaction failed", error: error.message },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error", error: error.message },
      { status: 500 }
    );
  }
}
