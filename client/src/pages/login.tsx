import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginPic from "/assets/login-pic.png";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 48 48">
    <path fill="#EA4335" d="M24 9.5c3.14 0 5.95 1.08 8.17 2.85l6.08-6.08C34.5 3.08 29.55 1 24 1 14.82 1 7.08 6.48 3.8 14.27l7.07 5.49C12.6 13.39 17.87 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.1 24.5c0-1.64-.15-3.22-.42-4.75H24v9.01h12.42c-.54 2.9-2.18 5.35-4.65 7.01l7.14 5.55C43.08 37.25 46.1 31.3 46.1 24.5z" />
    <path fill="#FBBC05" d="M10.87 28.24A14.6 14.6 0 0 1 9.5 24c0-1.47.25-2.9.69-4.24L3.12 14.27A23.01 23.01 0 0 0 1 24c0 3.77.9 7.34 2.5 10.5l7.37-6.26z" />
    <path fill="#34A853" d="M24 47c5.55 0 10.2-1.83 13.6-4.97l-7.14-5.55c-1.99 1.34-4.54 2.12-6.46 2.12-6.13 0-11.4-3.89-13.13-9.36l-7.37 6.26C7.08 41.52 14.82 47 24 47z" />
  </svg>
);

const LoginIllustration = () => (
  <svg viewBox="0 0 500 560" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%", maxHeight: "calc(100vh - 110px)" }}>
    <rect x="40" y="30" width="130" height="120" rx="5" fill="#E9FFF1" stroke="#1a1a1a" strokeWidth="3" />
    <line x1="105" y1="30" x2="105" y2="150" stroke="#1a1a1a" strokeWidth="2.5" />
    <line x1="40" y1="90" x2="170" y2="90" stroke="#1a1a1a" strokeWidth="2.5" />
    <rect x="28" y="148" width="154" height="10" rx="3" fill="#1a1a1a" />
    <rect x="320" y="168" width="100" height="8" rx="3" fill="#555" />
    <rect x="328" y="122" width="16" height="47" rx="5" fill="#888" stroke="#444" strokeWidth="1.5" />
    <rect x="333" y="115" width="6" height="10" rx="3" fill="#555" />
    <rect x="352" y="132" width="14" height="37" rx="4" fill="#bbb" stroke="#888" strokeWidth="1.2" />
    <rect x="357" y="126" width="5" height="9" rx="2" fill="#888" />
    <rect x="374" y="140" width="12" height="29" rx="4" fill="#aaa" stroke="#777" strokeWidth="1.2" />
    <rect x="378" y="134" width="5" height="9" rx="2" fill="#777" />
    <ellipse cx="340" cy="52" rx="26" ry="12" fill="#E9FFF1" stroke="#1a1a1a" strokeWidth="2.2" />
    <rect x="318" y="40" width="44" height="30" rx="6" fill="#E9FFF1" stroke="#1a1a1a" strokeWidth="2.2" />
    <rect x="318" y="64" width="44" height="8" fill="#e8e8e8" stroke="#1a1a1a" strokeWidth="1.5" />
    <rect x="333" y="102" width="14" height="14" rx="3" fill="#e8c8a0" />
    <ellipse cx="340" cy="88" rx="24" ry="22" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="2" />
    <ellipse cx="332" cy="85" rx="3" ry="3.5" fill="#1a1a1a" />
    <ellipse cx="348" cy="85" rx="3" ry="3.5" fill="#1a1a1a" />
    <circle cx="333" cy="84" r="1" fill="#E9FFF1" />
    <circle cx="349" cy="84" r="1" fill="#E9FFF1" />
    <path d="M328 79 Q332 76 336 79" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M344 79 Q348 76 352 79" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <path d="M332 97 Q340 104 348 97" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="316" cy="88" rx="5" ry="7" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="1.5" />
    <ellipse cx="364" cy="88" rx="5" ry="7" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="1.5" />
    <rect x="312" y="116" width="56" height="70" rx="10" fill="#10B981" stroke="#0e9e79" strokeWidth="1.8" />
    <rect x="322" y="116" width="36" height="42" rx="6" fill="#0e9e79" />
    <path d="M312 130 Q290 148 278 168 Q272 182 274 200" stroke="#e8c8a0" strokeWidth="13" strokeLinecap="round" fill="none" />
    <ellipse cx="275" cy="204" rx="9" ry="7" fill="#e8c8a0" stroke="#c4a080" strokeWidth="1.2" />
    <path d="M368 130 Q390 148 398 162" stroke="#e8c8a0" strokeWidth="13" strokeLinecap="round" fill="none" />
    <ellipse cx="400" cy="165" rx="9" ry="7" fill="#e8c8a0" stroke="#c4a080" strokeWidth="1.2" />
    <line x1="276" y1="198" x2="290" y2="240" stroke="#8B6914" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="293" cy="244" rx="10" ry="6" fill="#8B6914" stroke="#6b5010" strokeWidth="1.5" />
    <rect x="228" y="234" width="88" height="58" rx="6" fill="#5b9bd5" stroke="#1a1a1a" strokeWidth="2.2" />
    <ellipse cx="272" cy="234" rx="46" ry="13" fill="#6aaee0" stroke="#1a1a1a" strokeWidth="2.2" />
    <ellipse cx="272" cy="292" rx="44" ry="10" fill="#4a88c0" stroke="#1a1a1a" strokeWidth="1.5" />
    <ellipse cx="272" cy="234" rx="38" ry="8" fill="#7dbde8" />
    <path d="M228 248 Q212 248 212 262 Q212 276 228 276" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <path d="M316 248 Q332 248 332 262 Q332 276 316 276" stroke="#1a1a1a" strokeWidth="3" fill="none" strokeLinecap="round" />
    <ellipse cx="138" cy="310" rx="30" ry="28" fill="#1a1a1a" />
    <ellipse cx="138" cy="286" rx="16" ry="13" fill="#2a2a2a" />
    <circle cx="138" cy="280" r="9" fill="#333" />
    <ellipse cx="138" cy="318" rx="26" ry="28" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="2" />
    <rect x="128" y="344" width="20" height="14" rx="4" fill="#e8c8a0" />
    <rect x="114" y="310" width="20" height="15" rx="5" fill="none" stroke="#1a1a1a" strokeWidth="2.2" />
    <rect x="138" y="310" width="20" height="15" rx="5" fill="none" stroke="#1a1a1a" strokeWidth="2.2" />
    <line x1="134" y1="317" x2="138" y2="317" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="114" y1="317" x2="106" y2="315" stroke="#1a1a1a" strokeWidth="2" />
    <line x1="158" y1="317" x2="166" y2="315" stroke="#1a1a1a" strokeWidth="2" />
    <ellipse cx="124" cy="317" rx="3" ry="3" fill="#1a1a1a" />
    <ellipse cx="148" cy="317" rx="3" ry="3" fill="#1a1a1a" />
    <path d="M128 335 Q138 342 148 335" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="112" cy="318" rx="5" ry="7" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="1.5" />
    <ellipse cx="164" cy="318" rx="5" ry="7" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="1.5" />
    <rect x="108" y="358" width="60" height="72" rx="12" fill="#10B981" stroke="#0e9e79" strokeWidth="1.8" />
    <path d="M108 372 Q85 385 68 400 Q58 412 56 428" stroke="#e8c8a0" strokeWidth="12" strokeLinecap="round" fill="none" />
    <ellipse cx="55" cy="432" rx="8" ry="6" fill="#e8c8a0" stroke="#c4a080" strokeWidth="1.2" />
    <path d="M168 372 Q188 385 200 398" stroke="#e8c8a0" strokeWidth="12" strokeLinecap="round" fill="none" />
    <ellipse cx="203" cy="401" rx="8" ry="6" fill="#e8c8a0" stroke="#c4a080" strokeWidth="1.2" />
    <rect x="30" y="448" width="220" height="12" rx="4" fill="#d0d0d0" stroke="#bbb" strokeWidth="1.2" />
    <rect x="44" y="426" width="130" height="24" rx="4" fill="#E9FFF1" stroke="#ddd" strokeWidth="1.5" />
    <line x1="54" y1="434" x2="114" y2="434" stroke="#ccc" strokeWidth="1.2" />
    <line x1="54" y1="440" x2="130" y2="440" stroke="#ccc" strokeWidth="1.2" />
    <line x1="56" y1="435" x2="70" y2="420" stroke="#e8c8a0" strokeWidth="4" strokeLinecap="round" />
    <line x1="70" y1="420" x2="74" y2="415" stroke="#f4d03f" strokeWidth="4" strokeLinecap="round" />
    <path d="M74 415 L78 411 L76 415 Z" fill="#1a1a1a" />
    <rect x="144" y="428" width="52" height="32" rx="5" fill="#10B981" stroke="#0e9e79" strokeWidth="1.5" />
    <rect x="150" y="433" width="40" height="20" rx="3" fill="#0e9e79" opacity="0.6" />
    <ellipse cx="358" cy="370" rx="34" ry="30" fill="#1a1a1a" />
    <path d="M324 375 Q318 400 322 425" stroke="#1a1a1a" strokeWidth="14" strokeLinecap="round" fill="none" />
    <path d="M392 375 Q398 400 394 425" stroke="#1a1a1a" strokeWidth="14" strokeLinecap="round" fill="none" />
    <ellipse cx="358" cy="378" rx="28" ry="30" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="2" />
    <rect x="347" y="406" width="22" height="14" rx="4" fill="#e8c8a0" />
    <ellipse cx="348" cy="374" rx="3.5" ry="3.5" fill="#1a1a1a" />
    <ellipse cx="368" cy="374" rx="3.5" ry="3.5" fill="#1a1a1a" />
    <circle cx="349" cy="373" r="1.2" fill="#E9FFF1" />
    <circle cx="369" cy="373" r="1.2" fill="#E9FFF1" />
    <path d="M343 367 Q348 364 353 367" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M363 367 Q368 364 373 367" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
    <path d="M349 393 Q358 400 367 393" stroke="#1a1a1a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
    <ellipse cx="330" cy="378" rx="5" ry="7" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="1.5" />
    <ellipse cx="386" cy="378" rx="5" ry="7" fill="#e8c8a0" stroke="#1a1a1a" strokeWidth="1.5" />
    <rect x="326" y="420" width="64" height="72" rx="12" fill="#3dbcb0" stroke="#2aa89c" strokeWidth="1.8" />
    <path d="M326 435 Q305 448 292 465 Q285 476 286 492" stroke="#e8c8a0" strokeWidth="12" strokeLinecap="round" fill="none" />
    <ellipse cx="286" cy="496" rx="8" ry="6" fill="#e8c8a0" stroke="#c4a080" strokeWidth="1.2" />
    <path d="M390 435 Q408 448 415 462" stroke="#e8c8a0" strokeWidth="12" strokeLinecap="round" fill="none" />
    <ellipse cx="418" cy="465" rx="8" ry="6" fill="#e8c8a0" stroke="#c4a080" strokeWidth="1.2" />
    <rect x="262" y="466" width="52" height="42" rx="5" fill="#10B981" stroke="#0e9e79" strokeWidth="2" />
    <rect x="262" y="466" width="8" height="42" rx="3" fill="#0e9e79" />
    <rect x="308" y="468" width="6" height="38" rx="2" fill="#f0f0f0" stroke="#ccc" strokeWidth="0.8" />
    <line x1="276" y1="478" x2="303" y2="478" stroke="#E9FFF1" strokeWidth="1.5" opacity="0.7" />
    <line x1="276" y1="485" x2="303" y2="485" stroke="#E9FFF1" strokeWidth="1.5" opacity="0.7" />
    <line x1="276" y1="492" x2="295" y2="492" stroke="#E9FFF1" strokeWidth="1.5" opacity="0.7" />
    <rect x="322" y="500" width="100" height="10" rx="3" fill="#d0d0d0" stroke="#bbb" strokeWidth="1" />
    <rect x="330" y="484" width="82" height="18" rx="3" fill="#E9FFF1" stroke="#ddd" strokeWidth="1.2" />
    <line x1="340" y1="490" x2="398" y2="490" stroke="#ccc" strokeWidth="1.2" />
    <line x1="340" y1="496" x2="390" y2="496" stroke="#ccc" strokeWidth="1.2" />
  </svg>
);



