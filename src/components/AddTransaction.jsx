import { useEffect } from 'react';
import { collection, doc, getDoc, onSnapshot, updateDoc } from 'firebase/firestore';
import { auth, db } from '../config/config';
import { useGlobalContext } from '../Context';
import { useState } from 'react';

function AddTransaction() {
  const [description,setDescription] = useState('');
  const [costdata,setCostData] = useState('');
  const {setUserData} = useGlobalContext();


  const addTransaction = async e =>{
    e.preventDefault();
      const formData = new FormData(e.target);
      const {type,decription,cost} = Object.fromEntries(formData);
      const usersCollection = collection(db,'users');
      const userDocRef = doc(usersCollection,auth.currentUser.uid);
      try {
        const userDoc = await getDoc(userDocRef);
        const userData = userDoc.data();
          // Update the document with the new transaction appended to the Data array
          await updateDoc(userDocRef, {
            Data: [...userData.Data, { type, decription, cost:parseInt(cost) }]
          });
          setDescription('');
          setCostData('')
          
      } catch (error) {
        console.log(error.code);
      }
  }


  useEffect(()=>{
    const unSnapshot = onSnapshot(doc(db, "users", auth?.currentUser?.uid), (doc) => {
      if(doc.exists()){
        setUserData(doc.data().Data);
      }else{
        console.log('noo');
      }
    });

   return ()=> unSnapshot();
  },[])


  return (
    <form onSubmit={addTransaction} className='flex flex-col gap-[10px]'>
      <input onChange={e =>setDescription(e.target.value)} value={description} name='decription' type="text" placeholder='Descreption...' className='bg-transparent border text-black text-[14px] p-[5px] border-blue-500 outline-none' required/>
      <input onChange={e => setCostData(e.target.value)} value={costdata} name='cost' type="number" placeholder='cost...' className='bg-transparent border text-black text-[14px] p-[5px] border-blue-500 outline-none' required/>
      <div className='flex gap-[10px]'>
        <div className='flex gap-[5px]'>
          <input id='expense' name='type' value='expense' type="radio"  />
          <label htmlFor="expense" className='main-font font-medium'>Expense</label>
        </div>
        <div className='flex gap-[5px]'>
          <input id='income' name='type' value='income' type="radio"  />
          <label htmlFor="income" className='main-font font-medium'>Income</label>
        </div>
      </div>
      <button className='bg-blue-500 main-font font-medium py-[5px] rounded-sm hover:bg-blue-400 '>Add Transaction</button>
    </form>
  )
}

export default AddTransaction;