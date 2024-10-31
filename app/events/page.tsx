import { getServerSession } from "next-auth";
import Eventswrapper from "@/components/Eventswrapper";
import { authOptions } from "../lib/auth";

const EventsPage = async () => {
 const session = await getServerSession(authOptions);
 const user = session?.user;
 return <Eventswrapper user={user as { role: string; id: string }} />;
};

export default EventsPage;
