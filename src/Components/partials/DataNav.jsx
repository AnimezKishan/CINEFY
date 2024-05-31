import React from 'react'
import { useNavigate } from 'react-router-dom'

const DataNav = ({official, imdb, wikipedia}) => {
  const navigate = useNavigate();
  return (
    <div className='w-full h-[13vh] flex justify-between items-center px-[2%]'>
        <div className="back-home-wrapper flex gap-2 sm:gap-6 text-2xl sm:text-xl text-[#fff]">
          <button onClick={()=>navigate(-1)} className='px-3 py-2 font-semibold rounded-[50%] hover:bg-[#303030] duration-300'><i className="ri-arrow-left-line"></i></button>
          <button onClick={()=>navigate('/')} className='px-3 py-2 font-semibold rounded-[50%] hover:bg-[#303030] duration-300'><i className="ri-home-line"></i></button>
        </div>
        <div className="data-wrapper w-fit h-full flex items-center gap-6 sm:gap-8 text-2xl sm:text-xl text-white">
            <a href={official ? `${official}` : `https://cinefy-webapp.netlify.app/`} target='_blank'><i className="hover:text-yellow-300 duration-200 ri-external-link-fill"></i></a>
            <a href={wikipedia ? `https://www.wikidata.org/wiki/${wikipedia}` : `https://cinefy-webapp.netlify.app/`} target='_blank'><i className='font-serif hover:text-yellow-300 duration-200 '>W</i></a>
            <a href={imdb ? `https://www.imdb.com/title/${imdb}` : `https://cinefy-webapp.netlify.app/`} target='_blank'><i className='hover:text-yellow-300 duration-200 tracking-wider '>IMDb</i></a>
        </div>
    </div>
  )
}

export default DataNav