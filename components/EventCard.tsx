"use client";

import { getSession } from "next-auth/react";
import { useState } from "react";

interface EventCardProps {
 id: string;
 title: string;
 description: string;
 date: string;
 availableSeats: number;
 bookings: string[];
 userId: string;
}

const EventCard: React.FC<EventCardProps> = ({
 id,
 title,
 description,
 date,
 availableSeats,
 userId,
 bookings,
}) => {
 const [seats, setSeats] = useState<number>(availableSeats);
 const newDate = new Date(date).toDateString();
 const [booked, setBooked] = useState(bookings.includes(userId));
 const [bookingStatus, SetBookingStatus] = useState(
  booked ? "Booked" : "Book Your Seat"
 );

 const handleBooking = async () => {
  const session = await getSession();
  if (!session) {
   alert("Please log in to book an event.");
   return;
  }
  SetBookingStatus("Booking...");
  try {
   const response = await fetch(`/api/events/book/${id}`, {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
   });

   const data = await response.json();

   if (response.ok) {
    setSeats(data.availableSeats);
    setBooked(true);
    SetBookingStatus("Booked");
   } else {
    alert(data.message);
    if (data.message === "You have already booked this event.") {
     SetBookingStatus("Booked");
    }
   }
  } catch (error) {
   console.error("Booking error:", error);
   alert("An error occurred. Please try again.");
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
      {seats}
     </span>
     seats
    </p>
    <p>{newDate}</p>
   </div>
   <button
    onClick={handleBooking}
    className={`text-center text-white font-bold py-2 ${
     booked ? "bg-green-600" : "bg-third"
    }`}
   >
    {bookingStatus}
   </button>
  </div>
 );
};

export default EventCard;
