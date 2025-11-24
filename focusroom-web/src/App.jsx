// App.jsx
import { useState } from "react";
import "./App.css";
import LoginPage from "./Login";
import MainPage from "./mainPage";
import Room from "./room";
import Profile from "./Profile";
import Settings from "./Settings";
import VirtualRoom from "./VirtualRoom";

function App() {
  const [user, setUser] = useState(null); // { name, code } or null
  const [currentRoom, setCurrentRoom] = useState(null); // room code string or null
  const [currentView, setCurrentView] = useState("home"); // "home" | "profile" | "settings" | "virtual"

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
        onLeave={() => {
          setCurrentRoom(null);
          setCurrentView("home");
        }}
      />
    );
  }

  // Other views (profile, settings, virtual room preview)
  if (currentView === "profile") {
    return (
      <Profile
        user={user}
        onBackHome={() => setCurrentView("home")}
        onLogout={() => {
          setCurrentRoom(null);
          setUser(null);
          setCurrentView("home");
        }}
      />
    );
  }

  if (currentView === "settings") {
    return (
      <Settings
        user={user}
        onBackHome={() => setCurrentView("home")}
        onLogout={() => {
          setCurrentRoom(null);
          setUser(null);
          setCurrentView("home");
        }}
      />
    );
  }

  if (currentView === "virtual") {
    return (
      <VirtualRoom
        user={user}
        onBackHome={() => setCurrentView("home")}
        onLogout={() => {
          setCurrentRoom(null);
          setUser(null);
          setCurrentView("home");
        }}
      />
    );
  }

  // Logged in but on home dashboard
  return (
    <MainPage
      user={user}
      onLogout={() => {
        setCurrentRoom(null);
        setUser(null);
        setCurrentView("home");
      }}
      onEnterRoom={(code) => {
        setCurrentRoom(code);
      }}
      onShowProfile={() => setCurrentView("profile")}
      onShowSettings={() => setCurrentView("settings")}
      onShowVirtualRoom={() => setCurrentView("virtual")}
    />
  );
}

export default App;
