import { useState, useEffect, useRef } from "react";

// Intersection Observer hook
export function useVisible(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// Counter animation hook
export function useCounter(target, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

// Typewriter hook
export function useTypewriter(texts, typeSpeed = 80, deleteSpeed = 40, pause = 1400) {
  const [idx, setIdx] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[idx];
    const speed = deleting ? deleteSpeed : typeSpeed;
    const timeout = setTimeout(() => {
      if (!deleting && displayed === current) {
        setTimeout(() => setDeleting(true), pause);
        return;
      }
      if (deleting && displayed === "") {
        setDeleting(false);
        setIdx((i) => (i + 1) % texts.length);
        return;
      }
      setDisplayed((d) =>
        deleting ? d.slice(0, -1) : current.slice(0, d.length + 1)
      );
    }, speed);
    return () => clearTimeout(timeout);
  }, [displayed, deleting, idx, texts, typeSpeed, deleteSpeed, pause]);

  return displayed;
}

// Mouse position hook
export function useMouse() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);
  return pos;
}

// Scroll progress hook
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handler = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return progress;
}
