import { useState, useEffect } from "react";
import { useVisible } from "../hooks/useAnimations";
import { personalInfo } from "../data/portfolioData";

// ─── EmailJS IDs ───────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_bsngf1y";   // ← apna paste karo
const EMAILJS_TEMPLATE_ID = "template_w3s7rgd";  // ← apna paste karo
const EMAILJS_PUBLIC_KEY  = "invL2s9IptlaB5knx"; // ← yeh already set hai
// ──────────────────────────────────────────────────────────

export default function Contact() {
  const [ref, visible] = useVisible();
  const [form, setForm]     = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);

  // Load EmailJS CDN
  useEffect(() => {
    if (window.emailjs) {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init(EMAILJS_PUBLIC_KEY);
      console.log("EmailJS ready ✅");
    };
    document.head.appendChild(script);
  }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setStatus("sending");

    // Wait agar EmailJS load na hua ho
    if (!window.emailjs) {
      setStatus("error");
      return;
    }

    try {
      await window.emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          message:    form.message,
          to_email:   personalInfo.email,
        }
      );
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    color: "#f0f4ff",
    fontFamily: "'JetBrains Mono',monospace", fontSize: "0.83rem",
    outline: "none", transition: "border-color 0.3s",
  };

  const btnColors = {
    idle:    { bg: "#00e5ff", text: "Send Message →" },
    sending: { bg: "#8b5cf6", text: "Sending..." },
    sent:    { bg: "#22c55e", text: "✓ Email Sent!" },
    error:   { bg: "#ef4444", text: "✗ Failed. Try Again" },
  };

  return (
    <section id="contact" style={{ padding: isMobile ? "80px 24px" : "110px 60px", background: "rgba(12,16,32,0.5)" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        <div ref={ref} style={{
          marginBottom: 60, textAlign: "center",
          opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "all 0.7s ease",
        }}>
          <p style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.72rem", letterSpacing: "0.35em", color: "#00e5ff", textTransform: "uppercase", marginBottom: 12 }}>// Contact</p>
          <h2 style={{ fontSize: "clamp(2rem,5vw,3.5rem)", fontWeight: 800, lineHeight: 1.1 }}>
            Let's{" "}
            <span style={{ background: "linear-gradient(135deg,#00e5ff,#ff6b35)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              Connect
            </span>
          </h2>
          <p style={{ marginTop: 16, color: "rgba(240,244,255,0.4)", maxWidth: 440, margin: "16px auto 0" }}>
            Available for freelance work and full-time opportunities. Let's build something great.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 48 : 60 }}>

          {/* Left: Info */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(-28px)", transition: "all 0.7s 0.2s ease" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              fontFamily: "'JetBrains Mono',monospace", fontSize: "0.68rem", color: "#22c55e",
              letterSpacing: "0.18em", border: "1px solid rgba(34,197,94,0.3)",
              padding: "7px 16px", marginBottom: 32, background: "rgba(34,197,94,0.05)",
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", boxShadow: "0 0 6px #22c55e", animation: "pulse 2s infinite" }} />
              Open to Opportunities
            </div>

            <h3 style={{ fontWeight: 800, fontSize: isMobile ? "1.2rem" : "1.45rem", marginBottom: 28 }}>
              Ready to automate <span style={{ color: "#00e5ff" }}>your infrastructure?</span>
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                { icon: "📧", label: "Email",    value: personalInfo.email,    color: "#00e5ff" },
                { icon: "🐙", label: "GitHub",   value: personalInfo.github,   color: "#8b5cf6" },
                { icon: "💼", label: "LinkedIn", value: personalInfo.linkedin, color: "#ff6b35" },
                { icon: "📍", label: "Location", value: personalInfo.location, color: "#00e5ff" },
              ].map((item, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 16, padding: "16px 18px",
                  background: "rgba(255,255,255,0.02)",
                  border: `1px solid ${item.color}15`, borderLeft: `2px solid ${item.color}`,
                  transition: "all 0.3s", cursor: "pointer",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.04)"; e.currentTarget.style.transform = "translateX(6px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.02)"; e.currentTarget.style.transform = "translateX(0)"; }}
                >
                  <span style={{ fontSize: "1.3rem" }}>{item.icon}</span>
                  <div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.62rem", color: "#3d4a6b", letterSpacing: "0.18em", textTransform: "uppercase" }}>{item.label}</div>
                    <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.8rem", color: item.color, marginTop: 3, wordBreak: "break-all" }}>{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? "translateX(0)" : "translateX(28px)", transition: "all 0.7s 0.3s ease" }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 14, marginBottom: 14 }}>
                {[["name", "Name", "Your Name"], ["email", "Email", "your@email.com"]].map(([name, label, ph]) => (
                  <div key={name}>
                    <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: "#3d4a6b", letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 7 }}>{label}</label>
                    <input
                      name={name} value={form[name]} onChange={handleChange}
                      type={name === "email" ? "email" : "text"} placeholder={ph} required
                      style={inputStyle}
                      onFocus={e => e.target.style.borderColor = "#00e5ff"}
                      onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: "0.65rem", color: "#3d4a6b", letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 7 }}>Message</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about your project..." required rows={6}
                  style={{ ...inputStyle, resize: "vertical" }}
                  onFocus={e => e.target.style.borderColor = "#00e5ff"}
                  onBlur={e => e.target.style.borderColor = "rgba(255,255,255,0.08)"}
                />
              </div>

              <button type="submit" disabled={status === "sending"} style={{
                width: "100%", padding: "15px",
                background: btnColors[status].bg, color: "#060811",
                fontFamily: "'JetBrains Mono',monospace", fontSize: "0.83rem", fontWeight: 700,
                letterSpacing: "0.18em", textTransform: "uppercase",
                border: "none", cursor: status === "sending" ? "not-allowed" : "pointer",
                clipPath: "polygon(8px 0%,100% 0%,calc(100% - 8px) 100%,0% 100%)",
                transition: "all 0.3s", opacity: status === "sending" ? 0.8 : 1,
              }}
                onMouseEnter={e => { if (status === "idle") { e.target.style.background = "#ff6b35"; e.target.style.transform = "translateY(-2px)"; } }}
                onMouseLeave={e => { if (status === "idle") { e.target.style.background = "#00e5ff"; e.target.style.transform = "translateY(0)"; } }}
              >
                {status === "sending" ? (
                  <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
                    <span style={{ width: 14, height: 14, border: "2px solid #060811", borderTopColor: "transparent", borderRadius: "50%", display: "inline-block", animation: "spin 0.8s linear infinite" }} />
                    Sending...
                  </span>
                ) : btnColors[status].text}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}