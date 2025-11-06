import { useAuth } from "./AuthWrapper";
import { MoveLeft } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom";

function Profile(props) {

  const navigate = useNavigate();
  const { currUser } = useAuth();
  const { onBack } = props
  
  const logoutHandler = async () => {  
    await signOut(auth);
    navigate("/")
  }
  
  return (

      <div className='flex flex-col items-center h-screen gap-2 w-[30vw] min-w-[200px] bg-gray-100 border-r-1'>
          <MoveLeft className="mr-auto m-4" onClick={onBack}/>

          <img 
            className='h-25 m-4 rounded-full object-cover border-1 border-solid border-black' 
            src={currUser?.photoURL || "/user.png"} 
            alt="User Pic" 
          />

          <p className="text-3xl">{currUser?.displayName}</p>

          <button 
            className="cursor-pointer w-[50%] font-medium px-5 py-2 mt-3 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md hover:shadow-lg hover:opacity-90 transition-all" 
            onClick={logoutHandler}
          > Logout
          </button>

            

      </div>
    
  )
}

export default Profile