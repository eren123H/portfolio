// Replace this text placeholder with the user-provided EU logo asset.
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span
      className={`logo ${className}`}
      role="img"
      aria-label="Geçici EU logosu"
    >
      EU<span className="logo-dot">.</span>
    </span>
  );
}
