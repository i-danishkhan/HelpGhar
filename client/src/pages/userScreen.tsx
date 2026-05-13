import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Search, User, X, MapPin, Briefcase, DollarSign, SlidersHorizontal, ChevronDown } from "lucide-react";

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

const CATEGORIES = ["All", "Servants", "Drivers", "Baby Sitters", "Cooks", "Home Teachers", "Watchman"];

const SORT_OPTIONS = [
  { label: "Newest First", value: "newest" },
  { label: "Oldest First", value: "oldest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

const GREEN = "#10B981";
const GREEN_DARK = "#0d9e6e";

// ─── Placeholder ──────────────────────────────────────────────────────────────

const GigImagePlaceholder = ({ category }: { category: string }) => {
  const emojis: Record<string, string> = {
    Servants: "🧹", Drivers: "🚗", "Baby Sitters": "👶",
    Cooks: "🍳", "Home Teachers": "📚", Watchman: "🔐",
  };
  return (
    <div style={{ width: "100%", height: "100%", background: "#f0fdf4", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <span style={{ fontSize: "3rem" }}>{emojis[category] || "💼"}</span>
      <span style={{ fontSize: "0.72rem", color: "#9ca3af" }}>{category || "General"}</span>
    </div>
  );
};

// ─── Info Row ─────────────────────────────────────────────────────────────────

function InfoRow({ icon, label, value, valueColor, valueBold }: {
  icon: React.ReactNode; label: string; value: string; valueColor?: string; valueBold?: boolean;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <div style={{ width: 22, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>{icon}</div>
      <span style={{ fontSize: "0.8rem", color: "#888", minWidth: 60 }}>{label}</span>
      <span style={{ fontSize: "0.82rem", color: valueColor || "#222", fontWeight: valueBold ? 700 : 500, marginLeft: "auto", textAlign: "right" }}>{value}</span>
    </div>
  );
}

// ─── Hire Modal ───────────────────────────────────────────────────────────────

function HireModal({ gig, onClose, onHire }: { gig: Gig; onClose: () => void; onHire: () => void }) {
  const emojis: Record<string, string> = {
    Servants: "🧹", Drivers: "🚗", "Baby Sitters": "👶",
    Cooks: "🍳", "Home Teachers": "📚", Watchman: "🔐",
  };
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}
    >
      <div style={{ background: "white", borderRadius: 16, width: "100%", maxWidth: 420, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.25)", animation: "slideUp 0.2s ease" }}>
        <div style={{ height: 180, position: "relative", overflow: "hidden" }}>
          {gig.IMAGE ? (
            <img
              src={gig.IMAGE.startsWith("http") ? gig.IMAGE : `${import.meta.env.VITE_API_URL}/uploads/gigs/${gig.IMAGE}`}
              alt={gig.TITLE} style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "#f0fdf4", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 6 }}>
              <span style={{ fontSize: "3.5rem" }}>{emojis[gig.CATEGORY] || "💼"}</span>
              <span style={{ fontSize: "0.75rem", color: "#9ca3af" }}>{gig.CATEGORY}</span>
            </div>
          )}
          <button onClick={onClose} style={{ position: "absolute", top: 10, right: 10, background: "rgba(0,0,0,0.45)", border: "none", borderRadius: "50%", width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "white" }}>
            <X size={16} />
          </button>
          {gig.CATEGORY && (
            <span style={{ position: "absolute", bottom: 10, left: 12, background: GREEN, color: "white", fontSize: "0.65rem", fontWeight: 700, padding: "3px 10px", borderRadius: 12 }}>
              {gig.CATEGORY}
            </span>
          )}
        </div>
        <div style={{ padding: "20px 22px 24px" }}>
          <h2 style={{ margin: "0 0 6px", fontSize: "1.1rem", fontWeight: 700, color: "#111" }}>{gig.TITLE}</h2>
          <p style={{ margin: "0 0 16px", fontSize: "0.82rem", color: "#555", lineHeight: 1.55 }}>{gig.DESCRIPTION}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 20 }}>
            <InfoRow icon={<User size={14} color={GREEN} />} label="Worker" value={`#${gig.WORKER_ID}`} />
            <InfoRow icon={<Briefcase size={14} color={GREEN} />} label="Category" value={gig.CATEGORY || "General"} />
            <InfoRow icon={<DollarSign size={14} color={GREEN} />} label="Price" value={`Rs. ${Number(gig.PRICE).toLocaleString()} /month`} valueColor={GREEN} valueBold />
            <InfoRow icon={<MapPin size={14} color={GREEN} />} label="Posted" value={new Date(gig.CREATED_AT).toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric" })} />
          </div>
          <p style={{ fontSize: "0.72rem", color: "#9ca3af", margin: "0 0 18px", textAlign: "center" }}>Price is negotiable based on requirements</p>
          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onClose}
              style={{ flex: 1, padding: "10px 0", borderRadius: 20, border: "1.5px solid #d1d5db", background: "white", color: "#555", fontSize: "0.88rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
              onMouseEnter={e => (e.currentTarget.style.background = "#f9fafb")}
              onMouseLeave={e => (e.currentTarget.style.background = "white")}
            >Cancel</button>
            <button onClick={onHire}
              style={{ flex: 2, padding: "10px 0", borderRadius: 20, border: "none", background: GREEN, color: "white", fontSize: "0.88rem", fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 12px rgba(16,185,129,0.35)" }}
              onMouseEnter={e => (e.currentTarget.style.background = GREEN_DARK)}
              onMouseLeave={e => (e.currentTarget.style.background = GREEN)}
            >Hire Now →</button>
          </div>
        </div>
      </div>
      <style>{`@keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }`}</style>
    </div>
  );
}

// ─── Filter Bar ───────────────────────────────────────────────────────────────

function FilterBar({
  activeCategory, setActiveCategory,
  sortBy, setSortBy,
  priceRange, setPriceRange,
  showFilters, setShowFilters,
  resultCount,
}: {
  activeCategory: string; setActiveCategory: (c: string) => void;
  sortBy: string; setSortBy: (s: string) => void;
  priceRange: [number, number]; setPriceRange: (r: [number, number]) => void;
  showFilters: boolean; setShowFilters: (v: boolean) => void;
  resultCount: number;
}) {
  return (
    <div style={{ background: "white", borderRadius: 12, border: "1px solid #e5e7eb", marginBottom: 20, overflow: "hidden" }}>
      {/* Top row */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", flexWrap: "wrap" }}>
        {/* Category pills */}
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)}
              style={{
                padding: "5px 14px", borderRadius: 20, fontSize: "0.78rem", fontWeight: 600,
                border: `1.5px solid ${activeCategory === cat ? GREEN : "#e5e7eb"}`,
                background: activeCategory === cat ? GREEN : "white",
                color: activeCategory === cat ? "white" : "#555",
                cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
              }}
            >{cat}</button>
          ))}
        </div>

        {/* Sort dropdown */}
        <div style={{ position: "relative", flexShrink: 0 }}>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)}
            style={{ appearance: "none", padding: "6px 32px 6px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "white", fontSize: "0.78rem", fontWeight: 600, color: "#333", cursor: "pointer", fontFamily: "inherit", outline: "none" }}>
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <ChevronDown size={13} style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", color: "#888" }} />
        </div>

        {/* Advanced filters toggle */}
        <button onClick={() => setShowFilters(!showFilters)}
          style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 8, border: `1.5px solid ${showFilters ? GREEN : "#e5e7eb"}`, background: showFilters ? "#ecfdf5" : "white", color: showFilters ? GREEN : "#555", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
          <SlidersHorizontal size={14} /> Filters {showFilters ? "▲" : "▼"}
        </button>
      </div>

      {/* Expanded panel */}
      {showFilters && (
        <div style={{ borderTop: "1px solid #f3f4f6", padding: "14px 16px", display: "flex", gap: 32, flexWrap: "wrap", alignItems: "flex-end" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 240 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "#555" }}>
              Price Range &nbsp;
              <span style={{ color: GREEN, fontWeight: 700 }}>
                Rs. {priceRange[0].toLocaleString()} – Rs. {priceRange[1].toLocaleString()}
              </span>
            </label>
            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>Min</span>
                <input type="range" min={0} max={100000} step={500} value={priceRange[0]}
                  onChange={e => setPriceRange([Math.min(Number(e.target.value), priceRange[1] - 500), priceRange[1]])}
                  style={{ accentColor: GREEN, width: "100%" }} />
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 3, flex: 1 }}>
                <span style={{ fontSize: "0.68rem", color: "#9ca3af" }}>Max</span>
                <input type="range" min={0} max={100000} step={500} value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], Math.max(Number(e.target.value), priceRange[0] + 500)])}
                  style={{ accentColor: GREEN, width: "100%" }} />
              </div>
            </div>
          </div>

          <button
            onClick={() => { setActiveCategory("All"); setSortBy("newest"); setPriceRange([0, 100000]); }}
            style={{ padding: "6px 16px", borderRadius: 8, border: "1.5px solid #e5e7eb", background: "white", color: "#888", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
            Reset Filters
          </button>

          <span style={{ fontSize: "0.78rem", color: "#9ca3af", marginLeft: "auto", alignSelf: "center" }}>
            {resultCount} result{resultCount !== 1 ? "s" : ""} found
          </span>
        </div>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function UserScreen() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [gigs, setGigs] = useState<Gig[]>([]);
  const [gigsLoading, setGigsLoading] = useState(true);
  const [selectedGig, setSelectedGig] = useState<Gig | null>(null);

  // Filter state
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchGigs = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/gigs/all`);
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

  // ✅ All filtering + sorting derived from gigs + search + filter state
  const filteredGigs = useMemo(() => {
    let result = [...gigs];

    // 1. Search — title, description, category (null-safe)
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(g =>
        (g.TITLE ?? "").toLowerCase().includes(q) ||
        (g.DESCRIPTION ?? "").toLowerCase().includes(q) ||
        (g.CATEGORY ?? "").toLowerCase().includes(q)
      );
    }

    // 2. Category pill filter (null-safe)
    if (activeCategory !== "All") {
      result = result.filter(g => (g.CATEGORY ?? "") === activeCategory);
    }

    // 3. Price range (null price treated as 0)
    result = result.filter(g => Number(g.PRICE ?? 0) >= priceRange[0] && Number(g.PRICE ?? 0) <= priceRange[1]);

    // 4. Sort
    switch (sortBy) {
      case "newest":    result.sort((a, b) => new Date(b.CREATED_AT).getTime() - new Date(a.CREATED_AT).getTime()); break;
      case "oldest":    result.sort((a, b) => new Date(a.CREATED_AT).getTime() - new Date(b.CREATED_AT).getTime()); break;
      case "price_asc": result.sort((a, b) => Number(a.PRICE) - Number(b.PRICE)); break;
      case "price_desc":result.sort((a, b) => Number(b.PRICE) - Number(a.PRICE)); break;
    }

    return result;
  }, [gigs, search, activeCategory, sortBy, priceRange]);

  const handleHire = (gig: Gig) => {
    setSelectedGig(null);
    navigate("/payment", {
      state: { gigId: gig.GIG_ID, workerId: gig.WORKER_ID, title: gig.TITLE, category: gig.CATEGORY, price: gig.PRICE },
    });
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f5f5f5" }}>

      {/* NAVBAR */}
      <nav style={{ background: GREEN, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", height: 58, flexShrink: 0, position: "sticky", top: 0, zIndex: 50, boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
        <span style={{ fontWeight: 800, fontSize: "1.4rem", color: "white", letterSpacing: "-0.3px", cursor: "pointer" }} onClick={() => navigate("/")}>
          HelpGhar.
        </span>

        {/* ✅ Fixed search — controls `search` state, filteredGigs reacts instantly */}
        <div style={{ flex: 1, maxWidth: 340, margin: "0 24px", position: "relative" }}>
          <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "#9ca3af", pointerEvents: "none" }} />
          <input
            type="text"
            placeholder="Search by title, category…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ width: "100%", padding: "8px 36px 8px 36px", borderRadius: 20, border: "none", outline: "none", fontSize: "0.88rem", background: "white", color: "#222", boxSizing: "border-box" }}
          />
          {search && (
            <button onClick={() => setSearch("")}
              style={{ position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9ca3af", display: "flex", alignItems: "center", padding: 0 }}>
              <X size={14} />
            </button>
          )}
        </div>

        <div style={{ position: "relative" }}>
          <button onClick={() => setShowDropdown(!showDropdown)}
            style={{ background: "transparent", border: "none", color: "white", fontWeight: 700, fontSize: "0.95rem", cursor: "pointer" }}>
            Register Yourself
          </button>
          {showDropdown && (
            <div style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", background: "white", borderRadius: 8, minWidth: 160, boxShadow: "0 4px 20px rgba(0,0,0,0.15)", overflow: "hidden", zIndex: 100 }}>
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

      {/* MAIN */}
      <main style={{ flex: 1, padding: "24px", maxWidth: 1100, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>

        <FilterBar
          activeCategory={activeCategory} setActiveCategory={setActiveCategory}
          sortBy={sortBy} setSortBy={setSortBy}
          priceRange={priceRange} setPriceRange={setPriceRange}
          showFilters={showFilters} setShowFilters={setShowFilters}
          resultCount={filteredGigs.length}
        />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ fontSize: "1rem", fontWeight: 700, color: "#333", margin: 0 }}>
            {search.trim() ? `Results for "${search}"` : "Available Workers"}
          </h2>
          <span style={{ fontSize: "0.78rem", color: "#888" }}>
            {filteredGigs.length} gig{filteredGigs.length !== 1 ? "s" : ""} found
          </span>
        </div>

        {gigsLoading ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}>Loading gigs…</div>
        ) : filteredGigs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 0", color: "#bbb", background: "white", borderRadius: 12, border: "1px dashed #e5e7eb" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: 8 }}>🔍</div>
            <p style={{ margin: 0, fontWeight: 600, color: "#aaa" }}>No gigs match your filters</p>
            <p style={{ margin: "4px 0 0", fontSize: "0.8rem", color: "#ccc" }}>Try adjusting your search or filters</p>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {filteredGigs.map((gig) => (
              <div key={gig.GIG_ID}
                style={{ background: "white", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, transform 0.15s", border: "1px solid #e5e7eb" }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.14)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.08)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                <div style={{ height: 160, overflow: "hidden", flexShrink: 0 }}>
                  {gig.IMAGE ? (
                    <img
                      src={gig.IMAGE.startsWith("http") ? gig.IMAGE : `${import.meta.env.VITE_API_URL}/uploads/gigs/${gig.IMAGE}`}
                      alt={gig.TITLE} style={{ width: "100%", height: "100%", objectFit: "cover" }}
                    />
                  ) : (
                    <GigImagePlaceholder category={gig.CATEGORY} />
                  )}
                </div>

                <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: 5 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
                    <span style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111" }}>{gig.TITLE}</span>
                    {gig.CATEGORY && (
                      <span style={{ background: GREEN, color: "white", fontSize: "0.6rem", fontWeight: 700, padding: "2px 7px", borderRadius: 10, whiteSpace: "nowrap" }}>
                        {gig.CATEGORY}
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: "0.75rem", color: "#666", margin: 0, lineHeight: 1.4, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {gig.DESCRIPTION}
                  </p>
                  <p style={{ fontSize: "0.75rem", color: "#666", margin: 0, display: "flex", alignItems: "center", gap: 4 }}>
                    <User size={11} color="#aaa" /> Worker #{gig.WORKER_ID}
                  </p>
                  <p style={{ fontSize: "0.78rem", color: GREEN, fontWeight: 700, margin: 0 }}>
                    Rs. {Number(gig.PRICE).toLocaleString()} /month
                  </p>
                  <p style={{ fontSize: "0.68rem", color: "#999", margin: 0 }}>Negotiable based on requirements</p>
                  <button
                    onClick={() => setSelectedGig(gig)}
                    style={{ marginTop: 8, background: GREEN, color: "white", border: "none", borderRadius: 20, padding: "8px 0", fontSize: "0.82rem", fontWeight: 600, cursor: "pointer", width: "100%", fontFamily: "inherit", transition: "background 0.15s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = GREEN_DARK)}
                    onMouseLeave={e => (e.currentTarget.style.background = GREEN)}
                  >Available Now</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer style={{ background: GREEN, padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10, flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 10 }}>
          {[0, 1, 2].map(i => (
            <a key={i} href="#" style={{ width: 30, height: 30, borderRadius: "50%", background: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="white">
                {i === 0 && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />}
                {i === 1 && <><rect x="2" y="2" width="20" height="20" rx="5" fill="none" stroke="white" strokeWidth="2" /><circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2" /><circle cx="17.5" cy="6.5" r="1" fill="white" /></>}
                {i === 2 && <><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>}
              </svg>
            </a>
          ))}
        </div>
        <p style={{ color: "white", fontSize: "0.82rem", opacity: 0.92 }}>@2025 All Copyrights are Reserved</p>
      </footer>

      {selectedGig && (
        <HireModal
          gig={selectedGig}
          onClose={() => setSelectedGig(null)}
          onHire={() => handleHire(selectedGig)}
        />
      )}
    </div>
  );
}