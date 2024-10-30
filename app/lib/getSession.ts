import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async () => {
 try {
  const session = await getServerSession(authOptions);
  if (session) {
   return session;
  }
 } catch (error) {
  return null;
 }
 return null;
};
