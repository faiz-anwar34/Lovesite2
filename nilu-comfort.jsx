import { useState, useEffect, useRef } from "react";

const LOVE_NOTES = [
  "You are the bravest girl I know 🌸 — this pain will pass, I promise!",
  "Rest today, the world can wait for you 💕",
  "Anyone who can handle this much is capable of anything 🌷",
  "This is a tough moment, but I'm always right here with you 🤍",
  "Hot chocolate + warm blanket + me = perfect combo for today ☕🫂",
  "You are my favorite person — cramps or no cramps 💖",
  "You are my sunshine, always and forever 🌙",
  "I wish I could take this pain away from you 🥺💕",
];

const CAT_MOODS = ["😺", "😸", "🐱", "😻", "🙀", "😹", "🐈", "🐾"];
const CAT_REACTIONS = [
  "Purrrr~ 🐾",
  "Meow! I love you! 😸",
  "Need a hug? I'm here! 🤗",
  "*headbutt* Feel better soon! 💕",
  "Purr purr purr... 😻",
  "Making biscuits just for you! 🐾",
  "Meow = I love you in cat language 💖",
  "*slow blink* 😌 = a kitty kiss!",
  "You're my favorite human! 🌸",
  "Stay cozy, I'll guard you! 🐱",
];

const SCRAMBLE_WORDS = [
  { word: "NILIMA", hint: "That's YOU, beautiful 💕" },
  { word: "SUNSHINE", hint: "What you are to me ☀️" },
  { word: "BRAVE", hint: "What you are right now 💪" },
  { word: "FOREVER", hint: "How long I'll be here for you 🤍" },
  { word: "PRECIOUS", hint: "Exactly how I see you 🌸" },
  { word: "WARMTH", hint: "What your smile gives me 🌷" },
];

const COMFORT_TIPS = [
  { icon: "🌡️", tip: "Place a heat pad or warm water bottle on your tummy — instant relief!" },
  { icon: "🍫", tip: "Eat some dark chocolate — it's magic for mood and cramps both!" },
  { icon: "🧘", tip: "Try child's pose yoga — it relaxes your lower back beautifully!" },
  { icon: "☕", tip: "Sip on ginger tea — nature's own painkiller!" },
  { icon: "💧", tip: "Drink lots of water — staying hydrated really does reduce cramps!" },
  { icon: "😴", tip: "Sleep without guilt — your body deserves all the rest today!" },
  { icon: "🛁", tip: "A warm bath works wonders — let the tension just melt away!" },
  { icon: "🎵", tip: "Put on your favorite playlist — music is genuine medicine!" },
];

function shuffle(str) {
  let arr = str.split("");
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  if (arr.join("") === str) return shuffle(str);
  return arr.join("");
}

