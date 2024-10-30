import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoDb";
import User from "@/app/models/User";
import { z } from "zod";

const userSchema = z.object({
 email: z.string().email(),
 password: z.string().min(6),
 role: z.enum(["user", "admin"]).default("user"),
});

export async function POST(req: NextRequest) {
 try {
  await connectDB();
  const body = await req.json();
  const validatedData = userSchema.parse(body);

  const existingUser = await User.findOne({ email: validatedData.email });
  if (existingUser) {
   return NextResponse.json({ error: "User already exists" }, { status: 400 });
  }

  const user = await User.create({
   email: validatedData.email,
   password: validatedData.password,
   role: validatedData.role,
  });

  const userResponse = {
   id: user._id,
   email: user.email,
   role: user.role,
   createdAt: user.createdAt,
  };

  return NextResponse.json(userResponse, { status: 201 });
 } catch (error) {
  if (error instanceof z.ZodError) {
   return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
 }
}
