import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import Image from "next/image";
import AdminEventswrapper from "@/components/AdminEventswrapper";

export default async function DashboardPage() {
 const session = await getServerSession(authOptions);

 return (
  <main className='flex flex-col p-20 bg-secondary h-fit min-h-screen '>
   <h1 className='font-drunk'>Welcome Back, {session?.user?.email}</h1>
   <div className='mt-4'>
    <div className='flex items-center justify-between'>
     <h1 className='font-drunk text-third'>Your Events</h1>
     <Link href={"/dashboard/events/new"}>
      <Image src={"/add-square.svg"} alt='Add Event' width={30} height={30} />
     </Link>
    </div>
    <AdminEventswrapper userId={session?.user.id as string} />
   </div>
  </main>
 );
}
