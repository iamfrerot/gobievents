import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

const getSession = async () => {
 const session = await getServerSession(authOptions);
 if (session) {
  return session;
 }
 return null;
};

export default getSession;
