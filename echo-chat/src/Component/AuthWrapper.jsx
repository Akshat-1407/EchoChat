import { useState, useEffect } from 'react'
import { createContext, useContext } from 'react'
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebaseConfig";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const AuthContext = createContext();

function AuthWrapper({ children }) {
  const [currUser, setCurrUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);
      setCurrUser(user);
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const date = new Date();
        const timeStamp = date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
          day: "2-digit",
          month: "short"
        });

        await setDoc(userDocRef, {
          username: user.displayName,
          email: user.email,
          profile_pic: user.photoURL,
          lastSeen: timeStamp,
        }, { merge: true });
      }
      setLoading(false);
    });

    // Return the unsubscribe function to clean up the observer when the component unmounts.
    return () => {
      unsubscribe()
    }
  }, []);

  const updateLastSeen = async (user) => {
    const date = new Date();
    const timeStamp = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      day: "2-digit",
      month: "short"
    });
    await updateDoc(doc(db, "users", user.uid), {
      lastSeen: timeStamp,
    });
  }

  return (
    <AuthContext.Provider value={{ currUser, setCurrUser, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthWrapper





