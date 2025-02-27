import { NextResponse } from "next/server";
import pool from "../../config/route";
import { uuid } from "uuidv4";
import { get } from "mongoose";

export async function POST(req) {
  try {
    const body = await req.json();
    const id = uuid();
    const query = `INSERT INTO application 
      (id, fullname, age, contact, emergency_person, emergency_number, question_1, question_2, question_3, question_4, question_5, question_6, flag) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`;

    const values = [
      id,
      body.fullname,
      body.age,
      body.contact,
      body.emergency_person,
      body.emergency_number,
      body.question_1,
      body.question_2,
      body.question_3,
      body.question_4,
      body.question_5,
      body.question_6,
    ];

    await pool.query(query, values);

    const queryTwo = `INSERT INTO user_application(id,user_id,trainers_id,application_id,flag) VALUES(?,?,?,?,1)`;

    await pool.query(queryTwo, [uuid(), body.user_id, body.trainers_id, id]);

    return NextResponse.json(
      { message: "Application submitted successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.log("Error inserting application:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", error: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { message: "Missing 'id' query parameter." },
        { status: 400 }
      );
    }

    const query = `SELECT * FROM user_application as ua 
      LEFT JOIN user_details as ud ON ua.user_id = ud.user_id
      LEFT JOIN application as a ON ua.application_id = a.id 
      WHERE ua.trainers_id = ? AND ua.flag=true AND a.flag=true`;

    const [response] = await pool.query(query, [id]);

    return NextResponse.json(
      { message: "Successfully fetched data.", data: response },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error fetching data:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { approval, id } = await req.json();

    const query = `UPDATE application SET approval = ? WHERE id = ?`;
    const [response] = await pool.query(query, [approval, id]);

    return NextResponse.json(
      {
        message: `Trainee Successfully ${
          approval === "accepted" ? "Accepted" : "Rejected"
        }`,
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const query = `UPDATE application SET flag = false WHERE id = ?`;
    const [response] = await pool.query(query, [id]);

    return NextResponse.json(
      {
        message: "Application Successfully Deleted.",
        data: response,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Internal server error:", error);
    return NextResponse.json(
      { message: "Internal Server Error.", error: error.message },
      { status: 500 }
    );
  }
}
