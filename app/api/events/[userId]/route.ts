import Event from "@/app/models/Event";
import connectDB from "@/app/lib/mongoDb";
import { NextResponse } from "next/server";
import getSession from "@/app/lib/getSession";
import { Params } from "next/dist/server/request/params";

export async function GET(req: NextResponse, { params }: { params: Params }) {
 const session = await getSession();

 if (!session || session.user.role !== "admin") {
  return new Response(JSON.stringify({ message: "Unauthorized" }), {
   status: 401,
  });
 }

 const { userId } = await params;

 try {
  await connectDB();

  const events = await Event.find({ owner: userId });

  if (events.length <= 0 || !events) {
   return new Response(JSON.stringify({ message: "Events not found." }), {
    status: 404,
   });
  }

  return new Response(JSON.stringify(events), { status: 200 });
 } catch (error) {
  console.error("Getting Events error:", error);
  return new Response(JSON.stringify({ message: "Internal server error." }), {
   status: 500,
  });
 }
}
