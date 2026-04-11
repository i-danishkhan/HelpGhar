import React from "react";

// ── Inline global styles ────────────────────────────────────────────────────
const GlobalStyle = () => (
  <style>{`
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', Arial, sans-serif; color: #222; }
    a { text-decoration: none; color: inherit; }
    button { cursor: pointer; font-family: inherit; }

    .nav-link {
      color: white;
      font-size: 0.9rem;
      font-weight: 500;
      opacity: 0.92;
      transition: opacity 0.2s;
    }
    .nav-link:hover { opacity: 1; text-decoration: underline; }

    .btn-primary {
      background: #1abc9c;
      color: white;
      border: none;
      border-radius: 6px;
      padding: 11px 26px;
      font-weight: 700;
      font-size: 0.93rem;
      transition: background 0.2s, transform 0.15s;
    }
    .btn-primary:hover { background: #17a589; transform: translateY(-1px); }

    .btn-outline {
      background: white;
      color: #1abc9c;
      border: 2px solid #1abc9c;
      border-radius: 6px;
      padding: 11px 26px;
      font-weight: 700;
      font-size: 0.93rem;
      transition: all 0.2s;
    }
    .btn-outline:hover { background: #1abc9c; color: white; transform: translateY(-1px); }

    .feature-card {
      background: white;
      border: 1.5px solid #c8f0e6;
      border-radius: 14px;
      padding: 28px 18px 22px;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      text-align: center;
      transition: box-shadow 0.2s, transform 0.2s;
    }
    .feature-card:hover {
      box-shadow: 0 8px 28px rgba(26,188,156,0.18);
      transform: translateY(-4px);
    }

    .step-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 14px;
      text-align: center;
    }

    .testimonial-card {
      background: white;
      border: 1.5px solid #d4f0ea;
      border-radius: 12px;
      padding: 26px 22px;
      text-align: left;
    }

    .btn-cta {
      background: #1abc9c;
      color: white;
      border: none;
      border-radius: 8px;
      padding: 14px 44px;
      font-weight: 700;
      font-size: 1rem;
      transition: background 0.2s, transform 0.15s;
    }
    .btn-cta:hover { background: #17a589; transform: scale(1.03); }

    .social-btn {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: rgba(255,255,255,0.28);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.2s;
    }
    .social-btn:hover { background: rgba(255,255,255,0.5); }

    @media (max-width: 768px) {
      .hero-grid { flex-direction: column !important; }
      .hero-illustration { max-width: 100% !important; }
      .nav-links { display: none !important; }
    }
    @media (max-width: 480px) {
      .hero-btns { flex-direction: column !important; }
      .hero-btns button { width: 100%; }
    }
  `}</style>
);

// ── SVG Icons ───────────────────────────────────────────────────────────────

