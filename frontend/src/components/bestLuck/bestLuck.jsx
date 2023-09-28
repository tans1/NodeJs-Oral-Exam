import React from 'react'
import { Link } from 'react-router-dom';

function BestLuck() {
  return (
    <div className='flex justify-center items-center xsm:my-8 md:my-[100px]'>
      <div>
        <p className='font-bold xsm:text-2xl md:text-4xl'>Best of Luck on your Exam !!!</p>
        <Link to={"/reading"}>
        <div className='flex items-center justify-center bg-white inline-block h-9 text-blue-500 font-bold px-7 rounded-lg border-green-600 border-2 my-5 cursor-pointer'>Get Started</div>
      
        </Link></div>
    </div>
  )
}

export default BestLuck
