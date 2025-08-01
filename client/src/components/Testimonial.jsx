import { assets } from "../assets/assets"

const Testimonial = () => {
const dummyTestimonialData = [
    {
        image: "https://randomuser.me/api/portraits/men/69.jpg",
        name: 'Aarav Sharma',
        title: 'Marketing Manager, Infosync Pvt. Ltd.',
        content: 'ContentAI has streamlined our marketing efforts. It generates quality content quickly, which saves us both time and cost.',
        rating: 5,
    },
    {
        image: "https://randomuser.me/api/portraits/women/8.jpg",
        name: 'Ishita Verma',
        title: 'Senior Content Strategist, CreativeMantra',
        content: 'The AI tools provided by ContentAI are a game-changer. We are able to maintain consistency and creativity effortlessly.',
        rating: 3,
    },
    {
        image: "https://randomuser.me/api/portraits/men/23.jpg",
        name: 'Rohan Mehta',
        title: 'Content Lead, BharatTech Solutions',
        content: 'We’ve integrated ContentAI into our workflow, and the boost in productivity is phenomenal. It’s like having an extra team member.',
        rating: 5,
    },
    {
        image: "https://randomuser.me/api/portraits/women/65.jpg",
        name: 'Priya Nair',
        title: 'Social Media Executive, DigitalRise India',
        content: 'ContentAI has made scheduling and writing posts for social media so easy. Highly recommended for growing teams!',
        rating: 4,
    },
    {
        image: "https://randomuser.me/api/portraits/men/35.jpg",
        name: 'Kunal Kapoor',
        title: 'Freelance Blogger',
        content: 'I use ContentAI regularly for my blogs. It’s intuitive, fast, and delivers human-like writing quality every time.',
        rating: 4,
    }
];


    return (
        <div className='px-4 sm:px-20 xl:px-32 py-24'>
            <div className='text-center'>
                <h2 className='text-slate-700 text-[42px] font-semibold'>Loved by Creators</h2>
                <p className='text-gray-500 max-w-lg mx-auto'>Don't just take our word for it. Here's what our users are saying.</p>
            </div>
            <div className='flex flex-wrap mt-10 justify-center'>
                {dummyTestimonialData.map((testimonial, index) => (
                    <div key={index} className='p-8 m-4 max-w-xs rounded-lg bg-[#FDFDFE] shadow-lg border border-gray-100 hover:-translate-y-1 transition duration-300 cursor-pointer'>
                        <div className="flex items-center gap-1">
                           {Array(5).fill(0).map((_,index)=>(<img key={index} src={index < testimonial.rating ? assets.star_icon : assets.star_dull_icon} className='w-4 h-4'/>))}
                        </div>
                        <p className='text-gray-500 text-sm my-5'>"{testimonial.content}"</p>
                        <hr className='mb-5 border-gray-300' />
                        <div className='flex items-center gap-4'>
                            <img src={testimonial.image} className='w-12 object-contain rounded-full' alt='' />
                            <div className='text-sm text-gray-600'>
                                <h3 className='font-medium'>{testimonial.name}</h3>
                                <p className='text-xs text-gray-500'>{testimonial.title}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Testimonial