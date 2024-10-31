import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import connectDB from "@/app/lib/mongoDb";
import Event from "@/app/models/Event";
import { getServerSession } from "next-auth";

const eventSchema = z.object({
 title: z.string().min(1, "Title is required"),
 description: z.string().min(1, "Description is required"),
 date: z.string().refine((date) => !isNaN(Date.parse(date)), {
  message: "Invalid date format",
 }),
 availableSeats: z.number().int().min(0, "Available seats must be 0 or more"),
 owner: z.string().min(1, "Owner is required"),
});

export async function POST(req: NextRequest) {
 try {
  const session = await getServerSession();

  if (!session || session.user.role !== "admin") {
   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const requestData = await req.json();
  requestData.owner = session.user.id;

  const validatedData = eventSchema.parse(requestData);

  await connectDB();

  const saveEvent = await Event.create(validatedData);
  return NextResponse.json(saveEvent, {
   status: 201,
   statusText: "Event Created",
  });
 } catch (error) {
  if (error instanceof z.ZodError) {
   return NextResponse.json({ error: error.errors }, { status: 400 });
  }
  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
 }
}
