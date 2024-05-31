import { useEffect } from 'react'
import { register } from 'swiper/element/bundle';
import AllRoutes from './AllRoutes'
import './App.css'

function App() {

  useEffect(()=>{
    register();
  }, [])
  
  return (
    <div className="main w-full h-screen bg-[#171717] flex">
      <AllRoutes/>
    </div>
    
  )
}

export default App
