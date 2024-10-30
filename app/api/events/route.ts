import connectDB from "@/app/lib/mongoDb";
import Event from "@/app/models/Event";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
 await connectDB();

 try {
  const events = await Event.find();
  return new Response(JSON.stringify(events), { status: 200 });
 } catch (error) {
  console.error("Error fetching events:", error);
  return new Response(JSON.stringify({ error: "Failed to fetch events" }), {
   status: 500,
  });
 }
}
