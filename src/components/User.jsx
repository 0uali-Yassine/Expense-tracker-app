import { useGlobalContext } from '../Context';
import { signOut } from 'firebase/auth';
import { auth} from '../config/config';
import { toast } from 'react-toastify';
function User() {
  const {userAllData} = useGlobalContext();
 

  const logOut = async()=>{
    try {
        await signOut(auth);
        toast.warn("You Log Out!");
    } catch (error) {
      console.log(error.code);
    }
}
  return (
    <div className='flex flex-col gap-[10px]'>
      <img src={userAllData.imgUrl} alt="avatar" className='w-[70px] h-[70px] rounded-[50%] object-cover  border-blue-500 border-[2px]' />
      <button onClick={logOut} className='bg-red-400 rounded-sm text-[13px] hover:bg-red-500 font-bold px-[10px] py-[2px]'>Sin Out</button>
    </div>
  )
}

export default User;