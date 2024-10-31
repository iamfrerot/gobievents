import { NextRequest } from "next/server";
import connectDB from "@/app/lib/mongoDb";
import Event from "@/app/models/Event";
import { getServerSession } from "next-auth";

type Params = Promise<{
 eventId: string;
}>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
 const session = await getServerSession();
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
