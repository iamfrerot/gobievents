"use client";
import { useRouter } from "next/navigation";
const NotFound = () => {
 const router = useRouter();
 return (
  <main className='flex flex-col w-screen h-screen justify-center items-center'>
   <h1 className='font-drunk text-xl'>404 | This Page Could not be found </h1>
   <button
    onClick={() => router.back()}
    className='font-bold bg-third text-white py-2 px-4  mt-6'
   >
    Go back !!
   </button>
  </main>
 );
};

export default NotFound;
