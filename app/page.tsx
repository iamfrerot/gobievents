import Link from "next/link";
export default async function Home() {
 return (
  <div className='flex flex-col justify-center items-center bg-secondary min-h-screen w-screen gap-y-5'>
   <h1 className='font-drunk border-b border-black uppercase text-center lg:text-[6rem]'>
    Gobi Events
   </h1>
   <h1 className='font-drunk border-b border-black uppercase text-center lg:text-[2rem]'>
    Magical meeting places
   </h1>
   <Link
    href={"/events"}
    className='text-white bg-third font-semibold py-3 px-5'
   >
    View all events
   </Link>
  </div>
 );
}
