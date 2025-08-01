import { Scissors, Sparkles } from 'lucide-react';
import React, { useState } from 'react';
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const RemoveObject = () => {
  const [input, setInput] = useState('');
  const [object, setObject] = useState('');
  const [error, setError] = useState('');


  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken}= useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
          setLoading(true);

           if(object.split(' ').length>1){
            return toast('Please enter only one ebject to be removed')
          }


          const formData= new FormData()
          formData.append('image', input);
          formData.append('object', object);

          const {data}= await axios.post('/api/ai/remove-image-object', formData, { headers : {Authorization : `Bearer ${await getToken()}`}})

        if(data.success){
          setContent(data.content)
        }
        else{
          toast.error(data.message);
        }

        } catch (error) {
          toast.error(error.message)
        }

        setLoading(false)

        
    if (!input) {
      setError('Please upload a valid image.');
      return;
    }
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left Column */}
      <form
        onSubmit={onSubmitHandler}
        className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'
      >
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>

        <p className='mt-6 text-sm font-semibold'>Upload Image</p>

        <input
          type='file'
          required
          accept='image/*'
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
              setInput(file);
              setError('');
            } else {
              setInput('');
              setError('Only image files are supported. Please upload a valid image (jpg, png, etc).');
            }
          }}
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600 cursor-pointer'
        />

        {/* Error Message */}
        {error && ( <p className='text-xs text-red-500 font-medium mt-1'>{error}</p>)}

        <p className='mt-6 text-sm font-semibold'>
          Describe Your Object to Remove
        </p>
        <textarea
          onChange={(e) => setObject(e.target.value)}
          value={object}
          rows={4}
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300'
          placeholder='Describe as you want'
        />

        <button disabled={loading}
          className='w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-5 py-2.5 mt-6 text-sm font-medium rounded-lg shadow-md cursor-pointer'
        >
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
            : (<Scissors className='w-4 h-4' />)
            
          }
          <span>Remove Object</span>
        </button>
      </form>

      {/* Right Column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Scissors className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Processed Image</h1>
        </div>
        {
          !content ? 
          (
             <div className='flex-1 flex justify-center items-center'>
                <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
                  <Scissors className='w-9 h-9 text-[#4A7AFF]' />
                  <p>Upload an image and click "Remove Object" to get started</p>
                </div>
             </div>
          )
          :
          (
             <div className='h-full mt-3'>
                 <img src={content} alt=""  className='w-full h-full'/>
              </div>
          )
        }
       
      </div>
    </div>
  );
};

export default RemoveObject;
