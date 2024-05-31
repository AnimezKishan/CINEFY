import React,{ useEffect, useState } from 'react'
import Sidenav from './partials/Sidenav'
import TopNav from './partials/TopNav'
import axios from '../utils/Axios'
import Header from './partials/Header'
import Trending from './partials/Trending';

const Home = () => {
  document.title = "Webify | Homepage";
  const [trending, setTrending] = useState(null);
  const [trendingCards, setTrendingCards] = useState(null);
  const [category, setCategory] = useState("all");
  
  const getTrendings = async() => {
    try {
      const { data:trendingData } = await axios.get(`/trending/all/week`);
      setTrending(trendingData.results.slice(0, 5));
    } 
    catch (error) {
      console.log(error);
    }
  } 

  const getTrendingCards = async() => {
    try {
      const { data } = await axios.get(`/trending/${category}/day`);
      setTrendingCards(data.results);
    } 
    catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    !trending && getTrendings()
    getTrendingCards()
  }, [category])

  return (
    <>
        <Sidenav/>
        <div className="home-main w-full sm:w-[95%] 2xl:w-[96%] min-h-screen overflow-y-auto bg-[#171717]">
          <TopNav/>
          <Header data={trending}/>
          <Trending data={trendingCards} setCategory={setCategory}/>
        </div>
    </>
  )
}

export default Home