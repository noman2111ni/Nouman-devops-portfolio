import "../src/styles/globals.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useMouse } from "./hooks/useAnimations";

function Cursor() {
  const { x, y } = useMouse();
  return (
    <>
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9999,
        width: 10, height: 10, borderRadius: "50%",
        background: "#00e5ff",
        left: x, top: y, transform: "translate(-50%,-50%)",
        transition: "transform 0.05s",
        mixBlendMode: "difference",
      }} />
      <div style={{
        position: "fixed", pointerEvents: "none", zIndex: 9998,
        width: 34, height: 34, borderRadius: "50%",
        border: "1px solid rgba(0,229,255,0.35)",
        left: x, top: y, transform: "translate(-50%,-50%)",
        transition: "left 0.12s ease, top 0.12s ease",
      }} />
    </>
  );
}

export default function App() {
  return (
    <>
      <Cursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
// import { useState, useRef } from "react";
// import "../src/styles/globals.css";
// import Navbar from "./components/Navbar";
// import Hero from "./components/Hero";
// import About from "./components/About";
// import Skills from "./components/Skills";
// import Projects from "./components/Projects";
// import Experience from "./components/Experience";
// import Contact from "./components/Contact";
// import Footer from "./components/Footer";
// import { useMouse } from "./hooks/useAnimations";

// function Cursor() {
//   const { x, y } = useMouse();
//   return (
//     <>
//       <div style={{
//         position: "fixed", pointerEvents: "none", zIndex: 9999,
//         width: 10, height: 10, borderRadius: "50%",
//         background: "#00e5ff",
//         left: x, top: y, transform: "translate(-50%,-50%)",
//         transition: "transform 0.05s",
//         mixBlendMode: "difference",
//       }} />
//       <div style={{
//         position: "fixed", pointerEvents: "none", zIndex: 9998,
//         width: 34, height: 34, borderRadius: "50%",
//         border: "1px solid rgba(0,229,255,0.35)",
//         left: x, top: y, transform: "translate(-50%,-50%)",
//         transition: "left 0.12s ease, top 0.12s ease",
//       }} />
//     </>
//   );
// }

// export default function App() {
//   const [current, setCurrent] = useState(0);
//   const [prev,    setPrev]    = useState(null);
//   const [dir,     setDir]     = useState("left");
//   const [sliding, setSliding] = useState(false);
//   const timerRef = useRef(null);

//   const goTo = (index) => {
//     if (sliding || index === current) return;
//     clearTimeout(timerRef.current);
//     const direction = index > current ? "left" : "right";
//     setDir(direction);
//     setPrev(current);
//     setCurrent(index);
//     setSliding(true);
//     timerRef.current = setTimeout(() => {
//       setPrev(null);
//       setSliding(false);
//     }, 550);
//   };

//   const sections = [
//     <Hero       key="hero"       />,
//     <About      key="about"      />,
//     <Skills     key="skills"     />,
//     <Projects   key="projects"   />,
//     <Experience key="experience" />,
//     <div        key="contact"    ><Contact /><Footer /></div>,
//   ];

//   return (
//     <>
//       <style>{`
//         @keyframes slideInLeft {
//           from { transform: translateX(100%);  opacity: 0; }
//           to   { transform: translateX(0);     opacity: 1; }
//         }
//         @keyframes slideInRight {
//           from { transform: translateX(-100%); opacity: 0; }
//           to   { transform: translateX(0);     opacity: 1; }
//         }
//         @keyframes slideOutLeft {
//           from { transform: translateX(0);     opacity: 1; }
//           to   { transform: translateX(-100%); opacity: 0; }
//         }
//         @keyframes slideOutRight {
//           from { transform: translateX(0);     opacity: 1; }
//           to   { transform: translateX(100%);  opacity: 0; }
//         }
//         .slide-wrap {
//           position: fixed;
//           inset: 0;
//           overflow-y: auto;
//           overflow-x: hidden;
//           background: #060811;
//         }
//         .slide-in-left   { animation: slideInLeft   0.52s cubic-bezier(.77,0,.18,1) both; }
//         .slide-in-right  { animation: slideInRight  0.52s cubic-bezier(.77,0,.18,1) both; }
//         .slide-out-left  { animation: slideOutLeft  0.52s cubic-bezier(.77,0,.18,1) both; }
//         .slide-out-right { animation: slideOutRight 0.52s cubic-bezier(.77,0,.18,1) both; }
//       `}</style>

//       <Cursor />
//       <Navbar current={current} goTo={goTo} />

//       {/* Current section — slides IN */}
//       <div
//         key={`in-${current}`}
//         className={
//           sliding
//             ? dir === "left"
//               ? "slide-wrap slide-in-left"
//               : "slide-wrap slide-in-right"
//             : "slide-wrap"
//         }
//       >
//         {sections[current]}
//       </div>

//       {/* Previous section — slides OUT */}
//       {sliding && prev !== null && (
//         <div
//           key={`out-${prev}`}
//           className={
//             dir === "left"
//               ? "slide-wrap slide-out-left"
//               : "slide-wrap slide-out-right"
//           }
//           style={{ pointerEvents: "none" }}
//         >
//           {sections[prev]}
//         </div>
//       )}
//     </>
//   );
// }