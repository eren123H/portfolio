import { useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Minus, Plus, X } from "lucide-react";
import type { DesktopApp } from "../data/apps";
import type { ReactNode } from "react";

export function AppWindow({
  app,
  children,
  onClose,
}: {
  app: DesktopApp;
  children: ReactNode;
  onClose: () => void;
}) {
  const windowRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const previousFocus = document.activeElement as HTMLElement | null;
    const initialFocus =
      windowRef.current?.querySelector<HTMLElement>("[data-initial-focus]") ??
      windowRef.current;
    initialFocus?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key !== "Tab") return;
      const elements = windowRef.current?.querySelectorAll<HTMLElement>(
        'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href], [tabindex="0"]',
      );
      if (!elements?.length) return;
      const first = elements[0],
        last = elements[elements.length - 1];
      if (
        event.shiftKey &&
        (document.activeElement === first ||
          document.activeElement === windowRef.current)
      ) {
        event.preventDefault();
        last.focus();
      } else if (
        !event.shiftKey &&
        (document.activeElement === last ||
          document.activeElement === windowRef.current)
      ) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [onClose]);
  return (
    <motion.div
      className="window-layer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="window-backdrop" aria-hidden="true" />
      <motion.section
        ref={windowRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`window-${app.id}`}
        className={`app-window ${app.id === "terminal" ? "terminal-window" : ""}`}
        initial={{ y: 24, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 16, scale: 0.97, opacity: 0 }}
        transition={{ duration: 0.22 }}
      >
        <header className="window-titlebar">
          <div className="window-controls">
            <button
              className="control control-close"
              aria-label={`${app.name} uygulamasını kapat`}
              onClick={onClose}
            >
              <X size={9} />
            </button>
            <span
              className="control control-minimize"
              title="Küçült — bu önizlemede kullanılamaz"
            >
              <Minus size={9} />
            </span>
            <span
              className="control control-maximize"
              title="Büyüt — bu önizlemede kullanılamaz"
            >
              <Plus size={9} />
            </span>
          </div>
          <h2 id={`window-${app.id}`}>
            <app.icon size={14} />
            {app.name}
          </h2>
          <span className="window-preview">Önizleme</span>
        </header>
        <div className="window-content">{children}</div>
        <footer className="window-status">
          <span>EREN.OS / {app.name}</span>
          <span>Görsel prototip</span>
        </footer>
      </motion.section>
    </motion.div>
  );
}
