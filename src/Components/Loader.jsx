import React from 'react'
import loader from '/loader.gif'

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen p-5 bg-[#171717] w-screen fixed top-0 left-0 z-[100]">
        <img src={loader} alt="" />
    </div>
  )
}

export default Loader