"use client";
import { useEffect, useState } from "react";
import EventCard from "./EventCard";

export interface IEvent {
 _id: string;
 title: string;
 description: string;
 date: Date;
 availableSeats: number;
 categories: string[];
 bookings: string[];
}

const Eventswrapper = ({ user }: { user: { role: string; id: string } }) => {
 const [events, setEvents] = useState<IEvent[]>([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState("");
 useEffect(() => {
  const fetchEvents = async () => {
   try {
    const response = await fetch("/api/events");
    const data = await response.json();
    setEvents(data);
   } catch (error: any) {
    console.error("Error fetching events:", error);
    setError(error.message);
   } finally {
    setLoading(false);
   }
  };

  fetchEvents();
 }, []);
 if (loading)
  return (
   <div className=' flex items-center justify-center h-screen'>
    <h1 className='font-drunk'>Loading...</h1>
   </div>
  );
 if (error)
  return (
   <div className=' flex items-center justify-center h-screen'>
    <h1 className='font-drunk text-red-500'>{error}</h1>
   </div>
  );
 return (
  <div className='px-10 py-20 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 bg-white'>
   {events.map((event) => (
    <EventCard
     availableSeats={event.availableSeats}
     date={event.date.toLocaleString()}
     description={event.description}
     id={event._id}
     title={event.title}
     key={event._id}
     bookings={event.bookings}
     userId={user?.id}
    />
   ))}
  </div>
 );
};

export default Eventswrapper;
