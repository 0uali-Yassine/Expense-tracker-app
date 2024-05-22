import React from 'react'
import { TbNorthStar } from "react-icons/tb";
import { useGlobalContext } from '../Context';

function Transaction() {
  const {userData} = useGlobalContext();
  
  return (
    <div className='border overflow-auto border-blue-500 rounded-sm p-[10px]'>
        <ul>
          {
            userData.map(data => {
              const {cost,decription,type} = data;
              return <li>
                <p className='main-font font-bold flex items-center gap-[5px]'><TbNorthStar/><span className='main-font'>{decription}</span></p>
                <p className='text-[14px] ml-[15px]'>${cost} - <span className={`${type === 'expense' ? 'text-red-500':'text-green-400'} font-medium`}>{type}</span> </p>
              </li>
            })
          }
        </ul>
    </div>
  )
}

export default Transaction;