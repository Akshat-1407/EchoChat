// Yaha loading nhi h

import {useState, useEffect} from 'react'
import { createContext, useContext } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const AuthContext = createContext();

function AuthWrapper({children}) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
          setLoading(true);
          setCurrUser(user);
          setLoading(false);
      });

      // 3. Return the unsubscribe function to clean up the observer when the component unmounts.
      return () => {
        unsubscribe()
      }
  }, []);

  return (
    <AuthContext.Provider value={{currUser, setCurrUser, loading}}>
      { children }
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthWrapper





