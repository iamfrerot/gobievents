"use client";
import { useEffect, useState } from "react";
import { IEvent } from "./Eventswrapper";
import AdminEventCard from "./AdminEventCard";

const AdminEventswrapper = ({ userId }: { userId: string }) => {
 const [events, setEvents] = useState<IEvent[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");

 const fetchEvents = async () => {
  try {
   const response = await fetch(`/api/events/${userId}`);
   const data = await response.json();
   if (!response.ok) {
    throw new Error(data.message);
   }
   setEvents(data);
  } catch (error: any) {
   console.error("Error fetching events:", error);
   setError(error.message);
  } finally {
   setLoading(false);
  }
 };

 useEffect(() => {
  fetchEvents();
 }, []);
 if (loading)
  return (
   <div className=' flex items-center justify-center h-[70vh]'>
    <h1 className='font-drunk'>Loading...</h1>
   </div>
  );
 if (error)
  return (
   <div className=' flex items-center justify-center h-[70vh]'>
    <h1 className='font-drunk text-red-500'>{error}</h1>
   </div>
  );
 return (
  <div className='p-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 border border-dashed border-black rounded-md mt-4 '>
   {events.map((event) => (
    <AdminEventCard
     availableSeats={event.availableSeats}
     date={event.date.toLocaleString()}
     description={event.description}
     id={event._id}
     title={event.title}
     key={event._id}
     bookings={event.bookings}
     reFetch={fetchEvents}
    />
   ))}
  </div>
 );
};

export default AdminEventswrapper;
