import Event from "@/app/models/Event";
import connectDB from "@/app/lib/mongoDb";
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";

type Params = Promise<{
 userId: string;
}>;

export async function GET(req: NextRequest, { params }: { params: Params }) {
 const session = await getServerSession(authOptions);
 if (!session) {
  return NextResponse.json(
   {
    message: "UnAuthorized",
   },
   { status: 401 }
  );
 }
 if (session?.user.role !== "admin") {
  return NextResponse.json(
   { message: "Must be admin to have own Events" },
   { status: 401 }
  );
 }

 const { userId } = await params;

 try {
  await connectDB();

  const events = await Event.find({ owner: userId });

  if (events.length <= 0 || !events) {
   return NextResponse.json(
    { message: "No Events found. create new" },
    { status: 404 }
   );
  }

  return NextResponse.json(events, { status: 200 });
 } catch (error) {
  console.error("Getting Events error:", error);
  return NextResponse.json(
   { message: "Internal server error." },
   { status: 500 }
  );
 }
}
