"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddNewEvent = () => {
 const [formData, setFormData] = useState({
  title: "",
  description: "",
  date: "",
  availableSeats: 0,
 });
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);
 const router = useRouter();

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
   console.log(formData);
   const response = await fetch("/api/events/new", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
   } else {
    alert("Event Created");
    router.replace("/dashboard");
   }
  } catch (err) {
   setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
   setLoading(false);
  }
 };

 return (
  <form
   onSubmit={handleSubmit}
   className='flex flex-col justify-center items-center h-screen w-screen md:p-20'
  >
   {error && (
    <div className='bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-[70%] max-w-[70%]'>
     {error}
    </div>
   )}

   <div className='flex flex-col md:flex-row items-center py-4 gap-x-10 border-t border-b border-black w-[70%] max-w-[70%]'>
    <label htmlFor='title' className='text-xl'>
     Title:
    </label>
    <input
     id='title'
     name='title'
     type='text'
     placeholder='Next Config 24'
     className='h-full flex-1 active:border-none focus:outline-none'
     style={{ caretColor: "#E6680C" }}
     value={formData.title}
     onChange={(e) => setFormData({ ...formData, title: e.target.value })}
     required
    />
   </div>

   <div className='flex flex-col md:flex-row items-center py-4 gap-x-10 border-b border-black w-[70%] max-w-[70%]'>
    <label htmlFor='description' className='text-xl'>
     Description:
    </label>
    <textarea
     id='description'
     name='description'
     className='h-full flex-1 active:border-none focus:outline-none'
     style={{ caretColor: "#E6680C" }}
     value={formData.description}
     onChange={(e) => setFormData({ ...formData, description: e.target.value })}
     required
    ></textarea>
   </div>

   <div className='flex items-center w-[70%] max-w-[70%] py-4 gap-x-4'>
    <label htmlFor='date' className='text-xl'>
     Select Date:
    </label>
    <input
     type='date'
     id='date'
     value={formData.date}
     onChange={(e) => setFormData({ ...formData, date: e.target.value })}
     required
    />
   </div>

   <div className='flex flex-col md:flex-row items-center py-4 gap-x-10 border-b border-black w-[70%] max-w-[70%]'>
    <label htmlFor='availableSeats' className='text-xl'>
     Available Seats:
    </label>
    <input
     id='availableSeats'
     name='availableSeats'
     type='number'
     min='0'
     placeholder='0'
     className='h-full flex-1 active:border-none focus:outline-none'
     style={{ caretColor: "#E6680C" }}
     value={formData.availableSeats}
     onChange={(e) =>
      setFormData({ ...formData, availableSeats: Number(e.target.value) })
     }
     required
    />
   </div>

   <button
    type='submit'
    className={`bg-black text-white py-2 px-4 rounded-lg mt-5 font-semibold w-[70%] max-w-[70%] ${
     loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={loading}
   >
    {loading ? "Creating..." : "Create"}
   </button>
  </form>
 );
};

export default AddNewEvent;
