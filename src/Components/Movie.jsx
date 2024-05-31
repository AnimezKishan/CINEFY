import React,{ useEffect, useState } from 'react'
import axios from '../utils/Axios'
import CategoryHeader from './partials/CategoryHeader'
import Dropdown from './partials/Dropdown'
import CategoryCards from './partials/CategoryCards'
import Loader from './Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Movie = () => {
    const [category, setCategory] = useState("now_playing");
    const [movie, setMovie] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Webify | Movies";
  
    const getMovie = async() => {
      try {
        const { data } = await axios.get(`/movie/${category}?page=${page}`);
        //setMovie(data.results);
  
        if(data.results.length > 0){
          setMovie((prevData)=> [...prevData, ...data.results]);
          setPage(page+1);
        }
        else{
          setHasMore(false);
        }
      } 
      catch (error) {
        console.log(error);
      }
    }
  
    const refreshHandler = () => {
      if(movie.length === 0)
        getMovie();
      else{
        setPage(1);
        setMovie([]);
        getMovie();
      }
    }
  
    useEffect(()=>{
      refreshHandler();
    }, [category])
  
    return movie.length > 0 ? (
      <div className='w-[100%] h-full'>
          <div className='w-full h-[13vh] flex justify-between items-center px-[2%]'>
              <CategoryHeader title="movie"/>
              <Dropdown title={category.toUpperCase().replace(/_/g, " ")} options={['Now Playing', 'Popular', 'Top Rated', 'Upcoming']} setFunction={setCategory}/>
          </div>
          <InfiniteScroll
            dataLength={movie.length}
            hasMore={hasMore}
            next={getMovie}
            loader={<h1 className='text-white text-center w-full'>Loading...</h1>}
          >
            <CategoryCards data={movie} cardType="movie"/>
          </InfiniteScroll>
      </div>
    ) : <Loader/>
}

export default Movie