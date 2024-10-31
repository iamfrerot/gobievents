"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

const EditEventPage = () => {
 const router = useRouter();
 const params = useParams();

 const { id } = params;
 const [formData, setFormData] = useState({
  title: "",
  description: "",
  date: "",
  availableSeats: 0,
 });
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(true);

 useEffect(() => {
  const fetchEventData = async () => {
   try {
    const response = await fetch(`/api/events/edit/${id}`);
    if (!response.ok) throw new Error("Failed to fetch event data");
    const data = await response.json();
    const formattedDate = data.date
     ? new Date(data.date).toISOString().split("T")[0]
     : "";

    setFormData({
     title: data.title,
     description: data.description,
     date: formattedDate,
     availableSeats: data.availableSeats,
    });
   } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
   } finally {
    setLoading(false);
   }
  };

  fetchEventData();
 }, [id]);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
   const response = await fetch(`/api/events/edit/update/${params.id}`, {
    method: "PUT",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   const data = await response.json();

   if (!response.ok) {
    throw new Error(data.error || "Failed to update event");
   } else {
    alert("Event Updated");
    router.replace("/dashboard");
   }
  } catch (err) {
   setError(err instanceof Error ? err.message : "An error occurred");
  } finally {
   setLoading(false);
  }
 };

 const handleCancel = () => {
  router.back();
 };

 if (loading)
  return (
   <div className='flex items-center justify-center h-[70vh]'>
    <h1 className='font-drunk'>Loading...</h1>
   </div>
  );

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

   <div className='flex justify-between w-[70%] max-w-[70%] mt-5'>
    <button
     type='submit'
     className={`bg-black text-white py-2 px-4 rounded-lg font-semibold ${
      loading ? "opacity-50 cursor-not-allowed" : ""
     }`}
     disabled={loading}
    >
     {loading ? "Updating..." : "Update"}
    </button>

    <button
     type='button'
     onClick={handleCancel}
     className='bg-third text-white py-2 px-4 rounded-lg font-semibold'
    >
     Cancel
    </button>
   </div>
  </form>
 );
};

export default EditEventPage;
