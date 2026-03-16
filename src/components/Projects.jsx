import { useState, useEffect } from "react";
import { useVisible } from "../hooks/useAnimations";
import { projects } from "../data/portfolioData";

function ProjectCard({ title, desc, tags, color, icon, highlight, github, live }) {
  const [ref, visible] = useVisible(0.1);
  const [hovered, setHovered] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
      style={{
        padding:"28px 24px", background: hovered?"rgba(255,255,255,0.05)":"rgba(255,255,255,0.02)",
        border:`1px solid ${hovered ? color+"50" : "rgba(255,255,255,0.06)"}`,
        position:"relative", overflow:"hidden",
        opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(30px)",
        transition:"all 0.6s ease", boxShadow: hovered ? `0 20px 50px ${color}12` : "none",
      }}
    >
      {highlight && (
        <div style={{
          position:"absolute", top:14, right:14,
          fontFamily:"'JetBrains Mono',monospace", fontSize:"0.58rem", letterSpacing:"0.18em",
          color:"#060811", background:color, padding:"3px 10px", textTransform:"uppercase",
          clipPath:"polygon(4px 0%,100% 0%,calc(100% - 4px) 100%,0% 100%)",
        }}>Featured</div>
      )}
      <div style={{
        position:"absolute", top:0, left:0, right:0, height:2,
        background:`linear-gradient(90deg, transparent, ${color}, transparent)`,
        opacity:hovered?1:0, transition:"opacity 0.3s",
      }} />
      <div style={{
         width:48, height:48, marginBottom:20, background:`${color}12`, border:`1px solid ${color}30`,
        display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.5rem",
        transition:"transform 0.3s", transform: hovered?"scale(1.1) rotate(5deg)":"scale(1)",
      }}>{icon}</div>
      <h3 style={{ fontWeight:800, fontSize:"1.05rem", color: hovered?color:"#f0f4ff", marginBottom:12, transition:"color 0.3s" }}>{title}</h3>
      <p style={{ fontSize:"0.88rem", lineHeight:1.75, color:"rgba(240,244,255,0.45)", marginBottom:22 }}>{desc}</p>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:24 }}>
        {tags.map((tag,i) => (
          <span key={i} style={{
            fontFamily:"'JetBrains Mono',monospace", fontSize:"0.63rem", letterSpacing:"0.1em",
            color:`${color}cc`, background:`${color}10`, border:`1px solid ${color}25`, padding:"3px 10px",
          }}>{tag}</span>
        ))}
      </div>
      <div style={{ display:"flex", gap:16 }}>
        {[["GitHub →",github],["Live →",live]].map(([label,href]) => (
          <a key={label} href={href} style={{
            fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", letterSpacing:"0.1em",
            color: hovered?color:"#3d4a6b", textDecoration:"none", transition:"color 0.3s",
          }}
            onMouseEnter={e=>e.target.style.color=color}
            onMouseLeave={e=>e.target.style.color=hovered?color:"#3d4a6b"}
          >{label}</a>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const [ref, visible] = useVisible();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth < 1100);
  useEffect(() => {
    const h = () => { setIsMobile(window.innerWidth < 768); setIsTablet(window.innerWidth < 1100); };
    window.addEventListener("resize", h); return () => window.removeEventListener("resize", h);
  }, []);
  const cols = isMobile ? "1fr" : isTablet ? "1fr 1fr" : "repeat(3,1fr)";

  return (
    <section id="projects" style={{ padding: isMobile?"80px 24px":"110px 60px", background:"rgba(12,16,32,0.5)" }}>
      <div style={{ maxWidth:1200, margin:"0 auto" }}>
        <div ref={ref} style={{ marginBottom:60, opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(24px)", transition:"all 0.7s ease" }}>
          <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", letterSpacing:"0.35em", color:"#00e5ff", textTransform:"uppercase", marginBottom:12 }}>// Projects</p>
          <h2 style={{ fontSize:"clamp(2rem,5vw,3.5rem)", fontWeight:800, lineHeight:1.1 }}>
            What I've <span style={{ background:"linear-gradient(135deg,#00e5ff,#ff6b35)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>Built</span>
          </h2>
          <p style={{ marginTop:16, color:"rgba(240,244,255,0.4)", fontSize:"0.98rem", maxWidth:500 }}>Real-world DevOps projects — from infra automation to cloud-native deployments.</p>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:cols, gap:20 }}>
          {projects.map(p => <ProjectCard key={p.id} {...p} />)}
        </div>
      </div>
    </section>
  );
}
