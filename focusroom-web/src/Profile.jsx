// Profile.jsx
function Profile({ user, onBackHome, onLogout }) {
  const initials =
    user.name
      .split(" ")
      .map((p) => p[0])
      .join("")
      .toUpperCase() || "U";

  return (
    <div className="main-page">
      <header className="topbar">
        <div className="topbar-left">
          <span className="logo-dot" />
          <span className="logo-text">FocusRoom</span>
          <span className="logged-as">Profile of {user.name}</span>
        </div>
        <div className="topbar-right">
          <button className="ghost-btn" onClick={onBackHome}>
            Back to dashboard
          </button>
          <button onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="main-center">
        <div className="profile-card">
          <div className="profile-header">
            <div className="profile-avatar">{initials}</div>
            <div>
              <h2>{user.name}</h2>
              <p className="profile-sub">
                Class / team code:{" "}
                <strong>{user.code || "Not specified"}</strong>
              </p>
            </div>
          </div>

          <div className="profile-section">
            <h3>My rooms</h3>
            <p>
              In this prototype, rooms are joined from the main dashboard. In
              the final version, this page could list upcoming sessions,
              teaching groups, or project teams.
            </p>
          </div>

          <div className="profile-section">
            <h3>About FocusRoom</h3>
            <p>
              FocusRoom is a lightweight immersive space for presentation
              practice and study sessions. This profile screen is part of the
              non-3D UI prototype required by the project brief.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
