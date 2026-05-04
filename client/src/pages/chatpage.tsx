import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Phone, Video, Paperclip, Send, Mic, MicOff, VideoOff, PhoneOff } from "lucide-react";

interface Message {
  id: number;
  from: "user" | "worker";
  text: string;
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });

export default function ChatPage() {
  const navigate = useNavigate();
  const { workerId } = useParams<{ workerId: string }>();

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      from: "worker",
      text: "Assalamu Alaikum! I received your message. How can I help you?",
      time: getTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), from: "user", text: trimmed, time: getTime() },
    ]);
    setInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          from: "worker",
          text: "Shukriya! I will get back to you shortly. Please wait.",
          time: getTime(),
        },
      ]);
    }, 1200);
  };

  const handleVideoCall = () => {
    setIsCalling(true);
    setTimeout(() => {
      setIsCalling(false);
      setIsVideoOpen(true);
    }, 2000);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f5f5f5",
    }}>

      {/* ── HEADER ─────────────────────────────────────────────────────────── */}
      <div style={{
        background: "#1abc9c", height: "62px", display: "flex",
        alignItems: "center", padding: "0 20px", gap: "12px",
        boxShadow: "0 2px 12px rgba(0,0,0,0.12)", flexShrink: 0,
        position: "sticky", top: 0, zIndex: 50,
      }}>
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "rgba(255,255,255,0.2)", border: "none", color: "white",
            borderRadius: "50%", width: "38px", height: "38px",
            cursor: "pointer", display: "flex", alignItems: "center",
            justifyContent: "center", flexShrink: 0, transition: "background 0.18s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Avatar */}
        <div style={{
          width: "42px", height: "42px", borderRadius: "50%",
          background: "rgba(255,255,255,0.25)", display: "flex",
          alignItems: "center", justifyContent: "center",
          fontSize: "1.3rem", flexShrink: 0,
        }}>
          👷
        </div>

        {/* Name + status */}
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 700, fontSize: "1rem", color: "white" }}>
            Worker #{workerId}
          </div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.82)", display: "flex", alignItems: "center", gap: "5px" }}>
            <span style={{
              width: "7px", height: "7px", borderRadius: "50%",
              background: "#86efac", display: "inline-block",
            }} />
            Online · Available Now
          </div>
        </div>

        {/* Call buttons */}
        {[
          { icon: <Phone size={17} />, title: "Voice Call", action: () => {} },
          { icon: <Video size={17} />, title: "Video Call", action: handleVideoCall },
        ].map((btn) => (
          <button
            key={btn.title}
            onClick={btn.action}
            title={btn.title}
            style={{
              background: isCalling && btn.title === "Video Call"
                ? "rgba(255,255,255,0.4)"
                : "rgba(255,255,255,0.2)",
              border: "none", borderRadius: "50%",
              width: "40px", height: "40px", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "white", flexShrink: 0, transition: "background 0.18s",
              position: "relative",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.35)")}
            onMouseLeave={e => (e.currentTarget.style.background = isCalling && btn.title === "Video Call" ? "rgba(255,255,255,0.4)" : "rgba(255,255,255,0.2)")}
          >
            {btn.icon}
            {isCalling && btn.title === "Video Call" && (
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                border: "2px solid white",
                animation: "chatRipple 1s linear infinite",
              }} />
            )}
          </button>
        ))}
      </div>

      {/* ── MESSAGES ───────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "20px 16px",
        display: "flex", flexDirection: "column", gap: "10px",
      }}>
        {/* Date divider */}
        <div style={{ textAlign: "center", marginBottom: "4px" }}>
          <span style={{
            background: "#e5e7eb", color: "#888", fontSize: "0.7rem",
            padding: "3px 12px", borderRadius: "10px", fontWeight: 600,
          }}>
            Today
          </span>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.from === "user" ? "flex-end" : "flex-start",
              alignItems: "flex-end", gap: "8px",
            }}
          >
            {msg.from === "worker" && (
              <div style={{
                width: "30px", height: "30px", borderRadius: "50%",
                background: "#1abc9c", display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "0.9rem", flexShrink: 0,
              }}>
                👷
              </div>
            )}
            <div style={{
              maxWidth: "68%",
              background: msg.from === "user" ? "#1abc9c" : "white",
              color: msg.from === "user" ? "white" : "#111",
              borderRadius: msg.from === "user"
                ? "18px 18px 4px 18px"
                : "18px 18px 18px 4px",
              padding: "10px 14px",
              fontSize: "0.88rem",
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
              lineHeight: 1.5,
            }}>
              <div>{msg.text}</div>
              <div style={{ fontSize: "0.65rem", marginTop: "4px", opacity: 0.65, textAlign: "right" }}>
                {msg.time}
              </div>
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* ── INPUT BAR ──────────────────────────────────────────────────────── */}
      <div style={{
        background: "white", padding: "12px 16px",
        borderTop: "1px solid #e5e7eb",
        display: "flex", gap: "10px", alignItems: "center", flexShrink: 0,
      }}>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#aaa", display: "flex", alignItems: "center" }}>
          <Paperclip size={18} />
        </button>
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          style={{
            flex: 1, border: "1.5px solid #e5e7eb", borderRadius: "22px",
            padding: "10px 16px", fontSize: "0.88rem", outline: "none",
            fontFamily: "inherit", background: "#f5f5f5", color: "#111",
            transition: "border-color 0.15s",
          }}
          onFocus={e => (e.currentTarget.style.borderColor = "#1abc9c")}
          onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
        />
        <button
          onClick={sendMessage}
          style={{
            width: "42px", height: "42px", borderRadius: "50%",
            background: "#1abc9c", border: "none", cursor: "pointer",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "white", flexShrink: 0, transition: "background 0.18s",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#17a589")}
          onMouseLeave={e => (e.currentTarget.style.background = "#1abc9c")}
        >
          <Send size={16} />
        </button>
      </div>

      {/* ── VIDEO CALL OVERLAY ─────────────────────────────────────────────── */}
      {isVideoOpen && (
        <div
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            zIndex: 200, display: "flex", alignItems: "center",
            justifyContent: "center", backdropFilter: "blur(3px)",
          }}
        >
          <div style={{
            background: "#0f172a", borderRadius: "20px",
            width: "min(420px, 93vw)", overflow: "hidden",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)",
            fontFamily: "'Segoe UI', Arial, sans-serif",
          }}>
            {/* Video area */}
            <div style={{
              height: "260px",
              background: "linear-gradient(135deg,#0f2027,#203a43,#2c5364)",
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              position: "relative",
            }}>
              <div style={{ fontSize: "3.8rem", marginBottom: "10px" }}>👷</div>
              <div style={{ color: "white", fontWeight: 700, fontSize: "1rem" }}>Worker #{workerId}</div>
              <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.78rem", marginTop: "4px" }}>
                Connecting...
              </div>

              {/* Self preview */}
              <div style={{
                position: "absolute", bottom: "12px", right: "12px",
                width: "72px", height: "72px", background: "#1e293b",
                borderRadius: "10px", border: "2px solid rgba(255,255,255,0.2)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "1.6rem",
              }}>
                🧑
              </div>

              {/* LIVE badge */}
              <div style={{
                position: "absolute", top: "12px", left: "12px",
                background: "#ef4444", color: "white",
                fontSize: "0.65rem", fontWeight: 700,
                padding: "3px 9px", borderRadius: "8px",
                display: "flex", alignItems: "center", gap: "5px",
              }}>
                <span style={{
                  width: "6px", height: "6px", borderRadius: "50%",
                  background: "white", display: "inline-block",
                  animation: "chatPulse 1s infinite",
                }} />
                LIVE
              </div>

              {/* Duration timer */}
              <div style={{
                position: "absolute", top: "12px", right: "12px",
                color: "rgba(255,255,255,0.7)", fontSize: "0.72rem", fontWeight: 600,
              }}>
                00:00
              </div>
            </div>

            {/* Controls */}
            <div style={{
              padding: "20px 24px",
              display: "flex", justifyContent: "space-around", alignItems: "center",
            }}>
              {[
                {
                  icon: micOn ? <Mic size={18} /> : <MicOff size={18} />,
                  label: micOn ? "Mute" : "Unmute",
                  color: micOn ? "#334155" : "#64748b",
                  action: () => setMicOn(p => !p),
                },
                {
                  icon: camOn ? <Video size={18} /> : <VideoOff size={18} />,
                  label: camOn ? "Camera" : "No Cam",
                  color: camOn ? "#334155" : "#64748b",
                  action: () => setCamOn(p => !p),
                },
                {
                  icon: <PhoneOff size={18} />,
                  label: "End",
                  color: "#ef4444",
                  action: () => setIsVideoOpen(false),
                },
              ].map((btn) => (
                <button
                  key={btn.label}
                  onClick={btn.action}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    gap: "6px", background: btn.color, border: "none",
                    borderRadius: "14px", padding: "14px 20px",
                    cursor: "pointer", color: "white",
                    transition: "opacity 0.18s", fontFamily: "inherit",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = "0.78")}
                  onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                >
                  {btn.icon}
                  <span style={{ fontSize: "0.65rem", fontWeight: 600, opacity: 0.85 }}>{btn.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Animations ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes chatRipple {
          0%   { transform: scale(1);   opacity: 0.8; }
          100% { transform: scale(1.7); opacity: 0;   }
        }
        @keyframes chatPulse {
          0%,100% { opacity: 1; }
          50%     { opacity: 0.3; }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </div>
  );
}
