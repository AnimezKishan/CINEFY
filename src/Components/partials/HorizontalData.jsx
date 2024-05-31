import React from 'react';
import { Link } from 'react-router-dom';
import noimage from '../../assets/no-img.jpg';

const Recommendations = ({data}) => {
    return (
        data ? (
            <div className='w-full h-fit px-[2%] overflow-x-auto'>
                <div className="cards-wrapper w-fit py-4 flex justify-start flex-nowrap gap-8 flex-shrink-0 my-1 sm:my-4">
                    {
                        data.map((cardData, index)=> (
                            <Link to={cardData.media_type ? `/${cardData.media_type}/details/${cardData.id}` : (cardData.cast_id || cardData.credit_id) ? `/person/details/${cardData.id}` : ``} key={index} className="card w-[27vh] sm:w-[30vh] h-[45vh] sm:h-[50vh]  rounded-md overflow-hidden mt-2 relative group">
                                <div className='w-full h-full z-20 bg-gradient-to-t from-[#000000b1] from-10% to-transparent absolute top-0 left-0 opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300'></div>
                                <img className="w-full h-full object-cover absolute z-10 scale-[1.1] group-hover:scale-[1.2] group-hover:duration-300" src={ cardData.poster_path ?? cardData.profile_path ? `https://image.tmdb.org/t/p/w500/${cardData.poster_path ?? cardData.profile_path}` : noimage} alt="" />
                                <div className="card-info absolute bottom-2 px-4 sm:px-2 w-full opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300 z-30">
                                    {cardData.job && <h1 className='w-full text-left text-xl sm:text-base font-semibold'><i className="ri-clapperboard-line"></i>: {cardData.job}</h1>}
                                    <h1 className='text-white font-semibold text-4xl sm:text-3xl'>{cardData.title ? cardData.title.length > 20 ? `${cardData.title.slice(0, 20)}...` : cardData.title : cardData.name.length > 20 ? `${cardData.name.slice(0, 20)}...` : cardData.name}</h1>
                                    <div className="info-flex text-white flex justify-between text-bse sm:text-sm items-center">
                                        <p>{cardData.first_air_date ? cardData.first_air_date.slice(0, 4) : cardData.release_date ? cardData.release_date.slice(0, 4) : cardData?.air_date?.slice(0, 4)}</p>
                                        {(cardData.vote_average && cardData.vote_average != 0) ? <p><i className="ri-star-fill text-yellow-400"></i> {cardData.vote_average.toFixed(1)}</p> : <></>}
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

export default Recommendations