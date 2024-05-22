import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../Context';

function Tracker() {
  const {userAllData,userData} = useGlobalContext();
  const [tracker,setTracker] = useState({balance:0,income:0,expense:0})
    
    const changeTrackerValue =()=>{
      let totalIncome = 0;
      let totalExpense = 0;

       userData.map(data=>{
        const {type,cost} = data;
        if(type === 'income'){
          totalIncome += cost;
        }else{
          totalExpense += cost;
        }

        return data; 
      }) 
      const balance = totalIncome - totalExpense;
      setTracker({balance:balance,income:totalIncome,expense:totalExpense});
    }

    useEffect(()=>{
      changeTrackerValue();
    },[userData])
 
  
  return (
    <div className='flex flex-col  gap-[10px]'>
      <h1 className='header-font'><span className='main-font font-medium underline'>{userAllData.username}'s</span> Expense Tracker</h1>
        <div className='flex flex-col gap-[5px]'>
          <h1 className='header-font'>Your blance</h1>
          <p className={`font-bold main-font ${tracker.balance > 0 ? 'text-green-300': 'text-red-400'}`}>{tracker.balance > 0 ? '+' :'-'}${tracker.balance > 0 ?  tracker.balance : -1 *tracker.balance}</p>
        </div>
        <div className='flex flex-col gap-[5px]'>
          <h1 className='header-font'>Income</h1>
          <p className='font-bold main-font text-green-400'>${tracker.income}</p>
        </div>
        <div className='flex flex-col gap-[5px]'>
          <h1 className='header-font'>Expense</h1>
          <p className='font-bold main-font text-red-400'>${tracker.expense}</p>
        </div>
    </div>
  )
}

export default Tracker;