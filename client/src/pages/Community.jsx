import { useAuth, useUser } from '@clerk/clerk-react';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyPublishedCreationData } from '../assets/assets';
import { Heart } from 'lucide-react';
import axios from 'axios'
import toast from 'react-hot-toast';



axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const Community = () => {

  const [creations, setCreations] = useState([]);
  const {user}=useUser();

  const [loading, setLoading] = useState(true)
  const {getToken}= useAuth()

  const fetchCreations = async () => {
    try {
      const {data}=await axios.get('/api/user/get-published-creations',{
        headers: {Authorization: `Bearer ${await getToken()}`}
      })

      if(data.success){
        setCreations(data.creations)
      }
      else{
        toast.error(data.message)
      }
    } catch (error) { 
      toast.error(error.message)
    }


    setLoading(false);
  }

  const imageLikeToggle=async (id)=>{
    try {
      const {data}=await axios.post('/api/user/toggle-like-creations',{id}, {
        headers : {Authorization : `Bearer ${await getToken()}`}
      })

      if(data.success){
        toast.success(data.message)
        await fetchCreations()
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
   if(user){
    fetchCreations();
   }
  }, [user])
  
  return !loading ? (
  <div className='flex-1 h-full flex flex-col gap-4 p-6'>
    <h2 className='text-2xl font-bold'>Community Creations</h2>
    <div className='bg-white h-full w-full rounded-xl overflow-y-scroll p-4'>
      {creations.length === 0 ? (
        <div className='flex justify-center items-center h-full'>
          <p className='text-gray-500 text-lg'>No published creations found.</p>
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {creations.map((creation) => (
            <div key={creation.id} className='relative group'>
              <img 
                src={creation.content} 
                alt={creation.prompt || "AI Creation"} 
                className='w-full h-64 object-cover rounded-lg'
                onError={(e) => {
                  console.error('Image failed to load:', creation.content);
                  e.target.style.display = 'none';
                }}
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg'>
                <div className='absolute bottom-0 left-0 right-0 p-4 text-white'>
                  <p className='text-sm mb-2'>{creation.prompt}</p>
                  <div className='flex gap-1 items-center justify-end'>
                    <p>{creation.likes ? creation.likes.length : 0}</p>
                    <Heart 
                      onClick={() => imageLikeToggle(creation.id)} 
                      className={`min-w-5 h-5 hover:scale-110 cursor-pointer ${
                        creation.likes && creation.likes.includes(user?.id?.toString()) 
                          ? 'fill-red-500 text-red-600' 
                          : 'text-white'
                      }`}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
) : (
  <div className='flex justify-center items-center h-full'>
    <div className='w-10 h-10 my-1 rounded-full border-2 border-purple-500 border-t-transparent animate-spin'></div>
  </div>
)

}


export default Community