/* ── Inline Error Banner ── */
const ErrorBanner: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div style={{
    background: "#fff5f5",
    border: "1px solid #fca5a5",
    borderRadius: "8px",
    padding: "10px 14px",
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    animation: "shakeIn 0.4s ease",
  }}>
    <div style={{
      width: 18, height: 18, borderRadius: "50%",
      background: "#ef4444",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0, marginTop: 1,
    }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E9FFF1" strokeWidth="3" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: "0.83rem", fontWeight: 600, color: "#991b1b", margin: "0 0 2px" }}>
        Invalid credentials
      </p>
      <p style={{ fontSize: "0.78rem", color: "#b91c1c", margin: 0 }}>
        {message}
      </p>
    </div>
    <button
      onClick={onClose}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: "#f87171", padding: "1px", display: "flex",
        alignItems: "center", flexShrink: 0,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <style>{`
      @keyframes shakeIn {
        0%   { transform: translateX(-6px); opacity: 0; }
        30%  { transform: translateX(5px);  opacity: 1; }
        60%  { transform: translateX(-3px); }
        100% { transform: translateX(0);    opacity: 1; }
      }
    `}</style>
  </div>
);

/* ── Toast Notification (bottom-right) ── */
const ErrorToast: React.FC<{ message: string; onClose: () => void }> = ({ message, onClose }) => (
  <div style={{
    position: "fixed",
    bottom: "24px",
    right: "24px",
    zIndex: 999,
    background: "#1a1a1a",
    borderRadius: "10px",
    padding: "12px 16px",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    minWidth: "280px",
    maxWidth: "360px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    animation: "toastSlideUp 0.35s cubic-bezier(0.34,1.3,0.64,1) forwards",
  }}>
    <div style={{
      width: 20, height: 20, borderRadius: "50%",
      background: "#ef4444",
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>
      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E9FFF1" strokeWidth="3" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ fontSize: "0.83rem", fontWeight: 600, color: "#E9FFF1", margin: "0 0 2px" }}>Login failed</p>
      <p style={{ fontSize: "0.77rem", color: "#aaa", margin: 0 }}>{message}</p>
    </div>
    <button
      onClick={onClose}
      style={{
        background: "none", border: "none", cursor: "pointer",
        color: "#666", padding: "2px", display: "flex", alignItems: "center",
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
    <style>{`
      @keyframes toastSlideUp {
        from { transform: translateY(16px); opacity: 0; }
        to   { transform: translateY(0);    opacity: 1; }
      }
    `}</style>
  </div>
);

/* ── Login Success Modal ── */
const LoginSuccessModal: React.FC<{ email: string; onContinue: () => void }> = ({ email, onContinue }) => (
  <div style={{
    position: "fixed", inset: 0,
    background: "rgba(0,0,0,0.45)",
    display: "flex", alignItems: "center", justifyContent: "center",
    zIndex: 1000,
    animation: "fadeIn 0.2s ease forwards",
  }}>
    <div style={{
      background: "#E9FFF1",
      borderRadius: "20px",
      padding: "2.5rem 2rem 2rem",
      maxWidth: "380px",
      width: "90%",
      textAlign: "center",
      boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
      animation: "popIn 0.38s cubic-bezier(0.34,1.3,0.64,1) forwards",
    }}>
      <div style={{ width: 88, height: 88, margin: "0 auto 1.5rem" }}>
        <svg viewBox="0 0 88 88" width="88" height="88">
          <circle cx="44" cy="44" r="42" fill="#e1f5ee" stroke="#10B981" strokeWidth="2.5" />
          <path
            d="M25 45 L39 59 L63 31"
            fill="none" stroke="#10B981" strokeWidth="4.5"
            strokeLinecap="round" strokeLinejoin="round"
            style={{ strokeDasharray: 58, strokeDashoffset: 0, animation: "checkDraw 0.55s ease 0.2s both" }}
          />
        </svg>
      </div>
      <h2 style={{ fontSize: "1.35rem", fontWeight: 700, color: "#111", margin: "0 0 8px" }}>Welcome Back!</h2>
      <p style={{ fontSize: "0.875rem", color: "#666", margin: "0 0 6px", lineHeight: 1.6 }}>
        You've successfully logged in to <strong style={{ color: "#10B981" }}>HelpGhar</strong>.
      </p>
      <p style={{ fontSize: "0.8rem", color: "#999", margin: "0 0 1.75rem" }}>{email}</p>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: "6px",
        background: "#f0fdf8", border: "1px solid #b2ead8",
        borderRadius: "20px", padding: "5px 14px",
        fontSize: "0.77rem", color: "#0e9e79", marginBottom: "1.5rem",
      }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
        Session secured
      </div>
      <button
        onClick={onContinue}
        style={{
          width: "100%", padding: "11px",
          background: "#10B981", color: "#E9FFF1",
          border: "none", borderRadius: "8px",
          fontSize: "0.93rem", fontWeight: 600, cursor: "pointer",
          transition: "background 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#17a589")}
        onMouseLeave={e => (e.currentTarget.style.background = "#10B981")}
      >
        Continue to Dashboard
      </button>
    </div>
    <style>{`
      @keyframes fadeIn    { from { opacity: 0; } to { opacity: 1; } }
      @keyframes popIn     { 0% { transform: scale(0.82); opacity: 0; } 70% { transform: scale(1.04); opacity: 1; } 100% { transform: scale(1); opacity: 1; } }
      @keyframes checkDraw { from { stroke-dashoffset: 58; } to { stroke-dashoffset: 0; } }
    `}</style>
  </div>
);

/* ── Main LoginPage Component ── */
const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");  // drives inline banner
  const [showToast, setShowToast] = useState(false);     // drives toast

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        const msg = data.message || "The email or password you entered is incorrect.";
        setErrorMessage(msg);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 4000); // auto-dismiss toast
        return;
      }

      setShowSuccess(true);

    } catch (err: any) {
      const msg = err.message || "Something went wrong. Please try again.";
      setErrorMessage(msg);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 4000);
    }
  };

  // Inputs turn red-tinted when there's an active error
  const inputStyle = (hasError: boolean): React.CSSProperties => ({
    width: "100%",
    border: `1.5px solid ${hasError ? "#fca5a5" : "#ccc"}`,
    borderRadius: "6px",
    padding: "9px 13px",
    fontSize: "0.89rem",
    outline: "none",
    background: hasError ? "#fff5f5" : "#E9FFF1",
    color: "#222",
    boxSizing: "border-box",
    transition: "border-color 0.2s, background 0.2s",
  });

  const clearError = () => setErrorMessage("");

  const responsiveStyles = `
    .login-illustration {
      flex: 1 1 420px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      max-width: 520px;
    }
    .login-illustration img {
      width: 100%;
      max-width: 480px;
      height: auto;
      max-height: calc(100vh - 110px);
      object-fit: contain;
      display: block;
    }
    @media (max-width: 768px) {
      .login-illustration { display: none !important; }
      .login-card { max-width: 100% !important; width: 100% !important; }
    }
  `;

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', Arial, sans-serif" }}>

      <style>{responsiveStyles}</style>
      {/* Success Modal */}
      {showSuccess && (
        <LoginSuccessModal
          email={email}
          onContinue={() => navigate("/userscreen")}
        />
      )}

      {/* Toast (bottom-right, auto-dismisses after 4s) */}
      {showToast && (
        <ErrorToast
          message={errorMessage}
          onClose={() => setShowToast(false)}
        />
      )}

      {/* ── NAVBAR ── */}
      <nav style={{
        background: "#10B981", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 5%",
        height: "52px", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "#E9FFF1", letterSpacing: "-0.3px" }}>
          HelpGhar<span style={{ opacity: 0.7 }}>.</span>
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          <a href="/" style={{ color: "#E9FFF1", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>Home</a>
          <a href="#testimonials" style={{ color: "#E9FFF1", fontWeight: 600, fontSize: "0.95rem", textDecoration: "none" }}>Testimonials</a>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => navigate("/login")}
            style={{
              background: "transparent", color: "#E9FFF1", border: "2px solid #E9FFF1",
              borderRadius: "6px", padding: "6px 18px", fontWeight: 700,
              fontSize: "0.83rem", cursor: "pointer", letterSpacing: "0.3px"
            }}
          >
            LOGIN
          </button>
          <button
            onClick={() => navigate("/signup")}
            style={{
              background: "#E9FFF1", color: "#10B981", border: "2px solid #E9FFF1",
              borderRadius: "6px", padding: "6px 18px", fontWeight: 700,
              fontSize: "0.83rem", cursor: "pointer"
            }}
          >
            SIGN UP
          </button>
        </div>
      </nav>

      {/* ── PAGE BODY ── */}
      <main style={{ flex: 1, background: "#c2f0dc", overflow: "hidden", display: "flex", alignItems: "center" }}>
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          width: "100%", maxWidth: "1100px", margin: "0 auto",
          padding: "0 5%", gap: "40px", height: "100%"
        }}>

          {/* LEFT: Illustration */}
          <div className="login-illustration">
            <img src={loginPic} alt="Login illustration" />
          </div>

          {/* RIGHT: Login Card */}
          <div className="login-card" style={{
            flex: "0 0 auto", width: "100%", maxWidth: "400px",
            background: "#E9FFF1", borderRadius: "16px",
            padding: "28px 30px 22px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.08)"
          }}>
            {/* Logo */}
            <div style={{ textAlign: "center", marginBottom: "20px" }}>
              <span style={{ fontWeight: 800, fontSize: "1.6rem", color: "#111", letterSpacing: "-0.5px" }}>
                HelpGhar.
              </span>
            </div>

            {/* Heading */}
            <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#111", marginBottom: "3px" }}>Login</h2>
            <p style={{ fontSize: "0.83rem", color: "#666", marginBottom: "16px" }}>
              Enter your credentials to login to your account
            </p>

            {/* ── Inline Error Banner (appears on failed login) ── */}
            {errorMessage && (
              <div style={{ marginBottom: "14px" }}>
                <ErrorBanner message={errorMessage} onClose={clearError} />
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "13px" }}>

              {/* Email */}
              <div>
                <label style={{ display: "block", fontSize: "0.83rem", fontWeight: 500, color: "#333", marginBottom: "4px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => { setEmail(e.target.value); clearError(); }}
                  required
                  style={inputStyle(!!errorMessage)}
                />
              </div>

              {/* Password */}
              <div>
                <label style={{ display: "block", fontSize: "0.83rem", fontWeight: 500, color: "#333", marginBottom: "4px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={e => { setPassword(e.target.value); clearError(); }}
                    required
                    style={{ ...inputStyle(!!errorMessage), padding: "9px 40px 9px 13px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(p => !p)}
                    style={{
                      position: "absolute", right: "10px", top: "50%",
                      transform: "translateY(-50%)", background: "none",
                      border: "none", cursor: "pointer", color: "#888",
                      display: "flex", alignItems: "center", padding: "2px"
                    }}
                  >
                    {showPassword ? (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
                <div style={{ textAlign: "right", marginTop: "4px" }}>
                  <a href="#" style={{ fontSize: "0.76rem", color: "#10B981", fontWeight: 500, textDecoration: "none" }}>
                    Forgot password?
                  </a>
                </div>
              </div>

              {/* Keep me logged in */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <input
                  type="checkbox"
                  id="keepLoggedIn"
                  checked={keepLoggedIn}
                  onChange={e => setKeepLoggedIn(e.target.checked)}
                  style={{ width: "14px", height: "14px", accentColor: "#10B981", cursor: "pointer" }}
                />
                <label htmlFor="keepLoggedIn" style={{ fontSize: "0.83rem", color: "#333", cursor: "pointer" }}>
                  Keep me log in
                </label>
              </div>

              {/* Continue */}
              <button
                type="submit"
                style={{
                  width: "100%", background: "#E9FFF1", color: "#222",
                  border: "1.5px solid #bbb", borderRadius: "6px",
                  padding: "10px", fontSize: "0.93rem", fontWeight: 600, cursor: "pointer"
                }}
              >
                Continue
              </button>
            </form>

            {/* Divider */}
            <div style={{ display: "flex", alignItems: "center", gap: "10px", margin: "14px 0 11px" }}>
              <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
              <span style={{ fontSize: "0.77rem", color: "#999", whiteSpace: "nowrap" }}>or login with</span>
              <div style={{ flex: 1, height: "1px", background: "#e0e0e0" }} />
            </div>

            {/* Google */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
              <button style={{
                display: "flex", alignItems: "center", gap: "8px",
                background: "#E9FFF1", color: "#444", border: "1.5px solid #ccc",
                borderRadius: "6px", padding: "7px 20px", fontSize: "0.85rem",
                fontWeight: 500, cursor: "pointer"
              }}>
                <GoogleIcon /> Google
              </button>
            </div>

            {/* Sign up link */}
            <p style={{ textAlign: "center", fontSize: "0.81rem", color: "#555", marginBottom: "12px" }}>
              Don't have an account?{" "}
              <a
                href="/signup"
                style={{ color: "#10B981", fontWeight: 600, textDecoration: "none" }}
                onClick={e => { e.preventDefault(); navigate("/signup"); }}
              >
                Sign up here
              </a>
            </p>

            {/* Back */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={() => navigate(-1)}
                style={{
                  background: "none", border: "none", color: "#333",
                  fontSize: "0.88rem", fontWeight: 500, cursor: "pointer",
                  display: "inline-flex", alignItems: "center", gap: "4px"
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        background: "#10B981", padding: "0 5%", height: "44px",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexShrink: 0
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#E9FFF1">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
          </a>
          <a href="#" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#E9FFF1" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="#E9FFF1" stroke="none" />
            </svg>
          </a>
          <a href="#" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#E9FFF1">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
          </a>
        </div>
        <p style={{ color: "#E9FFF1", fontSize: "0.8rem", opacity: 0.92 }}>
          @2025 All Copyrights are Reserved
        </p>
      </footer>
    </div>
  );
};

export default LoginPage;