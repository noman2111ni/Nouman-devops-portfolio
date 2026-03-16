# 🚀 Nouman DevOps Engineer Portfolio

A fully professional, transitional React.js portfolio for a DevOps Engineer.

## 📁 Folder Structure

```
nouman-portfolio/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.jsx        # Fixed nav with scroll progress bar
│   │   ├── Hero.jsx          # Typewriter, mouse glow, particles
│   │   ├── About.jsx         # Bio, stats counter, certifications
│   │   ├── Skills.jsx        # Animated skill bars by category
│   │   ├── Projects.jsx      # Project cards with hover effects
│   │   ├── Experience.jsx    # Timeline layout
│   │   ├── Contact.jsx       # Contact form + info
│   │   └── Footer.jsx        # Simple footer
│   ├── data/
│   │   └── portfolioData.js  # All content in one place
│   ├── hooks/
│   │   └── useAnimations.js  # Custom hooks (visible, counter, typewriter, mouse)
│   ├── styles/
│   │   └── globals.css       # Global styles + animations
│   ├── App.jsx               # Root component
│   └── index.js              # Entry point
├── package.json
└── README.md
```

## ✨ Features

- 🎯 **Typewriter animation** in Hero section
- 🖱️ **Custom cursor** with trail effect
- 🌟 **Mouse-following glow** effect
- 📊 **Animated skill bars** on scroll
- 🔢 **Counter animation** for stats
- 📜 **Scroll-triggered** reveal animations
- ⏱️ **Timeline** for work experience
- 📬 **Contact form** with submit feedback
- 📈 **Scroll progress bar** at top
- 🎨 **Fully dark theme** — Cyan + Orange + Purple

## 🛠️ Setup & Run

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## ✏️ Customization

Edit `src/data/portfolioData.js` to update:
- Your name, bio, email, social links
- Skills and proficiency levels
- Projects list
- Work experience
- Certifications

## 🎨 Colors

| Variable   | Value     | Usage              |
|------------|-----------|--------------------|
| `--cyan`   | `#00e5ff` | Primary accent     |
| `--orange` | `#ff6b35` | Secondary accent   |
| `--purple` | `#8b5cf6` | Tertiary accent    |
| `--bg`     | `#060811` | Background         |
