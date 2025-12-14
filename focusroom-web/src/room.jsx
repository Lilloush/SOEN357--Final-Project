import { useEffect, useMemo, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

/* ---------------- Icons ---------------- */
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

/* ---------------- Participants ---------------- */
function ParticipantsPanel({
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
        <h3>Participants</h3>
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
                    <span
                      className={`status-pill ${p.micOn ? "ok" : "bad"}`}
                      title={p.micOn ? "Mic on" : "Mic off"}
                    >
                      <MicIcon on={p.micOn} className="status-svg" />
                    </span>
                    <span
                      className={`status-pill ${p.camOn ? "ok" : "bad"}`}
                      title={p.camOn ? "Camera on" : "Camera off"}
                    >
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

/* ---------------- Room ---------------- */
function Room({ user, roomCode, onLeave, participants = [] }) {
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);

  const [screenSharing, setScreenSharing] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [fileType, setFileType] = useState("");

  const [whiteboardOn, setWhiteboardOn] = useState(false);

  const fileInputRef = useRef(null);

  const audioRef = useRef(null);
  const micStreamRef = useRef(null);

  const videoRef = useRef(null);
  const camStreamRef = useRef(null);

  const screenVideoRef = useRef(null);
  const screenStreamRef = useRef(null);

  /* ---------- Whiteboard ---------- */
  const wbViewportRef = useRef(null); // scroll container
  const wbCanvasRef = useRef(null);

  const wbImgInputRef = useRef(null);
  const wbPdfInputRef = useRef(null);

  const wbBgTypeRef = useRef("none"); // none | image | pdf
  const wbImgUrlRef = useRef("");
  const wbImgRef = useRef(null);

  const wbPdfUrlRef = useRef("");
  const wbPdfDocRef = useRef(null);
  const wbPdfPagesRef = useRef([]); // [{canvas, w, h, x, y}]

  const wbGapRef = useRef(18);

  const isDrawingRef = useRef(false);
  const isPanningRef = useRef(false);
  const panStartRef = useRef({ x: 0, y: 0, sx: 0, sy: 0 });

  const [wbTool, setWbTool] = useState("pen"); // pen | eraser | hand
  const [wbColor, setWbColor] = useState("#111827");
  const [wbSize, setWbSize] = useState(4);
  const [wbStrokes, setWbStrokes] = useState([]); // { tool, color, size, points:[{x,y}] }

  const isImageFile = fileType.startsWith("image/");
  const isFileOpen = Boolean(fileUrl);

  const mode = screenSharing
    ? "screen"
    : whiteboardOn
    ? "whiteboard"
    : isFileOpen
    ? "file"
    : "none";

  const isSharing = mode !== "none";

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

      wbClearBackground();
    };
  }, []);

  useEffect(() => {
    if (camOn && camStreamRef.current && videoRef.current) {
      videoRef.current.srcObject = camStreamRef.current;
      videoRef.current.play().catch(() => {});
    }
  }, [camOn, mode]);

  useEffect(() => {
    if (screenSharing && screenStreamRef.current && screenVideoRef.current) {
      screenVideoRef.current.srcObject = screenStreamRef.current;
      screenVideoRef.current.play().catch(() => {});
    }
  }, [screenSharing]);

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
        if (whiteboardOn) setWhiteboardOn(false);
        if (fileUrl) clearOpenedFile();

        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
        screenStreamRef.current = stream;

        const track = stream.getVideoTracks()[0];
        if (track) track.onended = () => stopScreenShare();

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
    if (screenVideoRef.current) screenVideoRef.current.srcObject = null;
    setScreenSharing(false);
  }

  function handleOpenFileClick() {
    fileInputRef.current?.click();
  }

  function clearOpenedFile() {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl("");
    setFileName("");
    setFileType("");
  }

  function handleFileChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (screenSharing) stopScreenShare();
    if (whiteboardOn) setWhiteboardOn(false);

    if (fileUrl) URL.revokeObjectURL(fileUrl);

    const url = URL.createObjectURL(file);
    setFileUrl(url);
    setFileName(file.name);
    setFileType(file.type || "");
  }

  /* ---------- Whiteboard helpers ---------- */
  function fitToWidth(srcW, srcH, maxW) {
    const scale = maxW / srcW;
    return { w: maxW, h: srcH * scale };
  }

  function wbClearBackground() {
    if (wbImgUrlRef.current) {
      URL.revokeObjectURL(wbImgUrlRef.current);
      wbImgUrlRef.current = "";
    }
    wbImgRef.current = null;

    if (wbPdfUrlRef.current) {
      URL.revokeObjectURL(wbPdfUrlRef.current);
      wbPdfUrlRef.current = "";
    }
    wbPdfDocRef.current = null;
    wbPdfPagesRef.current = [];

    wbBgTypeRef.current = "none";
  }

  function wbSetCanvasSize(width, height) {
    const canvas = wbCanvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    if (!canvas) return;

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function wbRedraw() {
    const viewport = wbViewportRef.current;
    const canvas = wbCanvasRef.current;
    if (!viewport || !canvas) return;

    const ctx = canvas.getContext("2d");
    const w = parseFloat(canvas.style.width || "0");
    const h = parseFloat(canvas.style.height || "0");

    ctx.clearRect(0, 0, w, h);

    if (wbBgTypeRef.current === "image" && wbImgRef.current) {
      ctx.drawImage(wbImgRef.current, 0, 0, w, h);
    }

    if (wbBgTypeRef.current === "pdf") {
      for (const p of wbPdfPagesRef.current) {
        ctx.drawImage(p.canvas, p.x, p.y, p.w, p.h);
      }
    }

    for (const s of wbStrokes) {
      ctx.save();
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.lineWidth = s.size;

      if (s.tool === "eraser") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.strokeStyle = "rgba(0,0,0,1)";
      } else {
        ctx.globalCompositeOperation = "source-over";
        ctx.strokeStyle = s.color;
      }

      ctx.beginPath();
      for (let i = 0; i < s.points.length; i++) {
        const p = s.points[i];
        if (i === 0) ctx.moveTo(p.x, p.y);
        else ctx.lineTo(p.x, p.y);
      }
      ctx.stroke();
      ctx.restore();
    }
  }

  // keep canvas synced with viewport size + pdf pages layout
  useEffect(() => {
    if (!whiteboardOn) return;

    const viewport = wbViewportRef.current;
    if (!viewport) return;

    const resize = async () => {
      const rect = viewport.getBoundingClientRect();
      const pad = 18;
      const contentW = Math.max(200, rect.width - pad * 2);

      if (wbBgTypeRef.current === "pdf" && wbPdfDocRef.current) {
        await wbRenderAllPdfPages(contentW, pad);
      } else if (wbBgTypeRef.current === "image" && wbImgRef.current) {
        wbSetCanvasSize(rect.width, rect.height);
        wbRedraw();
      } else {
        wbSetCanvasSize(rect.width, rect.height);
        wbRedraw();
      }
    };

    resize();

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(viewport);

    return () => ro.disconnect();
    
  }, [whiteboardOn]);

  useEffect(() => {
    if (!whiteboardOn) return;
    wbRedraw();
    
  }, [wbStrokes, whiteboardOn]);

  /* ---------- Whiteboard: pointer coords with scroll ---------- */
  function wbPos(e) {
    const viewport = wbViewportRef.current;
    const canvas = wbCanvasRef.current;
    if (!viewport || !canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left + viewport.scrollLeft;
    const y = e.clientY - rect.top + viewport.scrollTop;
    return { x, y };
  }

  function wbPointerDown(e) {
    if (!whiteboardOn) return;

    if (wbTool === "hand") {
      isPanningRef.current = true;
      const viewport = wbViewportRef.current;
      panStartRef.current = {
        x: e.clientX,
        y: e.clientY,
        sx: viewport ? viewport.scrollLeft : 0,
        sy: viewport ? viewport.scrollTop : 0,
      };
      return;
    }

    isDrawingRef.current = true;
    const p = wbPos(e);
    setWbStrokes((prev) => [
      ...prev,
      { tool: wbTool, color: wbColor, size: wbSize, points: [p] },
    ]);
  }

  function wbPointerMove(e) {
    if (!whiteboardOn) return;

    if (isPanningRef.current && wbTool === "hand") {
      const viewport = wbViewportRef.current;
      if (!viewport) return;

      const dx = e.clientX - panStartRef.current.x;
      const dy = e.clientY - panStartRef.current.y;

      viewport.scrollLeft = panStartRef.current.sx - dx;
      viewport.scrollTop = panStartRef.current.sy - dy;
      return;
    }

    if (!isDrawingRef.current) return;

    const p = wbPos(e);
    setWbStrokes((prev) => {
      if (prev.length === 0) return prev;
      const next = [...prev];
      const last = { ...next[next.length - 1] };
      last.points = [...last.points, p];
      next[next.length - 1] = last;
      return next;
    });
  }

  function wbPointerUp() {
    isDrawingRef.current = false;
    isPanningRef.current = false;
  }

  function wbClear() {
    setWbStrokes([]);
  }

  function wbUndo() {
    setWbStrokes((prev) => prev.slice(0, -1));
  }

  function wbDownload() {
    const canvas = wbCanvasRef.current;
    if (!canvas) return;

    const out = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = out;
    a.download = `whiteboard-${roomCode}.png`;
    a.click();
  }

  /* ---------- Whiteboard: add IMAGE ---------- */
  function wbOpenImage() {
    wbImgInputRef.current?.click();
  }

  function wbImageChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    wbClearBackground();
    setWbStrokes([]);

    const url = URL.createObjectURL(file);
    wbImgUrlRef.current = url;

    const img = new Image();
    img.onload = () => {
      wbImgRef.current = img;
      wbBgTypeRef.current = "image";

      const viewport = wbViewportRef.current;
      if (!viewport) return;

      const rect = viewport.getBoundingClientRect();
      wbSetCanvasSize(rect.width, rect.height);

      const ctx = wbCanvasRef.current.getContext("2d");
      ctx.clearRect(0, 0, rect.width, rect.height);
      ctx.drawImage(img, 0, 0, rect.width, rect.height);

      wbRedraw();
    };
    img.src = url;
  }

  /* ---------- Whiteboard: add PDF  ---------- */
  function wbOpenPdf() {
    wbPdfInputRef.current?.click();
  }

  async function wbPdfChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      alert("Please choose a PDF file.");
      return;
    }

    try {
      wbClearBackground();
      setWbStrokes([]);

      const url = URL.createObjectURL(file);
      wbPdfUrlRef.current = url;

      const doc = await pdfjsLib.getDocument({ url }).promise;
      wbPdfDocRef.current = doc;
      wbBgTypeRef.current = "pdf";

      const viewport = wbViewportRef.current;
      if (!viewport) return;

      const rect = viewport.getBoundingClientRect();
      const pad = 18;
      const contentW = Math.max(200, rect.width - pad * 2);

      await wbRenderAllPdfPages(contentW, pad);

      viewport.scrollTop = 0;
      viewport.scrollLeft = 0;
    } catch (err) {
      console.error(err);
      alert("Could not open this PDF.");
    }
  }

  async function wbRenderAllPdfPages(contentW, pad) {
    const doc = wbPdfDocRef.current;
    const viewport = wbViewportRef.current;
    if (!doc || !viewport) return;

    const gap = wbGapRef.current;

    const pages = [];
    let y = pad;

    for (let i = 1; i <= doc.numPages; i++) {
      const page = await doc.getPage(i);
      const base = page.getViewport({ scale: 1 });
      const scale = (contentW / base.width) * 2; 
      const vp = page.getViewport({ scale });

      const off = document.createElement("canvas");
      off.width = Math.floor(vp.width);
      off.height = Math.floor(vp.height);

      const ctx = off.getContext("2d");
      await page.render({ canvasContext: ctx, viewport: vp }).promise;

      const display = fitToWidth(off.width, off.height, contentW);

      pages.push({
        canvas: off,
        x: pad,
        y,
        w: display.w,
        h: display.h,
      });

      y += display.h + gap;
    }

    wbPdfPagesRef.current = pages;

    const rect = viewport.getBoundingClientRect();
    const totalH = y + pad - gap;

    wbSetCanvasSize(rect.width, totalH);
    wbRedraw();
  }

  function wbRemoveBackground() {
    wbClearBackground();
    setWbStrokes([]);
    const viewport = wbViewportRef.current;
    if (!viewport) return;
    const rect = viewport.getBoundingClientRect();
    wbSetCanvasSize(rect.width, rect.height);
    wbRedraw();
  }

  function toggleWhiteboard() {
    setWhiteboardOn((prev) => {
      const next = !prev;
      if (next) {
        if (screenSharing) stopScreenShare();
        if (fileUrl) clearOpenedFile();
      }
      return next;
    });
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

    if (fileUrl) clearOpenedFile();
    wbClearBackground();

    onLeave();
  }

  return (
    <div className="room-page">
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

      <div className={`room-main ${isSharing ? "share" : "normal"}`}>
        <div className="room-stage">
          {/* ---------------- WHITEBOARD ---------------- */}
          {mode === "whiteboard" && (
            <div className="share-stage">
              <div className="file-share-stack">
                <div className="share-center">
                  <div className="whiteboard-card">
                    <div className="whiteboard-toolbar">
                      <div className="wb-left">
                        <button
                          type="button"
                          className={`tool-btn ${wbTool === "pen" ? "active" : ""}`}
                          onClick={() => setWbTool("pen")}
                        >
                          Pen
                        </button>
                        <button
                          type="button"
                          className={`tool-btn ${wbTool === "eraser" ? "active" : ""}`}
                          onClick={() => setWbTool("eraser")}
                        >
                          Eraser
                        </button>
                        <button
                          type="button"
                          className={`tool-btn ${wbTool === "hand" ? "active" : ""}`}
                          onClick={() => setWbTool("hand")}
                        >
                          Hand
                        </button>

                        <input
                          type="color"
                          className="color-input"
                          value={wbColor}
                          onChange={(e) => setWbColor(e.target.value)}
                          title="Color"
                          disabled={wbTool !== "pen"}
                        />

                        <div className="wb-size">
                          <span>Size</span>
                          <input
                            type="range"
                            min="1"
                            max="18"
                            value={wbSize}
                            onChange={(e) => setWbSize(Number(e.target.value))}
                          />
                        </div>
                      </div>

                      <div className="wb-right">
                        <button type="button" className="tool-btn" onClick={wbUndo}>
                          Undo
                        </button>
                        <button type="button" className="tool-btn danger" onClick={wbClear}>
                          Clear
                        </button>

                        <button type="button" className="tool-btn" onClick={wbOpenImage}>
                          Add image
                        </button>
                        <input
                          type="file"
                          accept="image/*"
                          ref={wbImgInputRef}
                          style={{ display: "none" }}
                          onChange={wbImageChange}
                        />

                        <button type="button" className="tool-btn" onClick={wbOpenPdf}>
                          Add PDF
                        </button>
                        <input
                          type="file"
                          accept="application/pdf"
                          ref={wbPdfInputRef}
                          style={{ display: "none" }}
                          onChange={wbPdfChange}
                        />

                        <button type="button" className="tool-btn" onClick={wbRemoveBackground}>
                          Remove bg
                        </button>

                        <button type="button" className="tool-btn" onClick={wbDownload}>
                          Download
                        </button>
                      </div>
                    </div>

                    <div className="whiteboard-viewport" ref={wbViewportRef}>
                      <canvas
                        ref={wbCanvasRef}
                        className={`whiteboard-canvas ${wbTool === "hand" ? "hand" : ""}`}
                        onPointerDown={wbPointerDown}
                        onPointerMove={wbPointerMove}
                        onPointerUp={wbPointerUp}
                        onPointerCancel={wbPointerUp}
                        onPointerLeave={wbPointerUp}
                      />
                    </div>
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
                      <video
                        ref={videoRef}
                        className="pip-video"
                        autoPlay
                        playsInline
                        muted
                      />
                    </div>
                    <div className="pip-footer">
                      <span className="pip-name">{user.name} (You)</span>
                      <div className="video-actions">
                        <button
                          type="button"
                          className={`icon-toggle ${micOn ? "on" : "off"}`}
                          onClick={toggleMic}
                          title={micOn ? "Mute mic" : "Unmute mic"}
                        >
                          <MicIcon on={micOn} className="status-svg" />
                        </button>
                        <button
                          type="button"
                          className={`icon-toggle ${camOn ? "on" : "off"}`}
                          onClick={toggleCam}
                          title={camOn ? "Turn camera off" : "Turn camera on"}
                        >
                          <CamIcon on={camOn} className="status-svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---------------- FILE ---------------- */}
          {mode === "file" && (
            <div className="share-stage">
              <div className="file-share-stack">
                <div className="share-center">
                  <div className="file-viewer file-viewer-with-canvas">
                    {isImageFile ? (
                      <img src={fileUrl} alt={fileName} className="file-image" />
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
                        <button type="button" className={`icon-toggle ${micOn ? "on" : "off"}`} onClick={toggleMic}>
                          <MicIcon on={micOn} className="status-svg" />
                        </button>
                        <button type="button" className={`icon-toggle ${camOn ? "on" : "off"}`} onClick={toggleCam}>
                          <CamIcon on={camOn} className="status-svg" />
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---------------- SCREEN ---------------- */}
          {mode === "screen" && (
            <div className="share-stage">
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
                      <button type="button" className={`icon-toggle ${micOn ? "on" : "off"}`} onClick={toggleMic}>
                        <MicIcon on={micOn} className="status-svg" />
                      </button>
                      <button type="button" className={`icon-toggle ${camOn ? "on" : "off"}`} onClick={toggleCam}>
                        <CamIcon on={camOn} className="status-svg" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ---------------- NONE ---------------- */}
          {mode === "none" && (
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
                        <button type="button" className={`icon-toggle ${micOn ? "on" : "off"}`} onClick={toggleMic}>
                          <MicIcon on={micOn} className="status-svg" />
                        </button>
                        <button type="button" className={`icon-toggle ${camOn ? "on" : "off"}`} onClick={toggleCam}>
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
            <p>Screen share: <strong>{screenSharing ? "On" : "Off"}</strong></p>
            <p>Opened file: <strong>{fileName || "No file opened"}</strong></p>
            <p>Whiteboard: <strong>{whiteboardOn ? "On" : "Off"}</strong></p>
          </div>

          <div className="room-controls">
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

            <button onClick={toggleWhiteboard}>
              {whiteboardOn ? "Close whiteboard" : "Open whiteboard"}
            </button>

            {fileUrl && <button onClick={clearOpenedFile}>Close file</button>}
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Room;
