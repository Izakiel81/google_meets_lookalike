import React from 'react';
import {socket} from '../../../context/socket';
import { useChatHistorySlice } from '../../../hooks/store/useChatHistorySlice';
import { useActions } from '../../../hooks/store/useActions';
interface Props{

}


const TextChat:React.FC = () => {
  const [message, setMessage] = React.useState<string>("");

  const sendMessage = () => {
    socket.emit("send-message", message);
    addMessage(message);
    setMessage("");
  };

  const {chatHistory: messageHistory} = useChatHistorySlice();
  const {addMessage} = useActions();
  React.useEffect(() => {
    socket.on("receive-message", (message: string) => {
      addMessage(message);
    });
  }, [socket]);

  return (
    <div>
      <div>
      {messageHistory.messages.map((message: string, index: number) => (
        <h3 key={index}>{message}</h3>
      ))}
      </div>
      <input
        type="text"
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      
    </div>
  );
}

export default TextChat