import React,{ useEffect, useState } from 'react'
import axios from '../utils/Axios'
import CategoryHeader from './partials/CategoryHeader'
import Dropdown from './partials/Dropdown'
import CategoryCards from './partials/CategoryCards'
import Loader from './Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const TvSeries = () => {
    const [category, setCategory] = useState("airing_today");
    const [tvSeries, setTvSeries] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Webify | TV Series";
  
    const getTvSeries = async() => {
      try {
        const { data } = await axios.get(`/tv/${category}?page=${page}`);
        //setTvSeries(data.results);
  
        if(data.results.length > 0){
          setTvSeries((prevData)=> [...prevData, ...data.results]);
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
      if(tvSeries.length === 0)
        getTvSeries();
      else{
        setPage(1);
        setTvSeries([]);
        getTvSeries();
      }
    }
  
    useEffect(()=>{
      refreshHandler();
    }, [category])
  
    return tvSeries.length > 0 ? (
      <div className='w-[100%] h-full'>
          <div className='w-full h-[13vh] flex justify-between items-center px-[2%]'>
              <CategoryHeader title="tv Series"/>
              <Dropdown title={category.toUpperCase().replace(/_/g, " ")} options={['Airing Today', 'On the Air', 'Top Rated', 'Popular']} setFunction={setCategory}/>
          </div>
          <InfiniteScroll
            dataLength={tvSeries.length}
            hasMore={hasMore}
            next={getTvSeries}
            loader={<h1 className='text-white text-center w-full'>Loading...</h1>}
          >
            <CategoryCards data={tvSeries} cardType="tv"/>
          </InfiniteScroll>
      </div>
    ) : <Loader/>
}

export default TvSeries