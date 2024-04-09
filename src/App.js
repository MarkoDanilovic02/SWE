import React, { useState, useEffect } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "./firebase-config";
import CreateRoomComponent from "./components/CreateRoomComponent";
import RoomsListComponent from "./components/RoomsListComponent";
import ChatComponent from "./components/ChatComponent";

function App() {
  const [user, setUser] = useState(null);
  const [currentRoom, setCurrentRoom] = useState("");

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = provider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        // const email = error.email;
        // The AuthCredential type that was used.
        // const credential = provider.credentialFromError(error);
        console.error(errorMessage);
      });
  };

  const signOutUser = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
        console.error(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in.
        setUser(currentUser);
      } else {
        // User is signed out.
        setUser(null);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <button onClick={signOutUser}>Sign Out</button>
          <CreateRoomComponent user={user} />
          <RoomsListComponent
            onSelectRoom={(roomId) => setCurrentRoom(roomId)}
          />
          {currentRoom && <ChatComponent roomId={currentRoom} user={user} />}
        </>
      ) : (
        <button onClick={signInWithGoogle}>Sign In with Google</button>
      )}
    </div>
  );
}

export default App;
