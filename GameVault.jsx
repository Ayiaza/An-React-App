import { useState } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Action", "RPG", "Strategy", "Sports", "Puzzle", "Adventure"];

const GAMES = [
  { id: 1, title: "Shadow Realm", category: "Action", rating: 4.8, players: "12.4K", price: "Free", badge: "Hot", color: "#7C3AED", emoji: "⚔️", desc: "Hack-and-slash through cursed dungeons." },
  { id: 2, title: "Dragon Keep", category: "RPG", rating: 4.6, players: "9.1K", price: "$9.99", badge: "New", color: "#DC2626", emoji: "🐉", desc: "Build your kingdom, raise dragons, conquer all." },
  { id: 3, title: "War Grid", category: "Strategy", rating: 4.5, players: "7.3K", price: "$4.99", badge: "", color: "#0891B2", emoji: "🗺️", desc: "Turn-based conquest across 50 hand-crafted maps." },
  { id: 4, title: "Kick Off 25", category: "Sports", rating: 4.4, players: "22.8K", price: "Free", badge: "Hot", color: "#16A34A", emoji: "⚽", desc: "The most realistic football sim on the web." },
  { id: 5, title: "Mind Knot", category: "Puzzle", rating: 4.7, players: "5.6K", price: "Free", badge: "", color: "#D97706", emoji: "🧩", desc: "Fiendish logic puzzles with minimal UI." },
  { id: 6, title: "Lost Isles", category: "Adventure", rating: 4.9, players: "3.2K", price: "$14.99", badge: "Top Rated", color: "#0D9488", emoji: "🏝️", desc: "Explore a hand-painted open world solo or co-op." },
  { id: 7, title: "Neon Blitz", category: "Action", rating: 4.3, players: "8.8K", price: "Free", badge: "", color: "#BE185D", emoji: "🔫", desc: "Fast-paced arena shooter with neon aesthetics." },
  { id: 8, title: "Forge & Fate", category: "RPG", rating: 4.5, players: "6.4K", price: "$7.99", badge: "New", color: "#9333EA", emoji: "🔮", desc: "Craft legendary weapons, shape the world's fate." },
  { id: 9, title: "Fleet Command", category: "Strategy", rating: 4.2, players: "4.1K", price: "$2.99", badge: "", color: "#1D4ED8", emoji: "🚀", desc: "Command space fleets across procedural galaxies." },
  { id: 10, title: "Turbo Drift", category: "Sports", rating: 4.6, players: "18.3K", price: "Free", badge: "Hot", color: "#EA580C", emoji: "🏎️", desc: "Arcade racing with physics-based drift mechanics." },
  { id: 11, title: "Cube Logic", category: "Puzzle", rating: 4.8, players: "2.9K", price: "Free", badge: "Top Rated", color: "#0284C7", emoji: "🟦", desc: "3D spatial puzzles inspired by classic Soma cubes." },
  { id: 12, title: "Thornwood", category: "Adventure", rating: 4.7, players: "4.7K", price: "$12.99", badge: "", color: "#65A30D", emoji: "🌲", desc: "A dark fairy-tale quest through a living forest." },
];

const SORT_OPTIONS = ["Rating", "Players", "Price", "Name"];

const NAV_LINKS = ["Home", "Browse", "Library", "Leaderboard", "Community"];

// ── THEME TOKENS ────────────────────────────────────────────────────────────
function getTheme(dark) {
  return dark
    ? {
        bg: "#0F0F13",
        surface: "#18181F",
        card: "#1E1E28",
        cardHover: "#25252F",
        border: "#2C2C3A",
        textPrimary: "#F0F0F8",
        textSecondary: "#9090A8",
        textMuted: "#5A5A72",
        accent: "#7C3AED",
        accentBg: "#1C1230",
        navBg: "#18181F",
        sidebarBg: "#18181F",
        badgeBg: "#2C2C3A",
        inputBg: "#25252F",
        toggleBg: "#7C3AED",
      }
    : {
        bg: "#F4F2FF",
        surface: "#FFFFFF",
        card: "#FFFFFF",
        cardHover: "#F8F7FF",
        border: "#E4E0F5",
        textPrimary: "#16141F",
        textSecondary: "#5A5272",
        textMuted: "#9990B8",
        accent: "#7C3AED",
        accentBg: "#EDE9FF",
        navBg: "#FFFFFF",
        sidebarBg: "#FFFFFF",
        badgeBg: "#EDE9FF",
        inputBg: "#F0EEF9",
        toggleBg: "#D4C8FF",
      };
}

