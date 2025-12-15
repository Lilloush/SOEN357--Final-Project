// mainPage.jsx
import { useEffect, useState } from "react";

function MainPage({
  user,
  onLogout,
  onEnterRoom,
  onShowProfile,
  onShowSettings,
  onShowVirtualRoom,
}) {
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const storageKey = `focusroom_myRooms_v1_${user?.name || "anon"}`;

  const [myRooms, setMyRooms] = useState(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [menuOpen, setMenuOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(true);

  function normalizeCode(value) {
    return String(value || "").trim().toUpperCase();
  }

  function persistRooms(list) {
    try {
      localStorage.setItem(storageKey, JSON.stringify(list));
    } catch {}
  }

  useEffect(() => {
    persistRooms(myRooms);
  }, [myRooms]);

  function handleJoinRoom(e) {
    e.preventDefault();
    const code = normalizeCode(roomCodeInput);
    if (!code) return;

    const nextRooms = myRooms.includes(code) ? myRooms : [...myRooms, code];

    persistRooms(nextRooms);
    setMyRooms(nextRooms);
    setRoomCodeInput("");

    onEnterRoom(code);
  }

  function handleMenuClick() {
    setMenuOpen((prev) => !prev);
  }

  function handleProfile() {
    setMenuOpen(false);
    onShowProfile();
  }

  function handleSettings() {
    setMenuOpen(false);
    onShowSettings();
  }

  function handleLogoutClick() {
    setMenuOpen(false);
    onLogout();
  }

  return (
    <div className="main-page">
      <header className="topbar">
        <div className="topbar-left">
          <span className="logo-dot" />
          <span className="logo-text">FocusRoom</span>
          <span className="logged-as">Logged in as {user.name}</span>
        </div>

        <div className="topbar-right">
          <button className="ghost-btn" onClick={onShowVirtualRoom}>
            Enter 3D Room
          </button>

          <div className="menu-wrapper">
            <button className="menu-btn" onClick={handleMenuClick}>
              ☰
            </button>

            {menuOpen && (
              <div className="menu-dropdown">
                <button onClick={handleSettings}>Parameters</button>
                <button onClick={handleProfile}>My profile</button>
                <button onClick={handleLogoutClick}>Log out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      <h1 className="welcome-text">Welcome to FocusRoom, {user.name}</h1>

      <div className="main-center">
        <div className="main-layout">
          <section className={`my-rooms ${roomsOpen ? "open" : "collapsed"}`}>
            <div className="my-rooms-header">
              <h2>My rooms</h2>
              <button
                type="button"
                className="icon-btn"
                onClick={() => setRoomsOpen((prev) => !prev)}
                aria-label={roomsOpen ? "Hide rooms" : "Show rooms"}
              >
                {roomsOpen ? "←" : "→"}
              </button>
            </div>

            <div className="my-rooms-content">
              {myRooms.length === 0 ? (
                <p>No rooms yet. Join one with a code.</p>
              ) : (
                <ul>
                  {myRooms.map((code) => (
                    <li key={code}>
                      <span className="room-code">{code}</span>
                      <button className="small-btn" onClick={() => onEnterRoom(code)}>
                        Enter
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          <section className="join-room">
            <h2>Join a room</h2>
            <p>Enter a room code to join or create it.</p>

            <form onSubmit={handleJoinRoom} className="join-form">
              <input
                type="text"
                placeholder="e.g. TEAM123"
                value={roomCodeInput}
                onChange={(e) => setRoomCodeInput(e.target.value)}
              />
              <button type="submit">Join</button>
            </form>

            <small>
              If the room does not exist yet, it will be created and added to your list.
            </small>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
