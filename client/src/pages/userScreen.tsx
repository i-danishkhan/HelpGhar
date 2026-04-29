import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Star, CheckCircle, User } from "lucide-react";

const categories = ["Servants", "Drivers", "Baby Sitters", "Cooks", "Home Teachers", "Watchman", "Baby Sitters"];

type BadgeType = "CNIC Verified" | "Top Rated Monthly" | "Top Rated Yearly";

interface Worker {
  id: number;
  name: string;
  age: number;
  gender: string;
  role: string;
  memberSince: string;
  reviews: number;
  rating: number;
  experience: string;
  salaryMin: number;
  salaryMax: number;
  badge: BadgeType;
  image: string;
  bgColor: string;
}

interface Gig {
  GIG_ID: number;
  WORKER_ID: number;
  TITLE: string;
  DESCRIPTION: string;
  PRICE: number;
  CATEGORY: string;
  IMAGE: string | null;
  CREATED_AT: string;
}

const workers: Worker[] = [
  { id: 1, name: "Zohaib Ali", age: 25, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 28, rating: 5, experience: "1.5 years", salaryMin: 25000, salaryMax: 30000, badge: "CNIC Verified", image: "", bgColor: "#f0e6d3" },
  { id: 2, name: "Bilal Iqbal", age: 28, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 12, rating: 3, experience: "1.5 years", salaryMin: 15000, salaryMax: 20000, badge: "Top Rated Monthly", image: "", bgColor: "#d6e8f0" },
  { id: 3, name: "Zohaib Ali", age: 35, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 230, rating: 4, experience: "1.5 years", salaryMin: 55000, salaryMax: 80000, badge: "CNIC Verified", image: "", bgColor: "#e8d0c8" },
  { id: 4, name: "Zohaib Ali", age: 31, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 22, rating: 2, experience: "1.5 years", salaryMin: 15000, salaryMax: 25000, badge: "CNIC Verified", image: "", bgColor: "#d8e8f8" },
  { id: 5, name: "Asjad Ali", age: 25, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 28, rating: 5, experience: "1.5 years", salaryMin: 25000, salaryMax: 30000, badge: "CNIC Verified", image: "", bgColor: "#c8c8c8" },
  { id: 6, name: "Zohaib Ali", age: 28, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 12, rating: 3.5, experience: "1.5 years", salaryMin: 15000, salaryMax: 20000, badge: "CNIC Verified", image: "", bgColor: "#f0a060" },
  { id: 7, name: "Zohaib Ali", age: 35, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 230, rating: 4.5, experience: "1.5 years", salaryMin: 55000, salaryMax: 80000, badge: "Top Rated Yearly", image: "", bgColor: "#d0d0c0" },
  { id: 8, name: "Zohaib Ali", age: 31, gender: "Male", role: "House Servant", memberSince: "2023", reviews: 22, rating: 2.5, experience: "1.5 years", salaryMin: 15000, salaryMax: 25000, badge: "CNIC Verified", image: "", bgColor: "#c8c8c8" },
];

const avatarColors = [
  { skin: "#d4956a", hair: "#8B4513", shirt: "#e74c3c" },
  { skin: "#c8a882", hair: "#2c1810", shirt: "#2980b9" },
  { skin: "#b8865a", hair: "#1a0a00", shirt: "#27ae60" },
  { skin: "#d4b896", hair: "#8B6914", shirt: "#7f8c8d" },
  { skin: "#c8a882", hair: "#3d1c00", shirt: "#2c3e50" },
  { skin: "#d4956a", hair: "#8B4513", shirt: "#e67e22" },
  { skin: "#b8865a", hair: "#1a0a00", shirt: "#8e44ad" },
  { skin: "#c8a882", hair: "#2c2c2c", shirt: "#2c3e50" },
];

const WorkerAvatar = ({ index, bgColor }: { index: number; bgColor: string }) => {
  const c = avatarColors[index % avatarColors.length];
  return (
    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
      <rect width="200" height="200" fill={bgColor} />
      <ellipse cx="100" cy="72" rx="48" ry="52" fill={c.hair} />
      <rect x="84" y="128" width="32" height="28" rx="4" fill={c.skin} />
      <ellipse cx="100" cy="185" rx="65" ry="35" fill={c.shirt} />
      <rect x="35" y="155" width="130" height="50" fill={c.shirt} />
      <ellipse cx="100" cy="95" rx="42" ry="46" fill={c.skin} />
      <ellipse cx="100" cy="58" rx="42" ry="28" fill={c.hair} />
      <ellipse cx="85" cy="90" rx="5" ry="6" fill="#1a1a1a" />
      <ellipse cx="115" cy="90" rx="5" ry="6" fill="#1a1a1a" />
      <circle cx="87" cy="88" r="1.5" fill="white" />
      <circle cx="117" cy="88" r="1.5" fill="white" />
      <path d="M78 80 Q85 76 92 80" stroke={c.hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M108 80 Q115 76 122 80" stroke={c.hair} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M97 96 Q100 103 103 96" stroke="#b8865a" strokeWidth="1.8" fill="none" strokeLinecap="round" />
      <path d="M86 112 Q100 122 114 112" stroke="#1a1a1a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <ellipse cx="58" cy="95" rx="7" ry="9" fill={c.skin} />
      <ellipse cx="142" cy="95" rx="7" ry="9" fill={c.skin} />
    </svg>
  );
};

const StarRating = ({ rating }: { rating: number }) => (
  <div style={{ display: "flex", gap: "2px" }}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={14}
        fill={star <= Math.floor(rating) ? "#f59e0b" : star - 0.5 <= rating ? "#f59e0b" : "none"}
        stroke="#f59e0b"
        strokeWidth={1.5}
      />
    ))}
  </div>
);

