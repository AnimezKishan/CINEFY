import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, Outlet, useParams } from 'react-router-dom'
import { loadTvAction, removeTV } from '../store/actions/tvActions';
import Loader from './Loader';
import DataNav from './partials/DataNav';
import HorizontalData from './partials/HorizontalData';
import noimage from '../assets/no-img.jpg'

const TvDetails = () => {

  const { id } = useParams();
  const { pathname } =useLocation();
  const dispatch = useDispatch();
  const tvData = useSelector((state)=> state.tv.info);
  console.log(tvData);

  useEffect(()=>{
    dispatch(loadTvAction(id));

    return () => {
      dispatch(removeTV());
    }
  }, [id]);

  return tvData ? (
    <div className='w-full h-screen overflow-y-auto relative'
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${tvData.images[Math.floor(Math.random() * tvData.images.length-1)]?.file_path ?? tvData.detail.backdrop_path})`,
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
    >
      {/* Part 1 - Navigation */}
      <DataNav official={tvData.detail.homepage} imdb={tvData.externalId.imdb_id} wikipedia={tvData.externalId.wikidata_id}/> 
      
      {/* Part 2 - TV Show Details  */}
      <div className="flex sm:gap-8 gap-3 my-6 sm:h-[80vh] justify-center flex-col sm:flex-row">
        <img className="object-cover rounded-md px-14 sm:px-0" src={tvData.detail.poster_path || tvData.detail.backdrop_path ? `https://image.tmdb.org/t/p/w500/${tvData.detail.poster_path ?? tvData.detail.backdrop_path}` : noimage} alt="" />
        <div className="main-data-wrapper flex flex-col justify-around py-4 h-full sm:w-[40%] text-white text-xl px-7 sm:px-0 gap-4 sm:gap-0">
          <h1 className='font-semibold text-5xl'>{tvData.detail.original_title ?? tvData.detail?.name ?? tvData.detail?.original_name}</h1>
          <p>{tvData.detail.first_air_date.slice(0, 4)}</p>
          <div className="runtime-genre flex gap-3 items-center leading-none font-light">
            <p className='text-nowrap'>Seasons: {tvData.detail.number_of_seasons}</p>
            <p className='text-5xl sm:text-3xl'>|</p>
            <p className='font-medium max-w-[65%]'>
              {
                tvData.detail.genres.map((genre, index)=> {
                  if(tvData.detail.genres.length-1 != index)
                    return `${genre.name}, `
                  else
                    return `${genre.name}`
                })
              }
            </p>
          </div>
          <div className="rating flex gap-1 items-end text-base">
            <p className='text-4xl'><i className="ri-star-fill text-yellow-400"></i> {tvData.detail.vote_average.toFixed(1)}</p>
            <p>/</p>
            <p>10</p>
          </div>
          <p className='w-[95%]'>{tvData.detail.overview.length > 400 ? `${tvData.detail.overview.slice(0, 400)}...` : `${tvData.detail.overview}`}</p>
          <div className="trailer-streaming flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between items-center w-[90%] order-[-1] sm:order-none">
            <Link to={`${pathname}/trailer`}><button className='bg-[#6556CD] w-fit py-3 px-5 rounded-lg shadow-[-1px_8px_129px_1px_#6226cd]'><i className="ri-play-fill"></i> Watch Trailer</button></Link>
            {
              tvData?.watchProviders?.flatrate && <div className="streaming flex leading-none gap-3 items-center">
                <p className='text-base sm:text-sm uppercase '>Streaming: </p>
                {
                  tvData.watchProviders.flatrate.map((provider, index)=> {
                  if(index <= 3)
                    return <img key={index} className="h-[7vh] rounded-lg" src={`https://image.tmdb.org/t/p/original/${provider.logo_path}`}></img>
                })
                }
              </div>
            }
          </div>
        </div>
      </div>

      {/* Part 3 - Cast */}
      {
        tvData.credits.length > 0 && (
          <>
            <div className="trending-header w-full h-[10vh] flex items-center justify-between px-[2%] mt-12">
              <h1 className='flex gap-2 relative text-white text-3xl after:content-[""] after:h-[2px] after:w-[107%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'>Cast</h1>
            </div>
            <HorizontalData data={tvData.credits} />
          </>
        )
      }

      {/* Part 4 - Seasons */}
      {
        tvData.detail?.seasons.length > 0 && (
          <>
          <div className="trending-header w-full h-[10vh] flex items-center justify-between px-[2%] mt-12">
            <h1 className='flex gap-2 relative text-white text-3xl after:content-[""] after:h-[2px] after:w-[107%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'>{tvData.detail.seasons.length > 1 ? "Seasons" : "Season"}</h1>
          </div>
          <HorizontalData data={tvData.detail.seasons} tvId={tvData.detail.id}/>
          </>
        )
      }

      {/* Part 5 - Recommendations and Similar */}
      {
        tvData.recommendations.length > 0 ? (
        <>
          <div className="trending-header w-full h-[10vh] flex items-center justify-between px-[2%] mt-12">
            <h1 className='flex gap-2 relative text-white text-3xl after:content-[""] after:h-[2px] after:w-[107%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'>Recommendations</h1>
          </div>
          <HorizontalData data={tvData.recommendations}/>
        </>
        ) :
        tvData.recommendations.length > 0 ? (
        <>
          <div className="trending-header w-full h-[10vh] flex items-center justify-between px-[2%] mt-10">
            <h1 className='flex gap-2 relative text-white text-3xl after:content-[""] after:h-[2px] after:w-[107%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'>Similar Movies</h1>
          </div>
          <HorizontalData data={tvData.similar}/>
        </>
        ) : <></>
      }

      <Outlet/>
    </div>
  ) : <Loader/>
}

export default TvDetails