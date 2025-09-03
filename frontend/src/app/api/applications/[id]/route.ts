import { auth } from "@/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const PUT = auth(async function PUT(req, { params }) {
  const { id } = await params;

  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = jwt.sign(
    { email: req.auth.user?.email },
    process.env.JWT_SECRET!,
    { algorithm: "HS256", expiresIn: "1m" },
  );

  const body = JSON.stringify(await req.json());

  const response = await fetch(
    `${process.env.BACKEND_URL}/applications/${id}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: body,
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: response.status },
    );
  }

  const application = await response.json();
  return NextResponse.json(application, { status: response.status });
});

export const DELETE = auth(async function DELETE(req, { params }) {
  const { id } = await params;

  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = jwt.sign(
    { email: req.auth.user?.email },
    process.env.JWT_SECRET!,
    { algorithm: "HS256", expiresIn: "1m" },
  );

  const response = await fetch(
    `${process.env.BACKEND_URL}/applications/${id}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!response.ok) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: response.status },
    );
  }

  return NextResponse.json({ status: response.status });
});
