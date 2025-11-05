import { useParams } from "react-router-dom"
import { MessageSquareText } from 'lucide-react';

function Chats() {

  const {chatId} = useParams();


  if (!chatId)
    return (
      <section className="w-[75vw] h-screen flex flex-col gap-4 items-center justify-center">
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
    <div className='w-[75vw]'>Chat Id : {chatId}</div>
  )
}

export default Chats