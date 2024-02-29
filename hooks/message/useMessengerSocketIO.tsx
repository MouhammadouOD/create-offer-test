import { appEnv } from "@config/index";
import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

interface Imessage extends MessengerMessageData {
    Company : CompanyData;
    CreatorMOM: AccountData;
}

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage"; // Name of the event
const SOCKET_SERVER_URL = appEnv.serverUrl;

const useMessengerSocketIO = ( messengerId  : number | null) => {
  const [listMessage, setListMessage] = useState<MessengerMessageData[] | []>([]); // Sent and received messages
  const socketRef = useRef<any>();

  useEffect(() => {
    
    // Creates a WebSocket connection
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { messengerId },
    });

    //Notify on socket connection
    socketRef.current.on('connect', ()=>{
        console.log('========== socket connection on client ============', socketRef.current);
    })
    
    // Listens for incoming messages
    socketRef?.current?.on(NEW_CHAT_MESSAGE_EVENT, (message : any) => {
      const incomingMessage = {
        ...message
      };
      console.log('======== Message From Socket io ============', incomingMessage)
      setListMessage((listMessage) => [...listMessage, incomingMessage]);
      console.log('======== listMessage after update ============', listMessage)
    });
    
    // Destroys the socket reference
    // when the connection is closed
    return () => {
      socketRef.current.disconnect();
      console.log('======== disconnect socket ============')
    };
  }, [messengerId]);

  // Sends a message to the server that
  // forwards it to all users in the same room
  const sendMessage = (messageBody : Imessage | null) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT,messageBody 
        
    );
  };

  return { listMessage, setListMessage, sendMessage };
};

export default useMessengerSocketIO