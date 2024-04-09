import React, { useState } from "react";
import { db } from "../firebase-config"; // Assume this exports initialized Firebase services
import { collection, addDoc } from "firebase/firestore";

const CreateRoomComponent = ({ user }) => {
  const [roomName, setRoomName] = useState("");

  const handleCreateRoom = async (e) => {
    e.preventDefault();
    if (!roomName.trim()) return;

    try {
      await addDoc(collection(db, "rooms"), {
        name: roomName,
        owner: user.uid,
        members: [user.uid], // Include the owner as the first member
        createdAt: new Date(),
      });
      setRoomName("");
      alert("Room created successfully!");
    } catch (error) {
      console.error("Error creating room: ", error);
      alert("Failed to create room.");
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateRoom}>
        <input
          type="text"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          placeholder="Enter room name"
          required
        />
        <button type="submit">Create Room</button>
      </form>
    </div>
  );
};

export default CreateRoomComponent;
