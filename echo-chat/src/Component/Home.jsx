import { useNavigate } from 'react-router-dom';
import { useAuth } from "./AuthWrapper";
import ChatPanel from './ChatPanel.jsx';
import ChatWindow from "./ChatWindow.jsx"

function Home() {
    const {currUser} = useAuth();
    const navigate = useNavigate();


    if(currUser == null) {
      navigate("/login")
    }

    return <div className="flex">
      <ChatPanel></ChatPanel> 
      <ChatWindow></ChatWindow>
    </div>
}

export default Home