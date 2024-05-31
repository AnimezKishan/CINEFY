import React,{ useEffect, useState } from 'react'
import axios from '../utils/Axios'
import CategoryHeader from './partials/CategoryHeader'
import Dropdown from './partials/Dropdown'
import CategoryCards from './partials/CategoryCards'
import Loader from './Loader'
import InfiniteScroll from 'react-infinite-scroll-component'

const People = () => {
    const [people, setPeople] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    document.title = "Webify | People";
  
    const getPeople = async() => {
      try {
        const { data } = await axios.get(`/person/popular?page=${page}`);
        //setPeople(data.results);
  
        if(data.results.length > 0){
          setPeople((prevData)=> [...prevData, ...data.results]);
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
      if(people.length === 0)
        getPeople();
      else{
        setPage(1);
        setPeople([]);
        getPeople();
      }
    }
  
    useEffect(()=>{
      refreshHandler();
    }, [])
  
    return people.length > 0 ? (
      <div className='w-[100%] h-full'>
          <div className='w-full h-[13vh] flex justify-between items-center px-[2%]'>
              <CategoryHeader title="People"/>
          </div>
          <InfiniteScroll
            dataLength={people.length}
            hasMore={hasMore}
            next={getPeople}
            loader={<h1 className='text-white text-center w-full'>Loading...</h1>}
          >
            <CategoryCards data={people} cardType="person"/>
          </InfiniteScroll>
      </div>
    ) : <Loader/>
}

export default People