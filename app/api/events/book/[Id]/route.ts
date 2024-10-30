import Event from "@/app/models/Event";
import connectDB from "@/app/lib/mongoDb";
import { NextResponse } from "next/server";
import getSession from "@/app/lib/getSession";

export async function POST(
 req: NextResponse,
 { params }: { params: { Id: string } }
) {
 const session = await getSession();

 if (!session) {
  return new Response(
   JSON.stringify({ message: "Please log in to book an event." }),
   { status: 401 }
  );
 }

 const { Id } = params;

 try {
  await connectDB();

  const event = await Event.findById(Id);
  if (!event) {
   return new Response(JSON.stringify({ message: "Event not found." }), {
    status: 404,
   });
  }

  let userId: string = session.user.id;
  if (event.bookings.includes(userId)) {
   return new Response(
    JSON.stringify({ message: "You have already booked this event." }),
    { status: 400 }
   );
  }

  if (event.availableSeats <= 0) {
   return new Response(JSON.stringify({ message: "No seats available." }), {
    status: 400,
   });
  }

  event.bookings.push(userId);
  event.availableSeats -= 1;
  await event.save();

  return new Response(
   JSON.stringify({
    message: "Booking successful!",
    availableSeats: event.availableSeats,
   }),
   { status: 200 }
  );
 } catch (error) {
  console.error("Booking error:", error);
  return new Response(JSON.stringify({ message: "Internal server error." }), {
   status: 500,
  });
 }
}
