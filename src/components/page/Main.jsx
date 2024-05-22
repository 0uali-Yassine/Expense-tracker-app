import React from 'react'
import User from '../User';
import Tracker from '../Tracker'
import AddTransaction from '../AddTransaction';
import Transaction from '../Transaction';


function Main() {

  
  return (
    <div className='main border p-[20px]  bg-gray-200  border-blue-500 rounded-md flex flex-col gap-[10px]  w-[60vw]'>
        <div className='user_container flex flex-1 justify-between gap-[20px]'>
            <Tracker/>
            <User/>
        </div>
        <AddTransaction/>
        <Transaction/>
    </div>
  )
}

export default Main;