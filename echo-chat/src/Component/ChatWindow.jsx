import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import { useEffect, useState } from "react";


  

function Chats() {

  const [msg, setMsg] = useState("");
  const [recieverUser, setRecieverUser] = useState(null);

  const {chatId: recieverId } = useParams();


  useEffect(() => {
    (async function () {
      const userDocRef = doc(db, "users", recieverId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setRecieverUser(docSnap.data())
        } 
    })()
  }, [recieverId]);
  

  if (!recieverId)
    return (
      <section className="w-[70vw] h-screen flex flex-col gap-4 items-center justify-center">
        <MessageSquareText
          className="w-28 h-28 text-gray-400"
          strokeWidth={1.2}
        />
        <p className="text-sm text-center text-gray-400">
          select any contact to
          <br />
          start a chat with.
        </p>
      </section>
    );


  return (
    <div className='flex flex-col w-[75vw]'>

      {/* Reciever's Profile */}
      <div className="flex items-center gap-6 bg-gray-300 rounded-md m-3 h-14 py-6" >
        <div className="flex items-center">
          <img 
            className='h-11 cursor-pointer object-cover rounded-full border-1 border-solid border-black ml-5 mr-4 ' 
            src={recieverUser?.profile_pic || "/user.png"} alt="user" 
          />
          <p className="mr-auto">{recieverUser?.username}</p>
        </div>
      </div>


      {/* Message list */}
      <div className="flex-grow mr-3 ml-3 rounded-md bg-[#eff2f5]">
              {/* Chat Id : {recieverId} */}
      </div>


      {/* Chat Input */}
      <div className="bg-gray-300 py-3 m-3 rounded-md px-6 shadow flex items-center gap-6">
        <PlusIcon className="cursor-pointer"/>

        <input type="text" className="bg-white w-full py-2 px-4 rounded focus:outline-none"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => { setMsg(e.target.value) }}
          // onKeyDown={(e) => {
          //   if (e.key === "Enter") {
          //     handleSendMsg();
          //   }
          // }}
        />

        <button className="cursor-pointer"><SendIcon/></button>
      </div>


    </div>
  )
}

export default Chats