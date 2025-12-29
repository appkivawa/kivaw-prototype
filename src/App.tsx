import { useState } from "react";

type State = "minimizer" | "destructivist" | "expansivist" | "blank";
type Focus = "music" | "logic" | "art" | "faith" | "movement" | "beauty";

const recommendations: Record<State, Record<Focus, string>> = {
  minimizer: {
    logic: "Clear, structured content that reduces noise and helps you think efficiently.",
    music: "Minimal or instrumental tracks that support calm focus.",
    art: "Clean visuals with soft contrast and space.",
    faith: "Quiet reflection and grounding presence.",
    movement: "Slow, intentional movement like walking or stretching.",
    beauty: "Neutral tones and subtle elegance.",
  },
  expansivist: {
    logic: "Big-picture ideas and mental exploration.",
    music: "Energetic or atmospheric sound.",
    art: "Bold colors and expressive visuals.",
    faith: "Purpose-driven reflection.",
    movement: "Dynamic movement or dance.",
    beauty: "Expressive, radiant aesthetics.",
  },
  destructivist: {
    logic: "Breaking old patterns and mental resets.",
    music: "Cathartic or intense sound.",
    art: "Raw or abstract visuals.",
    faith: "Deep reflection and release.",
    movement: "Strong physical release.",
    beauty: "Unconventional, striking beauty.",
  },
  blank: {
    logic: "Gentle mental clarity.",
    music: "Soft ambient sounds.",
    art: "Open-ended, calming visuals.",
    faith: "Quiet grounding.",
    movement: "Light motion or rest.",
    beauty: "Clean and simple design.",
  },
};

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
              style={{ marginTop: 24 }}
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
            <p className="kivaw-help">Choose what feels closest.</p>

            {Object.entries({
              minimizer: "🧩 Minimizer",
              destructivist: "🔥 Destructivist",
              expansivist: "🌱 Expansivist",
              blank: "🌫️ Blank",
            }).map(([key, label]) => (
              <button
                key={key}
                className="kbtn"
                onClick={() => {
                  setState(key as State);
                  setScreen("focus");
                }}
                style={{ margin: "10px 0" }}
              >
                {label}
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

            <h2 className="kivaw-h2">Choose a focus</h2>

            {(["music", "logic", "art", "faith", "movement", "beauty"] as Focus[]).map(
              (f) => (
                <button
                  key={f}
                  className="kbtn"
                  onClick={() => {
                    setFocus(f);
                    setScreen("result");
                  }}
                  style={{ margin: "10px 0" }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              )
            )}
          </div>
        )}

        {/* RESULT */}
        {screen === "result" && (
          <div className="kfade">
            <button className="kbtn-link" onClick={() => setScreen("focus")}>
              ← Back
            </button>

            <div className="kcard">
              <strong>Your Match</strong>
              <p style={{ marginTop: 10 }}>
                {state && focus && recommendations[state][focus]}
              </p>
            </div>

            <button
              className="kbtn kbtn-primary"
              onClick={() => setScreen("focus")}
              style={{ marginTop: 20 }}
            >
              Try Another Focus
            </button>

            <button
              className="kbtn kbtn-outline"
              onClick={() => {
                setState(null);
                setFocus(null);
                setScreen("home");
              }}
              style={{ marginTop: 10 }}
            >
              ← Home
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
