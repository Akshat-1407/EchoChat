import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { CircleFadingPlusIcon, Loader2Icon, SearchIcon, User } from "lucide-react";
import { useAuth } from "./AuthWrapper";
import  UserLoading  from "./UserLoading";
import Profile from './Profile';

function ChatPanel() {

  const [users, setUsers] = useState([]);
  const [showProfile, setShowProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
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


  // Search Bar Logic
  let filterdUsers = users;
  if (searchQuery) {
      // filter chats based on search query
      filterdUsers = users.filter((user) =>
          user.username?.toLowerCase()?.startsWith(searchQuery?.toLowerCase())
      );
  }


  const onBack = () => {
    setShowProfile(false);
  }


  if(showProfile == true) {
    return <Profile onBack={onBack}></Profile>
  }


  return (
    <div className='flex flex-col w-[30vw] min-w-[200px] bg-white p-3 h-screen border-r-1'>
      
      {/* Profile */}
      <div className="flex items-center gap-6 py-2 bg-gray-300 mb-3 h-14 rounded-md" >
        <div className="flex items-center">
          <img 
            onClick={() => { setShowProfile(true) }} 
            className='h-11 cursor-pointer object-cover rounded-full border-1 border-solid border-black ml-5 mr-4 ' 
            src={currUser?.photoURL || "/user.png"} alt="user" 
          />
          <p className="mr-auto">My Profile</p>
        </div>
        <CircleFadingPlusIcon className="w-6 h-6 ml-auto mr-8" />
      </div>

      {/* Conditional rendering of loader */}
      {userLoading ? 
    
        <UserLoading></UserLoading> : <>

          {/* Search Bar */}
          <div className="flex items-center bg-[#eff2f5] gap-4 px-3 py-2 rounded-lg mb-3">
              <SearchIcon className="w-4 h-4" />
              <input
                  className="w-full focus-within:outline-none"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
              />
          </div>

          {/* Chat List */}
          <div className=" divide-y py-4 max-h-fit  no-scrollbar overflow-y-scroll">
            {filterdUsers.map((user) => (
              <Link 
                className='flex items-center gap-2 px-3 py-2 mb-[1px] bg-white hover:bg-[#eff2f5] border-b-1 border-gray-300' 
                key={user.id} 
                to={`/chats/${user.id}`}
              >
                <img className='h-12 rounded-full border-1 object-cover border-solid border-black' src={user?.profile_pic || "/user.png"} alt="" />
                <p>{user?.username}</p>

              </Link>
            ))}
          </div>
        </>
      }
    </div>

  );
}

export default ChatPanel




