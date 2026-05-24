import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthWrapper";
import { Loader2Icon } from 'lucide-react';

function ProtectedRoute(props) {
  const { currUser, loading } = useAuth();

  const { children } = props;

  if (loading) {
    // return loader
    return (
      <div className='relative flex justify-center items-center h-screen w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'>
        {/* Glow blobs */}
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-[-120px] right-[-120px] w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>

        {/* Loader content */}
        <div className='relative z-10 flex flex-col items-center gap-4'>
          <div className='relative'>
            <div className='absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-50 animate-pulse'></div>
            <Loader2Icon className='relative w-12 h-12 text-blue-500 animate-spin'></Loader2Icon>
          </div>
          <p className='text-gray-600 text-sm font-medium animate-pulse'>Loading...</p>
        </div>
      </div>
    )
  }

  if (currUser) {
    return children;
  }
  else {
    return <Navigate to="/"></Navigate>;
  }
}

export default ProtectedRoute