import { CircleFadingPlusIcon, Loader2Icon, MessageSquare, SearchIcon, UserRoundIcon } from "lucide-react";
import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import Profile from './Profile';
import { Link } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import  UserLoading  from "./UserLoading";
import { useAuth } from "./AuthWrapper";

function ChatPanel() {

  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuerry, setSearchQuery] = useState("");
  const [userLoading, setUserLoading] = useState(true);

  const { currUser } = useAuth();

  useEffect(() => {
    setUserLoading(true);
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
        setUserLoading(false);
      } 
      catch (e) {
        console.error("Error fetching users: ", e);
        setUserLoading(false);
      }
    })();
  }, [db]);

  const onBack = () => {
    setShowProfile(false);
  }


  if(showProfile == true) {
    return <Profile onBack={onBack}></Profile>
  }

  if(userLoading) {
    return <UserLoading className="flex flex-grow"></UserLoading>
  }

  return (
    <div className='w-[30vw] h-screen border-r-1'>
      
      {/* Profile */}
      <div className="flex items-center gap-6 py-2 bg-gray-300 mb-3 h-14" >
        <div className="flex items-center">
          <img 
            onClick={() => { setShowProfile(true) }} 
            className='h-11 cursor-pointer rounded-full border-1 border-solid border-black ml-5 mr-4 ' 
            src={currUser?.photoURL || "/user.png"} alt="user" 
          />
          <p className="mr-auto">My Profile</p>
        </div>
        <CircleFadingPlusIcon className="w-6 h-6 ml-auto mr-8" />
      </div>

      {/* Search Bar */}
        <div className="bg-[#eff2f5] flex items-center gap-4 px-3 py-2 rounded-lg mb-3">
            <SearchIcon className="w-4 h-4" />
            <input
                className="bg-background focus-within:outline-none"
                placeholder="Search"
                value={searchQuerry}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>

      {/* Chat List */}
      <div className="overflow-y-scroll no-scrollbar">
        {users.map((user) => (
          <Link className='flex items-center gap-2 ml-2 py-2 hover:bg-[#eff2f5]' key={user.id} to={`/chats/${user.id}`}>
            <img className='h-12 rounded-full border-1 border-solid border-black' src={user?.profile_pic || "/user.png"} alt="" />
            <p>{user.username}</p>
          </Link>
        ))}
      </div>
    </div>
  );

}

export default ChatPanel




