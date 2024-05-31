import React from 'react'
import { Link } from 'react-router-dom'
import animationGif from '/animation.gif'

const Sidenav = () => {
  return (
    <div className="sidebar fixed z-[1000] flex-row w-full h-[8vh] items-center bottom-0 bg-[#171717] sm:bg-transparent sm:relative sm:w-[5%] 2xl:w-[4%] sm:h-screen sm:flex sm:flex-col sm:items-center justify-between py-4 text-3xl text-[#6556CD] border-t-[.5px] sm:border-t-0 sm:border-r-[.5px] border-[#6556CD]">
        <Link><img className='hidden sm:block' src={animationGif} alt="" /></Link>
        <div className="btns flex justify-around sm:justify-normal sm:flex-col sm:gap-4">
            <Link to='/trending'><i data-title="Trending" className="ri-fire-fill px-3 py-2 z-[70] rounded-[50%] hover:bg-[#6556CD] hover:text-[white] transition-all duration-200 ease-in-out relative after:absolute after:left-[120%] after:content-[attr(data-title)] after:px-5 after:py-2 after:rounded-full after:top-0 after:bg-[#6556CD] after:text-white after:opacity-0 hover:after:opacity-100 after:text-nowrap after:pointer-events-none"></i></Link>
            <Link to='/popular'><i data-title="Popular" className="ri-bard-fill px-3 py-2 z-[70] rounded-[50%] hover:bg-[#6556CD] hover:text-[white] transition-all duration-200 ease-in-out relative after:absolute after:left-[120%] after:content-[attr(data-title)] after:px-5 after:py-2 after:rounded-full after:top-0 after:bg-[#6556CD] after:text-white after:opacity-0 hover:after:opacity-100 after:text-nowrap after:pointer-events-none"></i></Link>
            <Link to='/movies'><i data-title="Movies" className="ri-movie-2-fill px-3 py-2 z-[70] rounded-[50%] hover:bg-[#6556CD] hover:text-[white] transition-all duration-200 ease-in-out relative after:absolute after:left-[120%] after:content-[attr(data-title)] after:px-5 after:py-2 after:rounded-full after:top-0 after:bg-[#6556CD] after:text-white after:opacity-0 hover:after:opacity-100 after:text-nowrap after:pointer-events-none"></i></Link>
            <Link to='/tv'><i data-title="TV Shows" className="ri-slideshow-3-fill px-3 py-2 z-[70] rounded-[50%] hover:bg-[#6556CD] hover:text-[white] transition-all duration-200 ease-in-out relative after:absolute after:left-[120%] after:content-[attr(data-title)] after:px-5 after:py-2 after:rounded-full after:top-0 after:bg-[#6556CD] after:text-white after:opacity-0 hover:after:opacity-100 after:text-nowrap after:pointer-events-none"></i></Link>
            <Link to='/people'><i data-title="People" className="ri-team-fill px-3 py-2 z-[70] rounded-[50%] hover:bg-[#6556CD] hover:text-[white] transition-all duration-200 ease-in-out relative after:absolute after:left-[120%] after:content-[attr(data-title)] after:px-5 after:py-2 after:rounded-full after:top-0 after:bg-[#6556CD] after:text-white after:opacity-0 hover:after:opacity-100 after:text-nowrap after:pointer-events-none"></i></Link>
            {/* <Link><i data-title="Content Providers" className="ri-clapperboard-fill px-3 py-2 z-[70] rounded-[50%] hover:bg-[#6556CD] hover:text-[white] transition-all duration-200 ease-in-out relative after:absolute after:left-[120%] after:content-[attr(data-title)] after:px-5 after:py-2 after:rounded-full after:top-0 after:bg-[#6556CD] after:text-white after:opacity-0 hover:after:opacity-100 after:text-nowrap after:pointer-events-none"></i></Link> */}
        </div>
    </div>
  )
}

export default Sidenav