"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
const NavBar = () => {
 const pathName = usePathname();
 return (
  <nav className='flex absolute top-0 left-1/2 transform -translate-x-1/2 backdrop-blur-sm z-[3]'>
   <Link
    className='p-2 md:py-3 md:px-16 flex items-center justify-center font-semibold border-b border-l border-r border-black text-2xl hover:bg-third transition-colors ease-in-out duration-700 group '
    href={pathName.startsWith("/dashboard") ? "/dashboard" : "/"}
   >
    gobi
    <span className='text-third group-hover:text-secondary transition-colors duration-700 ease-in-out'>
     events
    </span>
   </Link>
   <Link
    className='p-2 md:py-3 md:px-16 flex items-center justify-center border-b border-r border-black'
    href={pathName.startsWith("/dashboard") ? "/dashboard/events" : "/events"}
   >
    Events
   </Link>
   {pathName.startsWith("/dashboard") ? (
    ""
   ) : (
    <Link
     className='p-2 md:py-3 md:px-16 flex items-center justify-center border-b border-r border-black '
     href={"/register"}
    >
     Register
    </Link>
   )}
   {pathName.startsWith("/dashboard") ? (
    <button
     className='p-2 md:py-3 md:px-16 flex items-center justify-center border-b  border-r border-black bg-third text-white font-semibold'
     onClick={() => signOut()}
    >
     Logout
    </button>
   ) : (
    <Link
     className='p-2 md:py-3 md:px-16 flex items-center justify-center border-b  border-r border-black bg-third text-white font-semibold'
     href={"/login"}
    >
     Login
    </Link>
   )}
  </nav>
 );
};

export default NavBar;
