import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
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
    <div className="flex flex-col items-center min-h-screen w-full bg-gradient-to-r from-[#0a2857] to-[#00d9ff] p-4">
      {/* Logo and App Name Section */}
      <img src="./app_logo.png" alt="EchoChat Logo" className="h-16 w-16 mt-16 md:mt-24" />

      <div className='flex mb-1'>
        <p className='text-gray-100 text-3xl font-bold'>Echo</p>
        <p className='text-[#00BFFF] text-3xl font-bold'>Chat</p>
      </div>

      {/* Welcome Messages */}
      <h1 className='text-white text-3xl font-bold mt-10 mb-2'>Welcome to EchoChat</h1>
      <p className='text-[#87ceeb] text-sm mb-12 font-medium tracking-wider'>Connect, Share, Echo</p>

      {/* Login Card */}
      <div className='flex flex-col items-center rounded-2xl shadow-2xl p-6 bg-white w-full max-w-sm md:max-w-md'>
        <p className='text-xl font-semibold text-gray-700 pt-3 pb-6'>Login to your account</p>

        {/* Google Sign-in label */}
        <div className='flex items-center bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 mt-4 mb-6 rounded-lg w-full'>
          <img src="/google_logo.png" alt="Google Logo" className='h-5 w-5 mr-3' />
          <span>Sign in with Google</span>
        </div>

        {/* Login Button */}
        <button
          className='w-full bg-gradient-to-r from-[#3A277B] to-[#37beec] text-white font-bold cursor-pointer text-lg py-3 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-[1.02] mb-3'
          onClick={loginHandler}
        >
          Login
        </button>
      </div>
    </div>
  )

}

export default Login