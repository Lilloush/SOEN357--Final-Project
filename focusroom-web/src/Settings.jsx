// Settings.jsx
function Settings({ user, preferences, setPreferences, onBackHome, onLogout }) {
  function togglePreference(key) {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  }

  return (
    <div className="main-page">
      <header className="topbar">
        <div className="topbar-left">
          <span className="logo-dot" />
          <span className="logo-text">FocusRoom</span>
          <span className="logged-as">Settings — {user.name}</span>
        </div>
        <div className="topbar-right">
          <button className="ghost-btn" onClick={onBackHome}>
            Back to dashboard
          </button>
          <button onClick={onLogout}>Log out</button>
        </div>
      </header>

      <div className="main-center">
        <div className="settings-card">
          <h2>Session preferences</h2>
          <p className="settings-sub">
            These controls are part of the HCI prototype. They don&apos;t change
            system-wide behavior yet, but they are used in the evaluation of
            perceived control and usability.
          </p>

          <div className="settings-grid">
            <label className="toggle-row">
              <span>
                Dark mode
                <small>Use a darker color palette for long sessions.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.darkMode}
                onChange={() => togglePreference("darkMode")}
              />
            </label>

            <label className="toggle-row">
              <span>
                Join with microphone on
                <small>Automatically enable mic when entering a room.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.autoJoinMic}
                onChange={() => togglePreference("autoJoinMic")}
              />
            </label>

            <label className="toggle-row">
              <span>
                Join with camera on
                <small>Automatically enable camera when entering a room.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.autoJoinCam}
                onChange={() => togglePreference("autoJoinCam")}
              />
            </label>

            <label className="toggle-row">
              <span>
                Notifications
                <small>Allow reminders for upcoming FocusRoom sessions.</small>
              </span>
              <input
                type="checkbox"
                checked={preferences.notifications}
                onChange={() => togglePreference("notifications")}
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
