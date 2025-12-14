import { useState, useRef, useEffect, useMemo } from "react";

function MicIcon({ on, className = "" }) {
  return on ? (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11a7 7 0 0 1-14 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 21h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M9 5v6a3 3 0 0 0 5.2 2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 9V6a3 3 0 0 0-5.2-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 11a7 7 0 0 1-9 6.7"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 18v3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 21h8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3l18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CamIcon({ on, className = "" }) {
  return on ? (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M14 8H6a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 10l4-2v8l-4-2v-4Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ) : (
    <svg className={className} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M10.5 8H6a3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-1.3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 10l4-2v8l-4-2"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 3l18 18"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ParticipantsPanel({
  title = "Participants",
  participants,
  isYouId,
  micOn,
  camOn,
  toggleMic,
  toggleCam,
}) {
  return (
    <div className="participants-panel">
      <div className="participants-header">
        <h3>{title}</h3>
        <span className="participants-count">{participants.length}</span>
      </div>

      <ul className="participants-list">
        {participants.map((p) => {
          const isMe = p.id === isYouId;

          return (
            <li key={p.id} className="participant-row">
              <div className="participant-left">
                <span className="participant-name">
                  {p.name} {isMe ? <span className="you-badge">You</span> : null}
                </span>
              </div>

              <div className="participant-right">
                {isMe ? (
                  <>
                    <button
                      type="button"
                      className={`status-pill clickable ${micOn ? "ok" : "bad"}`}
                      onClick={toggleMic}
                      title={micOn ? "Mute mic" : "Unmute mic"}
                      aria-label={micOn ? "Mute mic" : "Unmute mic"}
                    >
                      <MicIcon on={micOn} className="status-svg" />
                    </button>

                    <button
                      type="button"
                      className={`status-pill clickable ${camOn ? "ok" : "bad"}`}
                      onClick={toggleCam}
                      title={camOn ? "Turn camera off" : "Turn camera on"}
                      aria-label={camOn ? "Turn camera off" : "Turn camera on"}
                    >
                      <CamIcon on={camOn} className="status-svg" />
                    </button>
                  </>
                ) : (
                  <>
                    <span className={`status-pill ${p.micOn ? "ok" : "bad"}`} title={p.micOn ? "Mic on" : "Mic off"}>
                      <MicIcon on={p.micOn} className="status-svg" />
                    </span>
                    <span className={`status-pill ${p.camOn ? "ok" : "bad"}`} title={p.camOn ? "Camera on" : "Camera off"}>
                      <CamIcon on={p.camOn} className="status-svg" />
                    </span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Room({ user, roomCode, onLeave, participants = [] }) {
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);
  const [screenSharing, setScreenSharing] = useState(false);

  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const fileInputRef = useRef(null);

  const audioRef = useRef(null);
  const micStreamRef = useRef(null);

  const videoRef = useRef(null);
  const camStreamRef = useRef(null);

  const screenVideoRef = useRef(null);
  const screenStreamRef = useRef(null);

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  const isImage = fileType.startsWith("image/");
  const isSharing = screenSharing || Boolean(fileUrl);

  const effectiveParticipants = useMemo(() => {
    if (participants && participants.length > 0) return participants;
    return [{ id: "me", name: user.name, micOn, camOn }];
  }, [participants, user.name, micOn, camOn]);

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.autoplay = true;

    return () => {
      if (micStreamRef.current) micStreamRef.current.getTracks().forEach((t) => t.stop());
      if (audioRef.current) audioRef.current.srcObject = null;

      if (camStreamRef.current) camStreamRef.current.getTracks().forEach((t) => t.stop());
      if (videoRef.current) videoRef.current.srcObject = null;

      if (screenStreamRef.current) screenStreamRef.current.getTracks().forEach((t) => t.stop());
      if (screenVideoRef.current) screenVideoRef.current.srcObject = null;

      if (fileUrl) URL.revokeObjectURL(fileUrl);
    };
  }, []);

  useEffect(() => {
    if (camOn && camStreamRef.current && videoRef.current) {
      videoRef.current.srcObject = camStreamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [camOn]);

  useEffect(() => {
    if (screenSharing && screenStreamRef.current && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStreamRef.current;
      screenVideoRef.current.play().catch(() => {});
    }
  }, [screenSharing]);

  useEffect(() => {
    if (!fileUrl || !isImage || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const parent = canvas.parentElement;
    if (!parent) return;

    const rect = parent.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, [fileUrl, isImage]);

  async function toggleMic() {
    if (!micOn) {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("Your browser does not support microphone access.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
        if (audioRef.current) audioRef.current.srcObject = stream;
        setMicOn(true);
      } catch (err) {
        console.error(err);
        alert("Could not access microphone.");
        setMicOn(false);
      }
    } else {
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
        micStreamRef.current = null;
      }
      if (audioRef.current) audioRef.current.srcObject = null;
      setMicOn(false);
    }
  }

  async function toggleCam() {
    if (!camOn) {
      if (!navigator.mediaDevices?.getUserMedia) {
        alert("Your browser does not support camera access.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        camStreamRef.current = stream;
        setCamOn(true);
      } catch (err) {
        console.error(err);
        alert("Could not access camera.");
        setCamOn(false);
      }
    } else {
      if (camStreamRef.current) {
        camStreamRef.current.getTracks().forEach((t) => t.stop());
        camStreamRef.current = null;
      }
      if (videoRef.current) videoRef.current.srcObject = null;
      setCamOn(false);
    }
  }

  async function toggleScreenShare() {
    if (!screenSharing) {
      if (!navigator.mediaDevices?.getDisplayMedia) {
        alert("Your browser does not support screen sharing.");
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
        screenStreamRef.current = stream;

        const track = stream.getVideoTracks()[0];
        if (track) {
          track.onended = () => stopScreenShare();
        }

        setScreenSharing(true);
      } catch (err) {
        console.error(err);
        alert("Could not start screen sharing.");
        setScreenSharing(false);
      }
    } else {
      stopScreenShare();
    }
  }

  function stopScreenShare() {
    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    if (screenVideoRef.current) {
      screenVideoRef.current.srcObject = null;
    }
    setScreenSharing(false);
  }

  function handleOpenFileClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (fileUrl) URL.revokeObjectURL(fileUrl);

    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFileName(file.name);
    setFileType(file.type || "");
  }

  function handleLeave() {
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioRef.current) audioRef.current.srcObject = null;

    if (camStreamRef.current) {
      camStreamRef.current.getTracks().forEach((t) => t.stop());
      camStreamRef.current = null;
    }
    if (videoRef.current) videoRef.current.srcObject = null;

    if (screenStreamRef.current) {
      screenStreamRef.current.getTracks().forEach((t) => t.stop());
      screenStreamRef.current = null;
    }
    if (screenVideoRef.current) screenVideoRef.current.srcObject = null;

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl("");
    }

    onLeave();
  }

  function getCanvasPos(e) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  function handleCanvasDown(e) {
    if (!isImage || !fileUrl) return;
    isDrawingRef.current = true;
    lastPointRef.current = getCanvasPos(e);
  }

  function handleCanvasMove(e) {
    if (!isDrawingRef.current || !canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const { x, y } = getCanvasPos(e);
    const last = lastPointRef.current;

    ctx.strokeStyle = "#ef4444";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(last.x, last.y);
    ctx.lineTo(x, y);
    ctx.stroke();

    lastPointRef.current = { x, y };
  }

  function handleCanvasUp() {
    isDrawingRef.current = false;
  }

  function handleClearAnnotations() {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  }

  function handleDownloadAnnotated() {
    if (!fileUrl || !isImage || !canvasRef.current) {
      alert("Saving works only for images with annotations in this prototype.");
      return;
    }

    const baseImg = new Image();
    baseImg.onload = () => {
      const w = canvasRef.current.width;
      const h = canvasRef.current.height;
      const temp = document.createElement("canvas");
      temp.width = w;
      temp.height = h;
      const tctx = temp.getContext("2d");

      tctx.drawImage(baseImg, 0, 0, w, h);
      tctx.drawImage(canvasRef.current, 0, 0);

      const dataUrl = temp.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = fileName ? `annotated-${fileName}.png` : "annotated.png";
      a.click();
    };
    baseImg.src = fileUrl;
  }

  return (
    <div className="room-page">
      <header className="room-topbar">
        <div className="room-topbar-left">
          <span className="room-title">Room {roomCode}</span>
          <span className="room-subtitle">You are in a live session as {user.name}</span>
        </div>

        <div className="room-topbar-right">
          <button className="leave-btn" onClick={handleLeave}>
            Leave room
          </button>
        </div>
      </header>

      <div className={`room-main ${isSharing ? "share" : "normal"}`}>
        <div className="room-stage">
          {isSharing ? (
            <div className="share-stage">
              {/* FILE SHARING: centered file + participants under it */}
              {fileUrl ? (
                <div className="file-share-stack">
                  <div className="share-center">
                    <div className="file-viewer file-viewer-with-canvas">
                      {isImage ? (
                        <>
                          <img src={fileUrl} alt={fileName} className="file-image" />
                          <canvas
                            ref={canvasRef}
                            className="file-canvas"
                            onMouseDown={handleCanvasDown}
                            onMouseMove={handleCanvasMove}
                            onMouseUp={handleCanvasUp}
                            onMouseLeave={handleCanvasUp}
                          />
                        </>
                      ) : (
                        <iframe src={fileUrl} title={fileName} className="file-frame" />
                      )}
                    </div>
                  </div>

                  <div className="share-center">
                    <ParticipantsPanel
                      participants={effectiveParticipants}
                      isYouId="me"
                      micOn={micOn}
                      camOn={camOn}
                      toggleMic={toggleMic}
                      toggleCam={toggleCam}
                    />
                  </div>

                  {camOn && (
                    <div className="pip-camera pip-left">
                      <div className="pip-videoBox">
                        <video ref={videoRef} className="pip-video" autoPlay playsInline muted />
                      </div>
                      <div className="pip-footer">
                        <span className="pip-name">{user.name} (You)</span>
                        <div className="video-actions">
                          <button
                            type="button"
                            className={`icon-toggle ${micOn ? "on" : "off"}`}
                            onClick={toggleMic}
                            title={micOn ? "Mute mic" : "Unmute mic"}
                            aria-label={micOn ? "Mute mic" : "Unmute mic"}
                          >
                            <MicIcon on={micOn} className="status-svg" />
                          </button>
                          <button
                            type="button"
                            className={`icon-toggle ${camOn ? "on" : "off"}`}
                            onClick={toggleCam}
                            title={camOn ? "Turn camera off" : "Turn camera on"}
                            aria-label={camOn ? "Turn camera off" : "Turn camera on"}
                          >
                            <CamIcon on={camOn} className="status-svg" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* SCREEN SHARING: big screen + PiP */
                <>
                  <div className="screen-viewer">
                    <video ref={screenVideoRef} className="screen-video" autoPlay playsInline muted />
                  </div>

                  {camOn && (
                    <div className="pip-camera">
                      <div className="pip-videoBox">
                        <video ref={videoRef} className="pip-video" autoPlay playsInline muted />
                      </div>
                      <div className="pip-footer">
                        <span className="pip-name">{user.name} (You)</span>
                        <div className="video-actions">
                          <button
                            type="button"
                            className={`icon-toggle ${micOn ? "on" : "off"}`}
                            onClick={toggleMic}
                            title={micOn ? "Mute mic" : "Unmute mic"}
                            aria-label={micOn ? "Mute mic" : "Unmute mic"}
                          >
                            <MicIcon on={micOn} className="status-svg" />
                          </button>
                          <button
                            type="button"
                            className={`icon-toggle ${camOn ? "on" : "off"}`}
                            onClick={toggleCam}
                            title={camOn ? "Turn camera off" : "Turn camera on"}
                            aria-label={camOn ? "Turn camera off" : "Turn camera on"}
                          >
                            <CamIcon on={camOn} className="status-svg" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          ) : (
            <>
              {camOn && (
                <div className="video-grid">
                  <div className="video-tile you">
                    <div className="video-box">
                      <video ref={videoRef} className="video-element" autoPlay playsInline muted />
                    </div>

                    <div className="video-footer">
                      <span className="video-name">{user.name} (You)</span>

                      <div className="video-actions">
                        <button
                          type="button"
                          className={`icon-toggle ${micOn ? "on" : "off"}`}
                          onClick={toggleMic}
                          title={micOn ? "Mute mic" : "Unmute mic"}
                          aria-label={micOn ? "Mute mic" : "Unmute mic"}
                        >
                          <MicIcon on={micOn} className="status-svg" />
                        </button>

                        <button
                          type="button"
                          className={`icon-toggle ${camOn ? "on" : "off"}`}
                          onClick={toggleCam}
                          title={camOn ? "Turn camera off" : "Turn camera on"}
                          aria-label={camOn ? "Turn camera off" : "Turn camera on"}
                        >
                          <CamIcon on={camOn} className="status-svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <ParticipantsPanel
                participants={effectiveParticipants}
                isYouId="me"
                micOn={micOn}
                camOn={camOn}
                toggleMic={toggleMic}
                toggleCam={toggleCam}
              />
            </>
          )}
        </div>

        <aside className="room-sidebar">
          <h3>Session controls</h3>

          <div className="shared-panel">
            <p>
              Screen share: <strong>{screenSharing ? "On" : "Off"}</strong>
            </p>
            <p>
              Opened file: <strong>{fileName || "No file opened"}</strong>
            </p>
          </div>

          <div className="room-controls">
            <button onClick={toggleScreenShare}>
              {screenSharing ? "Stop screen share" : "Share screen"}
            </button>

            <button onClick={handleOpenFileClick}>Open file</button>

            <input type="file" ref={fileInputRef} style={{ display: "none" }} onChange={handleFileChange} />

            {fileUrl && isImage && (
              <>
                <button onClick={handleClearAnnotations}>Clear annotations</button>
                <button onClick={handleDownloadAnnotated}>Download annotated copy</button>
              </>
            )}
          </div>

          <p className="room-note">
            <br />
          </p>
        </aside>
      </div>
    </div>
  );
}

export default Room;
