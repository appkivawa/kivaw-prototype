import { useState } from "react";

type State = "minimizer" | "destructivist" | "expansivist" | "blank";
type Focus = "music" | "logic" | "art" | "faith" | "movement" | "beauty";

const recommendations: Record<State, Record<Focus, string>> = {
  minimizer: {
    logic: "Clear, structured content that reduces noise and helps you think efficiently.",
    music: "Minimal or instrumental tracks that support calm focus.",
    art: "Clean visuals with soft contrast—simple, intentional, uncluttered.",
    faith: "Quiet reflection that grounds you without overwhelming you.",
    movement: "Slow, intentional movement—stretching, walking, gentle flow.",
    beauty: "Neutral palettes, clean lines, subtle elegance—nothing loud.",
  },
  expansivist: {
    logic: "Big-picture ideas, frameworks, and curiosity-driven learning.",
    music: "Atmospheric or energizing sounds that spark momentum and imagination.",
    art: "Bold visuals, expressive color, and creative exploration.",
    faith: "Purpose-centered reflection that expands your perspective.",
    movement: "Dynamic motion—dance, active flow, anything that feels alive.",
    beauty: "Expressive styling and aesthetics—playful, radiant, expansive.",
  },
  destructivist: {
    logic: "Breakdown + rebuild: content that challenges assumptions and clears the old structure.",
    music: "Cathartic or intense soundscapes—release, reset, exhale.",
    art: "Abstract, disruptive visuals—raw expression and transformation energy.",
    faith: "Honest wrestling with meaning—finding truth through tension.",
    movement: "High-energy release—strength, sweat, shake it out.",
    beauty: "Unconventional beauty—raw, edgy, unapologetic.",
  },
  blank: {
    logic: "Light mental stimulation with zero pressure—gentle clarity.",
    music: "Soft ambient or easy-listening—something neutral and comforting.",
    art: "Open-ended visuals—so your mind can wander safely.",
    faith: "A quiet nudge toward peace—no demands, just presence.",
    movement: "Gentle motion or rest—whatever your body can do today.",
    beauty: "Simple calm aesthetics—clean, soft, steady.",
  },
};

const stateCards: Array<{ id: State; title: string; desc: string; icon: string }> = [
  { id: "minimizer", title: "Minimizer", desc: "calm • low stimulation • clarity", icon: "🧩" },
  { id: "destructivist", title: "Destructivist", desc: "release • intensity • reset", icon: "🔥" },
  { id: "expansivist", title: "Expansivist", desc: "curious • open • explore", icon: "🌱" },
  { id: "blank", title: "Blank", desc: "undecided • just nudge me", icon: "🌫️" },
];

const focusCards: Array<{ id: Focus; title: string; desc: string; icon: string }> = [
  { id: "music", title: "Music", desc: "songs, playlists, sound moods", icon: "🎵" },
  { id: "logic", title: "Logic", desc: "clarity, structure, frameworks", icon: "🧠" },
  { id: "art", title: "Art", desc: "visuals, creative inspiration", icon: "🎨" },
  { id: "faith", title: "Faith", desc: "meaning, comfort, reflection", icon: "🕊️" },
  { id: "movement", title: "Movement", desc: "energy, motion, activation", icon: "🏃" },
  { id: "beauty", title: "Beauty", desc: "aesthetic calm, harmony, style", icon: "💄" },
];

export default function App() {
  const [screen, setScreen] = useState<"home" | "state" | "focus" | "result">("home");
  const [state, setState] = useState<State | null>(null);
  const [focus, setFocus] = useState<Focus | null>(null);

  return (
    <div className="kivaw-wrap">
      <div className="kivaw-phone">
        {/* HOME */}
        {screen === "home" && (
          <div className="kfade">
            <h1 className="kivaw-h1">KIVAW</h1>
            <p className="kivaw-sub">Find what fits your mood.</p>

            <button
              className="kbtn kbtn-primary"
              onClick={() => setScreen("state")}
              style={{ marginTop: 22 }}
            >
              Get Recommendations
            </button>
          </div>
        )}

        {/* STATE */}
        {screen === "state" && (
          <div className="kfade">
            <button className="kbtn-link" onClick={() => setScreen("home")}>
              ← Back
            </button>

            <h2 className="kivaw-h2">What’s your current state?</h2>
            <p className="kivaw-help">Choose the closest match.</p>

            {stateCards.map((s) => (
              <button
                key={s.id}
                className="kbtn"
                onClick={() => {
                  setState(s.id);
                  setScreen("focus");
                }}
                style={{ margin: "10px 0" }}
              >
                <div className="krow">
                  <div className="kicon">{s.icon}</div>
                  <div>
                    <div className="ktitle">{s.title}</div>
                    <div className="kdesc">{s.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* FOCUS */}
        {screen === "focus" && (
          <div className="kfade">
            <button className="kbtn-link" onClick={() => setScreen("state")}>
              ← Back
            </button>

            <div className="kpills">
              <span className="kpill">State: {state ?? "—"}</span>
            </div>

            <h2 className="kivaw-h2">Choose your focus</h2>
            <p className="kivaw-help">Pick one lens for now (we’ll expand later).</p>

            {focusCards.map((f) => (
              <button
                key={f.id}
                className="kbtn"
                onClick={() => {
                  setFocus(f.id);
                  setScreen("result");
                }}
                style={{ margin: "10px 0" }}
              >
                <div className="krow">
                  <div className="kicon">{f.icon}</div>
                  <div>
                    <div className="ktitle">{f.title}</div>
                    <div className="kdesc">{f.desc}</div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* RESULT */}
        {screen === "result" && (
          <div className="kfade">
            <button className="kbtn-link" onClick={() => setScreen("focus")}>
              ← Back
            </button>

            <div className="kpills">
              <span className="kpill">State: {state ?? "—"}</span>
              <span className="kpill">Focus: {focus ?? "—"}</span>
            </div>

            <h2 className="kivaw-h2">Your Match</h2>
            <p className="kivaw-help">
              You’re in a <b>{state ?? "—"}</b> state, focused on <b>{focus ?? "—"}</b>.
            </p>

            <div className="kcard" style={{ marginBottom: 18 }}>
              <strong>Recommendation</strong>
              <p
                style={{
                  marginTop: 8,
                  fontSize: 14,
                  color: "rgba(24,34,71,.78)",
                  lineHeight: 1.55,
                  marginBottom: 0,
                }}
              >
                {state && focus ? recommendations[state][focus] : "—"}
              </p>
            </div>

            <button
              className="kbtn kbtn-primary"
              onClick={() => setScreen("focus")}
              style={{ marginBottom: 10 }}
            >
              Change Focus
            </button>

            <button
              className="kbtn kbtn-outline"
              onClick={() => {
                setState(null);
                setFocus(null);
                setScreen("home");
              }}
            >
              ← Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