const HeroIllustration = () => (
  <svg viewBox="0 0 380 290" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
    {/* House window */}
    <rect x="195" y="15" width="155" height="115" rx="8" fill="#e6f9f4" stroke="#1abc9c" strokeWidth="2.2"/>
    <line x1="272" y1="15" x2="272" y2="130" stroke="#1abc9c" strokeWidth="1.8"/>
    <line x1="195" y1="72" x2="350" y2="72" stroke="#1abc9c" strokeWidth="1.8"/>
    <path d="M185 22 L272 -2 L362 22" stroke="#1abc9c" strokeWidth="2" fill="none"/>

    {/* Cook figure (right) */}
    <circle cx="305" cy="170" r="18" fill="#d1f5ea" stroke="#1abc9c" strokeWidth="2"/>
    <rect x="294" y="153" width="22" height="13" rx="3" fill="white" stroke="#1abc9c" strokeWidth="1.5"/>
    <ellipse cx="305" cy="153" rx="13" ry="6" fill="white" stroke="#1abc9c" strokeWidth="1.5"/>
    <rect x="291" y="188" width="28" height="46" rx="6" fill="#1abc9c"/>
    <line x1="291" y1="200" x2="268" y2="218" stroke="#1abc9c" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="319" y1="200" x2="338" y2="214" stroke="#1abc9c" strokeWidth="2.8" strokeLinecap="round"/>
    <ellipse cx="258" cy="220" rx="12" ry="5" fill="#17a589" opacity="0.6"/>
    <line x1="248" y1="220" x2="235" y2="218" stroke="#17a589" strokeWidth="2" strokeLinecap="round"/>

    {/* Cleaner figure (left) */}
    <circle cx="155" cy="168" r="18" fill="#d1f5ea" stroke="#1abc9c" strokeWidth="2"/>
    <rect x="141" y="186" width="28" height="48" rx="6" fill="#0e9e79"/>
    <line x1="141" y1="198" x2="112" y2="182" stroke="#0e9e79" strokeWidth="2.8" strokeLinecap="round"/>
    <line x1="112" y1="182" x2="107" y2="238" stroke="#0e9e79" strokeWidth="2.8" strokeLinecap="round"/>
    <ellipse cx="107" cy="241" rx="13" ry="5" fill="#1abc9c" opacity="0.35"/>
    <line x1="169" y1="200" x2="185" y2="210" stroke="#0e9e79" strokeWidth="2.8" strokeLinecap="round"/>

    {/* Child figure */}
    <circle cx="228" cy="240" r="14" fill="#d1f5ea" stroke="#1abc9c" strokeWidth="1.8"/>
    <rect x="218" y="254" width="20" height="32" rx="5" fill="#a8edd8"/>

    {/* Floating dots */}
    <circle cx="75" cy="75" r="4" fill="#1abc9c" opacity="0.4"/>
    <circle cx="365" cy="255" r="5" fill="#1abc9c" opacity="0.3"/>
    <circle cx="48" cy="195" r="3" fill="#0e9e79" opacity="0.35"/>
    <circle cx="380" cy="140" r="4" fill="#1abc9c" opacity="0.25"/>
    <circle cx="175" cy="30" r="3" fill="#1abc9c" opacity="0.3"/>
  </svg>
);

