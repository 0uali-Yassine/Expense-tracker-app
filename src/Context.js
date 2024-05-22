import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./config/config";
import { collection, getDocs, query, where} from "firebase/firestore";

const myContext = createContext();

function Context({children}) {
  const [userAuth,setUserAuth] = useState(false);
  const [userAllData,setUserAllData] = useState({});
  const [userData,setUserData] = useState([]);

  useEffect(()=>{
    const unSub = auth.onAuthStateChanged(async user =>{
      if(user){
        const userCollection = collection(db,'users');
        const q = query(userCollection,where('userId','==',auth?.currentUser?.uid));
        const userData = await getDocs(q);

        if (!userData.empty) {
          setUserAuth(true);
          setUserAllData(userData.docs[0].data());
        } else {
          console.log('No such document!');
          setUserAuth(true);
          setUserAllData({});
        }

      }else{
        setUserAuth(false);
        setUserAllData({});
      }
    })
    return ()=> unSub();
  },[])

 


  return (
    <myContext.Provider value={{userAuth,userAllData,
      setUserData,userData
    }}>
        {children}
    </myContext.Provider>
  )
}

export const  useGlobalContext = ()=>{
    return useContext(myContext);
}

export default Context;