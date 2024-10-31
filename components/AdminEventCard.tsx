"use client";
import Link from "next/link";
import { useState } from "react";
interface AdminEventCardProps {
 id: string;
 title: string;
 description: string;
 date: string;
 availableSeats: number;
 bookings: string[];
 reFetch: () => Promise<void>;
}

const AdminEventCard: React.FC<AdminEventCardProps> = ({
 id,
 title,
 description,
 date,
 availableSeats,
 reFetch,
}) => {
 const newDate = new Date(date).toDateString();
 const [deleteStatus, SetDeleteStatus] = useState(false);
 const handleDelete = async () => {
  const confirmDelete = confirm("Are you Sure want To Delete this Event");
  if (!confirmDelete) {
   return;
  }
  try {
   SetDeleteStatus(true);
   const response = await fetch(`/api/events/delete/${id}`, {
    method: "DELETE",
    headers: {
     "Content-Type": "application/json",
    },
   });

   const data = await response.json();

   if (response.ok) {
    reFetch();
    alert("Deleted successful!");
   } else {
    alert(data.message);
   }
  } catch (error) {
   console.error("Deleting error:", error);
   alert("An error occurred. Please try again.");
  } finally {
   SetDeleteStatus(false);
  }
 };

 return (
  <div
   key={id}
   className='bg-white shadow-lg p-4 flex flex-col justify-between gap-y-4 border border-dashed border-black'
  >
   <h1 className='text-xl font-drunk '>{title}</h1>
   <p>{description}</p>
   <div className='flex justify-between items-center border-t pt-2 border-dashed border-black'>
    <p className='flex items-center justify-center gap-1'>
     <span className='bg-secondary font-bold text-black rounded-full py-1 px-2'>
      {availableSeats}
     </span>
     seats
    </p>
    <p>{newDate}</p>
   </div>
   <div className='flex justify-around items-center'>
    <button
     onClick={handleDelete}
     className='bg-red-500 text-white py-1 px-3'
     disabled={deleteStatus}
    >
     {deleteStatus ? "Deleting..." : "Delete"}
    </button>
    <Link
     href={`/dashboard/events/edit/${id}`}
     className='text-third py-1 px-3 font-bold hover:bg-secondary ease-in-out transition-colors duration-500'
    >
     Edit
    </Link>
   </div>
  </div>
 );
};

export default AdminEventCard;