const VerifiedIcon = () => (
  <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
    <rect width="58" height="58" rx="11" fill="#e6f9f4"/>
    <path d="M29 8 L35 17 L46 17 L39 24 L42 35 L29 28 L16 35 L19 24 L12 17 L23 17 Z"
      fill="#1abc9c" opacity="0.25" stroke="#1abc9c" strokeWidth="1.8" strokeLinejoin="round"/>
    <path d="M20 29 L26 35 L38 23" stroke="#1abc9c" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const HiringIcon = () => (
  <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
    <rect width="58" height="58" rx="11" fill="#e6f9f4"/>
    <polygon points="29,10 33.5,21 46,21 36.5,27.5 40,39 29,32.5 18,39 21.5,27.5 12,21 24.5,21"
      fill="#1abc9c" stroke="#1abc9c" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

const PaymentIcon = () => (
  <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
    <rect width="58" height="58" rx="11" fill="#e6f9f4"/>
    <rect x="10" y="18" width="38" height="24" rx="5" fill="none" stroke="#1abc9c" strokeWidth="2.2"/>
    <line x1="10" y1="27" x2="48" y2="27" stroke="#1abc9c" strokeWidth="2.2"/>
    <rect x="16" y="32" width="11" height="5" rx="2.5" fill="#1abc9c"/>
    <rect x="30" y="32" width="6" height="5" rx="2.5" fill="#1abc9c" opacity="0.4"/>
  </svg>
);

const CommunityIcon = () => (
  <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
    <rect width="58" height="58" rx="11" fill="#e6f9f4"/>
    <circle cx="20" cy="24" r="7" fill="none" stroke="#1abc9c" strokeWidth="2"/>
    <circle cx="38" cy="24" r="7" fill="none" stroke="#1abc9c" strokeWidth="2"/>
    <circle cx="29" cy="22" r="6" fill="#1abc9c" opacity="0.18" stroke="#1abc9c" strokeWidth="1.5"/>
    <path d="M7 46 Q20 36 33 44" stroke="#1abc9c" strokeWidth="2" fill="none" strokeLinecap="round"/>
    <path d="M25 46 Q38 36 51 44" stroke="#1abc9c" strokeWidth="2" fill="none" strokeLinecap="round"/>
  </svg>
);

const SearchPostIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" fill="#e6f9f4" stroke="#1abc9c" strokeWidth="2"/>
    <rect x="20" y="18" width="28" height="36" rx="4" fill="none" stroke="#1abc9c" strokeWidth="2"/>
    <line x1="26" y1="27" x2="42" y2="27" stroke="#1abc9c" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="26" y1="32" x2="42" y2="32" stroke="#1abc9c" strokeWidth="1.8" strokeLinecap="round"/>
    <line x1="26" y1="37" x2="36" y2="37" stroke="#1abc9c" strokeWidth="1.8" strokeLinecap="round"/>
    <circle cx="50" cy="52" r="9" fill="none" stroke="#1abc9c" strokeWidth="2"/>
    <line x1="57" y1="59" x2="63" y2="65" stroke="#1abc9c" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const VerifyHireIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" fill="#1abc9c"/>
    <path d="M24 40 L35 52 L56 28" stroke="white" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const PayRateIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
    <circle cx="40" cy="40" r="38" fill="#e6f9f4" stroke="#1abc9c" strokeWidth="2"/>
    <circle cx="40" cy="36" r="13" fill="none" stroke="#1abc9c" strokeWidth="2"/>
    <text x="36" y="42" fill="#1abc9c" fontSize="15" fontWeight="bold" fontFamily="Arial">$</text>
    <path d="M18 60 Q28 50 40 55 Q52 60 62 50" stroke="#1abc9c" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
  </svg>
);

// ── Landing Page ────────────────────────────────────────────────────────────
const LandingPage: React.FC = () => {
  return (
    <>
      <GlobalStyle />

      {/* ── NAVBAR — teal green background ── */}
      <nav style={{
        background: "#1abc9c",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "13px 6%", position: "sticky", top: 0, zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
      }}>
        <div style={{ fontWeight: 800, fontSize: "1.3rem", color: "white", letterSpacing: "-0.3px" }}>
          HelpGhar<span style={{ opacity: 0.75 }}>.</span>
        </div>

        <div className="nav-links" style={{ display: "flex", gap: "28px" }}>
          <a href="#" className="nav-link">Home</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button style={{
            background: "none", border: "none", color: "white",
            fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.5px", cursor: "pointer"
          }}>LOGIN</button>
          <button style={{
            background: "white", color: "#1abc9c", border: "none", borderRadius: "5px",
            padding: "7px 16px", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.4px",
            cursor: "pointer", transition: "opacity 0.2s"
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >SIGN UP</button>
        </div>
      </nav>

      {/* ── HERO — white background ── */}
      <section style={{ background: "white", padding: "56px 6% 64px" }}>
        <div className="hero-grid" style={{
          display: "flex", alignItems: "center",
          justifyContent: "space-between", gap: "32px", flexWrap: "wrap"
        }}>
          <div style={{ flex: "1 1 320px", maxWidth: "480px" }}>
            <h1 style={{ fontSize: "clamp(1.9rem, 3.8vw, 2.9rem)", lineHeight: 1.18, fontWeight: 800 }}>
              <span style={{ color: "#1abc9c" }}>Your Home,</span><br />
              <span style={{ color: "#1abc9c" }}>Their Work</span><br />
              <span style={{ color: "#222" }}>A Perfect Match</span>
            </h1>
            <div className="hero-btns" style={{ display: "flex", gap: "14px", marginTop: "28px", flexWrap: "wrap" }}>
              <button className="btn-primary">Hire Workers</button>
              <button className="btn-outline">Find Jobs</button>
            </div>
          </div>

          <div className="hero-illustration" style={{ flex: "1 1 280px", maxWidth: "400px" }}>
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE — light gray-green background ── */}
      <section style={{ background: "#f4faf8", padding: "64px 6%", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.45rem, 2.8vw, 2.1rem)", fontWeight: 800, color: "#111", marginBottom: "8px" }}>
          Why Choose HelpGhar?
        </h2>
        <p style={{ color: "#666", fontSize: "0.97rem", marginBottom: "44px" }}>
          Because trust, security and success matter the most.
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(185px, 1fr))",
          gap: "20px", maxWidth: "860px", margin: "0 auto"
        }}>
          {[
            { icon: <VerifiedIcon />, title: "Verified Workers",             desc: "Every worker passes CNIC, Selfie and address verification before joining." },
            { icon: <HiringIcon />,   title: "99% Hiring Success",           desc: "Most homeowners hire successfully within few days." },
            { icon: <PaymentIcon />,  title: "Safe and Transparent Payments",desc: "Pay through our wallet system with receipts and dispute protection." },
            { icon: <CommunityIcon />,title: "Trusted Community",            desc: "Trusted by hundreds of families and workers across Pakistan." },
          ].map((item, i) => (
            <div key={i} className="feature-card">
              {item.icon}
              <h3 style={{ fontWeight: 700, fontSize: "0.97rem", color: "#111" }}>{item.title}</h3>
              <p style={{ color: "#666", fontSize: "0.82rem", lineHeight: 1.55 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS — white background ── */}
      <section style={{ background: "white", padding: "64px 6%", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.45rem, 2.8vw, 2.1rem)", fontWeight: 800, color: "#111", marginBottom: "8px" }}>
          How it Works
        </h2>
        <p style={{ color: "#666", fontSize: "0.97rem", marginBottom: "50px" }}>
          Simple and secure hiring thru these three steps
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))",
          gap: "36px", maxWidth: "760px", margin: "0 auto"
        }}>
          {[
            { icon: <SearchPostIcon />, title: "Search and Post", desc: "Search for worker and post a job in seconds" },
            { icon: <VerifyHireIcon />, title: "Verify and Hire", desc: "Verify the worker and hire with confidence" },
            { icon: <PayRateIcon />,    title: "Pay and Rate",    desc: "Pay through our secure wallet and rate the worker" },
          ].map((step, i) => (
            <div key={i} className="step-card">
              {step.icon}
              <h3 style={{ fontWeight: 700, fontSize: "1rem", color: "#111" }}>{step.title}</h3>
              <p style={{ color: "#666", fontSize: "0.85rem", lineHeight: 1.55, maxWidth: "190px" }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS — light gray-green background ── */}
      <section id="testimonials" style={{ background: "#f4faf8", padding: "64px 6%", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.45rem, 2.8vw, 2.1rem)", fontWeight: 800, color: "#111", marginBottom: "36px" }}>
          Testimonials
        </h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
          gap: "22px", maxWidth: "860px", margin: "0 auto"
        }}>
          {[
            { text: "Good but not very careful with things. Broke a vase once.",                                           name: "Anonymous",      role: "Homeowner" },
            { text: "Our driver has been with us for over 3 years. Always punctual and keeps the car neat. Very trustworthy.", name: "Muhammad Aslam", role: "Owner of Qureshi Traders" },
            { text: "She explains concepts very clearly. My grades have improved a lot.",                                   name: "Shahid Mehmood", role: "Bank Manager, HBL" },
          ].map((t, i) => (
            <div key={i} className="testimonial-card">
              <div style={{ marginBottom: "12px" }}>
                <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
                  <path d="M0 20 C0 13 3.5 6.5 11 0 L13 3 C8.5 6.5 6.5 11 7.5 15 L11 15 L11 20 Z" fill="#1abc9c"/>
                  <path d="M15 20 C15 13 18.5 6.5 26 0 L28 3 C23.5 6.5 21.5 11 22.5 15 L26 15 L26 20 Z" fill="#1abc9c"/>
                </svg>
              </div>
              <p style={{ color: "#444", fontSize: "0.88rem", lineHeight: 1.65, marginBottom: "18px" }}>{t.text}</p>
              <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "#111" }}>{t.name}</div>
              <div style={{ color: "#888", fontSize: "0.8rem", marginTop: "2px" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER — dark background ── */}
      <section style={{ background: "#1a1a1a", padding: "64px 6%", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(1.45rem, 3vw, 2.2rem)", fontWeight: 800, color: "white", marginBottom: "28px" }}>
          Ready To Hire Your First Worker?
        </h2>
        <button className="btn-cta">Get Started</button>
      </section>

      {/* ── FOOTER — teal green background ── */}
      <footer style={{
        background: "#1abc9c",
        padding: "16px 6%",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", flexWrap: "wrap", gap: "10px"
      }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#" className="social-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
            </svg>
          </a>
          <a href="#" className="social-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
            </svg>
          </a>
          <a href="#" className="social-btn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z"/>
              <rect x="2" y="9" width="4" height="12"/>
              <circle cx="4" cy="4" r="2"/>
            </svg>
          </a>
        </div>
        <p style={{ color: "white", fontSize: "0.76rem", opacity: 0.88 }}>
          ©2025 All Copyrights are Reserved
        </p>
      </footer>
    </>
  );
};

export default LandingPage;