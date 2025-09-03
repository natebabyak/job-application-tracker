import { auth } from "@/auth";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = jwt.sign(
    { email: req.auth.user?.email },
    process.env.JWT_SECRET!,
    { algorithm: "HS256", expiresIn: "1m" },
  );

  const body = JSON.stringify(await req.json());

  const response = await fetch(`${process.env.BACKEND_URL}/applications`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: body,
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: response.status },
    );
  }

  const application = await response.json();
  return NextResponse.json(application, { status: response.status });
});
