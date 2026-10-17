import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import { apps, type AppId } from "./data/apps";
import { Dock, MenuBar, Welcome } from "./components/Desktop";
import { Logo } from "./components/Logo";
import { AppWindow } from "./components/AppWindow";
import { AppContent } from "./apps/AppContent";
import { WelcomeAstronaut } from "./components/WelcomeAstronaut";
import { ContactSatellite } from "./components/ContactSatellite";

export default function App() {
  const reducedMotion = useReducedMotion();
  const [booting, setBooting] = useState(
    () => !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [activeApp, setActiveApp] = useState<AppId | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const openWindow = useCallback(
    (id: AppId, trigger?: HTMLElement) => {
      if (activeApp === null) {
        returnFocusRef.current = trigger ?? (document.activeElement as HTMLElement);
      }
      setActiveApp(id);
    },
    [activeApp],
  );
  const closeWindow = useCallback(() => setActiveApp(null), []);
  const restoreFocus = () => {
    if (activeApp !== null) return;
    const trigger = returnFocusRef.current;
    const target =
      trigger?.isConnected && desktopRef.current?.contains(trigger)
        ? trigger
        : desktopRef.current?.querySelector<HTMLButtonElement>(".primary-button");
    target?.focus({ preventScroll: true });
    returnFocusRef.current = null;
  };
  useEffect(() => {
    const timer = window.setTimeout(() => setBooting(false), 1100);
    return () => clearTimeout(timer);
  }, []);
  const app = apps.find((item) => item.id === activeApp);
  return (
    <MotionConfig reducedMotion="user">
      <div className="desktop">
        <div className="wallpaper" aria-hidden="true">
          <div className="wallpaper-orb orb-one" />
          <div className="wallpaper-orb orb-two" />
          <div className="wallpaper-ribbon ribbon-one" />
          <div className="wallpaper-ribbon ribbon-two" />
          <div className="wallpaper-grain" />
        </div>
        <div className="desktop-body" ref={desktopRef} inert={booting || !!app}>
          <a className="skip-link" href="#main">
            İçeriğe geç
          </a>
          <MenuBar />
          <Welcome onOpen={openWindow} />
          {!booting && (
            <div className="desktop-companions">
              <ContactSatellite />
              <WelcomeAstronaut />
            </div>
          )}
          <Dock onOpen={openWindow} openApps={activeApp ? [activeApp] : []} />
        </div>
        <AnimatePresence onExitComplete={restoreFocus}>
          {app && (
            <AppWindow key={app.id} app={app} onClose={closeWindow}>
              <AppContent id={app.id} onOpen={openWindow} />
            </AppWindow>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {booting && (
            <motion.div
              className="boot-screen"
              role="status"
              aria-label="EREN.OS başlatılıyor"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.45 }}
            >
              <Logo />
              <span>EREN.OS</span>
              <div className="boot-progress">
                <motion.i
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.9 }}
                />
              </div>
              <button onClick={() => setBooting(false)}>
                Çalışma alanına gir
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
