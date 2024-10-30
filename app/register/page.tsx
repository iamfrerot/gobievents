"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const Register = () => {
 const router = useRouter();
 const [formData, setFormData] = useState({
  email: "",
  password: "",
  role: "user" as "user" | "admin",
 });
 const [error, setError] = useState("");
 const [loading, setLoading] = useState(false);

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
   const response = await fetch("/api/register", {
    method: "POST",
    headers: {
     "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
   });

   const data = await response.json();
   if (!response.ok) {
    throw new Error(data.error || "Something went wrong");
   }
   router.push("/login");
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
    <label htmlFor='email' className='text-xl'>
     EMAIL:
    </label>
    <input
     id='email'
     name='email'
     type='email'
     placeholder='EXAMPLE@EMAIL.COM'
     className='h-full flex-1 active:border-none focus:outline-none'
     style={{ caretColor: "#E6680C" }}
     value={formData.email}
     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
     required
    />
   </div>

   <div className='flex flex-col md:flex-row items-center py-4 gap-x-10 border-b border-black w-[70%] max-w-[70%]'>
    <label htmlFor='password' className='text-xl uppercase'>
     PASSWORD:
    </label>
    <input
     id='password'
     type='password'
     name='password'
     placeholder='*********'
     className='h-full flex-1 active:border-none focus:outline-none'
     style={{ caretColor: "#E6680C" }}
     value={formData.password}
     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
     required
    />
   </div>

   <div className='flex items-center w-[70%] max-w-[70%] py-4 gap-x-4'>
    <label htmlFor='role' className='text-xl uppercase'>
     Select Role:
    </label>
    <select
     id='role'
     name='role'
     className='block appearance-none bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded leading-tight focus:outline-none focus:border-third'
     value={formData.role}
     onChange={(e) =>
      setFormData({ ...formData, role: e.target.value as "user" | "admin" })
     }
    >
     <option value='user'>User</option>
     <option value='admin'>Admin</option>
    </select>
   </div>

   <button
    type='submit'
    className={`bg-black text-white py-2 px-4 rounded-lg mt-5 font-semibold w-[70%] max-w-[70%] ${
     loading ? "opacity-50 cursor-not-allowed" : ""
    }`}
    disabled={loading}
   >
    {loading ? "Registering..." : "Register"}
   </button>
  </form>
 );
};

export default Register;
