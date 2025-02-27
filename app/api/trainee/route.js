import { NextResponse } from "next/server";
import pool from "../config/route";

export async function GET(req) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "ID parameter is required." },
        { status: 400 }
      );
    }

    const query = `SELECT * FROM user_application as ua
LEFT JOIN user_details as ud ON ua.user_id = ud.user_id
LEFT JOIN application as a ON ua.application_id = a.id
WHERE ua.trainers_id = ? AND ua.flag = true AND a.approval = "accepted"`;

    const [response] = await pool.query(query, [id]);

    return NextResponse.json({
      message: "Fetch data successfully",
      data: response,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", error: error.message },
      { status: 500 }
    );
  }
}
