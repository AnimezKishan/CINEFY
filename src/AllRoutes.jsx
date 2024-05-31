import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/Home'
import Trending from './Components/Trending'
import Popular from './Components/Popular'
import Movie from './Components/Movie'
import TvSeries from './Components/TvSeries'
import People from './Components/People'
import MovieDetails from './Components/MovieDetails'
import TvDetails from './Components/TvDetails'
import PersonDetails from './Components/PersonDetails'
import Trailer from './Components/partials/Trailer'

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/trending' element={<Trending/>}/>
        <Route path='/popular' element={<Popular/>}/>
        <Route path='/movies' element={<Movie/>}/>
        <Route path='/movie/details/:id' element={<MovieDetails/>}>
          <Route path='/movie/details/:id/trailer' element={<Trailer/>}/>
        </Route>
        <Route path='/tv' element={<TvSeries/>}/>
        <Route path='/tv/details/:id' element={<TvDetails/>}>
          <Route path='/tv/details/:id/trailer' element={<Trailer/>}/>
        </Route>
        <Route path='/people' element={<People/>}/>
        <Route path='/person/details/:id' element={<PersonDetails/>}/>
    </Routes>
  )
}

export default AllRoutes