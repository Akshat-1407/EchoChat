import { useParams } from "react-router-dom"
import { MessageSquareText, PlusIcon, SendIcon } from 'lucide-react';
import { useState } from "react";

function Chats() {

  const {chatId} = useParams();

  const [msg, setMsg] = useState("");


  if (!chatId)
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

      {/* Reciever Info */}
      <div className="flex items-center gap-6 py-2 bg-gray-300 h-14" >
        <div className="flex items-center">
          <img 
            onClick={() => { setShowProfile(true) }} 
            className='h-11 cursor-pointer object-cover rounded-full border-1 border-solid border-black ml-5 mr-4 ' 
            src={"/user.png"} alt="user" 
          />
          <p className="mr-auto">Reciever's Name</p>
        </div>
      </div>


      {/* Message list */}
    <div className="flex-grow bg-[#eff2f5]">
            Chat Id : {chatId}
    </div>


      {/* Chat Input */}
      <div className="bg-[#eff2f5] py-3 px-6 shadow flex items-center gap-6">
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