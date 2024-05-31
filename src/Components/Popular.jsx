import React,{ useEffect, useState } from 'react'
import axios from '../utils/Axios'
import CategoryHeader from './partials/CategoryHeader'
import Dropdown from './partials/Dropdown'
import CategoryCards from './partials/CategoryCards'
import Loader from './Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const Popular = () => {
  const [category, setCategory] = useState("movie");
  const [popular, setPopular] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  document.title = "Webify | Popular";

  const getPopular = async() => {
    try {
      const { data } = await axios.get(`/${category}/popular?page=${page}`);
      //setpopular(data.results);

      if(data.results.length > 0){
        setPopular((prevData)=> [...prevData, ...data.results]);
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
    if(popular.length === 0)
      getPopular();
    else{
      setPage(1);
      setPopular([]);
      getPopular();
    }
  }

  useEffect(()=>{
    refreshHandler();
  }, [category])

  return popular.length > 0 ? (
    <div className='w-[100%] h-full'>
        <div className='w-full h-[13vh] flex justify-between items-center px-[2%]'>
            <CategoryHeader title="Popular"/>
            <Dropdown title={category.toUpperCase()} options={['TV', 'Movie']} setFunction={setCategory}/>
        </div>
        <InfiniteScroll
          dataLength={popular.length}
          hasMore={hasMore}
          next={getPopular}
          loader={<h1 className='text-white text-center w-full'>Loading...</h1>}
        >
          <CategoryCards data={popular} cardType={category}/>
        </InfiniteScroll>
    </div>
  ) : <Loader/>
}

export default Popular