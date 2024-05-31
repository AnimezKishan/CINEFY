import axios from '../../utils/Axios';
import React,{ useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import noimage from '../../assets/no-img.jpg'

const TopNav = () => {
  const [query, setQuery] = useState('');
  const [searches, setSearches] = useState(null);
  const inputRef = useRef(null);
  //const noImage = "https://images.unsplash.com/photo-1652077859695-de2851a95620?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  const getSearches = async()=> {
    try {
      const { data } = await axios.get(`/search/multi?query=${query}`);
      setSearches(data.results);
      // console.log(data.results);
    } 
    catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getSearches();
  }, [query])

  return (
    <>
    <div className="main w-full h-[10vh] flex items-center justify-center relative bg-transparent z-40">
        <div data-title="🔍" className="input-wrapper w-[90%] sm:w-[70%] h-fit relative group">
            <input ref={inputRef} onChange={(e)=> setQuery(e.target.value)} className='w-[100%] shadow-sm placeholder:italic rounded-full px-6 py-3 bg-[#303030] focus:outline-none focus:border-[#6556CD] focus:ring-[#6556CD] focus:ring-[2px] text-white ' placeholder='Search...' input="text" />
            <i onClick={()=> {
              inputRef.current.value = "";
              setQuery('');
            }} 
              className={`ri-close-line absolute top-1/2 -translate-y-1/2 right-5 text-white text-2xl opacity-100 sm:right-0 sm:opacity-0 sm:group-hover:opacity-100 sm:group-hover:duration-300 sm:group-hover:right-5 cursor-pointer ${(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) && (query.length > 0 ? 'block' : 'hidden')}`}>
            </i>
        </div>
        <div className='w-[85%] sm:w-[60%] max-h-[50vh] bg-[#303030] absolute top-[80%] sm:top-[90%] rounded-sm overflow-y-scroll'>
          {
            searches && searches.map((search, index)=>(
              <Link to={`/${search.media_type}/details/${search.id}`} key={index} className='w-full h-[35%] sm:h-[40vh] flex flex-col px-8 sm:py-3 hover:bg-[#242323] duration-300'>
                <div className="item-wrapper w-[95%] h-full flex gap-5 justify-start items-center border-b-2 border-[#6556CD] py-2 px-2">
                  <img className="sm:h-full w-[133px] object-cover rounded-lg" src={ search.poster_path ?? search.profile_path ? `https://image.tmdb.org/t/p/w500/${search.poster_path ?? search.profile_path}` : noimage} alt="" />
                  <span className='text-2xl text-white font-semibold'>
                    {
                      (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                      ? (search.name ?? search.title).length > 25 ? `${(search.name ?? search.title).slice(0, 25)}...` : (search.name ?? search.title)
                      : (search.name ?? search.title)
                    }
                  </span>
                </div>
              </Link>
            ))
          }
        </div>
    </div>
    </>
  )
}

export default TopNav