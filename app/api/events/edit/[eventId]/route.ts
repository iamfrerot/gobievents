import { NextResponse } from "next/server";
import connectDB from "@/app/lib/mongoDb";
import Event from "@/app/models/Event";
import getSession from "@/app/lib/getSession";

export async function GET(
 req: NextResponse,
 { params }: { params: { eventId: string } }
) {
 const session = await getSession();
 if (!session || session.user.role !== "admin") {
  return new Response(JSON.stringify({ message: "Unauthorized" }), {
   status: 401,
  });
 }
 const { eventId } = await params;

 try {
  await connectDB();
  const event = await Event.findById(eventId);

  if (!event) {
   return new Response(JSON.stringify({ message: "Event not found." }), {
    status: 404,
   });
  }
  return new Response(JSON.stringify(event), { status: 200 });
 } catch (error) {
  console.error("Getting Event error:", error);
  return new Response(JSON.stringify({ message: "Internal server error." }), {
   status: 500,
  });
 }
}
