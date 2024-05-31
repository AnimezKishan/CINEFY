import React from 'react'
import Loader from '../Loader'
import { Link } from 'react-router-dom'

const Header = ({data}) => {
  //console.log(data);
  return (
    data ? (
    <swiper-container speed="500" css-mode="true" navigation="true" pagination="true" loop="true" autoplay-delay="5500" autoplay-disable-on-interaction="true">
        {
            data.map((trendingData)=> (
                <swiper-slide key={trendingData.id} className="trending-wrapper w-full h-full relative"> 
                    <img className="w-full h-full object-cover" src={`https://image.tmdb.org/t/p/original/${trendingData.backdrop_path}`} alt="" />
                    <div className='w-full h-full bg-gradient-to-t from-[#000000e1] from-30% to-transparent absolute top-0 left-0'></div>
                    <div className="trending-items absolute text-white left-10 sm:left-40 bottom-10 flex flex-col gap-2 sm:gap-5">
                        <p className='font-bold text-xl sm:text-2xl flex gap-3'><i className="ri-star-fill text-yellow-400"></i> {trendingData.vote_average.toFixed(1)}</p>
                        <h1 className='font-extrabold text-4xl sm:text-6xl w-[80%] sm:w-full '>{trendingData.name ?? trendingData.title}</h1>
                        <p className='w-[70%] sm:w-1/2 leading-none font-medium sm:font-light'>
                            {
                                (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ?
                                trendingData.overview.length > 70 ? (<span>{`${trendingData.overview.slice(0, 70)}...`} <Link to={`/${trendingData.media_type}/details/${trendingData.id}`}><span className='text-blue-600 cursor-pointer'>more</span></Link></span>) : trendingData.overview
                                : trendingData.overview.length > 160 ? (<span>{`${trendingData.overview.slice(0, 160)}...`} <Link to={`/${trendingData.media_type}/details/${trendingData.id}`}><span className='text-blue-600 cursor-pointer'>more</span></Link></span>) : trendingData.overview
                            }
                        </p>
                        <Link to={`/${trendingData.media_type}/details/${trendingData.id}/trailer`}><button className='bg-[#6556CD] w-fit py-1 sm:py-2 px-3 sm:px-4 rounded-full shadow-[-1px_8px_129px_1px_#6226cd]'>Watch Trailer</button></Link>
                    </div>
                </swiper-slide>
            ))
        }
    </swiper-container>
    ) : <Loader/>
  )
}

export default Header