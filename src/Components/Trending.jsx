import React,{ useEffect, useState } from 'react'
import axios from '../utils/Axios'
import CategoryHeader from './partials/CategoryHeader'
import Dropdown from './partials/Dropdown'
import CategoryCards from './partials/CategoryCards'
import Loader from './Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Trending = () => {
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("week");
  const [trending, setTrending] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Webify | Trending";
  //console.log(trending);

  const getTrending = async() => {
    try {
      const { data } = await axios.get(`/trending/${category}/${duration}?page=${page}`);

      if(data.results.length > 0){
        setTrending((prevData)=> [...prevData, ...data.results]);
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
    if(trending.length === 0)
      getTrending();
    else{
      setPage(1);
      setTrending([]);
      getTrending();
    }
  }

  useEffect(()=>{
    refreshHandler();
  }, [category, duration])

  return trending.length > 0 ? (
    <div className='w-[100%] h-full'>
        <div className='w-full h-[13vh] flex justify-between items-center px-[2%]'>
            <CategoryHeader title="Trending"/>
            <div className="dropdown-wrapper flex flex-col sm:flex-row gap-2 sm:gap-4">
                <Dropdown title={category.toUpperCase()} options={['All', 'TV', 'Movie']} setFunction={setCategory}/>
                <Dropdown title={duration.toUpperCase()} options={['Week', 'Day']} setFunction={setDuration}/>
            </div>
        </div>
        <InfiniteScroll
          dataLength={trending.length}
          hasMore={hasMore}
          next={getTrending}
          loader={<h1 className='text-white text-center w-full'>Loading...</h1>}
        >
          <CategoryCards data={trending} />
        </InfiniteScroll>
    </div>
  ) : <Loader/>
}

export default Trending