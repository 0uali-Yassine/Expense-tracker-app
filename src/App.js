import { useGlobalContext } from "./Context";
import Auth from "./components/Auth";
import Main from "./components/page/Main";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  const {userAuth} = useGlobalContext();
  return (
    <div className="h-[100vh] bg-[url('./asset/18776140_6030756.jpg')] bg-cover w-[100%] flex justify-center items-center">
      {
        userAuth  ?  <Main/> : <Auth/>
      }
      <ToastContainer/>
    </div>
  );
}

export default App;