const getBadgeStyle = (badge: BadgeType) => {
  if (badge === "Top Rated Monthly" || badge === "Top Rated Yearly") return { bg: "#3b82f6", color: "white" };
  return { bg: "#22c55e", color: "white" };
};

// ✅ Placeholder when gig has no image
const GigImagePlaceholder = ({ category }: { category: string }) => {
  const emojis: Record<string, string> = {
    Servants: "🧹", Drivers: "🚗", "Baby Sitters": "👶",
    Cooks: "🍳", "Home Teachers": "📚", Watchman: "🔐",
  };
  const emoji = emojis[category] || "💼";
  return (
    <div style={{
      width: "100%", height: "100%", background: "#f0fdf4",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", gap: "6px"
    }}>
      <span style={{ fontSize: "3rem" }}>{emoji}</span>
      <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{category || "General"}</span>
    </div>
  );
};

export default function UserScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("Servants");
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [gigsLoading, setGigsLoading] = useState(true);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/gigs/all");
        const data = await res.json();
        if (res.ok) setGigs(data.gigs || []);
      } catch (err) {
        console.error("Failed to fetch gigs:", err);
      } finally {
        setGigsLoading(false);
      }
    };
    fetchGigs();
  }, []);

  const filteredWorkers = workers.filter(
    (w) =>
      w.name.toLowerCase().includes(search.toLowerCase()) ||
      w.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f5f5f5" }}>

      {/* NAVBAR */}
      <nav style={{
        background: "#1abc9c", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 24px", height: "58px",
        flexShrink: 0, position: "sticky", top: 0, zIndex: 50,
        boxShadow: "0 2px 8px rgba(0,0,0,0.12)"
      }}>
        <span style={{ fontWeight: 800, fontSize: "1.4rem", color: "white", letterSpacing: "-0.3px", cursor: "pointer" }}
          onClick={() => navigate("/")}>
          HelpGhar.
        </span>
        <div style={{ flex: 1, maxWidth: "320px", margin: "0 24px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "#9ca3af" }} />
          <input
            type="text" placeholder="Search" value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px 12px 8px 36px", borderRadius: "20px", border: "none", outline: "none", fontSize: "0.88rem", background: "white", color: "#222", boxSizing: "border-box" }}
          />
        </div>
        <div style={{ position: "relative" }}>
          <button onClick={() => setShowDropdown(!showDropdown)}
            style={{ background: "transparent", border: "none", color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>
            Register Yourself
          </button>
          {showDropdown && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "white", borderRadius: "8px", minWidth: "160px", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", overflow: "hidden", zIndex: 100 }}>
              {["As a Worker", "As a Customer", "Log Out"].map((item) => (
                <button key={item} onClick={() => {
                  setShowDropdown(false);
                  if (item === "As a Worker") navigate("/workerRegistration");
                  if (item === "As a Customer") navigate("/houseOwnerRegistration");
                  if (item === "Log Out") navigate("/");
                }}
                  style={{ display: "block", width: "100%", textAlign: "left", padding: "11px 18px", fontSize: "0.88rem", color: "#222", background: "none", border: "none", cursor: "pointer", borderBottom: item !== "Log Out" ? "1px solid #f0f0f0" : "none", fontFamily: "inherit" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "#f5f5f5")}
                  onMouseLeave={e => (e.currentTarget.style.background = "none")}
                >{item}</button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* CATEGORY NAV */}
      <div style={{ background: "white", borderBottom: "2px solid #e5e7eb", padding: "0 24px", overflowX: "auto", whiteSpace: "nowrap" }}>
        <div style={{ display: "inline-flex" }}>
          {categories.map((cat) => (
            <button key={cat + Math.random()} onClick={() => setActiveCategory(cat)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "14px 20px", fontSize: "0.9rem", fontWeight: 600, color: activeCategory === cat ? "#1abc9c" : "#555", borderBottom: activeCategory === cat ? "2.5px solid #1abc9c" : "2.5px solid transparent", transition: "all 0.2s", fontFamily: "inherit", textDecoration: activeCategory === cat ? "underline" : "none" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN */}
      <main style={{ flex: 1, padding: "24px", maxWidth: "1100px", margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        {/* Workers */}
        <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#333", marginBottom: "16px", marginTop: 0 }}>
          Available Workers
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px", marginBottom: "40px" }}>
          {filteredWorkers.map((worker, index) => {
            const badgeStyle = getBadgeStyle(worker.badge);
            return (
              <div key={worker.id}
                style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s", border: "1px solid #e5e7eb" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
              >
                <div style={{ height: "160px", overflow: "hidden" }}>
                  <WorkerAvatar index={index} bgColor={worker.bgColor} />
                </div>
                <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111" }}>{worker.name}</span>
                    <span style={{ background: badgeStyle.bg, color: badgeStyle.color, fontSize: "0.6rem", fontWeight: 700, padding: "2px 6px", borderRadius: "10px", display: "flex", alignItems: "center", gap: "3px", whiteSpace: "nowrap" }}>
                      {worker.badge === "CNIC Verified" && <CheckCircle size={9} />}
                      {worker.badge}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#666", margin: 0, lineHeight: 1.4 }}>
                    {worker.age} years , {worker.gender} , {worker.role} ,<br />Member since {worker.memberSince}.
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <StarRating rating={worker.rating} />
                    <span style={{ fontSize: "0.72rem", color: "#888" }}>({worker.reviews} Reviews)</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#555", margin: 0 }}>Experience of {worker.experience}</p>
                  <p style={{ fontSize: "0.78rem", color: "#1abc9c", fontWeight: 700, margin: 0 }}>
                    Rs. {worker.salaryMin.toLocaleString()} - {worker.salaryMax.toLocaleString()} /month
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#999", margin: 0 }}>Negotiable based on requirements</p>
                  <button onClick={() => navigate(`/workerProfile/${worker.id}`)}
                    style={{ marginTop: "8px", background: "#1abc9c", color: "white", border: "none", borderRadius: "20px", padding: "8px 0", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#17a589")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#1abc9c")}
                  >Available Now</button>
                </div>
              </div>
            );
          })}
          {filteredWorkers.length === 0 && (
            <div style={{ gridColumn: "1 / -1", textAlign: "center", padding: "60px 0", color: "#999" }}>No workers found.</div>
          )}
        </div>

        {/* ✅ GIGS — Worker card style */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#333", margin: 0 }}>Posted Gigs</h2>
          <span style={{ fontSize: "0.78rem", color: "#888" }}>{gigs.length} gig{gigs.length !== 1 ? "s" : ""} available</span>
        </div>

        {gigsLoading ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}>Loading gigs...</div>
        ) : gigs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "40px 0", color: "#bbb", background: "white", borderRadius: "12px", border: "1px dashed #e5e7eb" }}>
            No gigs posted yet.
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "20px" }}>
            {gigs.map((gig) => (
              <div key={gig.GIG_ID}
                style={{ background: "white", borderRadius: "12px", overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s", border: "1px solid #e5e7eb" }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.14)")}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)")}
              >
                {/* ✅ Photo — real image or placeholder */}
                <div style={{ height: "160px", overflow: "hidden", flexShrink: 0 }}>
                  {gig.IMAGE ? (
                    <img
                      src={`http://localhost:8000/uploads/gigs/${gig.IMAGE}`}
                      alt={gig.TITLE}
                      style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <GigImagePlaceholder category={gig.CATEGORY} />
                  )}
                </div>

                {/* Info — exactly like worker card */}
                <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: "5px" }}>

                  {/* Title + Category badge */}
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111" }}>{gig.TITLE}</span>
                    {gig.CATEGORY && (
                      <span style={{ background: "#22c55e", color: "white", fontSize: "0.6rem", fontWeight: 700, padding: "2px 7px", borderRadius: "10px", whiteSpace: "nowrap" }}>
                        {gig.CATEGORY}
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p style={{
                    fontSize: "0.75rem", color: "#666", margin: 0, lineHeight: 1.4,
                    display: "-webkit-box", WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical", overflow: "hidden"
                  }}>
                    {gig.DESCRIPTION}
                  </p>

                  {/* Worker ID line */}
                  <p style={{ fontSize: "0.75rem", color: "#666", margin: 0, lineHeight: 1.4, display: "flex", alignItems: "center", gap: "4px" }}>
                    <User size={11} color="#aaa" />
                    Worker #{gig.WORKER_ID}
                  </p>

                  {/* Price */}
                  <p style={{ fontSize: "0.78rem", color: "#1abc9c", fontWeight: 700, margin: 0 }}>
                    Rs. {Number(gig.PRICE).toLocaleString()} /month
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#999", margin: 0 }}>
                    Negotiable based on requirements
                  </p>

                  {/* Button */}
                  <button
                    onClick={() => navigate(`/workerProfile/${gig.WORKER_ID}`)}
                    style={{ marginTop: "8px", background: "#1abc9c", color: "white", border: "none", borderRadius: "20px", padding: "8px 0", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#17a589")}
                    onMouseLeave={e => (e.currentTarget.style.background = "#1abc9c")}
                  >
                    Available Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ background: "#1abc9c", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "10px", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: "10px" }}>
          <a href="#" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
          </a>
          <a href="#" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none" /></svg>
          </a>
          <a href="#" style={{ width: "30px", height: "30px", borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="white"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
          </a>
        </div>
        <p style={{ color: "white", fontSize: "0.82rem", opacity: 0.92 }}>@2025 All Copyrights are Reserved</p>
      </footer>
    </div>
  );
}