// ---- Cat Clicker ----
function CatClicker() {
  const [cats, setCats] = useState(() =>
    Array.from({ length: 7 }, (_, i) => ({
      id: i,
      emoji: CAT_MOODS[i % CAT_MOODS.length],
      x: 5 + Math.random() * 75,
      y: 8 + Math.random() * 72,
      reaction: null,
      bouncing: false,
    }))
  );
  const [score, setScore] = useState(0);
  const [floaties, setFloaties] = useState([]);

  const petCat = (id) => {
    const reaction = CAT_REACTIONS[Math.floor(Math.random() * CAT_REACTIONS.length)];
    const newEmoji = CAT_MOODS[Math.floor(Math.random() * CAT_MOODS.length)];
    setCats((prev) =>
      prev.map((c) => c.id === id ? { ...c, reaction, emoji: newEmoji, bouncing: true } : c)
    );
    setScore((s) => s + 1);
    const fid = Date.now() + Math.random();
    setFloaties((f) => [...f, { id: fid, text: "💕 +1" }]);
    setTimeout(() => setFloaties((f) => f.filter((x) => x.id !== fid)), 1200);
    setTimeout(() =>
      setCats((prev) => prev.map((c) => c.id === id ? { ...c, reaction: null, bouncing: false } : c)),
      1800
    );
  };

  return (
    <div>
      <p style={{ textAlign: "center", color: "#b05080", fontFamily: "'Quicksand', sans-serif", marginBottom: 10, fontSize: 14 }}>
        🐾 Tap the cats — they'll give you hugs! &nbsp;<strong style={{ color: "#e91e63" }}>{score} hugs received! 💖</strong>
      </p>
      <div style={{
        position: "relative", height: 270,
        background: "linear-gradient(135deg, #fff0f5 0%, #fce4ec 50%, #f3e5f5 100%)",
        borderRadius: 20, border: "2px dashed #f8a5c2", overflow: "hidden"
      }}>
        {/* Decorative paws */}
        {["10%", "85%", "50%"].map((l, i) => (
          <span key={i} style={{ position: "absolute", left: l, top: i === 1 ? "75%" : i === 2 ? "10%" : "85%", fontSize: 18, opacity: 0.12, pointerEvents: "none" }}>🐾</span>
        ))}
        {floaties.map((f) => (
          <div key={f.id} style={{
            position: "absolute", top: "35%", left: "46%",
            fontSize: 18, fontWeight: "bold", color: "#e91e63",
            animation: "floatUp 1.2s ease-out forwards", pointerEvents: "none", zIndex: 10
          }}>{f.text}</div>
        ))}
        {cats.map((cat) => (
          <button key={cat.id} onClick={() => petCat(cat.id)} style={{
            position: "absolute", left: `${cat.x}%`, top: `${cat.y}%`,
            background: "none", border: "none", cursor: "pointer",
            fontSize: cat.bouncing ? 42 : 34,
            transition: "font-size 0.15s",
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
            animation: cat.bouncing ? "bounce 0.4s ease" : `wiggle ${2.5 + cat.id * 0.3}s infinite`,
            zIndex: 2,
          }}>
            {cat.emoji}
          </button>
        ))}
        {cats.filter((c) => c.reaction).map((c) => (
          <div key={`r-${c.id}`} style={{
            position: "absolute",
            left: `${Math.min(c.x, 55)}%`,
            top: `${Math.max(2, c.y - 20)}%`,
            background: "white", borderRadius: "12px 12px 12px 4px",
            padding: "5px 12px", fontSize: 12, color: "#c2185b",
            whiteSpace: "nowrap", boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            zIndex: 5, fontFamily: "'Quicksand', sans-serif", fontWeight: 700,
            animation: "popIn 0.3s ease", border: "1px solid #f8bbd9"
          }}>{c.reaction}</div>
        ))}
      </div>
      <p style={{ textAlign: "center", fontSize: 12, color: "#ad1457", marginTop: 8, fontFamily: "'Quicksand', sans-serif" }}>
        Every tap = a real virtual hug from me to you 🌸
      </p>
    </div>
  );
}

