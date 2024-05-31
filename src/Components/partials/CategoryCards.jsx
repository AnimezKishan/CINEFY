import React from 'react'
import { Link } from 'react-router-dom';
import noimage from '../../assets/no-img.jpg'

const CategoryCards = ({data, cardType}) => {
  //console.log(cardType, data);

  return (
    data && <div className='w-full h-full py-4 flex justify-center sm:justify-between flex-wrap gap-4 px-[5%] bg-[#171717]'>
        {
            data.map((cardData, index)=> (
                <Link to={`/${cardType ?? cardData.media_type}/details/${cardData.id}`} key={index} className="card w-[45vh] h-[65vh] rounded-md overflow-hidden mt-8 relative group">
                    <div className='w-full h-full z-20 bg-gradient-to-t from-[#000000b1] from-10% to-transparent absolute top-0 left-0 opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300'></div>
                    <img className="w-full h-full object-contain absolute z-10 scale-[1.1] group-hover:scale-[1.2] group-hover:duration-300" src={  cardData.poster_path ?? cardData.backdrop_path ?? cardData.profile_path ? `https://image.tmdb.org/t/p/w500/${ cardData.poster_path ?? cardData.backdrop_path ?? cardData.profile_path}` : noimage} alt="" />
                    <div className="card-info absolute bottom-2 px-4 sm:px-2 w-full opacity-100 sm:opacity-0 group-hover:opacity-100 duration-300 z-30">                        
                        <h1 className='text-white font-semibold text-5xl sm:text-4xl'>{cardData.title ? cardData.title.length > 20 ? `${cardData.title.slice(0, 20)}...` : cardData.title : cardData.name.length > 20 ? `${cardData.name.slice(0, 20)}...` : cardData.name}</h1>                        
                        <div className="info-flex text-white flex justify-between text-base sm:text-sm items-center">
                            { (cardData.first_air_date || cardData.release_date) && <p>{cardData.first_air_date ? cardData.first_air_date.slice(0, 4) : cardData.release_date.slice(0, 4)}</p> }
                            { (cardData.vote_average && cardData.vote_average != 0) &&<p><i className="ri-star-fill text-yellow-400"></i> {cardData.vote_average.toFixed(1)}</p>}
                        </div>
                    </div>
                </Link>
            ))
        }
    </div>
  )
}

export default CategoryCards