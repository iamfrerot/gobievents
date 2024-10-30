import getSession from "@/app/lib/getSession";
import Eventswrapper from "@/components/Eventswrapper";

const EventsPage = async () => {
 const session = await getSession();
 return <Eventswrapper user={session?.user as { role: string; id: string }} />;
};

export default EventsPage;
