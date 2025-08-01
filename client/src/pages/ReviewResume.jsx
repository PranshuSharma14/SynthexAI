import { FileText, Sparkles } from 'lucide-react';
import React, { useRef, useState } from 'react';
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown';


axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


const ReviewResume = () => {
  const [input, setInput] = useState(null);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null); 

  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const {getToken}= useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!input) {
      setError('Please upload a valid PDF file.');
      return;
    }

    try {

      setLoading(true);

          const formData= new FormData()
          formData.append('resume', input);

          const {data}= await axios.post('/api/ai/resume-review', formData, { headers : {Authorization : `Bearer ${await getToken()}`}})

        if(data.success){
          setContent(data.content)
        }
        else{
          toast.error(data.message);
        }

      
    } catch (error) {
      toast.error(error.message)
    }

    setLoading(false);

  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file && file.type !== 'application/pdf') {
      setError('Invalid format. Only PDF files are allowed.');
      setInput(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; 
      }
    } else {
      setError('');
      setInput(file);
    }
  };

  return (
    <div className='h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700'>
      {/* Left Column */}
      <form onSubmit={onSubmitHandler} className='w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200'>
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#8E37EB]' />
          <h1 className='text-xl font-semibold'>Resume Review</h1>
        </div>

        <p className='mt-6 text-sm font-semibold'>Upload Resume</p>

        <input
          ref={fileInputRef} 
          required
          onChange={handleFileChange}
          type='file'
          accept='application/pdf'
          className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 text-gray-600 cursor-pointer'
        />

        {error && <p className='text-xs text-red-500 mt-1'>{error}</p>}

        <p className='text-xs text-gray-500 font-light mt-1'>
          Supports .pdf files only
        </p>

        <button
          type='submit'
          className='w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-95 transition-all text-white px-5 py-2.5 mt-6 text-sm font-medium rounded-lg shadow-md cursor-pointer'
        >

          {loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span>
           :
            <FileText className='w-4 h-4' />
          }
          
          <span>Review Resume</span>
        </button>
      </form>

      {/* Right Column */}
      <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold'>Analysis Result</h1>
        </div>


      {
        !content ? 
        (
          <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-500'>
            <FileText className='w-9 h-9 text-[#4A7AFF]' />
            <p>Upload your resume and click "Review Resume" to get started</p>
          </div>
        </div>
        )
        :
        (
           <div className='h-full mt-3 overflow-y-scroll text-sm text-slate-500'>
                 <div className='reset-tw'>
                    <Markdown>{content}</Markdown>
                 </div>
            </div>
        )
      }
        
      </div>
    </div>
  );
};

export default ReviewResume;
