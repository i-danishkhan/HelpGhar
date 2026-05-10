import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type PaymentMethod = "cash" | "card" | "online";

// ─── Coming Soon Popup ────────────────────────────────────────────────────────
const ComingSoonPopup = ({ label, onClose }: { label: string; onClose: () => void }) => (
  <div
    onClick={onClose}
    style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      zIndex: 300, display: "flex", alignItems: "center",
      justifyContent: "center", backdropFilter: "blur(2px)",
    }}
  >
    <div
      onClick={e => e.stopPropagation()}
      style={{
        background: "white", borderRadius: "18px", padding: "36px 36px 30px",
        maxWidth: "340px", width: "90vw", textAlign: "center",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        fontFamily: "'Segoe UI', Arial, sans-serif",
        animation: "hireSlideUp 0.2s ease",
      }}
    >
      {/* Icon */}
      <div style={{
        width: "70px", height: "70px", borderRadius: "50%",
        background: "linear-gradient(135deg,#1abc9c,#3b82f6)",
        margin: "0 auto 18px", display: "flex", alignItems: "center",
        justifyContent: "center", fontSize: "2rem",
        boxShadow: "0 8px 24px rgba(26,188,156,0.3)",
        animation: "hirePulse 2s infinite",
      }}>
        🚧
      </div>

      <h3 style={{ margin: "0 0 8px", fontSize: "1.2rem", fontWeight: 800, color: "#111" }}>
        {label} — Coming Soon!
      </h3>
      <p style={{ margin: "0 0 18px", fontSize: "0.86rem", color: "#888", lineHeight: 1.6 }}>
        We're actively building a seamless <strong>{label.toLowerCase()}</strong> experience.
        It will be available very soon. Stay tuned! 🎉
      </p>

      {/* Under development notice */}
      <div style={{
        background: "#fffbeb", border: "1px dashed #f59e0b",
        borderRadius: "10px", padding: "10px 14px", marginBottom: "20px",
        fontSize: "0.76rem", color: "#92400e",
        display: "flex", alignItems: "center", gap: "6px",
      }}>
        🔔 This feature is under active development
      </div>

      <button
        onClick={onClose}
        style={{
          width: "100%", background: "#1abc9c", color: "white",
          border: "none", borderRadius: "24px", padding: "11px 0",
          fontSize: "0.9rem", fontWeight: 700, cursor: "pointer",
          fontFamily: "inherit", transition: "background 0.18s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "#17a589")}
        onMouseLeave={e => (e.currentTarget.style.background = "#1abc9c")}
      >
        Got it!
      </button>
    </div>
  </div>
);

// ─── Reusable input field ─────────────────────────────────────────────────────
interface FieldProps {
  label: string;
  required?: boolean;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  half?: boolean;
}

const Field = ({ label, required, type = "text", value, onChange, placeholder, half }: FieldProps) => (
  <div style={{ flex: half ? "1 1 45%" : "1 1 100%", minWidth: half ? "140px" : undefined }}>
    <label style={{
      display: "block", fontSize: "0.78rem", fontWeight: 600,
      color: "#444", marginBottom: "6px", fontFamily: "inherit",
    }}>
      {label} {required && <span style={{ color: "#ef4444" }}>*</span>}
    </label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={e => onChange(e.target.value)}
      style={{
        width: "100%", padding: "10px 12px",
        border: "1.5px solid #e5e7eb", borderRadius: "10px",
        fontSize: "0.87rem", outline: "none", fontFamily: "inherit",
        background: "white", boxSizing: "border-box",
        color: "#111", transition: "border-color 0.15s",
      }}
      onFocus={e => (e.currentTarget.style.borderColor = "#1abc9c")}
      onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
    />
  </div>
);

// ─── Section wrapper ──────────────────────────────────────────────────────────
const Section = ({ emoji, title, children }: { emoji: string; title: string; children: React.ReactNode }) => (
  <div style={{
    background: "white", borderRadius: "14px", padding: "20px",
    marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  }}>
    <h3 style={{
      margin: "0 0 16px", fontSize: "0.9rem", fontWeight: 700, color: "#111",
      display: "flex", alignItems: "center", gap: "8px", fontFamily: "inherit",
    }}>
      <span style={{
        background: "#e8faf5", color: "#1abc9c", borderRadius: "8px",
        width: "28px", height: "28px", display: "flex",
        alignItems: "center", justifyContent: "center", fontSize: "0.85rem",
        flexShrink: 0,
      }}>
        {emoji}
      </span>
      {title}
    </h3>
    {children}
  </div>
);

// ─── Main HirePage ────────────────────────────────────────────────────────────
export default function HirePage() {
  const navigate = useNavigate();
  const { workerId } = useParams<{ workerId: string }>();

  const [payMethod, setPayMethod] = useState<PaymentMethod>("cash");
  const [comingSoonLabel, setComingSoonLabel] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const [form, setForm] = useState({
    address: "",
    city: "",
    area: "",
    rooms: "",
    startDate: "",
    endDate: "",
    arrivalTime: "",
    leaveTime: "",
    duration: "",
    workDays: [] as string[],
    notes: "",
    salary: "",
  });

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const toggleDay = (day: string) => {
    setForm(p => ({
      ...p,
      workDays: p.workDays.includes(day)
        ? p.workDays.filter(d => d !== day)
        : [...p.workDays, day],
    }));
  };

  const handlePayClick = (method: PaymentMethod) => {
    if (method === "card") { setComingSoonLabel("Card Payment"); return; }
    if (method === "online") { setComingSoonLabel("Online Payment"); return; }
    setPayMethod(method);
  };

  const handleSubmit = () => {
    if (!form.address.trim() || !form.city.trim() || !form.startDate) {
      alert("Please fill in required fields: Address, City and Start Date.");
      return;
    }
    setSubmitted(true);
  };

  // ── Success Screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div style={{
        minHeight: "100vh", background: "#f5f5f5",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Segoe UI', Arial, sans-serif", padding: "24px",
      }}>
        <div style={{
          background: "white", borderRadius: "20px", padding: "48px 40px",
          maxWidth: "400px", width: "100%", textAlign: "center",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        }}>
          <div style={{ fontSize: "4rem", marginBottom: "16px" }}>🎉</div>
          <h2 style={{ margin: "0 0 10px", fontSize: "1.35rem", fontWeight: 800, color: "#111" }}>
            Request Sent!
          </h2>
          <p style={{ margin: "0 0 8px", fontSize: "0.88rem", color: "#888", lineHeight: 1.6 }}>
            Your hiring request has been sent to{" "}
            <strong style={{ color: "#1abc9c" }}>Worker #{workerId}</strong>.
          </p>
          <p style={{ margin: "0 0 28px", fontSize: "0.82rem", color: "#aaa" }}>
            They will review and confirm within 24 hours.
          </p>
          <button
            onClick={() => navigate(-1)}
            style={{
              width: "100%", background: "#1abc9c", color: "white",
              border: "none", borderRadius: "24px", padding: "13px 0",
              fontSize: "0.92rem", fontWeight: 700, cursor: "pointer",
              fontFamily: "inherit", transition: "background 0.18s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#17a589")}
            onMouseLeave={e => (e.currentTarget.style.background = "#1abc9c")}
          >
            Back to Workers
          </button>
        </div>
      </div>
    );
  }

  // ── Form ────────────────────────────────────────────────────────────────────
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const payOptions = [
    {
      id: "cash" as PaymentMethod,
      emoji: "💵",
      title: "Cash After Work",
      sub: "Pay when job is done",
      available: true,
    },
    {
      id: "card" as PaymentMethod,
      emoji: "💳",
      title: "Card Payment",
      sub: "Visa / Mastercard",
      available: false,
    },
    {
      id: "online" as PaymentMethod,
      emoji: "📱",
      title: "Online Transfer",
      sub: "JazzCash / EasyPaisa",
      available: false,
    },
  ];

  return (
    <div style={{
      minHeight: "100vh", background: "#f5f5f5",
      fontFamily: "'Segoe UI', Arial, sans-serif", display: "flex", flexDirection: "column",
    }}>

      {/* ── HEADER ───────────────────────────────────────────────────────────── */}
      <div style={{
        background: "#1abc9c", height: "62px", display: "flex",
        alignItems: "center", padding: "0 20px", gap: "14px",
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
        <div>
          <div style={{ fontWeight: 800, fontSize: "1rem", color: "white" }}>
            Hire Worker #{workerId}
          </div>
          <div style={{ fontSize: "0.72rem", color: "rgba(255,255,255,0.82)" }}>
            Fill in your requirements
          </div>
        </div>
      </div>

      {/* ── FORM BODY ─────────────────────────────────────────────────────────── */}
      <div style={{
        flex: 1, overflowY: "auto", padding: "20px 16px 48px",
        maxWidth: "700px", margin: "0 auto", width: "100%", boxSizing: "border-box",
      }}>

        {/* Progress steps */}
        <div style={{
          background: "white", borderRadius: "14px", padding: "14px 20px",
          marginBottom: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: "8px",
        }}>
          {["Job Details", "Schedule", "Payment"].map((step, i) => (
            <div key={step} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{
                width: "26px", height: "26px", borderRadius: "50%",
                background: "#1abc9c", color: "white",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "0.72rem", fontWeight: 700,
              }}>
                {i + 1}
              </div>
              <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#111" }}>{step}</span>
              {i < 2 && <div style={{ width: "18px", height: "2px", background: "#e5e7eb" }} />}
            </div>
          ))}
        </div>

        {/* ── 1. Job Location ──────────────────────────────────────────────── */}
        <Section emoji="📍" title="Job Location">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Field label="Full Address" required value={form.address} onChange={v => set("address", v)} placeholder="House No., Street, Block" />
            <Field label="Area / Sector" half value={form.area} onChange={v => set("area", v)} placeholder="e.g. DHA Phase 6" />
            <Field label="City" required half value={form.city} onChange={v => set("city", v)} placeholder="e.g. Karachi" />
            <Field label="No. of Rooms" half type="number" value={form.rooms} onChange={v => set("rooms", v)} placeholder="e.g. 4" />
            <Field label="Expected Salary (Rs.)" half type="number" value={form.salary} onChange={v => set("salary", v)} placeholder="e.g. 20000" />
          </div>
        </Section>

        {/* ── 2. Work Schedule ─────────────────────────────────────────────── */}
        <Section emoji="🗓️" title="Work Schedule">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            <Field label="Start Date" required half type="date" value={form.startDate} onChange={v => set("startDate", v)} />
            <Field label="End Date (optional)" half type="date" value={form.endDate} onChange={v => set("endDate", v)} />
            <Field label="Arrival Time" half type="time" value={form.arrivalTime} onChange={v => set("arrivalTime", v)} />
            <Field label="Leave Time" half type="time" value={form.leaveTime} onChange={v => set("leaveTime", v)} />
            <Field label="Duration" half value={form.duration} onChange={v => set("duration", v)} placeholder="e.g. 3 months / Permanent" />
          </div>

          {/* Work days */}
          <div style={{ marginTop: "14px" }}>
            <label style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, color: "#444", marginBottom: "8px" }}>
              Work Days
            </label>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {days.map(day => {
                const active = form.workDays.includes(day);
                return (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    style={{
                      padding: "6px 14px", borderRadius: "20px", fontSize: "0.78rem",
                      fontWeight: 600, cursor: "pointer", border: "1.5px solid",
                      borderColor: active ? "#1abc9c" : "#e5e7eb",
                      background: active ? "#1abc9c" : "white",
                      color: active ? "white" : "#555",
                      transition: "all 0.15s", fontFamily: "inherit",
                    }}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>
        </Section>

        {/* ── 3. Special Instructions ──────────────────────────────────────── */}
        <Section emoji="📝" title="Special Instructions">
          <textarea
            value={form.notes}
            onChange={e => set("notes", e.target.value)}
            placeholder="Any specific requirements, allergies, pet info, areas to focus on, dos and don'ts..."
            rows={4}
            style={{
              width: "100%", border: "1.5px solid #e5e7eb", borderRadius: "10px",
              padding: "10px 12px", fontSize: "0.87rem", fontFamily: "inherit",
              resize: "vertical", outline: "none", color: "#111",
              background: "white", boxSizing: "border-box", transition: "border-color 0.15s",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "#1abc9c")}
            onBlur={e => (e.currentTarget.style.borderColor = "#e5e7eb")}
          />
        </Section>

        {/* ── 4. Payment Method ────────────────────────────────────────────── */}
        <Section emoji="💳" title="Payment Method">
          <div style={{ display: "flex", flexWrap: "wrap", gap: "12px" }}>
            {payOptions.map(opt => {
              const selected = payMethod === opt.id && opt.available;
              return (
                <button
                  key={opt.id}
                  onClick={() => handlePayClick(opt.id)}
                  style={{
                    flex: "1 1 140px", background: selected ? "#e8faf5" : "#f5f5f5",
                    border: `2px solid ${selected ? "#1abc9c" : "#e5e7eb"}`,
                    borderRadius: "12px", padding: "16px 12px",
                    cursor: "pointer", textAlign: "center",
                    transition: "all 0.18s", position: "relative",
                    fontFamily: "inherit",
                  }}
                  onMouseEnter={e => { if (!selected) e.currentTarget.style.borderColor = "#1abc9c"; }}
                  onMouseLeave={e => { if (!selected) e.currentTarget.style.borderColor = "#e5e7eb"; }}
                >
                  {/* Soon badge */}
                  {!opt.available && (
                    <span style={{
                      position: "absolute", top: "7px", right: "7px",
                      background: "#f59e0b", color: "white",
                      fontSize: "0.55rem", fontWeight: 700,
                      padding: "2px 6px", borderRadius: "6px",
                    }}>
                      SOON
                    </span>
                  )}
                  {/* Checkmark */}
                  {selected && (
                    <span style={{
                      position: "absolute", top: "7px", left: "7px",
                      width: "17px", height: "17px", borderRadius: "50%",
                      background: "#1abc9c", color: "white",
                      fontSize: "0.6rem", fontWeight: 700,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      ✓
                    </span>
                  )}
                  <div style={{ fontSize: "1.6rem", marginBottom: "6px" }}>{opt.emoji}</div>
                  <div style={{
                    fontSize: "0.8rem", fontWeight: 700,
                    color: selected ? "#1abc9c" : "#111", marginBottom: "2px",
                  }}>
                    {opt.title}
                  </div>
                  <div style={{ fontSize: "0.68rem", color: "#888" }}>{opt.sub}</div>
                </button>
              );
            })}
          </div>

          {/* Cash notice */}
          {payMethod === "cash" && (
            <div style={{
              marginTop: "14px", background: "#f0fdf4",
              border: "1px solid #86efac", borderRadius: "10px",
              padding: "10px 14px", fontSize: "0.78rem", color: "#166534",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              ✅ Cash payment selected. You pay the worker directly after work is completed.
            </div>
          )}
        </Section>

        {/* ── Submit ───────────────────────────────────────────────────────── */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%", background: "#1abc9c", color: "white",
            border: "none", borderRadius: "14px", padding: "15px",
            fontSize: "1rem", fontWeight: 700, cursor: "pointer",
            fontFamily: "inherit", transition: "background 0.18s",
            boxShadow: "0 4px 16px rgba(26,188,156,0.3)",
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "#17a589")}
          onMouseLeave={e => (e.currentTarget.style.background = "#1abc9c")}
        >
          Send Hiring Request 🚀
        </button>
      </div>

      {/* ── Coming Soon Popup ─────────────────────────────────────────────────── */}
      {comingSoonLabel && (
        <ComingSoonPopup
          label={comingSoonLabel}
          onClose={() => setComingSoonLabel(null)}
        />
      )}

      {/* ── Animations ───────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes hireSlideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes hirePulse {
          0%,100% { transform: scale(1); }
          50%      { transform: scale(1.08); }
        }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
      `}</style>
    </div>
  );
}
