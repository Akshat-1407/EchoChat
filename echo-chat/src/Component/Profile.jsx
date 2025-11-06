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

      <div className='flex flex-col h-screen gap-2 w-[30vw] bg-gray-100 border-r-1'>
          <MoveLeft className="m-3" onClick={onBack}/>
          <img className='h-15 w-15 rounded-full border-1 border-solid border-black' src={currUser?.photoURL || "/user.png"} alt="" />
          <p>{currUser.displayName}</p>
          <p>Status</p>
          <button className="cursor-pointer w-[50%]" onClick={logoutHandler}>Logout</button>
      </div>
    
  )
}

export default Profile