import { useState, useRef, useEffect } from "react";

function Room({ user, roomCode, onLeave }) {
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

  const canvasRef = useRef(null);
  const isDrawingRef = useRef(false);
  const lastPointRef = useRef({ x: 0, y: 0 });

  const isImage = fileType.startsWith("image/");

  // init + cleanup
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.autoplay = true;

    return () => {
      // mic
      if (micStreamRef.current) {
        micStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioRef.current) {
        audioRef.current.srcObject = null;
      }
      // camera
      if (camStreamRef.current) {
        camStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      // file url
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
    
  }, []);

  // when camOn changes, attach stream to <video>
  useEffect(() => {
    if (camOn && camStreamRef.current && videoRef.current) {
      videoRef.current.srcObject = camStreamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [camOn]);

  // when an image is loaded, size the canvas
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

  // ---- MIC -------
  async function toggleMic() {
    if (!micOn) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Your browser does not support microphone access.");
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        micStreamRef.current = stream;
        if (audioRef.current) {
          audioRef.current.srcObject = stream;
        }
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
      if (audioRef.current) {
        audioRef.current.srcObject = null;
      }
      setMicOn(false);
    }
  }

  // ---- CAMERA ----
  async function toggleCam() {
    if (!camOn) {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
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
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setCamOn(false);
    }
  }

  function toggleScreenShare() {
    setScreenSharing((prev) => !prev);
  }

  function handleOpenFileClick() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
    }

    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFileName(file.name);
    setFileType(file.type || "");
  }

  function handleLeave() {
    // mic
    if (micStreamRef.current) {
      micStreamRef.current.getTracks().forEach((t) => t.stop());
      micStreamRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.srcObject = null;
    }

    // camera
    if (camStreamRef.current) {
      camStreamRef.current.getTracks().forEach((t) => t.stop());
      camStreamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }

    // file url
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl("");
    }

    onLeave();
  }

  // ---- drawing on image ----
  function getCanvasPos(e) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
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
      {/* Top bar */}
      <header className="room-topbar">
        <div className="room-topbar-left">
          <span className="room-title">Room {roomCode}</span>
          <span className="room-subtitle">
            You are in a live session as {user.name}
          </span>
        </div>

        <div className="room-topbar-right">
          <button className="leave-btn" onClick={handleLeave}>
            Leave room
          </button>
        </div>
      </header>

      {/* Main content */}
      <div className="room-main">
        {/* LEFT COLUMN */}
        {!fileUrl ? (
          /* ORIGINAL layout: big camera filling the left column */
          <div className="video-grid">
            <div className="video-tile you">
              <div className="video-box">
                {camOn ? (
                  <video
                    ref={videoRef}
                    className="video-element"
                    autoPlay
                    playsInline
                    muted
                  />
                ) : (
                  <span className="video-placeholder off">
                    Camera off (turn it on below)
                  </span>
                )}
              </div>
              <div className="video-footer">
                <span className="video-name">{user.name} (You)</span>
                <span className="video-status">
                  {micOn ? "🎤 Mic on" : "🔇 Mic off"}
                </span>
              </div>
            </div>
          </div>
        ) : (
          /* FILE SHARING layout: file big + small floating camera */
          <div className="room-main-left">
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
                <iframe
                  src={fileUrl}
                  title={fileName}
                  className="file-frame"
                />
              )}
            </div>

            <div className="video-tile you floating-camera">
              <div className="video-box">
                {camOn ? (
                  <video
                    ref={videoRef}
                    className="video-element"
                    autoPlay
                    playsInline
                    muted
                  />
                ) : (
                  <span className="video-placeholder off">
                    Camera off (turn it on below)
                  </span>
                )}
              </div>
              <div className="video-footer">
                <span className="video-name">{user.name} (You)</span>
                <span className="video-status">
                  {micOn ? "🎤 Mic on" : "🔇 Mic off"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* RIGHT COLUMN: sidebar (always visible) */}
        <aside className="room-sidebar">
          <h3>Session controls</h3>

          <div className="shared-panel">
            <p>
              Screen share:{" "}
              <strong>{screenSharing ? "Not working yet" : "Off"}</strong>
            </p>
            <p>
              Opened file:{" "}
              <strong>{fileName || "No file opened"}</strong>
            </p>
          </div>

          <div className="room-controls">
            <button onClick={toggleMic}>
              {micOn ? "Mute mic" : "Unmute mic"}
            </button>
            <button onClick={toggleCam}>
              {camOn ? "Turn camera off" : "Turn camera on"}
            </button>
            <button onClick={toggleScreenShare}>
              {screenSharing ? "Stop screen share" : "Share screen"}
            </button>
            <button onClick={handleOpenFileClick}>Open file</button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileChange}
            />

            {fileUrl && isImage && (
              <>
                <button onClick={handleClearAnnotations}>
                  Clear annotations
                </button>
                <button onClick={handleDownloadAnnotated}>
                  Download annotated copy
                </button>
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
