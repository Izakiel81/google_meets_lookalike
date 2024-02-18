import React from 'react';
import TextChat from './components/ui/chat-page/text-chat/TextChat';
import VideoChat from './components/ui/chat-page/video-chat/VideoChat';


function App() {
  return (
    <div className="App">
      <VideoChat/>
     <TextChat/>
    </div>
  );
}

export default App;
