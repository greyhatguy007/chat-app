import React, { useEffect, useState, useRef } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy
} from "firebase/firestore";
import { auth, db } from "./../firebase-config";

const Chat = ({ setInChat, room }) => {
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesRef = collection(db, "messages");
  const messagesContainerRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      userEmail: auth.currentUser.email,
      room: room,
    });
    setNewMessage("");
  };

  useEffect(() => {
    const queryMessage = query(messagesRef, where("room", "==", room),orderBy("createdAt"));
    const unsubscribe = onSnapshot(queryMessage, (snapshot) => {
      const messages = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      // messages.sort((a, b) => a.createdAt - b.createdAt);
      setMessages(messages);
    });
    return () => unsubscribe();
  }, []);

  // Scroll to the bottom of the messages container when new messages are added
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
      <div>
        <p className="text-center text-black text-xl py-2">Current Room: {room}</p>
      </div>
      <div
        ref={messagesContainerRef}
        className="max-h-96 overflow-y-auto bg-gray-200 px-4 py-2 mb-4 rounded-lg"
      >
        {messages.map((message) => (
          
          <div className="odd:bg-gray-300">
            <p key={message.id}>
            <b>{message.user}</b>: {message.text}
          </p>
          
          </div>
        ))}
      </div>
      <div>
        <form onSubmit={handleSubmit} className="flex flex-row justify-around">
          <input
            type="text"
            placeholder="Type Your Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="bg-gray-100 focus:outline-none rounded-lg px-2 py-1.5 mx-2.5"
          />
          <button
            type="submit"
            className="mx-2.5 bg-blue-600 rounded-lg px-2 py-0.5 hover:bg-blue-700"
          >
            Send
          </button>
        </form>
      </div>
      <div>
        <button
          onClick={() => setInChat(false)}
          className="bg-gray-200 hover:bg-white rounded-lg py-0.5 px-1.5 my-3"
        >
          Leave Chat
        </button>
      </div>
    </div>
    </div>
  );
};

export default Chat;
