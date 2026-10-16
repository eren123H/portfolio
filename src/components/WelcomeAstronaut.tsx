import { useId, useState } from "react";
import { Pause, Play } from "lucide-react";
import "./WelcomeAstronaut.css";

export function WelcomeAstronaut() {
  const id = useId().replace(/:/g, "");
  const [paused, setPaused] = useState(false);
  const paint = (name: string) => `url(#${id}-${name})`;

  return (
    <div className={`astronaut-scene${paused ? " is-paused" : ""}`}>
      <div className="astronaut-glow" aria-hidden="true" />
      <div className="astronaut-greeting" aria-hidden="true">
        <span className="greeting-star">✦</span> Hoş geldin!
      </div>
      <svg
        className="welcome-astronaut"
        viewBox="0 0 280 330"
        role="img"
        aria-label="Hoş geldin! Uzayda süzülerek el sallayan bir astronot."
      >
        <defs>
          <linearGradient id={`${id}-suit`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#ffffff" />
            <stop offset=".5" stopColor="#f2f0ff" />
            <stop offset="1" stopColor="#b9b8df" />
          </linearGradient>
          <linearGradient id={`${id}-visor`} x1="0" y1="0" x2=".8" y2="1">
            <stop stopColor="#6867a6" />
            <stop offset=".45" stopColor="#303553" />
            <stop offset="1" stopColor="#171d38" />
          </linearGradient>
          <linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#b6b4dc" />
            <stop offset="1" stopColor="#efedff" />
          </linearGradient>
          <linearGradient id={`${id}-accent`} x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#aba0f1" />
            <stop offset="1" stopColor="#777dd1" />
          </linearGradient>
        </defs>

        <g className="astronaut-stars" fill="#fff" aria-hidden="true">
          <path d="m39 94 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
          <path d="m241 203 2 6 6 2-6 2-2 6-2-6-6-2 6-2Z" />
          <circle cx="48" cy="225" r="2.5" />
          <circle cx="228" cy="119" r="2" />
          <circle cx="202" cy="291" r="2" />
        </g>
        <ellipse cx="142" cy="297" rx="74" ry="13" fill="#6e65a5" opacity=".09" />

        <g className="astronaut-float">
          {/* Backpack and tether sit behind the suit. */}
          <path d="M103 184c-61 1-52 92-16 87 24-3 9-24-5-12" fill="none" stroke="#f5f1ff" strokeWidth="5" strokeLinecap="round" opacity=".75" />
          <rect x="99" y="127" width="84" height="98" rx="25" fill="#aaa9d2" stroke="#e2dff5" strokeWidth="3" />
          <rect x="100" y="147" width="13" height="46" rx="6" fill={paint("accent")} />

          <g className="astronaut-wave">
            <path d="M171 160c20 4 33-4 39-22l8-27" fill="none" stroke="#c7c5e4" strokeWidth="30" strokeLinecap="round" />
            <path d="M173 156c19 4 30-5 35-20l9-26" fill="none" stroke={paint("suit")} strokeWidth="25" strokeLinecap="round" />
            <path d="m208 126 19 5" stroke="#8e87bf" strokeWidth="8" />
            <path d="M209 111c-6-9-7-16-4-18 3-2 6 3 9 6l2-19c0-5 7-4 7 1l-1 12 6-15c2-5 8-2 6 3l-4 13 7-9c3-4 8 0 5 4l-9 14c-5 10-11 17-18 14Z" fill={paint("suit")} stroke="#b7b4d8" strokeWidth="1.5" strokeLinejoin="round" />
          </g>

          <path d="m123 214-10 39c-2 9-13 12-16 22-2 6 4 12 12 12h19c6 0 10-5 10-11l9-51" fill={paint("suit")} stroke="#c9c5e4" strokeWidth="2" />
          <path d="m151 217 8 35c2 10 15 12 21 22 4 7 0 14-8 15l-18 2c-7 0-10-5-12-11l-11-46" fill={paint("suit")} stroke="#c9c5e4" strokeWidth="2" />
          <path d="M98 276h36m19 4 24-3" stroke="#8d88b9" strokeWidth="7" strokeLinecap="round" />
          <path d="m111 155-21 22-3 30" fill="none" stroke="#c9c6e4" strokeWidth="28" strokeLinecap="round" />
          <path d="m112 151-19 25-4 26" fill="none" stroke={paint("suit")} strokeWidth="23" strokeLinecap="round" />
          <path d="m78 199 23 4" stroke="#9086be" strokeWidth="7" />
          <ellipse cx="86" cy="214" rx="13" ry="16" transform="rotate(15 86 214)" fill={paint("suit")} stroke="#c5bfdf" strokeWidth="1.5" />

          <path d="M110 145c9-11 50-12 61 0 7 13 10 50 5 66-8 21-55 25-68 8-8-14-5-60 2-74Z" fill={paint("suit")} stroke="#c9c5e4" strokeWidth="2" />
          <path d="M115 205c16 6 38 6 56-1" fill="none" stroke="#c2bcdd" strokeWidth="3" />
          <rect x="120" y="163" width="42" height="33" rx="9" fill="#e0ddf2" stroke="#ffffff" strokeWidth="2" />
          <rect x="127" y="169" width="28" height="13" rx="4" fill={paint("accent")} />
          <circle cx="130" cy="188" r="2" fill="#8e88bd" />
          <circle cx="138" cy="188" r="2" fill="#b0a7d4" />
          <path d="M148 188h6" stroke="#8e88bd" strokeWidth="2" strokeLinecap="round" />
          <path d="m111 153 5 3m49-5 6-3" stroke="#9c92c3" strokeWidth="4" strokeLinecap="round" />

          <ellipse cx="141" cy="141" rx="36" ry="9" fill="#aaa4ce" />
          <ellipse cx="140" cy="103" rx="51" ry="47" fill={paint("suit")} stroke="#fdfcff" strokeWidth="2" />
          <rect x="91" y="98" width="9" height="20" rx="4" fill="#bab7dc" />
          <rect x="182" y="97" width="9" height="20" rx="4" fill="#bab7dc" />
          <ellipse cx="141" cy="105" rx="41" ry="34" fill={paint("rim")} />
          <ellipse cx="141" cy="105" rx="37" ry="30" fill={paint("visor")} />
          <path d="M116 91c7-10 20-12 31-10" fill="none" stroke="#e1daff" strokeWidth="5" strokeLinecap="round" opacity=".6" />
          <path d="m114 100-1 4" stroke="#e1daff" strokeWidth="3" strokeLinecap="round" opacity=".35" />
          <path d="M139 122c9 0 17-4 23-11" fill="none" stroke="#8998e3" strokeWidth="2" strokeLinecap="round" opacity=".45" />
          <circle cx="157" cy="95" r="2" fill="#c2c7ff" opacity=".7" />
          <path d="M137 61h8" stroke="#d7d1ed" strokeWidth="3" strokeLinecap="round" />
        </g>
      </svg>
      <button
        className="astronaut-motion-toggle"
        onClick={() => setPaused((value) => !value)}
        aria-label={paused ? "Astronot animasyonunu oynat" : "Astronot animasyonunu duraklat"}
        aria-pressed={paused}
        title={paused ? "Animasyonu oynat" : "Animasyonu duraklat"}
      >
        {paused ? <Play size={12} /> : <Pause size={12} />}
      </button>
    </div>
  );
}
