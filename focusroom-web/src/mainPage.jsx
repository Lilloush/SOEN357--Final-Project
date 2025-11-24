// mainPage.jsx
import { useState } from "react";

function MainPage({
  user,
  onLogout,
  onEnterRoom,
  onShowProfile,
  onShowSettings,
  onShowVirtualRoom,
}) {
  const [roomCodeInput, setRoomCodeInput] = useState("");
  const [myRooms, setMyRooms] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(true); // toggle state

  function handleJoinRoom(e) {
    e.preventDefault();
    const code = roomCodeInput.trim().toUpperCase();
    if (!code) return;

    setMyRooms((prev) => (prev.includes(code) ? prev : [...prev, code]));
    setRoomCodeInput("");

    // jump directly into the room after joining
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

  function handleLogout() {
    setMenuOpen(false);
    onLogout();
  }

  return (
    <div className="main-page">
      {/* Top bar */}
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
                <button onClick={handleLogout}>Log out</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <div className="main-center">
        <div className="main-layout">
          {/* My rooms (toggleable side panel) */}
          <section
            className={`my-rooms ${roomsOpen ? "open" : "collapsed"}`}
          >
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
                      <button
                        className="small-btn"
                        onClick={() => onEnterRoom(code)}
                      >
                        Enter
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>

          {/* Join room  */}
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
              If the room does not exist yet, it will be created and added to
              your list.
            </small>
          </section>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
