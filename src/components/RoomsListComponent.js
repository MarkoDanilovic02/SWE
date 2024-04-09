import React, { useEffect, useState } from "react";
import { db } from "../firebase-config"; // Ensure this is your Firebase configuration file
import { collection, query, onSnapshot } from "firebase/firestore";

const RoomsListComponent = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "rooms"));

    const sendJoinRequest = async (roomId) => {
      if (!user) {
        console.log("User not authenticated");
        return;
      }

      await addDoc(collection(db, "requests"), {
        roomId,
        userId: user.uid,
        status: "pending",
        requestedAt: new Date(),
      });
    };

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const roomsArray = [];
      querySnapshot.forEach((doc) => {
        roomsArray.push({ id: doc.id, ...doc.data() });
      });
      setRooms(roomsArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Available Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id} onClick={() => onSelectRoom(room.id)}>
            {room.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RoomsListComponent;
