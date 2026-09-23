import { useEffect, useRef } from "react";

const INTERACTIVE =
  "a, button, [role='button'], input, textarea, select, label, summary, [data-cursor-hover]";

export default function NeuCursor({ hideNative = true }) {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // only run on devices with a real mouse
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const html = document.documentElement;
    if (hideNative) html.classList.add("has-neu-cursor");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ease = reduced ? 1 : 0.18; // trailing lag (1 = no lag)

    const mouse = { x: -100, y: -100 };
    const ringPos = { x: -100, y: -100 };
    const dotPos = { x: -100, y: -100 };
    let ringScale = 1, dotScale = 1;
    let hovered = false, pressed = false, raf;

    const onMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      hovered = Boolean(e.target.closest?.(INTERACTIVE));
      ring.classList.toggle("is-hover", hovered);
      dot.style.opacity = 1;
      ring.style.opacity = 1;
    };

    const onDown = () => { pressed = true; ring.classList.add("is-pressed"); };
    const onUp = () => { pressed = false; ring.classList.remove("is-pressed"); };
    const onLeave = () => { dot.style.opacity = 0; ring.style.opacity = 0; };
    const onEnter = () => { dot.style.opacity = 1; ring.style.opacity = 1; };

    const loop = () => {
      // ring trails behind, dot follows faster
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;
      dotPos.x += (mouse.x - dotPos.x) * (reduced ? 1 : 0.5);
      dotPos.y += (mouse.y - dotPos.y) * (reduced ? 1 : 0.5);

      // targets: hover grows, press shrinks (both combine)
      const targetRing = pressed ? (hovered ? 1.15 : 0.7) : hovered ? 1.6 : 1;
      const targetDot = pressed ? 0.5 : hovered ? 0.4 : 1;
      ringScale += (targetRing - ringScale) * 0.2;
      dotScale += (targetDot - dotScale) * 0.2;

      ring.style.transform =
        `translate3d(${ringPos.x}px, ${ringPos.y}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      dot.style.transform =
        `translate3d(${dotPos.x}px, ${dotPos.y}px, 0) translate(-50%, -50%) scale(${dotScale})`;

      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(raf);
      html.classList.remove("has-neu-cursor");
    };
  }, [hideNative]);

  return (
    <>
      <div ref={ringRef} className="neu-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="neu-cursor-dot" aria-hidden="true" />
    </>
  );
}