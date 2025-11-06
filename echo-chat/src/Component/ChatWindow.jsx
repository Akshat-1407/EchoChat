import { arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';
import { db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import { useEffect, useState } from "react";
import { useAuth } from "./AuthWrapper";
  

function Chats() {

  const [msg, setMsg] = useState("");
  const [recieverUser, setRecieverUser] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const { chatId: recieverId } = useParams();
  const { currUser: sender } = useAuth();


  const chatId =
    sender?.uid > recieverId
      ? `${sender?.uid}-${recieverId}`
      : `${recieverId}-${sender?.uid}`;


  const handleSendMsg = async () => {
    if (msg) {
      // date
      const date = new Date();
      const timeStamp = date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });


      // start chat with user 
      if (msgList?.length === 0) {
        await setDoc(doc(db, "user-chats", chatId), {
          chatId: chatId,
          messages: [
            {
              text: msg,
              time: timeStamp,
              sender: sender?.uid,
              receiver: recieverId,
            },
          ],
        });
      } 
      else {
        // update in the message list
        await updateDoc(doc(db, "user-chats", chatId), {
          chatId: chatId,
          // arrayUnion is used here to append to last message to the array list.
          messages: arrayUnion({
            text: msg,
            time: timeStamp,
            sender: sender?.uid,
            receiver: recieverId,
          }),
        });
      }
      setMsg("");
    }
  }
    

  useEffect(() => {
    (async function () {
      const userDocRef = doc(db, "users", recieverId);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          setRecieverUser(docSnap.data())
        } 
    })()

    // message list
    const msgUnsubscribe = onSnapshot(doc(db, "user-chats", chatId), (doc) => {
      setMsgList(doc.data()?.messages || []);
    });

    return () => {
      msgUnsubscribe();
    }

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
    <div className='flex flex-col h-screen w-[75vw]'>

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
      <div className="flex flex-col flex-grow mr-3 ml-3 p-5 rounded-md bg-[#eff2f5] overflow-y-scroll no-scrollbar">
        {msgList?.map((m, index) => (
          <div
            key={index}
            data-sender={m.sender === sender.uid}
            // break-words is the edge case where a single word is quite long, so we need to break that word before it breaks our ui.
            className={`bg-white w-fit rounded-md p-2 mb-4 shadow-sm max-w-[400px] break-words data-[sender=true]:ml-auto data-[sender=true]:bg-green-100 `}
          >
            <p>{m?.text}</p>
            <p className="text-xs text-neutral-500 text-end">
              {m?.time}
            </p>
          </div>
        ))}
      </div>


      {/* Chat Input */}
      <div className="bg-gray-300 py-3 m-3 rounded-md px-6 shadow flex items-center gap-6">
        <PlusIcon className="cursor-pointer"/>

        <input type="text" className="bg-white w-full py-2 px-4 rounded focus:outline-none"
          placeholder="Type a message..."
          value={msg}
          onChange={(e) => { setMsg(e.target.value) }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMsg();
            }
          }}
        />

        <button className="cursor-pointer" onClick={handleSendMsg}><SendIcon/></button>
      </div>


    </div>
  )
}

export default Chats