import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoDb";
import Event from "@/app/models/Event";
import { authOptions } from "@/app/lib/auth";
import { getServerSession } from "next-auth";
type Params = Promise<{
 eventId: string;
}>;
export async function PUT(request: Request, { params }: { params: Params }) {
 const { eventId } = await params;
 const { title, description, date, availableSeats } = await request.json();
 const session = await getServerSession(authOptions);

 if (!session) {
  return NextResponse.json(
   {
    message: "Unauthorized",
   },
   { status: 401 }
  );
 }
 if (!title || !description || !date || availableSeats === undefined) {
  return NextResponse.json(
   { error: "All fields are required" },
   { status: 400 }
  );
 }

 try {
  await connectDB();
  const updatedEvent = await Event.findByIdAndUpdate(
   eventId,
   {
    title,
    description,
    date: new Date(date),
    availableSeats,
   },
   { new: true }
  );

  if (!updatedEvent) {
   return NextResponse.json({ error: "Event not found" }, { status: 404 });
  }

  return NextResponse.json(
   { message: "Event updated successfully", event: updatedEvent },
   { status: 200 }
  );
 } catch (error) {
  console.error(error);
  return NextResponse.json({ error: "Internal server error" }, { status: 500 });
 }
}
