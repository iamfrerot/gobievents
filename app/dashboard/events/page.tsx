import { getServerSession } from "next-auth";
import Eventswrapper from "@/components/Eventswrapper";
import { authOptions } from "@/app/lib/auth";

const EventsPage = async () => {
 const session = await getServerSession(authOptions);
 return <Eventswrapper user={session?.user as { role: string; id: string }} />;
};

export default EventsPage;
