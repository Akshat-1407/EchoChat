
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { db } from "../../firebaseConfig";


function ChatPanel() {

  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const fetchUsers = (async () => {
      try {
        // 1. Get a reference to the 'users' collection
        const usersCollectionRef = collection(db, 'users');

        // 2. Fetch all documents in the collection
        const querySnapshot = await getDocs(usersCollectionRef);

        // 3. Map the documents to an array of user objects
        const usersArray = querySnapshot.docs.map(doc => ({
          id: doc.id, // The document ID is typically the user's UID
          ...doc.data() // The rest of the user data
        }));

        setUsers(usersArray);
      } 
      catch (e) {
        console.error("Error fetching users: ", e);
      }
    })();
  }, [db]);

  const onBack = () => {
    setShowProfile(false);
  }

  if(showProfile == true) {
    return <Profile onBack={onBack}></Profile>
  }

  return (
    <div className='w-[25vw] h-[100vh] border-r-1'>
        <img onClick={() => { setShowProfile(true) }} className='h-9 rounded-full border-1 border-solid border-black' src={"/user.png"} alt="user" />
        {/* {console.log(users)} */}
        {users.map((user) => (
          <Link className='flex items-center gap-2 mb-3 bg-gray-200' key={user.id} to={`/chats/${user.id}`}>
            <img className='h-9 rounded-full border-1 border-solid border-black' src={user.profile_pic || "/user.png"} alt="" />
            <p>{user.username}</p>
          </Link>
        ))}
    </div>
  );

}

export default ChatPanel




