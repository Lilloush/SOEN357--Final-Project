// App.jsx
import { useState, useEffect } from "react";
import "./App.css";
import LoginPage from "./Login";
import MainPage from "./mainPage";
import Room from "./room";
import Profile from "./Profile";
import Settings from "./Settings";
import VirtualRoom from "./VirtualRoom";

const DEFAULT_PREFERENCES = {
  darkMode: false,
  autoJoinMic: false,
  autoJoinCam: false,
  notifications: true,
};

function App() {
  // ---- USER STATE (PERSISTENT) ----
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") return null;
    try {
      const stored = localStorage.getItem("focusroom-user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [currentRoom, setCurrentRoom] = useState(null); // room code string or null
  const [currentView, setCurrentView] = useState("home"); // "home" | "profile" | "settings" | "virtual"

  // ---- PREFERENCES STATE (shared with Settings) ----
  const [preferences, setPreferences] = useState(() => {
    if (typeof window === "undefined") return DEFAULT_PREFERENCES;
    try {
      const stored = localStorage.getItem("focusroom-preferences");
      return stored ? { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) } : DEFAULT_PREFERENCES;
    } catch {
      return DEFAULT_PREFERENCES;
    }
  });

  // Persist preferences whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(
        "focusroom-preferences",
        JSON.stringify(preferences)
      );
    } catch {
      // ignore storage errors in this prototype
    }
  }, [preferences]);

  // Apply dark mode class to <body>
  useEffect(() => {
    const cls = "focusroom-dark";
    if (preferences.darkMode) {
      document.body.classList.add(cls);
    } else {
      document.body.classList.remove(cls);
    }
  }, [preferences.darkMode]);

  // Persist user whenever it changes (for auto-login on refresh)
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem("focusroom-user", JSON.stringify(user));
      } else {
        localStorage.removeItem("focusroom-user");
      }
    } catch {
      // ignore storage errors
    }
  }, [user]);

  // Central logout handler
  function handleLogout() {
    try {
      localStorage.removeItem("focusroom-user");
    } catch {
      // ignore
    }
    setCurrentRoom(null);
    setUser(null);
    setCurrentView("home");
  }

  // ---- ROUTING ----

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
        // you could pass preferences here later, e.g. for auto mic/cam
        // preferences={preferences}
      />
    );
  }

  // Other views (profile, settings, virtual room preview)
  if (currentView === "profile") {
    return (
      <Profile
        user={user}
        onBackHome={() => setCurrentView("home")}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === "settings") {
    return (
      <Settings
        user={user}
        preferences={preferences}
        setPreferences={setPreferences}
        onBackHome={() => setCurrentView("home")}
        onLogout={handleLogout}
      />
    );
  }

  if (currentView === "virtual") {
    return (
      <VirtualRoom
        user={user}
        onBackHome={() => setCurrentView("home")}
        onLogout={handleLogout}
      />
    );
  }

  // Logged in but on home dashboard
  return (
    <MainPage
      user={user}
      onLogout={handleLogout}
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