// ---- Word Unscramble ----
function WordPuzzle() {
  const [idx, setIdx] = useState(0);
  const scrambledList = useRef(SCRAMBLE_WORDS.map((w) => shuffle(w.word)));
  const [input, setInput] = useState("");
  const [status, setStatus] = useState(null);
  const [solved, setSolved] = useState(0);

  const current = SCRAMBLE_WORDS[idx];

  const check = () => {
    if (input.toUpperCase().trim() === current.word) {
      setStatus("correct");
      setSolved((s) => s + 1);
      setTimeout(() => {
        setStatus(null);
        setInput("");
        setIdx((i) => (i + 1) % SCRAMBLE_WORDS.length);
      }, 1500);
    } else {
      setStatus("wrong");
      setTimeout(() => setStatus(null), 900);
    }
  };

  const skip = () => {
    setInput("");
    setStatus(null);
    setIdx((i) => (i + 1) % SCRAMBLE_WORDS.length);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "#7b3f6e", fontFamily: "'Quicksand', sans-serif", marginBottom: 6, fontSize: 14 }}>
        ✨ <strong>{solved}</strong> / {SCRAMBLE_WORDS.length} words solved!
      </p>
      <div style={{
        background: "linear-gradient(135deg, #f3e5f5, #fce4ec)",
        borderRadius: 18, padding: "22px 20px", marginBottom: 14,
        border: "2px solid #ce93d8", boxShadow: "0 4px 16px rgba(156,39,176,0.1)"
      }}>
        <p style={{ fontSize: 13, color: "#9c27b0", fontFamily: "'Quicksand', sans-serif", marginBottom: 10, fontStyle: "italic" }}>
          💡 Hint: {current.hint}
        </p>
        <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 16 }}>
          {scrambledList.current[idx].split("").map((ch, i) => (
            <span key={i} style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, background: "white",
              borderRadius: 10, fontSize: 20, fontWeight: 800,
              color: "#7b3f6e", boxShadow: "0 3px 8px rgba(0,0,0,0.12)",
              fontFamily: "'Quicksand', sans-serif", border: "1.5px solid #e8c0e0"
            }}>{ch}</span>
          ))}
        </div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          onKeyDown={(e) => e.key === "Enter" && check()}
          placeholder="Type your answer..."
          style={{
            border: `2.5px solid ${status === "correct" ? "#4caf50" : status === "wrong" ? "#f44336" : "#ce93d8"}`,
            borderRadius: 12, padding: "9px 16px", fontSize: 17, letterSpacing: 4,
            fontFamily: "'Quicksand', sans-serif", fontWeight: 700, outline: "none",
            background: status === "correct" ? "#e8f5e9" : status === "wrong" ? "#ffebee" : "white",
            width: "80%", maxWidth: 220, textAlign: "center",
            transition: "all 0.25s", display: "block", margin: "0 auto"
          }}
        />
        <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 12 }}>
          <button onClick={check} style={{
            background: "linear-gradient(135deg, #e91e63, #9c27b0)", color: "white",
            border: "none", borderRadius: 12, padding: "9px 22px",
            fontFamily: "'Quicksand', sans-serif", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>Check ✓</button>
          <button onClick={skip} style={{
            background: "#f8bbd9", color: "#880e4f",
            border: "none", borderRadius: 12, padding: "9px 18px",
            fontFamily: "'Quicksand', sans-serif", fontWeight: 700, cursor: "pointer", fontSize: 14
          }}>Skip →</button>
        </div>
        {status === "correct" && (
          <p style={{ color: "#4caf50", fontWeight: 800, marginTop: 10, fontFamily: "'Quicksand', sans-serif", fontSize: 16 }}>
            Perfect! You're so smart! 🎉
          </p>
        )}
        {status === "wrong" && (
          <p style={{ color: "#f44336", fontWeight: 800, marginTop: 10, fontFamily: "'Quicksand', sans-serif", fontSize: 16 }}>
            Try again, you've got this! 💪
          </p>
        )}
      </div>
    </div>
  );
}