// ── STAR RATING ─────────────────────────────────────────────────────────────
function Stars({ rating, t }) {
  return (
    <span style={{ color: "#FBBF24", fontSize: 13, fontWeight: 600 }}>
      {"★".repeat(Math.floor(rating))}
      {"☆".repeat(5 - Math.floor(rating))}
      <span style={{ color: t.textSecondary, marginLeft: 4, fontWeight: 400 }}>
        {rating}
      </span>
    </span>
  );
}

// ── BADGE ────────────────────────────────────────────────────────────────────
function Badge({ label, t }) {
  if (!label) return null;
  const colors = {
    Hot: { bg: "#FEE2E2", text: "#B91C1C" },
    New: { bg: "#DCFCE7", text: "#15803D" },
    "Top Rated": { bg: "#FEF9C3", text: "#A16207" },
  };
  const c = colors[label] || { bg: t.badgeBg, text: t.accent };
  return (
    <span
      style={{
        background: c.bg,
        color: c.text,
        fontSize: 10,
        fontWeight: 700,
        padding: "2px 7px",
        borderRadius: 20,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
      }}
    >
      {label}
    </span>
  );
}

// ── GAME CARD ────────────────────────────────────────────────────────────────
function GameCard({ game, t, wishlist, toggleWish, view }) {
  const [hovered, setHovered] = useState(false);
  const wished = wishlist.includes(game.id);

  if (view === "list") {
    return (
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          background: hovered ? t.cardHover : t.card,
          border: `1px solid ${t.border}`,
          borderRadius: 12,
          padding: "14px 18px",
          transition: "all 0.18s",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 10,
            background: game.color + "22",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 26,
            flexShrink: 0,
          }}
        >
          {game.emoji}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 600, color: t.textPrimary, fontSize: 15 }}>
              {game.title}
            </span>
            <Badge label={game.badge} t={t} />
          </div>
          <div style={{ color: t.textSecondary, fontSize: 13, marginTop: 2 }}>
            {game.desc}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
          <Stars rating={game.rating} t={t} />
          <span style={{ color: t.textSecondary, fontSize: 13 }}>
            👥 {game.players}
          </span>
          <span
            style={{
              fontWeight: 700,
              color: game.price === "Free" ? "#16A34A" : t.accent,
              fontSize: 14,
              minWidth: 50,
              textAlign: "right",
            }}
          >
            {game.price}
          </span>
          <button
            onClick={(e) => { e.stopPropagation(); toggleWish(game.id); }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              fontSize: 20,
              lineHeight: 1,
              padding: 0,
              opacity: wished ? 1 : 0.35,
              transition: "opacity 0.15s",
            }}
            title={wished ? "Remove from wishlist" : "Add to wishlist"}
          >
            ♥
          </button>
        </div>
      </div>
    );
  }

  // grid view
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? t.cardHover : t.card,
        border: `1px solid ${hovered ? game.color + "55" : t.border}`,
        borderRadius: 16,
        overflow: "hidden",
        transition: "all 0.2s",
        cursor: "pointer",
        transform: hovered ? "translateY(-3px)" : "none",
        boxShadow: hovered ? `0 8px 32px ${game.color}22` : "none",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Card hero */}
      <div
        style={{
          height: 130,
          background: `linear-gradient(135deg, ${game.color}33 0%, ${game.color}11 100%)`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 52,
          position: "relative",
        }}
      >
        {game.emoji}
        <div style={{ position: "absolute", top: 10, right: 10 }}>
          <Badge label={game.badge} t={t} />
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); toggleWish(game.id); }}
          style={{
            position: "absolute",
            top: 10,
            left: 10,
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 20,
            lineHeight: 1,
            padding: 0,
            opacity: wished ? 1 : 0.35,
            transition: "opacity 0.15s",
            color: "#EF4444",
          }}
          title={wished ? "Remove from wishlist" : "Add to wishlist"}
        >
          ♥
        </button>
      </div>

      {/* Card body */}
      <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
        <div style={{ fontWeight: 700, fontSize: 15, color: t.textPrimary }}>
          {game.title}
        </div>
        <div style={{ fontSize: 12, color: t.textSecondary, flexGrow: 1 }}>
          {game.desc}
        </div>
        <Stars rating={game.rating} t={t} />
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 12, color: t.textMuted }}>👥 {game.players}</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: game.price === "Free" ? "#16A34A" : t.accent,
              background: game.price === "Free" ? "#DCFCE7" : t.accentBg,
              padding: "2px 10px",
              borderRadius: 20,
            }}
          >
            {game.price}
          </span>
        </div>
      </div>

      {/* Play button */}
      <div style={{ padding: "0 16px 14px" }}>
        <button
          style={{
            width: "100%",
            background: game.color,
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "8px 0",
            fontWeight: 700,
            fontSize: 13,
            cursor: "pointer",
            letterSpacing: "0.03em",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
          onMouseLeave={(e) => (e.target.style.opacity = "1")}
        >
          ▶ Play Now
        </button>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeNav, setActiveNav] = useState("Browse");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("Rating");
  const [view, setView] = useState("grid"); // "grid" | "list"
  const [wishlist, setWishlist] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const t = getTheme(dark);

  function toggleWish(id) {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  }

  // Filter + sort
  let filtered = GAMES.filter((g) => {
    const matchCat = activeCategory === "All" || g.category === activeCategory;
    const matchSearch =
      search === "" ||
      g.title.toLowerCase().includes(search.toLowerCase()) ||
      g.category.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  if (sort === "Rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating);
  else if (sort === "Players")
    filtered = [...filtered].sort(
      (a, b) => parseFloat(b.players) - parseFloat(a.players)
    );
  else if (sort === "Price")
    filtered = [...filtered].sort((a, b) => {
      const pa = a.price === "Free" ? 0 : parseFloat(a.price.replace("$", ""));
      const pb = b.price === "Free" ? 0 : parseFloat(b.price.replace("$", ""));
      return pa - pb;
    });
  else if (sort === "Name") filtered = [...filtered].sort((a, b) => a.title.localeCompare(b.title));

  const categoryCount = (cat) =>
    cat === "All" ? GAMES.length : GAMES.filter((g) => g.category === cat).length;

  return (
    <div style={{ minHeight: "100vh", background: t.bg, color: t.textPrimary, fontFamily: "'Inter', 'Segoe UI', sans-serif", transition: "background 0.25s, color 0.25s" }}>

      {/* ── NAVBAR ── */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: t.navBg,
          borderBottom: `1px solid ${t.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 24px",
          height: 60,
          gap: 0,
          backdropFilter: "blur(12px)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: 32, flexShrink: 0 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: t.accent, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>
            🎮
          </div>
          <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px", color: t.textPrimary }}>
            Game<span style={{ color: t.accent }}>Vault</span>
          </span>
        </div>

        {/* Hamburger */}
        <button
          onClick={() => setSidebarOpen((s) => !s)}
          style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: t.textSecondary, marginRight: 16, padding: 4 }}
          title="Toggle sidebar"
        >
          ☰
        </button>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 4, flex: 1 }}>
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => setActiveNav(link)}
              style={{
                background: activeNav === link ? t.accentBg : "none",
                color: activeNav === link ? t.accent : t.textSecondary,
                border: "none",
                borderRadius: 8,
                padding: "6px 14px",
                fontWeight: activeNav === link ? 700 : 400,
                fontSize: 14,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {link}
            </button>
          ))}
        </div>

        {/* Right side */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Wishlist count */}
          <div style={{ position: "relative" }}>
            <span style={{ fontSize: 20, cursor: "pointer" }}>♥</span>
            {wishlist.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: -6,
                  right: -8,
                  background: "#EF4444",
                  color: "#fff",
                  borderRadius: "50%",
                  width: 16,
                  height: 16,
                  fontSize: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                }}
              >
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Dark mode toggle */}
          <button
            onClick={() => setDark((d) => !d)}
            style={{
              background: dark ? "#3730A3" : "#E0D9FF",
              border: "none",
              borderRadius: 20,
              width: 52,
              height: 28,
              cursor: "pointer",
              position: "relative",
              transition: "background 0.25s",
              flexShrink: 0,
            }}
            title={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span
              style={{
                position: "absolute",
                top: 4,
                left: dark ? 26 : 4,
                width: 20,
                height: 20,
                borderRadius: "50%",
                background: "#fff",
                transition: "left 0.25s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
              }}
            >
              {dark ? "🌙" : "☀️"}
            </span>
          </button>

          {/* Avatar */}
          <div
            style={{
              width: 34,
              height: 34,
              borderRadius: "50%",
              background: t.accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
              fontSize: 13,
              color: "#fff",
              cursor: "pointer",
            }}
          >
            GV
          </div>
        </div>
      </nav>

      {/* ── BODY ── */}
      <div style={{ display: "flex" }}>

        {/* ── SIDEBAR ── */}
        <aside
          style={{
            width: sidebarOpen ? 220 : 0,
            minHeight: "calc(100vh - 60px)",
            background: t.sidebarBg,
            borderRight: `1px solid ${t.border}`,
            overflow: "hidden",
            transition: "width 0.25s",
            flexShrink: 0,
          }}
        >
          <div style={{ padding: "20px 16px", width: 220 }}>

            {/* Categories */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: t.textMuted, textTransform: "uppercase", marginBottom: 10 }}>
                Categories
              </div>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: activeCategory === cat ? t.accentBg : "none",
                    color: activeCategory === cat ? t.accent : t.textSecondary,
                    border: "none",
                    borderRadius: 8,
                    padding: "7px 10px",
                    fontSize: 14,
                    fontWeight: activeCategory === cat ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: 2,
                    transition: "all 0.15s",
                  }}
                >
                  <span>{cat}</span>
                  <span
                    style={{
                      fontSize: 11,
                      background: t.badgeBg,
                      color: t.textMuted,
                      borderRadius: 10,
                      padding: "1px 7px",
                      fontWeight: 500,
                    }}
                  >
                    {categoryCount(cat)}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <div style={{ marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: t.textMuted, textTransform: "uppercase", marginBottom: 10 }}>
                Sort by
              </div>
              {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  onClick={() => setSort(opt)}
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: sort === opt ? t.accentBg : "none",
                    color: sort === opt ? t.accent : t.textSecondary,
                    border: "none",
                    borderRadius: 8,
                    padding: "7px 10px",
                    fontSize: 14,
                    fontWeight: sort === opt ? 600 : 400,
                    cursor: "pointer",
                    textAlign: "left",
                    marginBottom: 2,
                    transition: "all 0.15s",
                  }}
                >
                  <span style={{ opacity: sort === opt ? 1 : 0.4 }}>◆</span>
                  {opt}
                </button>
              ))}
            </div>

            {/* Wishlist */}
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: t.textMuted, textTransform: "uppercase", marginBottom: 10 }}>
                My Wishlist
              </div>
              {wishlist.length === 0 ? (
                <p style={{ fontSize: 13, color: t.textMuted, margin: 0 }}>
                  No games saved yet.
                </p>
              ) : (
                GAMES.filter((g) => wishlist.includes(g.id)).map((g) => (
                  <div key={g.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 0", fontSize: 13, color: t.textSecondary }}>
                    <span>{g.emoji}</span>
                    <span style={{ flex: 1 }}>{g.title}</span>
                    <button
                      onClick={() => toggleWish(g.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#EF4444", fontSize: 14, padding: 0 }}
                    >
                      ×
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main style={{ flex: 1, padding: "24px 28px", minWidth: 0 }}>

          {/* Toolbar */}
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
            {/* Search */}
            <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
              <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: t.textMuted, fontSize: 16 }}>
                🔍
              </span>
              <input
                type="text"
                placeholder="Search games…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  background: t.inputBg,
                  border: `1px solid ${t.border}`,
                  borderRadius: 10,
                  padding: "9px 12px 9px 36px",
                  fontSize: 14,
                  color: t.textPrimary,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>

            {/* Result count */}
            <span style={{ fontSize: 13, color: t.textMuted, whiteSpace: "nowrap" }}>
              {filtered.length} game{filtered.length !== 1 ? "s" : ""}
            </span>

            {/* View toggle */}
            <div style={{ display: "flex", gap: 4, background: t.inputBg, border: `1px solid ${t.border}`, borderRadius: 8, padding: 3 }}>
              {["grid", "list"].map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  style={{
                    background: view === v ? t.accent : "none",
                    color: view === v ? "#fff" : t.textSecondary,
                    border: "none",
                    borderRadius: 6,
                    padding: "5px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                    fontWeight: view === v ? 600 : 400,
                    transition: "all 0.15s",
                  }}
                >
                  {v === "grid" ? "⊞ Grid" : "☰ List"}
                </button>
              ))}
            </div>
          </div>

          {/* Category chips (quick filter) */}
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  background: activeCategory === cat ? t.accent : t.inputBg,
                  color: activeCategory === cat ? "#fff" : t.textSecondary,
                  border: `1px solid ${activeCategory === cat ? t.accent : t.border}`,
                  borderRadius: 20,
                  padding: "5px 14px",
                  fontSize: 13,
                  cursor: "pointer",
                  fontWeight: activeCategory === cat ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Game grid / list */}
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", color: t.textMuted }}>
              <div style={{ fontSize: 48, marginBottom: 12 }}>🎮</div>
              <div style={{ fontSize: 18, fontWeight: 600, color: t.textSecondary }}>No games found</div>
              <div style={{ fontSize: 14, marginTop: 6 }}>Try a different search or category.</div>
            </div>
          ) : view === "grid" ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))",
                gap: 16,
              }}
            >
              {filtered.map((game) => (
                <GameCard key={game.id} game={game} t={t} wishlist={wishlist} toggleWish={toggleWish} view="grid" />
              ))}
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {filtered.map((game) => (
                <GameCard key={game.id} game={game} t={t} wishlist={wishlist} toggleWish={toggleWish} view="list" />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
