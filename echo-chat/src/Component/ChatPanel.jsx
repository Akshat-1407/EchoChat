import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { db } from "../../firebaseConfig";
import { SearchIcon, SunMedium } from "lucide-react";
import { useAuth } from "./AuthWrapper";
import Profile from './Profile';

function ChatPanel({ onOpenProfile, onOpenChat, theme, onThemeToggle }) {

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

  // Sort so currently logged in user is first
  const sortedUsers = [...filterdUsers].sort((a, b) => {
    if (a.id === currUser?.uid) return -1;
    if (b.id === currUser?.uid) return 1;
    return 0;
  });


  const onBack = () => {
    setShowProfile(false);
  }

  // Desktop/Tablet: Show Profile inline only on md and up
  if (showProfile == true && window.innerWidth >= 768) {
    return <Profile onBack={onBack}></Profile>
  }


  return (
    <div className={`relative flex flex-col w-full md:w-[30vw] min-w-[260px] 
                  h-screen px-3 sm:px-4 pt-4 sm:pt-6 overflow-hidden 
                  ${theme === 'dark'
        ? 'bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e3a4a] border-r border-white/10'
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100 border-r border-blue-200'
      }`}>

      {/* Soft Glow Background */}
      <div className={`absolute top-[-120px] left-[-120px] w-80 h-80 ${theme === 'dark'
          ? 'bg-cyan-500/20'
          : 'bg-blue-300/30'
        } rounded-full blur-3xl`}></div>
      <div className={`absolute bottom-[-120px] right-[-120px] w-80 h-80 ${theme === 'dark'
          ? 'bg-blue-600/20'
          : 'bg-cyan-300/30'
        } rounded-full blur-3xl`}></div>

      {/* Profile Header */}
      <div className={`relative z-10 flex items-center justify-between 
                    backdrop-blur-xl ${theme === 'dark'
          ? 'bg-white/10 border-white/20'
          : 'bg-white/50 border-white/70'
        }
                    border
                    rounded-xl sm:rounded-2xl px-3 sm:px-4 py-2.5 sm:py-3 shadow-md mb-4 sm:mb-5`}>

        <div className="flex items-center gap-2 sm:gap-3">
          <img
            onClick={() => {
              // On mobile, trigger callback instead of showing profile
              if (window.innerWidth < 768) {
                onOpenProfile?.();
              } else {
                setShowProfile(true);
              }
            }}
            className="h-9 w-9 sm:h-11 sm:w-11 cursor-pointer object-cover rounded-full 
                     border border-blue-200 hover:scale-105 transition"
            src={currUser?.photoURL || "/user.png"}
            onError={(e) => {
              e.target.src = "/user.png";
            }}
            alt="user"
          />

          <div className="flex-1 min-w-0">
            <p className={`font-semibold text-xs sm:text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}>
              {currUser?.displayName ?? "My Profile"}
            </p>
          </div>
        </div>

        <SunMedium
          onClick={onThemeToggle}
          className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer hover:rotate-180 transition duration-500 flex-shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-gray-500'
            }`}
        />
      </div>

      {/* Search Bar */}
      <div className="relative z-10 mb-4 sm:mb-5">
        <div className={`flex items-center ${theme === 'dark'
            ? 'bg-white/10 border-white/20'
            : 'bg-white/70 border-blue-200'
          } backdrop-blur-xl 
                      border
                      rounded-lg sm:rounded-xl px-3 sm:px-4 py-1.5 sm:py-2 
                      focus-within:ring-2 ${theme === 'dark'
            ? 'focus-within:ring-cyan-400'
            : 'focus-within:ring-blue-400'
          } transition`}>

          <SearchIcon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-2 flex-shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-gray-500'
            }`} />

          <input
            className={`bg-transparent w-full placeholder-gray-400 
                     focus:outline-none text-xs sm:text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-800'
              }`}
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users List */}
      <div className="relative z-10 flex-1 overflow-y-auto space-y-2 sm:space-y-3 pr-1 no-scrollbar">
        {sortedUsers.map((user) => (

          <Link
            key={user.id}
            to={`/chats/${user.id}`}
            onClick={() => {
              // Trigger callback to show ChatWindow
              onOpenChat?.();
            }}
            className={`flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2 sm:py-3 
                       rounded-lg sm:rounded-xl backdrop-blur-xl 
                       border
                       transition-all duration-200 
                       hover:scale-[1.02] shadow-sm ${theme === 'dark'
                ? 'bg-white/10 border-white/20 hover:bg-white/20'
                : 'bg-white/60 border-white/70 hover:bg-white/80'
              }`}
          >
            <img
              className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover flex-shrink-0 
                         border ${theme === 'dark' ? 'border-cyan-400/50' : 'border-blue-200'
                }`}
              src={user?.profile_pic || "/user.png"}
              alt="user avatar"
              onError={(e) => {
                e.target.src = "/user.png";
              }}
            />

            <div className="flex flex-col min-w-0 flex-1">
              <p className={`font-medium text-xs sm:text-sm truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'
                }`}>
                {user.id === currUser?.uid
                  ? `${user?.username} (You)`
                  : user?.username}
              </p>
            </div>
          </Link>
        ))
        }
      </div>
    </div>
  );
}

export default ChatPanel