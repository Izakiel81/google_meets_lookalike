import React from 'react';
import {socket} from '../../../context/socket';
interface Props{

}


function TextChat({}: Props) {
  const [message, setMessage] = React.useState<string>("");
  const [messageReceived, setMessageReceived] = React.useState<string[]>([]);

  const sendMessage = () => {
    socket.emit("send-message", message);
    setMessageReceived([...messageReceived, message]);
    setMessage("");
  };

  React.useEffect(() => {
    socket.on("receive-message", (message: string) => {
      setMessageReceived([...messageReceived, message]);
      console.log(message + "\n-----" + messageReceived);
    });
  }, [socket]);

  return (
    <div>
      <input
        type="text"
        name=""
        id=""
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
      {messageReceived.map((message: string) => (
        <h3>{message}</h3>
      ))}
    </div>
  );
}

export default TextChat