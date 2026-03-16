import { useState, useEffect } from "react";
import { useVisible } from "../hooks/useAnimations";
import { experience } from "../data/portfolioData";

function TimelineItem({ year, role, company, type, color, points, index }) {
  const [ref, visible] = useVisible(0.1);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h); return () => window.removeEventListener("resize", h);
  }, []);

  const Card = () => (
    <div style={{
      padding:"24px 22px", background:"rgba(255,255,255,0.02)",
      border:`1px solid ${color}25`, borderLeft:`3px solid ${color}`,
    }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.68rem", color, letterSpacing:"0.18em", textTransform:"uppercase", marginBottom:8 }}>{year} · {type}</div>
      <h3 style={{ fontWeight:800, fontSize:"1rem", color:"#f0f4ff", marginBottom:4 }}>{role}</h3>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.78rem", color:"#3d4a6b", marginBottom:14 }}>{company}</div>
      <ul style={{ listStyle:"none" }}>
        {points.map((p,i) => (
          <li key={i} style={{ fontSize:"0.84rem", color:"rgba(240,244,255,0.5)", marginBottom:7, display:"flex", gap:8 }}>
            <span style={{ color, flexShrink:0 }}>›</span> {p}
          </li>
        ))}
      </ul>
    </div>
  );

  if (isMobile) return (
    <div ref={ref} style={{
      display:"flex", gap:16, marginBottom:32,
      opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(28px)",
      transition:`all 0.7s ${index*0.1}s ease`,
    }}>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
        <div style={{ flex:1, width:1, background:"rgba(255,255,255,0.06)" }} />
        <div style={{ width:14, height:14, borderRadius:"50%", background:color, boxShadow:`0 0 10px ${color}80`, border:"3px solid #060811", flexShrink:0 }} />
        <div style={{ flex:1, width:1, background:"rgba(255,255,255,0.06)" }} />
      </div>
      <div style={{ flex:1, paddingTop:4 }}><Card /></div>
    </div>
  );

  const isLeft = index % 2 === 0;
  return (
    <div ref={ref} style={{
      display:"grid", gridTemplateColumns:"1fr 60px 1fr", gap:0, marginBottom:40,
      opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(28px)",
      transition:`all 0.7s ${index*0.1}s ease`,
    }}>
      <div style={{ padding:"0 36px 0 0" }}>{isLeft ? <Card /> : <div />}</div>
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center" }}>
        <div style={{ flex:1, width:1, background:"rgba(255,255,255,0.06)" }} />
        <div style={{ width:16, height:16, borderRadius:"50%", background:color, boxShadow:`0 0 12px ${color}80`, flexShrink:0, border:"3px solid #060811" }} />
        <div style={{ flex:1, width:1, background:"rgba(255,255,255,0.06)" }} />
      </div>
      <div style={{ padding:"0 0 0 36px" }}>{!isLeft ? <Card /> : <div />}</div>
    </div>
  );
}

export default function Experience() {
  const [ref, visible] = useVisible();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h); return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <section id="experience" style={{ padding: isMobile?"80px 24px":"110px 60px" }}>
      <div style={{ maxWidth:1100, margin:"0 auto" }}>
        <div ref={ref} style={{ marginBottom:70, textAlign:"center", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.35em", color:"#00e5ff", textTransform:"uppercase", marginBottom:12 }}>// Experience</p>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800, lineHeight:1.1 }}>
            My <span style={{ background:"linear-gradient(135deg,#8b5cf6,#ff6b35)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Journey</span>
          </h2>
        </div>
        {experience.map((item,i) => <TimelineItem key={i} {...item} index={i} />)}
      </div>
    </section>
  );
}
