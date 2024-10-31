import Event from "@/app/models/Event";
import connectDB from "@/app/lib/mongoDb";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

type Params = Promise<{
 eventId: string;
}>;

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
 const session = await getServerSession(authOptions);
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
  await Event.findByIdAndDelete(eventId);

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
