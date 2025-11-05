import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useEffect } from "react";
import { auth, db } from '../../firebaseConfig.js';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from "./AuthWrapper";


function Login() {
  const { currUser } = useAuth();

  const navigate = useNavigate();

  if (currUser) {
    navigate("/chats");
    return <></>;
  }

  const createUser = async (userData) => {
    const user = userData.user;
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      username: user.displayName,
      email: user.email,
      profile_pic: user.photoURL,
    });
  }


  const loginHandler = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await createUser(result);
    navigate("/chats");
  }

  return (
    <div className="flex flex-col items-center h-screen w-full bg-gradient-to-r from-[#0a2857] to-[#00d9ff]">
      <img src="./app_logo.png" alt="logo" className="h-[4.5rem] mt-[4.5rem]" />
      <div className='flex'>
        <p className='text-[#072c5f] text-xl font-bold'>Echo</p>
        <p className='text-[#00BFFF] text-xl font-semibold'>Chat</p>
      </div>
      <p className='text-[#0f294d] text-2xl font-semibold mt-8'>Welcome to EchoChat</p>
      <p className='text-[#00BFFF] text-[0.9rem] text-xs mb-8'>Connect, Share, Echo</p>

      <div className={'flex flex-col items-center rounded-xl h-[40vh] bg-[#dde3ea] w-[65vw]'}>
        <p className='pt-5'>Login to you account</p>
        <div className='flex bg-white p-2 mt-10 rounded-md w-[70%] justify-center'>
          <span><img src="/google_logo.png" alt="google_logo" className='h-6 mr-3' /></span>
          Sign in with Google
        </div>
        <button className='bg-gradient-to-r from-[#3A277B] to-[#37beec] text-white p-2 pb-3 mt-10 text-sm w-25 rounded-md text-[1rem] cursor-pointer' onClick={loginHandler}>Login</button>
      </div>
    </div>
  )

}

export default Login