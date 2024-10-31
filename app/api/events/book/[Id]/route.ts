import Event from "@/app/models/Event";
import connectDB from "@/app/lib/mongoDb";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

type Params = Promise<{
 Id: string;
}>;

export async function POST(req: NextRequest, { params }: { params: Params }) {
 const session = await getServerSession(authOptions);

 if (!session) {
  return new Response(
   JSON.stringify({ message: "Please log in to book an event." }),
   { status: 401 }
  );
 }

 const { Id } = await params;

 try {
  await connectDB();

  const event = await Event.findById(Id);
  if (!event) {
   return new Response(JSON.stringify({ message: "Event not found." }), {
    status: 404,
   });
  }

  const userId: string = session.user.id;
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
