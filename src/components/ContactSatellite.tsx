import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  X,
} from "lucide-react";
import { profile } from "../data/portfolio";
import "./ContactSatellite.css";

const contactLinks = [
  { label: "E-posta", icon: Mail, detail: "Bir mesaj bırak" },
  { label: "LinkedIn", icon: Linkedin, detail: "Profesyonel profilim" },
  { label: "GitHub", icon: Github, detail: "Projelerim ve kodlarım" },
].map((contact) => ({
  ...contact,
  href: profile.links.find((link) => link.label === contact.label)!.href,
}));

export function ContactSatellite() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  useLayoutEffect(() => {
    if (!open) return;
    const keepPanelVisible = () => {
      const root = rootRef.current;
      const panel = panelRef.current;
      if (!root || !panel) return;
      root.style.setProperty("--contact-panel-offset", "0px");
      const bounds = panel.getBoundingClientRect();
      const offset = Math.max(
        54 - bounds.top,
        Math.min(0, window.innerHeight - 18 - bounds.bottom),
      );
      root.style.setProperty("--contact-panel-offset", `${offset}px`);
    };
    keepPanelVisible();
    window.addEventListener("resize", keepPanelVisible);
    return () => window.removeEventListener("resize", keepPanelVisible);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    firstLinkRef.current?.focus({ preventScroll: true });
    const closeOutside = (event: MouseEvent) => {
      if (
        event.target instanceof Node &&
        !rootRef.current?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", closeOutside);
    return () => document.removeEventListener("click", closeOutside);
  }, [open]);

  function closePanel() {
    setOpen(false);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <div
      className={`contact-satellite${open ? " is-open" : ""}`}
      ref={rootRef}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          event.preventDefault();
          event.stopPropagation();
          closePanel();
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false);
      }}
    >
      <button
        className="contact-launcher"
        ref={triggerRef}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="contact-orbit" aria-hidden="true">
          <span className="contact-orbit-ring" />
          <Sparkles className="contact-sparkle" size={18} strokeWidth={1.3} />
          <span className="satellite-envelope">
            <span className="envelope-letter">
              <span />
              <span />
              <span />
            </span>
            <span className="envelope-back" />
            <span className="envelope-front" />
            <span className="envelope-flap" />
            <span className="envelope-seal">
              <Mail size={15} strokeWidth={1.4} />
            </span>
          </span>
          <span className="contact-orbit-dot" />
        </span>
        <span className="contact-launcher-label">
          Bana ulaşın <ArrowUpRight size={14} />
        </span>
      </button>
      {open && (
        <section
          className="contact-panel"
          ref={panelRef}
          id={`${id}-panel`}
          aria-labelledby={`${id}-title`}
        >
          <div className="contact-panel-heading">
            <div>
              <span className="contact-eyebrow">BAĞLANTI KURALIM</span>
              <h2 id={`${id}-title`}>Bana ulaşın.</h2>
            </div>
            <button
              className="contact-close"
              aria-label="İletişim kartını kapat"
              onClick={closePanel}
            >
              <X size={15} />
            </button>
          </div>
          <p>İş fırsatları ve projeler için bir merhaba yeter.</p>
          <nav aria-label="İletişim kanalları">
            {contactLinks.map((link, index) => (
              <a
                key={link.label}
                ref={index === 0 ? firstLinkRef : undefined}
                href={link.href}
                target={link.label === "E-posta" ? undefined : "_blank"}
                rel={
                  link.label === "E-posta" ? undefined : "noopener noreferrer"
                }
              >
                <span className="contact-link-icon">
                  <link.icon size={18} strokeWidth={1.5} />
                </span>
                <span>
                  <strong>{link.label}</strong>
                  <small>
                    {link.label === "E-posta"
                      ? link.href.replace("mailto:", "")
                      : link.detail}
                  </small>
                </span>
                <ArrowUpRight className="contact-link-arrow" size={15} />
              </a>
            ))}
          </nav>
          <span className="contact-panel-location">{profile.location}</span>
        </section>
      )}
    </div>
  );
}
