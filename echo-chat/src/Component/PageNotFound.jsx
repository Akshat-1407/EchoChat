import { useNavigate } from "react-router-dom";
import { MessageCircle, ArrowLeft } from "lucide-react";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden text-white">

      {/* 🌈 Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0c143c] to-[#0a5263]"></div>

      {/* Glow blobs */}
      <div className="absolute top-[-120px] left-[-120px] w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-blue-600/30 rounded-full blur-3xl animate-pulse"></div>

      {/* 💎 Glass Card */}
      <div className="relative z-10 backdrop-blur-2xl bg-white/10 border border-white/20 rounded-3xl shadow-2xl p-12 max-w-xl w-full text-center">

      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 flex items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg animate-float">
          <MessageCircle size={28} />
        </div>
      </div>

      {/* 404 Text */}
      <h1 className="text-7xl font-extrabold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4">
        404
      </h1>

      <h2 className="text-2xl font-semibold mb-4">
        Oops! Page Not Found
      </h2>

      <p className="text-gray-300 mb-10">
        The page you're looking for doesn’t exist or may have been moved.
        Let’s get you back to where the conversation happens.
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition duration-300 shadow-xl"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      </div>
    </div>
  );
}

export default PageNotFound;
