import { useState, useEffect } from "react";
import { useVisible } from "../hooks/useAnimations";
import { skills } from "../data/portfolioData";

function SkillBar({ name, level, color, visible }) {
  return (
    <div style={{ marginBottom:16 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.78rem", color:"#c0cce8" }}>{name}</span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color }}>{level}%</span>
      </div>
      <div style={{ background:"rgba(255,255,255,0.05)", height:5, borderRadius:3, overflow:"hidden" }}>
        <div style={{
          height:"100%", borderRadius:3,
          background:`linear-gradient(90deg, ${color}, ${color}70)`,
          width: visible ? `${level}%` : "0%",
          transition:"width 1.3s cubic-bezier(.4,0,.2,1)",
          boxShadow:`0 0 10px ${color}50`,
        }} />
      </div>
    </div>
  );
}

function SkillCard({ category, icon, color, items }) {
  const [ref, visible] = useVisible(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        padding:"28px 24px",
        background: hovered ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.02)",
        border:`1px solid ${hovered ? color+"40" : "rgba(255,255,255,0.06)"}`,
        borderTop:`2px solid ${color}`,
        opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(28px)",
        transition:"all 0.6s ease",
      }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:24 }}>
        <span style={{ fontSize:"1.5rem" }}>{icon}</span>
        <h3 style={{ fontWeight:700, fontSize:"0.92rem", color }}>{category}</h3>
      </div>
      {items.map((item,i) => <SkillBar key={i} {...item} color={color} visible={visible} />)}
    </div>
  );
}

export default function Skills() {
  const [ref, visible] = useVisible();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1100);
  useEffect(() => {
    const h = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth < 1100); };
    window.addEventListener("resize", h); return () => window.removeEventListener("resize", h);
  }, []);

  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <section id="skills" style={{ padding: isMobile ? "80px 24px" : "110px 60px" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div ref={ref} style={{ marginBottom:60, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.35em", color:"#00e5ff", textTransform:"uppercase", marginBottom:12 }}>// Technical Skills</p>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800, lineHeight:1.1 }}>
            My <span style={{ background:"linear-gradient(135deg,#ff6b35,#8b5cf6)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Arsenal</span>
          </h2>
          <p style={{ marginTop:16, color:"rgba(240,244,255,0.4)", fontSize:"0.98rem", maxWidth:500 }}>Tools and technologies I use daily to build, deploy, and scale infrastructure.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:20 }}>
          {skills.map((skill,i) => <SkillCard key={i} {...skill} />)}
        </div>
      </div>
    </section>
  );
}
