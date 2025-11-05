import { Navigate } from 'react-router-dom';
import { useAuth } from "./AuthWrapper";
import { Loader2Icon } from 'lucide-react';

function ProtectedRoute(props) {
  const {currUser, loading} = useAuth();

  const { children } = props;

  if (loading) {
    return <div className='flex justify-center items-center h-screen w-screen bg-[#eff2f5]'>
      <Loader2Icon className='w-8 h-8 animate-spin'></Loader2Icon>
    </div>
  }

  if (currUser) {
    return children;
  } 
  else {
    return <Navigate to="/"></Navigate>;
  }
}

export default ProtectedRoute