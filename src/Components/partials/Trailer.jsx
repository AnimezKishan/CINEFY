import React from 'react'
import ReactPlayer from 'react-player'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom'

const Trailer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const key = useSelector((state)=> state[category].info.videos?.key);

  return (
    <div className='absolute top-0 left-0 w-full h-screen bg-[rgba(0,0,0,.8)] flex items-center justify-center z-[200]'>
        <button onClick={()=>navigate(-1)} className='sm:text-2xl text-4xl text-[#fff] px-3 py-2 font-semibold rounded-[50%] hover:bg-[#303030] duration-300 absolute top-[5%] right-[5%]'><i className="ri-close-line"></i></button>
        {
            key ? 
            (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) 
            ? <ReactPlayer width={380} height={380} controls={true} volume={.2} url={`https://www.youtube.com/watch?v=${key}`}/> 
            : <ReactPlayer width={900} height={480} controls={true} volume={.2} url={`https://www.youtube.com/watch?v=${key}`}/> 
            : <h1 className='text-5xl sm:text-7xl text-[#fff] font-bold uppercase'>No Trailer !</h1>
        }
    </div>
  )
}

export default Trailer