import Event from "@/app/models/Event";
import connectDB from "@/app/lib/mongoDb";
import { NextRequest } from "next/server";
import { getServerSession } from "next-auth";

type Params = Promise<{
 userId: string;
}>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
 const session = await getServerSession();

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
