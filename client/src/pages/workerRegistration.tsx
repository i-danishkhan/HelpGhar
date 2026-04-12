import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Camera, RefreshCw } from "lucide-react";

// ── Shared Layout ─────────────────────────────────────────────────────────────
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav style={{
      background: "#1abc9c", display: "flex", alignItems: "center",
      justifyContent: "space-between", padding: "0 5%",
      height: "52px", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
    }}>
      <span style={{ fontWeight: 800, fontSize: "1.3rem", color: "white", letterSpacing: "-0.3px", cursor: "pointer" }}
        onClick={() => navigate("/")}>
        HelpGhar.
      </span>
      <button
        onClick={() => navigate("/userScreen")}
        style={{ background: "none", border: "none", color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}
      >
        Register Yourself
      </button>
    </nav>
  );
};

const Footer = () => (
  <footer style={{
    background: "#1abc9c", padding: "0 5%", height: "44px",
    display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0
  }}>
    <div style={{ display: "flex", gap: "10px" }}>
      {/* Facebook */}
      <a href="#" style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
      </a>
      {/* Instagram */}
      <a href="#" style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
        </svg>
      </a>
      {/* LinkedIn */}
      <a href="#" style={{ width: "28px", height: "28px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
          <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
          <rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
        </svg>
      </a>
    </div>
    <p style={{ color: "white", fontSize: "0.8rem", opacity: 0.92 }}>@2025 All Copyrights are Reserved</p>
  </footer>
);

// ── Shared input style ─────────────────────────────────────────────────────────
const inputStyle: React.CSSProperties = {
  width: "100%", border: "1.5px solid #ccc", borderRadius: "6px",
  padding: "7px 11px", fontSize: "0.88rem", outline: "none",
  background: "white", color: "#222", boxSizing: "border-box",
  fontFamily: "inherit"
};

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance: "none", backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat", backgroundPosition: "right 13px center",
  paddingRight: "36px", cursor: "pointer"
};

const labelStyle: React.CSSProperties = {
  display: "block", fontSize: "0.88rem", fontWeight: 500,
  color: "#222", marginBottom: "4px"
};

// ── Step 1: Registration Form ─────────────────────────────────────────────────
const RegistrationForm = ({ onSubmit }: { onSubmit: () => void }) => {
  const [form, setForm] = useState({
    fullName: "", experience: "", phoneNo: "", emailId: "",
    cnic: "", dobDay: "", dobMonth: "", dobYear: "", city: "", address: "", salary: "", workType: "",
  });
  const [cnicFile, setCnicFile] = useState<File | null>(null);
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const cnicRef = useRef<HTMLInputElement>(null);
  const picRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <main style={{ flex: 1, background: "#f0faf6", overflowY: "auto", padding: "16px 5%" }}>
      <div style={{ maxWidth: "680px", margin: "0 auto" }}>
        <h1 style={{ textAlign: "center", fontSize: "1.4rem", fontWeight: 800, color: "#111", marginBottom: "16px" }}>
          Complete Your Registeration As a Worker
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "12px" }}>
            <div>
              <label style={labelStyle}>Your Full Name</label>
              <input name="fullName" value={form.fullName} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Experience Of Working</label>
              <input name="experience" value={form.experience} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          {/* Row 2 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "12px" }}>
            <div>
              <label style={labelStyle}>Phone No</label>
              <input name="phoneNo" value={form.phoneNo} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Email ID</label>
              <input name="emailId" type="email" value={form.emailId} onChange={handleChange} style={inputStyle} required />
            </div>
          </div>

          {/* Row 3 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "12px" }}>
            <div>
              <label style={labelStyle}>CNIC</label>
              <input name="cnic" value={form.cnic} onChange={handleChange} style={inputStyle} placeholder="xxxxx-xxxxxxx-x" required />
            </div>
            <div>
              <label style={labelStyle}>Date Of Birth</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr 1fr", gap: "8px" }}>
                {/* Day */}
                <select name="dobDay" value={form.dobDay} onChange={handleChange} style={selectStyle} required>
                  <option value="">DD</option>
                  {Array.from({ length: 31 }, (_, i) => String(i + 1).padStart(2, "0")).map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
                {/* Month */}
                <select name="dobMonth" value={form.dobMonth} onChange={handleChange} style={selectStyle} required>
                  <option value="">MM</option>
                  {[
                    { val: "01", label: "January" }, { val: "02", label: "February" },
                    { val: "03", label: "March" },   { val: "04", label: "April" },
                    { val: "05", label: "May" },     { val: "06", label: "June" },
                    { val: "07", label: "July" },    { val: "08", label: "August" },
                    { val: "09", label: "September" },{ val: "10", label: "October" },
                    { val: "11", label: "November" },{ val: "12", label: "December" },
                  ].map(m => <option key={m.val} value={m.val}>{m.label}</option>)}
                </select>
                {/* Year */}
                <select name="dobYear" value={form.dobYear} onChange={handleChange} style={selectStyle} required>
                  <option value="">YYYY</option>
                  {Array.from({ length: 60 }, (_, i) => String(new Date().getFullYear() - i)).map(y => (
                    <option key={y} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Row 4 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "12px" }}>
            <div>
              <label style={labelStyle}>City</label>
              <input name="city" value={form.city} onChange={handleChange} style={inputStyle} required />
            </div>
            <div>
              <label style={labelStyle}>Complete Address</label>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                style={inputStyle}
                placeholder="e.g. House 12, Block B, Karachi"
                required
              />
            </div>
          </div>

          {/* Row 5 */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "12px" }}>
            <div>
              <label style={labelStyle}>Salary Expected</label>
              <input name="salary" value={form.salary} onChange={handleChange} style={inputStyle} placeholder="e.g. 25000" required />
            </div>
            <div>
              <label style={labelStyle}>Work Type</label>
              <select name="workType" value={form.workType} onChange={handleChange} style={selectStyle} required>
                <option value=""></option>
                {["Driver","Cook","Baby Sitter","Home Teacher","Watchman","House Servant","Cleaner","Plumber"].map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Row 6 — Upload */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px", marginBottom: "16px" }}>
            {/* CNIC Upload */}
            <div>
              <label style={labelStyle}>Upload Your CNIC</label>
              <div
                onClick={() => cnicRef.current?.click()}
                style={{
                  border: "1.5px solid #ccc", borderRadius: "6px",
                  height: "80px", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer", background: "white", gap: "4px"
                }}
              >
                <Camera size={22} color="#888" />
                {cnicFile && <span style={{ fontSize: "0.72rem", color: "#555", textAlign: "center", padding: "0 8px" }}>{cnicFile.name}</span>}
              </div>
              <input ref={cnicRef} type="file" accept="image/*,.pdf" style={{ display: "none" }}
                onChange={e => e.target.files?.[0] && setCnicFile(e.target.files[0])} />
            </div>

            {/* Picture Upload */}
            <div>
              <label style={labelStyle}>Upload Your Picture</label>
              <div
                onClick={() => picRef.current?.click()}
                style={{
                  border: "1.5px solid #ccc", borderRadius: "6px",
                  height: "80px", display: "flex", flexDirection: "column",
                  alignItems: "center", justifyContent: "center",
                  cursor: "pointer", background: "white", gap: "4px"
                }}
              >
                <Camera size={22} color="#888" />
                {pictureFile && <span style={{ fontSize: "0.72rem", color: "#555", textAlign: "center", padding: "0 8px" }}>{pictureFile.name}</span>}
              </div>
              <input ref={picRef} type="file" accept="image/*" style={{ display: "none" }}
                onChange={e => e.target.files?.[0] && setPictureFile(e.target.files[0])} />
            </div>
          </div>

          {/* Submit */}
          <div style={{ textAlign: "center" }}>
            <button
              type="submit"
              style={{
                background: "#1abc9c", color: "white", border: "none",
                borderRadius: "6px", padding: "12px 36px", fontSize: "0.95rem",
                fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
              }}
            >
              Complete Registeration
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

// ── Step 2: Pending Verification ──────────────────────────────────────────────
const PendingVerification = () => (
  <main style={{
    flex: 1, background: "#f0faf6", display: "flex",
    alignItems: "center", justifyContent: "center"
  }}>
    <div style={{ textAlign: "center", maxWidth: "460px", padding: "0 24px" }}>
      <p style={{ fontSize: "1.15rem", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
        You have entered your details.
      </p>
      <p style={{ fontSize: "1rem", color: "#444", marginBottom: "24px", lineHeight: 1.6 }}>
        Wait for few moments till you information gets verified.
      </p>
      <RefreshCw size={32} color="#333" style={{ animation: "spin 2s linear infinite" }} />
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  </main>
);

// ── Step 3: Congratulations ───────────────────────────────────────────────────
const Congratulations = ({ onDisplayProfile }: { onDisplayProfile: () => void }) => (
  <main style={{
    flex: 1, background: "#f0faf6", display: "flex",
    alignItems: "center", justifyContent: "center"
  }}>
    <div style={{ textAlign: "center", maxWidth: "480px", padding: "0 24px" }}>
      <h2 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#1abc9c", marginBottom: "14px" }}>
        Congratulations!
      </h2>
      <p style={{ fontSize: "1.05rem", fontWeight: 700, color: "#111", marginBottom: "12px" }}>
        Your are now successfully registered as a Worker
      </p>
      <p style={{ fontSize: "0.97rem", color: "#444", marginBottom: "28px", lineHeight: 1.6 }}>
        Display your profile so that House Owners can see you and hire you.
      </p>
      <button
        onClick={onDisplayProfile}
        style={{
          background: "#1abc9c", color: "white", border: "none",
          borderRadius: "6px", padding: "12px 36px", fontSize: "0.95rem",
          fontWeight: 600, cursor: "pointer", fontFamily: "inherit"
        }}
      >
        Display Profile
      </button>
    </div>
  </main>
);

// ── Main Component ────────────────────────────────────────────────────────────
const WorkerRegistration: React.FC = () => {
  const navigate = useNavigate();
  // step: 1 = form, 2 = pending, 3 = congratulations
  const [step, setStep] = useState<1 | 2 | 3>(1);

  const handleFormSubmit = () => {
    setStep(2);
    // Simulate verification delay then move to step 3
    setTimeout(() => setStep(3), 3000);
  };

  const handleDisplayProfile = () => {
    navigate("/workerDashboard");
  };

  return (
    <div style={{ height: "100vh", overflow: "hidden", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', Arial, sans-serif" }}>
      <Navbar />

      {step === 1 && (
        <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column" }}>
          <RegistrationForm onSubmit={handleFormSubmit} />
          <Footer />
        </div>
      )}

      {step === 2 && (
        <>
          <PendingVerification />
          <Footer />
        </>
      )}

      {step === 3 && (
        <>
          <Congratulations onDisplayProfile={handleDisplayProfile} />
          <Footer />
        </>
      )}
    </div>
  );
};

export default WorkerRegistration;