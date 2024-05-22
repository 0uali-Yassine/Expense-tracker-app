import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import avatar from '../asset/avatar.png';
import { FcGoogle } from "react-icons/fc";
import { Provider, auth, db } from '../config/config';
import { doc, setDoc } from 'firebase/firestore';
import { useState } from 'react';
import { toast } from 'react-toastify';

function Auth() {
  const [isSignIn,setIsSignIn] = useState(true);
  const [isLoading,setLoding] = useState(false);
  const [avatarFile,setAvatarfile] = useState({file:null,url:''});

  const avatarImg = (e)=>{
    setAvatarfile({
      file:e.target.files[0],
      url:URL.createObjectURL(e.target.files[0])
    })
  }

  const signUp = async (e) =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const {email,password,username} = Object.fromEntries(formData)
    try {
      setLoding(true);
      const response = await createUserWithEmailAndPassword(auth,email,password);
      const {uid} = response.user;
      await setDoc(doc(db,'users',uid),{
        username,
        email,
        userId:uid,
        Data:[],
        imgUrl:avatarFile.url,

      })
      setLoding(false);
      toast.success("You Sign Up !");
    } catch (error) {
      console.log(error.code);
      toast.warn(error.code);
      setLoding(false);

    }
  }

  const signIn = async e =>{
    e.preventDefault();
    const formData = new FormData(e.target);
    const {Email,Password} = Object.fromEntries(formData);
    try {
      await signInWithEmailAndPassword(auth,Email,Password);
      toast.success("You Sign In !");
      
    } catch (error) {
      console.log(error.code);
      toast.warn(error.code);
      setLoding(false);

    }
  }

  const singWithGoogle = async ()=>{
    try {
      const response = await signInWithPopup(auth,Provider);
      const {displayName,email,uid,photoURL} = response.user;
      await setDoc(doc(db,'users',uid),{
        username:displayName,
        userId:uid,
        email,
        Data:[],
        imgUrl:photoURL,
      })
      toast.success("You Sign In !");
    } catch (error) {
      console.log(error.code);
      toast.warn(error.code);
    }
  }

  return (
    <div className='rounded-md w-[300px] p-[10px] bg-blue-500 flex flex-col gap-[10px]'>
       {
        isSignIn ? (
          <div className='bg-gray-200 p-[5px]'>
             <h1 className='text-center mb-[10px] main-font font-bold text-[20px]'>Sign Up</h1>
            <form onSubmit={signUp} className=' flex flex-col gap-[20px]'>
              <div className='flex items-center self-center gap-[10px]'>
                <img src={avatarFile.url || avatar} alt="avatar" className='w-[50px] h-[50px] rounded-[50%]' />
                <input onChange={avatarImg} id='file' type="file"  hidden/>
                <label htmlFor="file" className='underline'>Upload file</label>
              </div>

              <div className='flex flex-col'>
                <label htmlFor="username" className='main-font font-bold'>User Name</label>
                <input id='username' name='username' type="text" className='bg-transparent border text-black text-[14px] p-[5px] border-blue-500 outline-none' placeholder='UserName...' />
              </div>

              <div className='flex flex-col'>
                <label htmlFor="email" className='main-font font-bold'>Email:</label>
                <input id='email' name='email' type="email" className='bg-transparent border text-black text-[14px] p-[5px] border-blue-500 outline-none' placeholder='Email...' />
              </div>

              <div className='flex flex-col'>
                <label htmlFor="password" className='main-font font-bold'>Password:</label>
                <input id='password' name='password' type="password" className='bg-transparent border text-black text-[14px] p-[5px] border-blue-500 outline-none' placeholder='Password...' />
              </div>

              <button className='border bg-blue-500 hover:bg-blue-400 text-white main-font p-[5px]'>{isLoading ? <div class="loader"></div>:'Sign Up'}</button>
            </form>
            <div onClick={singWithGoogle} className='w-[25px] text-center m-auto mt-[10px]'>
                <FcGoogle size={30}/>
            </div>
             <h1  className='text-center mt-[10px] text-[13px] text-gray-500'>You have account? <span onClick={()=> setIsSignIn(false)} className='underline text-blue-400 cursor-pointer'>Sing In</span></h1>
          </div>
        ):(
          <div className='bg-gray-200 p-[5px]'>
            <form onSubmit={signIn}  className=' flex flex-col gap-[20px]'>
              <h1 className='text-center mb-[10px] main-font font-bold text-[20px]'>Sign In</h1>
              <div className='flex flex-col'>
                <label  htmlFor="email" className='main-font font-bold'>Email</label>
                <input name='Email'  id='email' type="email" placeholder='Email...'  className='bg-transparent border text-black text-[14px] p-[5px] border-blue-500 outline-none'/>
              </div>
              <div className='flex flex-col'>
                <label htmlFor="password" className='main-font font-bold'>Password</label>
                <input name='Password' id='password' type="password" placeholder='Password...' className='bg-transparent border text-black text-[14px] p-[5px] border-blue-500 outline-none' />
              </div>
              <button className='border bg-blue-500 hover:bg-blue-400 text-white main-font p-[5px]'>{isLoading ? <div class="loader"></div>:'Sign In'}</button>
            </form>
            <h1 className='text-center mt-[10px] text-[13px] text-gray-500'>Don't have account? <span onClick={()=> setIsSignIn(true)} className='underline text-blue-400 cursor-pointer'>Sing Up</span></h1>
          </div>
        )
       }
    </div>
  )
}

export default Auth;