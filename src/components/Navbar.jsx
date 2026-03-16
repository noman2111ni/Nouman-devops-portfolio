import { useState, useEffect } from "react";
import { useScrollProgress } from "../hooks/useAnimations";

const navLinks = [
  { label: "Home",       href: "#hero" },
  { label: "About",      href: "#about" },
  { label: "Skills",     href: "#skills" },
  { label: "Projects",   href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [active,    setActive]    = useState("#hero");
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [isMobile,  setIsMobile]  = useState(window.innerWidth < 900);
  const progress = useScrollProgress();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  const handleNav = (href) => {
    setActive(href);
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Progress bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, zIndex: 200,
        height: 3, width: `${progress}%`,
        background: "linear-gradient(90deg,#00e5ff,#8b5cf6,#ff6b35)",
        transition: "width 0.1s",
      }} />

      <nav style={{
        position: "fixed", top: 3, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: isMobile ? "16px 24px" : "18px 60px",
        background: scrolled ? "rgba(6,8,17,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,229,255,0.08)" : "none",
        transition: "all 0.4s ease",
      }}>
        {/* Logo */}
        <div onClick={() => handleNav("#hero")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, border: "2px solid #00e5ff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
            color: "#00e5ff", fontSize: "1rem",
            clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
            background: "rgba(0,229,255,0.08)",
          }}>N</div>
          <span style={{
            fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
            fontSize: "0.95rem", color: "#f0f4ff", letterSpacing: "0.05em",
          }}>Nouman <span style={{ color: "#00e5ff" }}>DevOps</span></span>
        </div>

        {/* Desktop links */}
        {!isMobile && (
          <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
            {navLinks.map(link => (
              <li key={link.href}>
                <button onClick={() => handleNav(link.href)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
                  color: active === link.href ? "#00e5ff" : "#3d4a6b",
                  padding: "4px 0",
                  borderBottom: active === link.href ? "1px solid #00e5ff" : "1px solid transparent",
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => e.target.style.color = "#00e5ff"}
                  onMouseLeave={e => e.target.style.color = active === link.href ? "#00e5ff" : "#3d4a6b"}
                >{link.label}</button>
              </li>
            ))}
          </ul>
        )}

        {/* Desktop CTA */}
        {!isMobile && (
          <button onClick={() => handleNav("#contact")} style={{
            padding: "10px 24px", background: "transparent",
            border: "1px solid rgba(0,229,255,0.5)", color: "#00e5ff",
            fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem",
            letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
            clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
            transition: "all 0.3s",
          }}
            onMouseEnter={e => { e.target.style.background = "rgba(0,229,255,0.1)"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; }}
          >Hire Me</button>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(o => !o)} style={{
            background: "none", border: "none", cursor: "pointer",
            display: "flex", flexDirection: "column", gap: 5, padding: 4,
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                display: "block", width: 24, height: 2,
                background: "#00e5ff", borderRadius: 2,
                transition: "all 0.3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(5px,5px)"
                  : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
                  : "scaleX(0)"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        )}
      </nav>

      {/* Mobile Menu Drawer */}
      {isMobile && (
        <div style={{
          position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
          background: "rgba(6,8,17,0.98)", backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(0,229,255,0.1)",
          padding: menuOpen ? "24px 24px 32px" : "0 24px",
          maxHeight: menuOpen ? 400 : 0,
          overflow: "hidden",
          transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
            {navLinks.map(link => (
              <li key={link.href}>
                <button onClick={() => handleNav(link.href)} style={{
                  background: "none", border: "none", cursor: "pointer",
                  width: "100%", textAlign: "left",
                  fontFamily: "'JetBrains Mono',monospace",
                  fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase",
                  color: active === link.href ? "#00e5ff" : "#5a6a8a",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.04)",
                  transition: "color 0.3s",
                }}>{link.label}</button>
              </li>
            ))}
            <li style={{ marginTop: 16 }}>
              <button onClick={() => handleNav("#contact")} style={{
                width: "100%", padding: "14px",
                background: "#00e5ff", color: "#060811",
                fontFamily: "'JetBrains Mono',monospace",
                fontSize: "0.82rem", fontWeight: 700, letterSpacing: "0.2em",
                textTransform: "uppercase", border: "none", cursor: "pointer",
              }}>Hire Me</button>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}
// import { useState, useEffect } from "react";
// import { useScrollProgress } from "../hooks/useAnimations";

// const NAV_LINKS = [
//   { label: "Home",       index: 0 },
//   { label: "About",      index: 1 },
//   { label: "Skills",     index: 2 },
//   { label: "Projects",   index: 3 },
//   { label: "Experience", index: 4 },
//   { label: "Contact",    index: 5 },
// ];

// export default function Navbar({ current, goTo }) {
//   const [scrolled, setScrolled] = useState(false);
//   const [menuOpen, setMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
//   const progress = useScrollProgress();

//   useEffect(() => {
//     const onScroll = () => setScrolled(window.scrollY > 40);
//     const onResize = () => setIsMobile(window.innerWidth < 900);
//     window.addEventListener("scroll", onScroll);
//     window.addEventListener("resize", onResize);
//     return () => {
//       window.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onResize);
//     };
//   }, []);

//   const handleNav = (index) => {
//     setMenuOpen(false);
//     goTo(index);
//   };

//   return (
//     <>
//       {/* Progress bar */}
//       <div style={{
//         position: "fixed", top: 0, left: 0, zIndex: 200,
//         height: 3, width: `${progress}%`,
//         background: "linear-gradient(90deg,#00e5ff,#8b5cf6,#ff6b35)",
//         transition: "width 0.1s",
//       }} />

//       <nav style={{
//         position: "fixed", top: 3, left: 0, right: 0, zIndex: 100,
//         display: "flex", alignItems: "center", justifyContent: "space-between",
//         padding: isMobile ? "16px 24px" : "18px 60px",
//         background: scrolled ? "rgba(6,8,17,0.95)" : "transparent",
//         backdropFilter: scrolled ? "blur(20px)" : "none",
//         borderBottom: scrolled ? "1px solid rgba(0,229,255,0.08)" : "none",
//         transition: "all 0.4s ease",
//       }}>

//         {/* Logo */}
//         <div onClick={() => handleNav(0)}
//           style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 10 }}>
//           <div style={{
//             width: 36, height: 36, border: "2px solid #00e5ff",
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
//             color: "#00e5ff", fontSize: "1rem",
//             clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
//             background: "rgba(0,229,255,0.08)",
//           }}>N</div>
//           <span style={{
//             fontFamily: "'JetBrains Mono',monospace", fontWeight: 700,
//             fontSize: "0.95rem", color: "#f0f4ff", letterSpacing: "0.05em",
//           }}>Nouman <span style={{ color: "#00e5ff" }}>DevOps</span></span>
//         </div>

//         {/* Desktop links */}
//         {!isMobile && (
//           <ul style={{ display: "flex", gap: 32, listStyle: "none" }}>
//             {NAV_LINKS.map(link => (
//               <li key={link.index}>
//                 <button onClick={() => handleNav(link.index)} style={{
//                   background: "none", border: "none", cursor: "pointer",
//                   fontFamily: "'JetBrains Mono',monospace",
//                   fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
//                   color: current === link.index ? "#00e5ff" : "#3d4a6b",
//                   padding: "4px 0",
//                   borderBottom: current === link.index ? "1px solid #00e5ff" : "1px solid transparent",
//                   transition: "all 0.3s",
//                 }}
//                   onMouseEnter={e => e.target.style.color = "#00e5ff"}
//                   onMouseLeave={e => e.target.style.color = current === link.index ? "#00e5ff" : "#3d4a6b"}
//                 >{link.label}</button>
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Desktop CTA */}
//         {!isMobile && (
//           <button onClick={() => handleNav(5)} style={{
//             padding: "10px 24px", background: "transparent",
//             border: "1px solid rgba(0,229,255,0.5)", color: "#00e5ff",
//             fontFamily: "'JetBrains Mono',monospace", fontSize: "0.75rem",
//             letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer",
//             clipPath: "polygon(6px 0%,100% 0%,calc(100% - 6px) 100%,0% 100%)",
//             transition: "all 0.3s",
//           }}
//             onMouseEnter={e => e.target.style.background = "rgba(0,229,255,0.1)"}
//             onMouseLeave={e => e.target.style.background = "transparent"}
//           >Hire Me</button>
//         )}

//         {/* Hamburger */}
//         {isMobile && (
//           <button onClick={() => setMenuOpen(o => !o)} style={{
//             background: "none", border: "none", cursor: "pointer",
//             display: "flex", flexDirection: "column", gap: 5, padding: 4,
//           }}>
//             {[0, 1, 2].map(i => (
//               <span key={i} style={{
//                 display: "block", width: 24, height: 2,
//                 background: "#00e5ff", borderRadius: 2, transition: "all 0.3s",
//                 transform: menuOpen
//                   ? i === 0 ? "rotate(45deg) translate(5px,5px)"
//                   : i === 2 ? "rotate(-45deg) translate(5px,-5px)"
//                   : "scaleX(0)"
//                   : "none",
//                 opacity: menuOpen && i === 1 ? 0 : 1,
//               }} />
//             ))}
//           </button>
//         )}
//       </nav>

//       {/* Mobile Drawer */}
//       {isMobile && (
//         <div style={{
//           position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
//           background: "rgba(6,8,17,0.98)", backdropFilter: "blur(20px)",
//           borderBottom: "1px solid rgba(0,229,255,0.1)",
//           padding: menuOpen ? "24px 24px 32px" : "0 24px",
//           maxHeight: menuOpen ? 400 : 0,
//           overflow: "hidden",
//           transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
//         }}>
//           <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 4 }}>
//             {NAV_LINKS.map(link => (
//               <li key={link.index}>
//                 <button onClick={() => handleNav(link.index)} style={{
//                   background: "none", border: "none", cursor: "pointer",
//                   width: "100%", textAlign: "left",
//                   fontFamily: "'JetBrains Mono',monospace",
//                   fontSize: "0.9rem", letterSpacing: "0.15em", textTransform: "uppercase",
//                   color: current === link.index ? "#00e5ff" : "#5a6a8a",
//                   padding: "14px 0",
//                   borderBottom: "1px solid rgba(255,255,255,0.04)",
//                   transition: "color 0.3s",
//                 }}>{link.label}</button>
//               </li>
//             ))}
//             <li style={{ marginTop: 16 }}>
//               <button onClick={() => handleNav(5)} style={{
//                 width: "100%", padding: "14px",
//                 background: "#00e5ff", color: "#060811",
//                 fontFamily: "'JetBrains Mono',monospace",
//                 fontSize: "0.82rem", fontWeight: 700,
//                 letterSpacing: "0.2em", textTransform: "uppercase",
//                 border: "none", cursor: "pointer",
//               }}>Hire Me</button>
//             </li>
//           </ul>
//         </div>
//       )}
//     </>
//   );
// }