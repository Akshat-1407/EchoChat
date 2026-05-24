import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../../firebaseConfig.js";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "./AuthWrapper";
import { useEffect } from "react";
import { MessageCircle } from "lucide-react";

function Login() {
  const { currUser } = useAuth();
  const navigate = useNavigate();

  /* Proper Redirect */
  useEffect(() => {
    if (currUser) {
      navigate("/chats");
    }
  }, [currUser, navigate]);

  
  const createUser = async (userData) => {
    const user = userData.user;
    const userDocRef = doc(db, "users", user.uid);

    const date = new Date();
    const timeStamp = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    await setDoc(userDocRef, {
        username: user.displayName,
        email: user.email,
        profile_pic: user.photoURL,
        lastSeen: timeStamp,
      }, { merge: true }
    );
  };


  const loginHandler = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider());
    await createUser(result);
    navigate("/chats");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0c143c] to-[#0a5263]"></div>

      {/* Glow blobs */}
      <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-10">

        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg mb-4">
            <MessageCircle size={30} className="text-white" />
          </div>

          <h1 className="text-xl font-bold text-white sm:text-3xl">
            Welcome to EchoChat
          </h1>
          <p className="text-gray-300 text-sm mt-2">
            Connect. Share. Echo.
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 mb-8"></div>

        {/* Google Button */}
        <button
          onClick={loginHandler}
          className="w-full flex items-center justify-center gap-3 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-medium py-3 rounded-xl transition-all duration-300 hover:scale-[1.03] shadow-lg"
        >
          <img
            src="/google_logo.png"
            alt="Google"
            className="h-5 w-5"
          />
          Sign in with Google
        </button>

        {/* Footer text */}
        <p className="text-gray-400 text-xs text-center mt-8 leading-relaxed">
          By continuing, you agree to EchoChat's Terms of Service and Privacy Policy.
        </p>

      </div>
    </div>
  );
}

export default Login;
