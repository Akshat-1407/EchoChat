import { arrayRemove, arrayUnion, doc, getDoc, onSnapshot, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";
import { useParams } from "react-router-dom";
import { MessageSquareText, PlusIcon, SendIcon, ArrowLeft, Trash2, Edit3 } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "./AuthWrapper";

function Chats({ onBack, theme }) {
  const [msg, setMsg] = useState("");
  const [recieverUser, setRecieverUser] = useState(null);
  const [msgList, setMsgList] = useState([]);
  const [hoveredMessageIndex, setHoveredMessageIndex] = useState(null);
  const [editingMessageIndex, setEditingMessageIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const { chatId: recieverId } = useParams();
  const { currUser: sender } = useAuth();

  const chatId =
    sender?.uid > recieverId
      ? `${sender?.uid}-${recieverId}`
      : `${recieverId}-${sender?.uid}`;

  const handleSendMsg = async () => {
    if (!msg.trim()) return;

    const date = new Date();
    const timeStamp = date.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

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
    } else {
      await updateDoc(doc(db, "user-chats", chatId), {
        messages: arrayUnion({
          text: msg,
          time: timeStamp,
          sender: sender?.uid,
          receiver: recieverId,
        }),
      });
    }

    setMsg("");
  };

  const handleDeleteMessage = async (index) => {
    try {
      const messageToDelete = msgList[index];
      const updatedMessages = msgList.filter((_, i) => i !== index);

      await updateDoc(doc(db, "user-chats", chatId), {
        messages: updatedMessages
      });
    } catch (error) {
      console.error("Error deleting message:", error);
    }
  };

  const handleEditMessage = async (index) => {
    if (!editText.trim()) return;

    try {
      const updatedMessages = msgList.map((message, i) =>
        i === index ? { ...message, text: editText, isEdited: true } : message
      );

      await updateDoc(doc(db, "user-chats", chatId), {
        messages: updatedMessages
      });

      setEditingMessageIndex(null);
      setEditText("");
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  const startEditingMessage = (index) => {
    setEditingMessageIndex(index);
    setEditText(msgList[index].text);
  };

  useEffect(() => {
    if (!recieverId) return;

    (async function () {
      const userDocRef = doc(db, "users", recieverId);
      const docSnap = await getDoc(userDocRef);
      if (docSnap.exists()) {
        setRecieverUser(docSnap.data());
      }
    })();

    const msgUnsubscribe = onSnapshot(
      doc(db, "user-chats", chatId),
      (docSnap) => {
        setMsgList(docSnap.data()?.messages ?? []);
      }
    );

    return () => msgUnsubscribe();
  }, [recieverId]);

  if (!recieverId)
    return (
      <section className={`flex flex-col items-center justify-center h-screen w-full md:w-[75vw] text-center p-4 sm:p-6 relative ${theme === 'dark'
        ? 'bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e3a4a]'
        : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
        }`}>
        {/* Back Button - Mobile Only */}
        <button
          onClick={onBack}
          className={`md:hidden absolute top-4 left-4 p-2 rounded-lg transition-all duration-300 ${theme === 'dark'
            ? 'hover:bg-white/20'
            : 'hover:bg-white/20'
            }`}
        >
          <ArrowLeft className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
            }`} />
        </button>

        <MessageSquareText
          className={`w-16 h-16 sm:w-24 sm:h-24 mb-3 sm:mb-4 ${theme === 'dark' ? 'text-cyan-400/40' : 'text-blue-300'
            }`}
          strokeWidth={1.2}
        />
        <p className={`text-xs sm:text-sm md:text-base px-2 max-w-lg ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}>
          Select a contact to start chatting
        </p>
      </section>
    );

  return (
    <div className={`flex flex-col h-screen w-full p-2 md:w-[75vw] ${theme === 'dark'
      ? 'bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e3a4a]'
      : 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100'
      }`}>

      {/* HEADER */}
      <div className={`backdrop-blur-xl border shadow-lg m-2 sm:m-3 rounded-lg sm:rounded-xl px-4 sm:px-6 py-2 sm:py-3 flex items-center gap-3 sm:gap-4 ${theme === 'dark'
        ? 'bg-white/10 border-white/20'
        : 'bg-white/50 border-white/30'
        }`}>
        {/* Back Button - Mobile Only */}
        <button
          onClick={onBack}
          className={`md:hidden p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${theme === 'dark'
            ? 'hover:bg-white/20'
            : 'hover:bg-white/30'
            }`}
        >
          <ArrowLeft className={`w-5 h-5 ${theme === 'dark' ? 'text-cyan-400' : 'text-gray-700'
            }`} />
        </button>

        <img
          className={`h-10 w-10 sm:h-12 sm:w-12 object-cover rounded-full flex-shrink-0 border ${theme === 'dark' ? 'border-cyan-400/50' : 'border-white'
            } shadow-md`}
          src={recieverUser?.profile_pic || "/user.png"}
          alt="user"
          onError={(e) => {
            e.target.src = "/user.png";
          }}
        />
        <div className="min-w-0 flex-1">
          <p className={`font-semibold text-sm sm:text-lg truncate ${theme === 'dark' ? 'text-white' : 'text-gray-800'
            }`}>
            {recieverUser?.username}
          </p>
           {recieverUser?.lastSeen && (
            <p className="text-xs text-neutral-400">
              last seen at {recieverUser?.lastSeen}
            </p>
          )}
        </div>
      </div>

      {/* MESSAGE AREA */}
      <div className={`flex flex-col flex-grow mx-2 sm:mx-3 mb-2 sm:mb-3 p-3 sm:p-4 rounded-lg sm:rounded-xl border shadow-md overflow-y-auto no-scrollbar space-y-2 sm:space-y-3 ${theme === 'dark'
        ? 'bg-white/10 border-white/20'
        : 'bg-white/50 border-white/30'
        }`}>

        {msgList?.map((m, index) => {
          const isSender = m.sender === sender.uid;

          return (
            <div
              key={index}
              className={`flex items-end gap-2 ${isSender ? 'flex-row-reverse' : 'flex-row'}`}
              onMouseLeave={() => setHoveredMessageIndex(null)}
            >
              {/* Message Bubble */}
              <div
                className={`max-w-[75%] md:max-w-[50%] py-2 px-4 mb-2 rounded-2xl shadow-md break-words transition-all duration-300 ${isSender
                  ? theme === 'dark'
                    ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white"
                    : "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                  : theme === 'dark'
                    ? "bg-gray-700/50 text-gray-100"
                    : "bg-white/70 text-gray-800"
                  }`}
                onMouseEnter={() => setHoveredMessageIndex(index)}
              >
                <p className="text-sm">{m?.text}</p>
                {m?.isEdited && (
                  <p className={`text-[8px] ${isSender ? 'text-white/60' : theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                    (edited)
                  </p>
                )}
                <p
                  className={`text-[10px] mt-1 text-right ${isSender ? "text-white/80" : theme === 'dark' ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                  {m?.time}
                </p>
              </div>

              {/* Edit and Delete Buttons Container */}
              {isSender && (
                <div className="flex flex-col gap-1">
                  {/* Edit Button */}
                  <button
                    onClick={() => startEditingMessage(index)}
                    className={`flex-shrink-0 rounded-lg transition-all duration-200 h-8 w-8 flex items-center justify-center ${hoveredMessageIndex === index
                      ? 'opacity-100 pointer-events-auto hover:scale-110 hover:bg-gray-500/20'
                      : 'opacity-0 pointer-events-none'
                      }`}
                  >
                    <Edit3 className={`w-4 h-4 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'
                      }`} />
                  </button>
                  {/* Delete Button */}
                  <button
                    onClick={() => handleDeleteMessage(index)}
                    className={`flex-shrink-0 rounded-lg transition-all duration-200 h-8 w-8 flex items-center justify-center ${hoveredMessageIndex === index
                      ? 'opacity-100 pointer-events-auto hover:scale-110 hover:bg-gray-500/20'
                      : 'opacity-0 pointer-events-none'
                      }`}
                  >
                    <Trash2 className={`w-4 h-4 ${theme === 'dark' ? 'text-red-400' : 'text-gray-500'
                      }`} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* INPUT AREA */}
      <div className={`backdrop-blur-xl border shadow-lg m-2 sm:m-3 rounded-lg sm:rounded-xl px-3 sm:px-4 py-2 sm:py-3 flex items-center gap-2 sm:gap-3 ${theme === 'dark'
        ? 'bg-white/10 border-white/20'
        : 'bg-white/50 border-white/30'
        }`}>

        {!editingMessageIndex && editingMessageIndex !== 0 ? (
          <>
            <PlusIcon className={`w-5 h-5 sm:w-6 sm:h-6 cursor-pointer hover:scale-110 transition flex-shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-blue-500'}`} />

            <input
              type="text"
              className={`flex-1 px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl shadow-sm focus:ring-2 text-xs sm:text-sm focus:outline-none transition ${theme === 'dark'
                ? 'bg-white/20 text-white placeholder-gray-400 focus:ring-cyan-400'
                : 'bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-400'
                }`}
              placeholder="Type a message..."
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMsg();
                }
              }}
            />

            <button
              onClick={handleSendMsg}
              className={`p-1.5 sm:p-2 rounded-lg sm:rounded-xl text-white hover:scale-105 active:scale-95 transition flex-shrink-0 ${theme === 'dark'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700'
                : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600'
                }`}
            >
              <SendIcon size={18} />
            </button>
          </>
        ) : (
          <>
            <div className="flex-1 flex flex-col gap-1">
              <p className={`text-xs pb-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                Editing message...
              </p>
              <input
                type="text"
                className={`w-full px-3 sm:px-4 py-2 sm:py-3 rounded-lg sm:rounded-xl shadow-sm focus:ring-2 text-xs sm:text-sm focus:outline-none transition ${theme === 'dark'
                  ? 'bg-white/20 text-white placeholder-gray-400 focus:ring-cyan-400'
                  : 'bg-white text-gray-800 placeholder-gray-400 focus:ring-blue-400'
                  }`}
                placeholder="Edit your message..."
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleEditMessage(editingMessageIndex);
                  } else if (e.key === "Escape") {
                    setEditingMessageIndex(null);
                    setEditText("");
                  }
                }}
                autoFocus
              />
            </div>

            <div className="flex gap-2 mt-5 ml-1 flex-shrink-0">
              <button
                onClick={() => handleEditMessage(editingMessageIndex)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm font-medium transition ${theme === 'dark'
                  ? 'bg-cyan-500 hover:bg-cyan-600 text-white'
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
                  }`}
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditingMessageIndex(null);
                  setEditText("");
                }}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-sm font-medium transition ${theme === 'dark'
                  ? 'bg-gray-600 hover:bg-gray-700 text-white'
                  : 'bg-gray-400 hover:bg-gray-500 text-white'
                  }`}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Chats;
