import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, blog_data, comments_data } from '../assets/assets';
import NavBar from '../components/NavBar';
import Moment from 'moment';
import Footer from '../components/Footer';
import Loader from '../components/Loader';

const Blog = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [comments,setComments]=useState([]);

  const [name,setName]=useState('');
  const [content,setContent]=useState('')


  const fetchBlogData=async()=>{
    const data=blog_data.find(item=> item._id ===id)
    setData(data)
  }

  const fetchComments=async()=>{
    setComments(comments_data)
  }

  const addComment=async(e)=>{
    e.preventDefault();
  }

  useEffect(() => {
    const fetchBlogData = async () => {
      const blog = blog_data.find(item => item._id === id);
      setData(blog);
    };

    fetchBlogData();
    fetchComments();
  }, [id]);

  return data ? (
    <div className="relative">
      <img
        src={assets.gradientBackground}
        alt=""
        className="absolute -top-50 -z-10 opacity-50"
      />
      <NavBar />

      <div className="relative z-10 p-4 sm:p-10 text-center">
        <p className="text-sm text-gray-500">
          Published on {Moment(data.createdAt).format('MMMM Do YYYY')}
        </p>
        <h1 className="text-2xl sm:text-5xl font-semibold max-w-2xl mx-auto text-gray-800">
          {data.title}
        </h1>
        <h2 className="my-5 max-w-lg truncate mx-auto text-gray-600">
          {data.subtitle}
        </h2>
        <p className="text-sm text-gray-500">by Michael Brown</p>
      </div>

      <div className='mx-5 max-w-5xl md:mx-auto my-10 mt-6'
>
      <img src={data.image} alt="" className='rounded-3xl mb-5'></img>
      <div className='rich-text max-w-3xl mx-auto' dangerouslySetInnerHTML={{ __html: data.description }} />

      </div>
      {/* Comments  */}
      <div className='mt-14 mb-10 max-w-3xl mx-auto'>
        <p>Comments({comments.length})</p>
        <div className='flex flex-col gap-4'>
          {comments.map((item,index)=>(
            <div key={index} className='relative bg-primary/2 border border-primary/5 max-w-xl p-4 rounded text-gray-600'>
                <div>
                  <img src={assets.user_icon} alt="" className='w-6'/>
                  <p className='font-medium'>{item.name}</p>
                </div>
                <p className='text-sm max-w-md ml-8'>{item.content}</p>
                <div className='absolute right-4 bottom-3 flex items-center  gap-2 text-xs'>{Moment(item.createdAt).fromNow()}</div>
            </div>
          ))}

        </div>
      </div>
      <div className='w max-w-3xl mx-auto'>
        <p className='font-semibold mb-4'>Add your comment</p>
        <form onSubmit={addComment} className='flex flex-col items-start gap-4 max-w-lg'>
          <input onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder='Name' required className='w-full p-2 border bprder-gray-300 rounded outline-none'/>

          <textarea onChange={(e)=>setContent(e.target.value)} value={content} name="" id=""n placeholder='Comment' className='w-full p-2 border border-gray-300 rounded outline-none h-48 required'></textarea>
          <button type="submit" className='bg-primary text-white rounded p-2 px-8 hover:scale-102 transition-all cursor-pointer'>Submit</button>
        </form>
      </div>
      {/*Share Buttons */}
      <div className='my-24 max-w-3xl mx-auto'>
        <p className='font-semibold my-4' > Share this article on social media </p> 

      </div>
      <div className='flex gap-6 mx-1000'>
        <img src={assets.facebook_icon} width={50} alt=""/>
        <img src={assets.twitter_icon} width={50} alt=""/>
        <img src={assets.googleplus_icon} width={50} alt=""/>
       
      </div>
      <Footer/>
    </div>
  ) : (
    <Loader/>
  );
};

export default Blog;
