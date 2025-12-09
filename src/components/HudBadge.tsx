"use client";

export default function HudBadge() {
  return (
    <div className="hud-badge hidden md:flex">
      <div className="hud-led" aria-hidden="true" />
      <span>Tillgänglig för samarbete</span>
    </div>
  );
}
