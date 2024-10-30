import getSession from "../lib/getSession";
import { redirect } from "next/navigation";
import Eventswrapper from "@/components/Eventswrapper";

const EventsPage = async () => {
 const session = await getSession();
 const user = session?.user;
 return <Eventswrapper user={user as { role: string; id: string }} />;
};

export default EventsPage;
