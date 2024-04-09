import React, { useState, useEffect } from "react";
import { db } from "../firebase-config"; // This should point to your Firebase setup
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
} from "firebase/firestore";

const ChatComponent = ({ roomId, user }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!roomId) return;

    const q = query(
      collection(db, "messages"),
      where("roomId", "==", roomId),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesArray = [];
      querySnapshot.forEach((doc) => {
        messagesArray.push(doc.data());
      });
      setMessages(messagesArray);
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    try {
      await addDoc(collection(db, "messages"), {
        roomId,
        message,
        user: user.uid,
        userName: user.displayName,
        createdAt: new Date(),
      });
      setMessage("");
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.userName}: </strong>
            {msg.message}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatComponent;
