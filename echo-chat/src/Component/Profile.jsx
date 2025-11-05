import { useAuth } from "./AuthWrapper";
import { MoveLeft } from 'lucide-react';
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig"
import { useNavigate } from "react-router-dom";

function Profile(props) {
  const navigate = useNavigate();
  const {currUser, setCurrUser} = useAuth();
  // console.log(currUser)
  const { onBack } = props
  
  const logoutHandler = async () => {  
    await signOut(auth);
    navigate("/")
  }
  
  return (

      <div className='flex flex-col gap-2 mb-3 w-[25vw] bg-gray-200 border-r-1'>
          <MoveLeft className="m-3" onClick={onBack}/>
          <img className='h-15 w-15 rounded-full' src={currUser.photoURL || "/user.png"} alt="" />
          <p>{currUser.displayName}</p>
          <p>Status</p>
          <button className="cursor-pointer" onClick={logoutHandler}>Logout</button>
      </div>
    
  )
}

export default Profile