import { useEffect, useState } from "react";
import { useTypewriter, useMouse } from "../hooks/useAnimations";
import { personalInfo } from "../data/portfolioData";

export default function Hero() {
  const typed = useTypewriter(personalInfo.typewriterTexts);
  const mouse = useMouse();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const handleScroll = (id) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section id="hero" style={{
      minHeight: "125vh", display: "flex", alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: isMobile ? "100px 24px 60px" : "0 60px",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(rgba(0,229,255,0.04) 1px, transparent 1px),linear-gradient(90deg, rgba(0,229,255,0.04) 1px, transparent 1px)`,
        backgroundSize: "60px 60px", animation: "gridMove 20s linear infinite",
      }} />
      {!isMobile && <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `radial-gradient(600px at ${mouse.x}px ${mouse.y}px, rgba(0,229,255,0.06), transparent 60%)`,
      }} />}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(139,92,246,0.06) 0%, transparent 65%)",
      }} />

      <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, width: "100%" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: isMobile ? "0.62rem" : "0.72rem", letterSpacing: "0.22em",
          color: "#00e5ff", textTransform: "uppercase",
          border: "1px solid rgba(0,229,255,0.3)", padding: "7px 18px",
          marginBottom: 28, background: "rgba(0,229,255,0.05)", borderRadius: 2,
          animation: "fadeDown 0.8s ease both",
        }}>
          <span style={{ width:7,height:7,borderRadius:"50%",background:"#22c55e",boxShadow:"0 0 8px #22c55e",animation:"pulse 2s infinite" }} />
          Available for Hire
        </div>

        <h1 style={{
          fontSize: isMobile ? "3.2rem" : "clamp(4rem,10vw,8.5rem)",
          fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.02em",
          background: "linear-gradient(135deg, #f0f4ff 0%, #00e5ff 50%, #8b5cf6 100%)",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          animation: "fadeDown 0.8s 0.15s ease both", animationFillMode: "both", marginBottom: 18,
        }}>{personalInfo.name}</h1>

        <div style={{
          fontFamily: "'JetBrains Mono',monospace",
          fontSize: isMobile ? "0.92rem" : "clamp(1rem,2.5vw,1.4rem)",
          fontWeight: 300, color: "rgba(240,244,255,0.55)",
          animation: "fadeDown 0.8s 0.3s ease both", animationFillMode: "both", minHeight: "2rem",
        }}>
          I am a <span style={{ color:"#ff6b35", fontWeight:700 }}>
            {typed}<span style={{ animation:"blink 1s infinite", color:"#00e5ff" }}>|</span>
          </span>
        </div>

        <p style={{
          marginTop: 24, fontSize: isMobile ? "0.88rem" : "1.05rem",
          lineHeight: 1.85, color: "rgba(240,244,255,0.42)",
          maxWidth: 580, margin: "24px auto 0",
          animation: "fadeDown 0.8s 0.45s ease both", animationFillMode: "both",
        }}>{personalInfo.bio}</p>

        <div style={{
          marginTop: 40, display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap",
          animation: "fadeDown 0.8s 0.6s ease both", animationFillMode: "both",
        }}>
          {[["View Projects","#projects",true],["Contact Me","#contact",false]].map(([label,href,primary]) => (
            <button key={label} onClick={() => handleScroll(href)} style={{
              padding: isMobile ? "12px 26px" : "15px 40px",
              background: primary ? "#00e5ff" : "transparent",
              color: primary ? "#060811" : "#00e5ff",
              fontFamily: "'JetBrains Mono',monospace",
              fontSize: isMobile ? "0.72rem" : "0.82rem",
              fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase",
              border: primary ? "none" : "1px solid rgba(0,229,255,0.4)", cursor: "pointer",
              clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
              transition: "all 0.3s",
            }}
              onMouseEnter={e => { e.target.style.background = primary ? "#ff6b35" : "rgba(0,229,255,0.08)"; e.target.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.target.style.background = primary ? "#00e5ff" : "transparent"; e.target.style.transform = "translateY(0)"; }}
            >{label}</button>
          ))}
        </div>

        <div style={{
          marginTop: 70, display: "flex", gap: isMobile ? 12 : 24, justifyContent: "center", flexWrap: "wrap",
          animation: "fadeDown 0.8s 0.75s ease both", animationFillMode: "both",
        }}>
          {["🐳 Docker","⚓ K8s","☁️ AWS","⚙️ Terraform","🔄 CI/CD","📊 Grafana"].map(t => (
            <span key={t} style={{
              fontFamily:"'JetBrains Mono',monospace", fontSize: isMobile ? "0.6rem" : "0.7rem",
              color:"rgba(240,244,255,0.28)", letterSpacing:"0.08em", transition:"color 0.3s", cursor:"default",
            }}
              onMouseEnter={e => e.target.style.color="#00e5ff"}
              onMouseLeave={e => e.target.style.color="rgba(240,244,255,0.28)"}
            >{t}</span>
          ))}
        </div>
      </div>

      <div style={{
        position:"absolute", bottom:36, left:"50%", transform:"translateX(-50%)",
        display:"flex", flexDirection:"column", alignItems:"center", gap:8,
        animation:"fadeIn 1s 1.2s ease both", animationFillMode:"both",
      }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.6rem", letterSpacing:"0.28em", color:"#3d4a6b", textTransform:"uppercase" }}>Scroll</span>
        <div style={{ width:1, height:44, background:"linear-gradient(to bottom, #00e5ff, transparent)", animation:"scrollLine 2s ease-in-out infinite" }} />
      </div>
    </section>
  );
}
