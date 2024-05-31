import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom'
import { loadMovieAction, removeMovie } from '../store/actions/movieActions';
import DataNav from './partials/DataNav';
import Loader from './Loader';
import HorizontalData from './partials/HorizontalData';
import noimage from '../assets/no-img.jpg'

const MovieDetails = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const movieData = useSelector((state)=> state.movie.info);
  const { pathname } = useLocation();
  //console.log(movieData);
  
  useEffect(()=>{
    dispatch(loadMovieAction(id));

    return ()=>{
      dispatch(removeMovie());
    }
  }, [id]);

  return movieData ? (
    <div className='w-full h-screen overflow-y-auto relative'
    style={{
      backgroundImage: `linear-gradient(rgba(0,0,0,.3), rgba(0,0,0,.7), rgba(0,0,0,.9)), url(https://image.tmdb.org/t/p/original/${movieData.images[Math.floor(Math.random() * movieData.images.length-1)]?.file_path ?? movieData.detail.backdrop_path})`,
      backgroundPosition: "center center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
    >
      {/* Part 1 - Navigation */}
      <DataNav official={movieData.detail.homepage} imdb={movieData.externalId.imdb_id} wikipedia={movieData.externalId.wikidata_id}/> 
      
      {/* Part 2 - Movie Details  */}
      <div className="flex sm:gap-8 gap-3 my-6 sm:h-[80vh] justify-center flex-col sm:flex-row">
        <img className="object-cover rounded-md px-14 sm:px-0" src={ movieData.detail.poster_path || movieData.detail.backdrop_path ? `https://image.tmdb.org/t/p/w500/${movieData.detail.poster_path ?? movieData.detail.backdrop_path}` : noimage} alt="" />
        <div className="main-data-wrapper flex flex-col justify-around py-4 h-full sm:w-[40%] text-white text-xl px-7 sm:px-0 gap-4 sm:gap-0">
          <h1 className='font-semibold text-5xl'>{movieData.detail.original_title}</h1>
          <p>{movieData.detail.release_date.slice(0, 4)}</p>
          <div className="runtime-genre flex gap-3 items-center leading-none font-light">
            <p className='text-nowrap'>{Math.floor(movieData.detail.runtime / 60) }hr {Math.floor(movieData.detail.runtime % 60)}min</p>
            <p className='text-5xl sm:text-3xl'>|</p>
            <p className='font-medium'>
              {
                movieData.detail.genres.map((genre, index)=> {
                  if(movieData.detail.genres.length-1 != index)
                    return `${genre.name}, `
                  else
                    return `${genre.name}`
                })
              }
            </p>
          </div>
          <div className="rating flex gap-1 items-end text-base">
            <p className='text-4xl'><i className="ri-star-fill text-yellow-400"></i> {movieData.detail.vote_average.toFixed(1)}</p>
            <p>/</p>
            <p>10</p>
          </div>
          <p className='w-[95%]'>{movieData.detail.overview.length > 400 ? `${movieData.detail.overview.slice(0, 400)}...` : `${movieData.detail.overview}`}</p>
          <div className="trailer-streaming flex flex-col sm:flex-row gap-6 sm:gap-0 justify-between items-center w-[90%] order-[-1] sm:order-none">
            <Link to={`${pathname}/trailer`}><button className='bg-[#6556CD] w-fit py-3 px-5 rounded-lg shadow-[-1px_8px_129px_1px_#6226cd]'><i className="ri-play-fill"></i> Watch Trailer</button></Link>
            {
              movieData?.watchProviders?.flatrate && <div className="streaming flex leading-none gap-3 items-center">
                <p className='text-base sm:text-sm uppercase '>Streaming: </p>
                {
                  movieData.watchProviders.flatrate.map((provider, index)=> {
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
        movieData.credits.length > 0 && (
          <>
            <div className="trending-header w-full h-[10vh] flex items-center justify-between px-[2%] sm:mt-12 mt-8">
              <h1 className='flex gap-2 relative text-white text-3xl after:content-[""] after:h-[2px] after:w-[107%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'>Cast</h1>
            </div>
            <HorizontalData data={movieData.credits} />
          </>
        )
      }

      {/* Part 4 - Recommendations and Similar */}
      {
        movieData.recommendations.length > 0 ? (
        <>
          <div className="trending-header w-full h-[10vh] flex items-center justify-between px-[2%] sm:mt-12 mt-8">
            <h1 className='flex gap-2 relative text-white text-3xl after:content-[""] after:h-[2px] after:w-[107%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'>Recommendations</h1>
          </div>
          <HorizontalData data={movieData.recommendations}/>
        </>
        ) :
        movieData.similar.length > 0 ? (
        <>
          <div className="trending-header w-full h-[10vh] flex items-center justify-between px-[2%] sm:mt-12 mt-8">
            <h1 className='flex gap-2 relative text-white text-3xl after:content-[""] after:h-[2px] after:w-[107%] after:absolute after:bg-[#6556cd] after:top-[120%] after:rounded-md'>Similar Movies</h1>
          </div>
          <HorizontalData data={movieData.similar}/>
        </>
        ) : <></>
      }

      <Outlet/>
    </div>
  ) : <Loader/>
}

export default MovieDetails