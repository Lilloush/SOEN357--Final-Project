// VirtualRoom.jsx
function VirtualRoom({ user, onBackHome, onLogout }) {
  return (
    <div className="main-page">
      <header className="topbar">
        <div className="topbar-left">
          <span className="logo-dot" />
          <span className="logo-text">FocusRoom</span>
          <span className="logged-as">
            Virtual room entry — {user.name}
          </span>
        </div>
        <div className="topbar-right">
          <button className="ghost-btn" onClick={onBackHome}>
            Back to dashboard
          </button>
          <button onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="main-center">
        <div className="virtual-room-card">
          <h2>FocusRoom Virtual World</h2>
          <p className="virtual-sub">
            This screen is the UI entry point required for Team&nbsp;2. In the
            final integrated prototype, clicking the button below will open the
            Unity 3D space built by Team&nbsp;1.
          </p>

          <div className="virtual-preview">
            {/* Replace the src with your exported render path if needed */}
            <img
              src="/focusroom-3d-main.png"
              alt="Preview of the FocusRoom 3D space"
            />
          </div>

          <div className="virtual-actions">
            <button
              onClick={() =>
                alert(
                  "Prototype: this would launch the Unity 3D FocusRoom build."
                )
              }
            >
              Launch Virtual Room (prototype)
            </button>
            <small>
              For the demo, you can switch to the Unity window after pressing
              this button to simulate a seamless transition.
            </small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VirtualRoom;
