import { getServerSession } from "next-auth";
import Eventswrapper from "@/components/Eventswrapper";

const EventsPage = async () => {
 const session = await getServerSession();
 return <Eventswrapper user={session?.user as { role: string; id: string }} />;
};

export default EventsPage;
