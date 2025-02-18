import { NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import pool from "../../config/route";

const allowedFileTypes = ["image/jpeg", "image/png", "image/gif"];

export const POST = async (req) => {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const id = formData.get("id");

    if (!file) {
      return NextResponse.json({ error: "No file received." }, { status: 400 });
    }

    if (!id) {
      return NextResponse.json(
        { error: "User ID is missing." },
        { status: 400 }
      );
    }

    if (!allowedFileTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Unsupported file type." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const fileName =
      Date.now() + "_" + file.name.replace(/\s+/g, "_").toLowerCase();
    const filePath = path.join(process.cwd(), "public/uploads", fileName);

    const query = `UPDATE user_details SET profile = ? WHERE user_id = ?`;
    const [result] = await pool.execute(query, [fileName, id]);

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "User not found or update failed." },
        { status: 404 }
      );
    }

    await writeFile(filePath, buffer);

    return NextResponse.json({
      message: "Profile image updated successfully.",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
};

export const GET = async (req) => {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const name = url.searchParams.get("name");

    if (!id && !name) {
      return NextResponse.json(
        { error: "User ID or name is required." },
        { status: 400 }
      );
    }

    let query = `
      SELECT up.*, ud.fullname 
      FROM user_profile AS up 
      JOIN user_details AS ud ON up.user_id = ud.user_id 
      WHERE `;
    let params = [];

    if (id) {
      query += "up.user_id = ?";
      params.push(id);
    }

    if (name) {
      query += id ? " OR ud.fullname = ?" : "ud.fullname = ?";
      params.push(name);
    }

    const [rows] = await pool.query(query, params);

    if (!rows.length) {
      return NextResponse.json({ message: "No user found." }, { status: 404 });
    }

    return NextResponse.json({
      message: "User profile data fetched successfully.",
      data: rows,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", details: error.message },
      { status: 500 }
    );
  }
};
