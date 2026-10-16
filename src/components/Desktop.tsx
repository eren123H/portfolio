import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, BatteryFull, Command, Wifi } from "lucide-react";
import { apps, type AppId } from "../data/apps";
import { Logo } from "./Logo";
import { profile } from "../data/portfolio";

export function MenuBar() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30_000);
    return () => clearInterval(timer);
  }, []);
  return (
    <header className="menu-bar">
      <div className="menu-left">
        <Logo />
        <strong>EREN.OS</strong>
        <span className="menu-divider" />
        <span className="menu-caption">Kişisel çalışma alanı</span>
      </div>
      <div className="menu-right">
        <span className="version-label">Önizleme 01</span>
        <Wifi size={15} aria-label="Tarayıcı çalışma alanı" />
        <BatteryFull className="battery" size={20} aria-hidden="true" />
        <time dateTime={now.toISOString()}>
          {now.toLocaleDateString("tr-TR", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
          <span className="clock-time">
            {now.toLocaleTimeString("tr-TR", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </time>
      </div>
    </header>
  );
}

export function Welcome({ onOpen }: { onOpen: (id: AppId) => void }) {
  return (
    <main id="main" className="welcome-area">
      <motion.section
        className="welcome"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="welcome-logo">
          <Logo />
          <span className="logo-placeholder-label">GEÇİCİ LOGO</span>
        </div>
        <div className="eyebrow">
          <span /> FİKİRLERE VE KODA AYRILMIŞ BİR ALAN
        </div>
        <h1>
          Merhaba, ben Eren<span className="heading-period">.</span>
        </h1>
        <h2>Dijital çalışma alanıma hoş geldin.</h2>
        <p className="intro">
          {profile.focusAreas.map((area, index) => (
            <span className="intro-area" key={area}>
              {index > 0 && <span>•</span>}
              {area}
            </span>
          ))}
        </p>
        <div className="welcome-actions">
          <button className="primary-button" onClick={() => onOpen("projects")}>
            Projelerimi Keşfet <ArrowUpRight size={17} />
          </button>
          <button
            className="secondary-button"
            onClick={() => onOpen("terminal")}
          >
            <Command size={16} /> Terminali Aç
          </button>
        </div>
        <p className="welcome-hint">
          Tanıdık bir masaüstü. Farklı bir portfolyo.
        </p>
      </motion.section>
    </main>
  );
}

export function Dock({
  openApps,
  onOpen,
}: {
  openApps: AppId[];
  onOpen: (id: AppId) => void;
}) {
  return (
    <footer className="desktop-footer">
      <p className="dock-hint">
        Kendini evinde hisset. <span>Keşfetmek için bir uygulama seç.</span>
      </p>
      <nav className="dock" aria-label="Masaüstü uygulamaları">
        {apps.map((app, index) => (
          <div
            key={app.id}
            className={`dock-item ${index === 6 ? "dock-separated" : ""}`}
          >
            <button
              onClick={() => onOpen(app.id)}
              aria-label={`${app.name} uygulamasını aç`}
              aria-pressed={openApps.includes(app.id)}
              className="dock-button"
            >
              <span className="dock-tooltip" aria-hidden="true">
                {app.name}
              </span>
              <span className={`app-icon app-icon-${app.color}`}>
                <app.icon strokeWidth={1.6} />
              </span>
              <span
                className={`running-indicator ${openApps.includes(app.id) ? "is-running" : ""}`}
              />
            </button>
          </div>
        ))}
      </nav>
      <div className="desktop-caption">
        <span>KEŞFEDİLMEK İÇİN TASARLANDI</span>
        <span>
          EREN.OS <span className="caption-dot">·</span> v0.1
        </span>
      </div>
    </footer>
  );
}
