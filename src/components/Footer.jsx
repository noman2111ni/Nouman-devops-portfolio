import { useState, useEffect } from "react";
import { personalInfo } from "../data/portfolioData";

export default function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 600);
    window.addEventListener("resize", h); return () => window.removeEventListener("resize", h);
  }, []);

  return (
    <footer style={{
      padding: isMobile ? "28px 24px" : "36px 60px",
      borderTop:"1px solid rgba(15,23,42,0.06)",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      flexDirection: isMobile ? "column" : "row", gap: isMobile ? 14 : 0,
      textAlign: isMobile ? "center" : "left",
      background: "rgba(248,250,252,0.9)",
    }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color:"#475569" }}>
        © 2024 <span style={{ color:"#2563eb" }}>{personalInfo.fullName}</span> · Built with React ⚡
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", color:"#475569", display:"flex", gap:24 }}>
        {["GitHub","LinkedIn","Email"].map(link => (
          <a key={link} href="#" style={{ color:"#475569", textDecoration:"none", transition:"color 0.3s" }}
            onMouseEnter={e=>e.target.style.color="#2563eb"}
            onMouseLeave={e=>e.target.style.color="#475569"}
          >{link}</a>
        ))}
      </div>
    </footer>
  );
}
