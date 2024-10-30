import Event from "@/app/models/Event";
import connectDB from "@/app/lib/mongoDb";
import { NextResponse } from "next/server";
import getSession from "@/app/lib/getSession";
import { Params } from "next/dist/server/request/params";

export async function DELETE(
 req: NextResponse,
 { params }: { params: Params }
) {
 const session = await getSession();
 const { eventId } = await params;
 if (!session || session.user.role !== "admin") {
  return new Response(JSON.stringify({ message: "Unauthorized" }), {
   status: 401,
  });
 }

 try {
  await connectDB();

  const event = await Event.findById(eventId);
  if (event.owner !== session.user.id) {
   return new Response(JSON.stringify({ message: "Unauthorized" }), {
    status: 401,
   });
  }
  if (!event) {
   return new Response(
    JSON.stringify({
     message: "Event Doesn't Exist",
    }),
    { status: 404, statusText: "Not Found" }
   );
  }
  const deletedEvent = await Event.findByIdAndDelete(eventId);

  return new Response(JSON.stringify({ message: "Deleted Successful" }), {
   status: 202,
  });
 } catch (error) {
  console.error("Deleting Event error:", error);
  return new Response(JSON.stringify({ message: "Internal server error." }), {
   status: 500,
  });
 }
}
