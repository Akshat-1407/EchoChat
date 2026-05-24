import { useAuth } from "./AuthWrapper";
import { MoveLeft, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Profile({ onBack }) {
  const navigate = useNavigate();
  const { currUser } = useAuth();
  const [loading, setLoading] = useState(false);

  const logoutHandler = async () => {
    try {
      setLoading(true);
      await signOut(auth);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center h-screen w-full pt-4 pb-4 px-3 sm:pt-5 sm:pb-5 sm:px-4 md:w-[30vw] min-w-[260px] overflow-hidden bg-[#0f172a]">

      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#0a5263]" />
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />

      {/* Glass Card */}
      <div className="relative z-10 w-full backdrop-blur-3xl bg-white/10 border border-white/20 rounded-2xl sm:rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] p-6 sm:p-8 flex flex-col items-center animate-fadeIn">

        {/* Back Button */}
        <div className="w-full flex items-center mb-6">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-white/20 transition-all duration-300"
          >
            <MoveLeft className="text-white" />
          </button>
        </div>

        {/* Profile Image */}
        <div className="relative group">
          <img
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full object-cover border-4 border-white/30 shadow-lg transition-all duration-500 group-hover:scale-105"
            src={currUser?.photoURL || "/user.png"}
            alt="User"
            onError={(e) => {
              e.target.src = "/user.png";
            }}
          />
          <div className="absolute inset-0 rounded-full bg-cyan-500/20 blur-xl opacity-0"></div>
        </div>

        {/* Name */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white mt-4 sm:mt-6 text-center">
          {currUser?.displayName}
        </h2>

        {/* Email */}
        <p className="text-xs sm:text-sm text-gray-300 mt-2 text-center px-2">
          {currUser?.email}
        </p>

        {/* Divider */}
        <div className="w-full border-t border-white/20 my-4 sm:my-6"></div>

        {/* Logout Button */}
        <button
          onClick={logoutHandler}
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-xl font-medium text-sm sm:text-base shadow-lg transition-all duration-300 hover:scale-[1.03] disabled:opacity-70"
        >
          <LogOut size={18} />
          {loading ? "Logging out..." : "Logout"}
        </button>
      </div>
    </div>
  );
}

export default Profile;