// ---- Memory Match ----
const MEMORY_PAIRS = ["🌸", "🐱", "💕", "☕", "🌙", "🍫", "🌷", "⭐"];
function MemoryGame() {
  const init = () =>
    [...MEMORY_PAIRS, ...MEMORY_PAIRS]
      .map((v, i) => ({ id: i, value: v, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState(init);
  const [selected, setSelected] = useState([]);
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);
  const checking = useRef(false);

  const flip = (id) => {
    if (checking.current) return;
    const card = cards.find((c) => c.id === id);
    if (!card || card.flipped || card.matched || selected.length >= 2) return;

    const newCards = cards.map((c) => c.id === id ? { ...c, flipped: true } : c);
    const newSel = [...selected, id];
    setCards(newCards);
    setSelected(newSel);

    if (newSel.length === 2) {
      setMoves((m) => m + 1);
      const [a, b] = newSel.map((sid) => newCards.find((c) => c.id === sid));
      checking.current = true;
      if (a.value === b.value) {
        setTimeout(() => {
          setCards((prev) => {
            const updated = prev.map((c) => newSel.includes(c.id) ? { ...c, matched: true } : c);
            if (updated.every((c) => c.matched)) setWon(true);
            return updated;
          });
          setSelected([]);
          checking.current = false;
        }, 500);
      } else {
        setTimeout(() => {
          setCards((prev) => prev.map((c) => newSel.includes(c.id) ? { ...c, flipped: false } : c));
          setSelected([]);
          checking.current = false;
        }, 900);
      }
    }
  };

  const reset = () => { setCards(init()); setSelected([]); setMoves(0); setWon(false); };
  const matched = cards.filter((c) => c.matched).length / 2;

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "#7b3f6e", fontFamily: "'Quicksand', sans-serif", marginBottom: 10, fontSize: 14 }}>
        🃏 Moves: <strong>{moves}</strong> &nbsp;|&nbsp; Matched: <strong>{matched} / {MEMORY_PAIRS.length}</strong>
      </p>
      {won && (
        <div style={{
          background: "linear-gradient(135deg, #f48fb1, #ce93d8)",
          borderRadius: 16, padding: "14px", marginBottom: 12,
          color: "white", fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 16,
          animation: "popIn 0.4s ease", boxShadow: "0 4px 16px rgba(233,30,99,0.3)"
        }}>
          🎉 Amazing, Nilu! You won in just {moves} moves!<br />
          <span style={{ fontSize: 13, fontWeight: 600 }}>I'm so proud of you! 💖</span>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, maxWidth: 300, margin: "0 auto" }}>
        {cards.map((c) => (
          <button key={c.id} onClick={() => flip(c.id)} style={{
            height: 62, borderRadius: 14,
            border: c.matched ? "2px solid #f8bbd9" : "2px solid #f8bbd9",
            background: c.flipped || c.matched
              ? "linear-gradient(135deg, #fce4ec, #f3e5f5)"
              : "linear-gradient(135deg, #f48fb1, #ce93d8)",
            fontSize: c.flipped || c.matched ? 28 : 22,
            cursor: c.matched ? "default" : "pointer",
            transition: "all 0.25s",
            boxShadow: c.matched ? "none" : "0 3px 10px rgba(0,0,0,0.12)",
            opacity: c.matched ? 0.55 : 1,
          }}>
            {c.flipped || c.matched ? c.value : "🐾"}
          </button>
        ))}
      </div>
      <button onClick={reset} style={{
        marginTop: 14, background: "#f8bbd9", color: "#880e4f",
        border: "none", borderRadius: 12, padding: "9px 22px",
        fontFamily: "'Quicksand', sans-serif", fontWeight: 700, cursor: "pointer", fontSize: 14
      }}>New Game 🔄</button>
    </div>
  );
}

// ---- Catch the Cat Game ----
function CatchCat() {
  const [pos, setPos] = useState({ x: 40, y: 40 });
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [running, setRunning] = useState(false);
  const [best, setBest] = useState(0);

  useEffect(() => {
    if (!running) return;
    if (timeLeft <= 0) { setRunning(false); if (score > best) setBest(score); return; }
    const t = setInterval(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearInterval(t);
  }, [running, timeLeft]);

  const moveAndScore = () => {
    setScore((s) => s + 1);
    setPos({ x: 5 + Math.random() * 80, y: 10 + Math.random() * 75 });
  };

  const start = () => { setScore(0); setTimeLeft(20); setPos({ x: 40, y: 40 }); setRunning(true); };

  return (
    <div style={{ textAlign: "center" }}>
      <p style={{ color: "#7b3f6e", fontFamily: "'Quicksand', sans-serif", fontSize: 14, marginBottom: 6 }}>
        ⏱ Time: <strong>{timeLeft}s</strong> &nbsp;|&nbsp; Catches: <strong>{score}</strong> &nbsp;|&nbsp; Best: <strong>{best}</strong>
      </p>
      <div style={{
        position: "relative", height: 220,
        background: "linear-gradient(135deg, #fce4ec, #f3e5f5)",
        borderRadius: 18, border: "2px dashed #f8a5c2", overflow: "hidden", cursor: "crosshair"
      }}>
        {!running && (
          <div style={{
            position: "absolute", inset: 0, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 10,
            background: "rgba(255,255,255,0.6)", backdropFilter: "blur(4px)", borderRadius: 16
          }}>
            <span style={{ fontSize: 40 }}>🐱</span>
            <p style={{ color: "#880e4f", fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 15, margin: 0 }}>
              {timeLeft === 0 ? `Game over! You caught ${score} cats! 🎉` : "Catch the cat as many times as you can!"}
            </p>
            <button onClick={start} style={{
              background: "linear-gradient(135deg, #e91e63, #9c27b0)", color: "white",
              border: "none", borderRadius: 12, padding: "9px 24px",
              fontFamily: "'Quicksand', sans-serif", fontWeight: 700, cursor: "pointer", fontSize: 14
            }}>{timeLeft === 0 ? "Play Again! 🔄" : "Start! 🐾"}</button>
          </div>
        )}
        {running && (
          <button onClick={moveAndScore} style={{
            position: "absolute", left: `${pos.x}%`, top: `${pos.y}%`,
            background: "none", border: "none", cursor: "pointer", fontSize: 36,
            transition: "left 0.1s, top 0.1s",
            filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
            animation: "wiggle 0.5s infinite"
          }}>😹</button>
        )}
      </div>
      <p style={{ fontSize: 12, color: "#ad1457", marginTop: 8, fontFamily: "'Quicksand', sans-serif" }}>
        The naughty cat keeps running away! 😂
      </p>
    </div>
  );
}

// ---- Main App ----
export default function NiluComfort() {
  const [tab, setTab] = useState(0);
  const [noteIdx, setNoteIdx] = useState(0);
  const [catBubble, setCatBubble] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setNoteIdx((i) => (i + 1) % LOVE_NOTES.length);
      setCatBubble(true);
    }, 4500);
    return () => clearInterval(t);
  }, []);

  const tabs = [
    { label: "🐱 Pet Cats", key: "cats" },
    { label: "🔤 Unscramble", key: "word" },
    { label: "🃏 Memory", key: "memory" },
    { label: "🏃 Catch Cat", key: "catch" },
    { label: "💆 Comfort", key: "tips" },
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fce4ec 0%, #f8bbd9 30%, #e1bee7 60%, #fce4ec 100%)",
      fontFamily: "'Quicksand', sans-serif",
      paddingBottom: 48,
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@400;600;700;800&family=Pacifico&display=swap');
        @keyframes floatUp { 0%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-55px)} }
        @keyframes bounce { 0%,100%{transform:scale(1)} 50%{transform:scale(1.45)} }
        @keyframes wiggle { 0%,100%{transform:rotate(0)} 25%{transform:rotate(-9deg)} 75%{transform:rotate(9deg)} }
        @keyframes popIn { 0%{transform:scale(0.4);opacity:0} 80%{transform:scale(1.05)} 100%{transform:scale(1);opacity:1} }
        @keyframes heartbeat { 0%,100%{transform:scale(1)} 50%{transform:scale(1.18)} }
        @keyframes slideNote { 0%{opacity:0;transform:translateY(12px)} 15%,80%{opacity:1;transform:translateY(0)} 100%{opacity:0;transform:translateY(-10px)} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-9px)} }
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        * { box-sizing: border-box; }
      `}</style>

      {/* Header */}
      <div style={{ textAlign: "center", padding: "30px 16px 10px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 12, marginBottom: 4 }}>
          {["🌸", "🐱", "💕"].map((e, i) => (
            <span key={i} style={{ fontSize: 36, animation: `float ${2.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s`, display: "inline-block" }}>{e}</span>
          ))}
        </div>
        <h1 style={{
          fontFamily: "'Pacifico', cursive", fontSize: 30, color: "#880e4f",
          margin: "6px 0 4px", textShadow: "0 3px 10px rgba(136,14,79,0.2)",
          letterSpacing: 1
        }}>Hey Nilu! 💖</h1>
        <p style={{ color: "#ad1457", fontSize: 14, margin: 0, fontWeight: 600 }}>
          This whole page was made just for you 🌷
        </p>
      </div>

      {/* Rotating Love Note */}
      <div style={{
        margin: "14px 14px", background: "rgba(255,255,255,0.65)",
        backdropFilter: "blur(10px)", borderRadius: 18, padding: "16px 22px",
        border: "1.5px solid #f8a5c2", boxShadow: "0 6px 24px rgba(233,30,99,0.1)",
        textAlign: "center", minHeight: 58, display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <p key={noteIdx} style={{
          color: "#880e4f", fontWeight: 700, fontSize: 15, margin: 0,
          animation: "slideNote 4.5s ease-in-out"
        }}>{LOVE_NOTES[noteIdx]}</p>
      </div>

      {/* Hero Cat */}
      <div style={{ textAlign: "center", marginBottom: 6, position: "relative" }}>
        <button onClick={() => setCatBubble((b) => !b)} style={{
          background: "none", border: "none", cursor: "pointer",
          fontSize: 56, animation: "heartbeat 2.2s infinite", display: "inline-block"
        }}>😻</button>
        {catBubble && (
          <div style={{
            position: "absolute", left: "50%", top: -48, transform: "translateX(-5%)",
            background: "white", borderRadius: "14px 14px 14px 4px",
            padding: "8px 14px", fontSize: 13, color: "#880e4f", fontWeight: 700,
            boxShadow: "0 4px 14px rgba(0,0,0,0.12)", whiteSpace: "nowrap",
            animation: "popIn 0.3s ease", border: "1px solid #f8bbd9"
          }}>
            Meow! You're my favorite human! 🐾
          </div>
        )}
      </div>

      {/* Tab Bar */}
      <div style={{ display: "flex", gap: 6, padding: "4px 12px 0", overflowX: "auto", scrollbarWidth: "none" }}>
        {tabs.map((t, i) => (
          <button key={t.key} onClick={() => setTab(i)} style={{
            flexShrink: 0, padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer",
            background: tab === i
              ? "linear-gradient(135deg, #e91e63, #9c27b0)"
              : "rgba(255,255,255,0.65)",
            color: tab === i ? "white" : "#880e4f",
            fontFamily: "'Quicksand', sans-serif", fontWeight: 700, fontSize: 13,
            boxShadow: tab === i ? "0 4px 14px rgba(233,30,99,0.35)" : "0 1px 4px rgba(0,0,0,0.08)",
            transition: "all 0.2s", transform: tab === i ? "translateY(-2px)" : "none"
          }}>{t.label}</button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ margin: "12px 12px 0" }}>
        <div style={{
          background: "rgba(255,255,255,0.6)", backdropFilter: "blur(10px)",
          borderRadius: 22, padding: "18px 16px",
          border: "1.5px solid #f8a5c2",
          boxShadow: "0 8px 36px rgba(233,30,99,0.1)"
        }}>
          {tab === 0 && <CatClicker />}
          {tab === 1 && <WordPuzzle />}
          {tab === 2 && <MemoryGame />}
          {tab === 3 && <CatchCat />}
          {tab === 4 && (
            <div>
              <p style={{ textAlign: "center", color: "#880e4f", fontWeight: 800, marginBottom: 14, fontSize: 15 }}>
                💆 Period Comfort Tips — Just for You 💪
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {COMFORT_TIPS.map((t, i) => (
                  <div key={i} style={{
                    background: i % 2 === 0
                      ? "linear-gradient(135deg, #fce4ec, #fff8fb)"
                      : "linear-gradient(135deg, #f3e5f5, #fdf8ff)",
                    borderRadius: 14, padding: "13px 16px",
                    display: "flex", alignItems: "center", gap: 14,
                    border: "1.5px solid #f8bbd9",
                    boxShadow: "0 2px 8px rgba(233,30,99,0.07)"
                  }}>
                    <span style={{ fontSize: 28, flexShrink: 0 }}>{t.icon}</span>
                    <span style={{ color: "#5d1049", fontSize: 14, fontWeight: 600, lineHeight: 1.4 }}>{t.tip}</span>
                  </div>
                ))}
              </div>
              <div style={{
                marginTop: 16, background: "linear-gradient(135deg, #e91e63, #9c27b0)",
                borderRadius: 18, padding: "16px 20px", textAlign: "center", color: "white",
                boxShadow: "0 6px 20px rgba(233,30,99,0.3)"
              }}>
                <div style={{ fontSize: 30, marginBottom: 6 }}>🤍</div>
                <p style={{ margin: 0, fontWeight: 700, fontSize: 16, lineHeight: 1.5 }}>
                  This tough moment will pass, Nilu.<br />
                  And I'll be right here with you, always. 💕
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <p style={{
        textAlign: "center", color: "#ad1457", fontSize: 13,
        marginTop: 22, fontWeight: 700, letterSpacing: 0.3
      }}>Made with all my heart 💖 — Faiz, just for Nilu 🌸</p>
    </div>
  );
}
