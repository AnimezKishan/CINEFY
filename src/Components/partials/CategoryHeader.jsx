import React from 'react'
import { useNavigate } from 'react-router-dom'


const CategoryHeader = ({title}) => {
  const navigate = useNavigate();
  return (
    <div className='header-wrapper flex gap-4 items-center'>
        <button onClick={()=>navigate(-1)} className='text-2xl text-[#fff] px-3 py-2 font-semibold rounded-[50%] hover:bg-[#303030] duration-300'><i className="ri-arrow-left-line"></i></button>
        <h1 className='text-3xl uppercase font-semibold text-[#fff]'>{title}</h1>
    </div>
  )
}

export default CategoryHeader