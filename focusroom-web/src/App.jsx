import { useState } from "react";
import "./App.css";
import LoginPage from "./Login";
import MainPage from "./mainPage";
import Room from "./room";

function App() {
  const [user, setUser] = useState(null); // { name, code } or null
  const [currentRoom, setCurrentRoom] = useState(null); // room code string or null

  // Not logged in > login
  if (!user) {
    return <LoginPage onLogin={setUser} />;
  }

  // Logged in and inside a room > show room
  if (currentRoom) {
    return (
      <Room
        user={user}
        roomCode={currentRoom}
        onLeave={() => setCurrentRoom(null)}
      />
    );
  }

  // Logged in but not in a room > main page
  return (
    <MainPage
      user={user}
      onLogout={() => {
        setCurrentRoom(null);
        setUser(null);
      }}
      onEnterRoom={(code) => setCurrentRoom(code)}
    />
  );
}

export default App;
