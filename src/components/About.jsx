import { useEffect, useState } from "react";
import { useVisible, useCounter } from "../hooks/useAnimations";
import { personalInfo, stats, certifications } from "../data/portfolioData";

function StatCard({ number, label, suffix, color }) {
  const [ref, visible] = useVisible();
  const count = useCounter(number, 1600, visible);
  return (
    <div ref={ref} style={{
      textAlign: "center", padding: "50px 20px",
      background: "rgba(255,255,255,0.02)", border: `1px solid ${color}25`, borderTop: `3px solid ${color}`,
      opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.6s ease",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = `0 20px 40px ${color}15`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ fontSize: "2.5rem", fontWeight: 800, color, lineHeight: 1 }}>{count}{suffix}</div>
      <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.2em", color: "#3d4a6b", marginTop: 8, textTransform: "uppercase" }}>{label}</div>
    </div>
  );
}

export default function About() {
  const [ref, visible] = useVisible();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h); return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <section id="about" style={{ padding: isMobile ? "80px 24px" : "110px 60px", background: "rgba(12,16,32,0.5)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div ref={ref} style={{ marginBottom: 60, opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)", transition: "all 0.7s ease" }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", letterSpacing: "0.35em", color: "#00e5ff", textTransform: "uppercase", marginBottom: 12 }}>// About Me</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, lineHeight: 1.1 }}>
            Who I <span style={{ background: "linear-gradient(135deg,#00e5ff,#8b5cf6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>Am</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 80, alignItems: "start", marginBottom: 60 }}>
          {/* Left */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-30px)", transition: "all 0.7s 0.2s ease" }}>
            <p style={{ fontSize: "1rem", lineHeight: 1.9, color: "rgba(240,244,255,0.6)", marginBottom: 28 }}>{personalInfo.bio}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["📍 Location", personalInfo.location], ["📧 Email", personalInfo.email], ["🐙 GitHub", personalInfo.github], ["💼 LinkedIn", personalInfo.linkedin]].map(([k, v]) => (
                <div key={k} style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.7rem", color: "#3d4a6b", letterSpacing: "0.1em", minWidth: 110 }}>{k}</span>
                  <span style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.78rem", color: "#00e5ff", wordBreak: "break-all" }}>{v}</span>
                </div>
              ))}
            </div>
            <button style={{
              marginTop: 32, padding: "13px 32px", background: "#00e5ff", color: "#060811",
              fontFamily: "'JetBrains Mono',monospace", fontSize: "0.78rem", fontWeight: 700,
              letterSpacing: "0.15em", textTransform: "uppercase", border: "none", cursor: "pointer",
              clipPath: "polygon(7px 0%,100% 0%,calc(100% - 7px) 100%,0% 100%)", transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.background = "#ff6b35"; e.target.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.target.style.background = "#00e5ff"; e.target.style.transform = "translateY(0)"; }}
            >Download CV</button>
          </div>

          {/* Right — Certs */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(30px)", transition: "all 0.7s 0.3s ease" }}>
            <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", letterSpacing: "0.25em", color: "#ff6b35", textTransform: "uppercase", marginBottom: 20 }}>Certifications</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {certifications.map((cert, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 20px",
                  background: "rgba(255,255,255,0.02)", border: `1px solid ${cert.color}20`, borderLeft: `3px solid ${cert.color}`,
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(4px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span style={{ fontSize: "1.4rem" }}>{cert.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: cert.color }}>{cert.name}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "#3d4a6b", marginTop: 3 }}>{cert.org} · {cert.year}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: isMobile ? 30 : 50,
        }}>
          <div style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2,1fr)" : "repeat(3,1fr)",
            gap: 40,
            maxWidth: isMobile ? 500 : "100%",   // ← width limit
            margin: "auto",                     // ← center
          }}>
            {stats.map((s, i) => <StatCard key={i} {...s} />)}
          </div>
        </div>
      </div>
    </section>
  );
}
