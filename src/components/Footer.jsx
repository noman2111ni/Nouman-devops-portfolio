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
      borderTop:"1px solid rgba(0,0,0,0.05)",
      display:"flex", justifyContent:"space-between", alignItems:"center",
      flexDirection: isMobile ? "column" : "row", gap: isMobile ? 14 : 0,
      textAlign: isMobile ? "center" : "left",
    }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.72rem", color:"#6b7280" }}>
        © 2024 <span style={{ color:"#0084d9" }}>{personalInfo.fullName}</span> · Built with React ⚡
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.7rem", color:"#6b7280", display:"flex", gap:24 }}>
        {["GitHub","LinkedIn","Email"].map(link => (
          <a key={link} href="#" style={{ color:"#6b7280", textDecoration:"none", transition:"color 0.3s" }}
            onMouseEnter={e=>e.target.style.color="#0084d9"}
            onMouseLeave={e=>e.target.style.color="#6b7280"}
          >{link}</a>
        ))}
      </div>
    </footer>
  );
}
