import React from 'react'
import { Link } from 'react-router-dom';
import Dropdown from './Dropdown';
import Loader from '../Loader';
import noimage from '../../assets/no-img.jpg'

const Trending = ({data, setCategory}) => {

  //console.log(data);

  return (
    data ? (
        <div className='w-full h-fit px-4 mt-4'>
            <div className="trending-header w-full h-[10vh] flex items-center justify-between">
                <h1 className='flex gap-2 relative text-white text-xl sm:text-3xl after:content-[""] after:h-[2px] after:w-[110%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'><svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 -960 960 960" width="40"><path d="m136-240-56-56 296-298 160 160 208-206H640v-80h240v240h-80v-104L536-320 376-480 136-240Z"/></svg> Trends Now</h1>
                <Dropdown title="Filter" options={['All', 'TV', 'Movie']} setFunction={setCategory}/>
            </div>
            
                
            <div className="cards-wrapper py-4 flex justify-center sm:justify-around flex-wrap gap-4 pb-[25%] sm:pb-0">
                {
                    data.map((cardData, index)=> (
                        <Link to={`/${cardData.media_type}/details/${cardData.id}`} key={index} className="card w-[40vh] h-[60vh]  rounded-md overflow-hidden mt-10 relative group">
                            <div className='w-full h-full z-20 bg-gradient-to-t from-[#000000b1] from-10% to-transparent absolute top-0 left-0 opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300'></div>
                            <img className="w-full h-full object-contain absolute z-10 scale-[1.1] group-hover:scale-[1.2] group-hover:duration-300" src={ cardData.poster_path ?? cardData.profile_path ? `https://image.tmdb.org/t/p/w500/${cardData.poster_path ?? cardData.profile_path}` : noimage} alt="" />
                            {/* <img className="w-full h-full object-cover object-center blur-sm absolute" src={`https://image.tmdb.org/t/p/original/${cardData.backdrop_path}`} alt="" /> */}
                            <div className="card-info absolute bottom-2 px-4 sm:px-2 w-full opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300 z-30">
                                <h1 className='text-white font-semibold text-5xl sm:text-3xl'>{cardData.title ? cardData.title.length > 20 ? `${cardData.title.slice(0, 20)}...` : cardData.title : cardData.name.length > 20 ? `${cardData.name.slice(0, 20)}...` : cardData.name}</h1>
                                <div className="info-flex text-white flex justify-between text-base sm:text-sm items-center">
                                    <p>{cardData.first_air_date ? cardData.first_air_date.slice(0, 4) : cardData.release_date.slice(0, 4)}</p>
                                    {(cardData.vote_average != 0) && <p><i className="ri-star-fill text-yellow-400"></i> {cardData.vote_average.toFixed(1)}</p>}
                                </div>
                            </div>
                        </Link>
                    ))
                }
            </div>
        </div>
    ) : <Loader/>
  )
}

export default Trending