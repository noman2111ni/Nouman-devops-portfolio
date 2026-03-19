export const personalInfo = {
  name: "Nouman",
  fullName: "Nouman Shabeer",
  role: "DevOps Engineer",
  tagline: "Building bridges between Development & Operations",
  email: "nomanshabeer52@gmail.com",
  github: "https://github.com/noman2111ni",
  linkedin: "www.linkedin.com/in/nomanshabeer",
  location: "Pakistan 🇵🇰",
  available: true,
  bio: "Passionate DevOps Engineer with 3 months of experience automating infra building CI/CD pipelines, and scaling cloud-native applications. I bridge the gap between development and operations to deliver reliable, secure, and fast software.",
  typewriterTexts: [
    "DevOps Engineer",
    "Cloud Architect",
    "CI/CD GitHub Action Developer",
    "Infrastructure Automator",
  ],
};

export const stats = [
  { number: 3, label: "Months Experience", suffix: "+", color: "#00e5ff" },
  { number: 3, label: "Projects Done", suffix: "+", color: "#ff6b35" },
  { number: 3, label: "CI/CD Pipelines", suffix: "+", color: "#00e5ff" },
];

export const skills = [
  {
    category: "Containerization",
    icon: "🐳",
    color: "#00e5ff",
    items: [
      { name: "Docker", level: 95 },
      { name: "Linux Containers", level: 90 },
      { name :"Terraform", level: 85 },
      {name : "Amazon ECS" , level: 80}

    ],
  },
  {
    category: "Cloud Platforms",
    icon: "☁️",
    color: "#ff6b35",
    items: [
      { name: "AWS", level: 88 },
      { name: "Azure", level: 80 },
    ],
  },
  {
    category: "IaC & Automation",
    icon: "⚙️",
    color: "#8b5cf6",
    items: [
      { name: "Terraform", level: 90 },
      { name: "Ansible", level: 87 },
      { name: "CloudFormation", level: 75 },
    ],
  },
  {
    category: "CI/CD",
    icon: "🔄",
    color: "#00e5ff",
    items: [
      { name: "GitHub Actions", level: 95 },
      { name: "Jenkins", level: 88 },

    ],
  },
  {
    category: "Monitoring",
    icon: "📊",
    color: "#ff6b35",
    items: [
      { name: "Prometheus", level: 85 },
      { name: "Datadog", level: 78 },
    ],
  },
  {
    category: "Scripting",
    icon: "💻",
    color: "#8b5cf6",
    items: [
      { name: "Bash/Shell", level: 92 },

      { name: "YAML/JSON", level: 95 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "GitHub  CI/CD Pipeline",
    desc: "End-to-end GitOps pipeline using GitHub Actions and ArgoCD with blue-green deployments, automated testing gates, and Slack notifications.",
    tags: ["GitHub Actions","Slack"],
    color: "#ff6b35",
    icon: "🔄",
    github: "#",
    live: "#",
    highlight: false,
  },
  {
    id: 3,
    title: "Multi-Cloud IaC Framework",
    desc: "Reusable Terraform module library for AWS, Azure and GCP infrastructure provisioning. Reduced infra setup time from days to 20 minutes.",
    tags: ["Terraform", "AWS", "Azure",],
    color: "#8b5cf6",
    icon: "☁️",
    github: "#",
    live: "#",
    highlight: false,
  },
 
  {
    id: 6,
    title: "Security Hardening Suite",
    desc: "Automated security scanning pipeline with Trivy, SonarQube, and OPA policies enforced at the GitOps layer.",
    tags: ["Trivy", "SonarQube", "OPA", "GitHub Actions"],
    color: "#8b5cf6",
    icon: "🔒",
    github: "#",
    live: "#",
    highlight: false,
  },
];

export const experience = [
  {
    year: "2026 – Present",
    role: "Junior DevOps Engineer",
    company: "TechCorp Ltd.",
    type: "Full-time",
    color: "#00e5ff",
    points: [
      "Led cloud migration of 10+ microservices to AWS EKS",
      "Reduced deployment time by 80% with GitHub Actions pipelines",
    ],
  },
  {
    year: "2026 – 2026",
    role: "DevOps Engineer",
    company: "DataSystems Inc.",
    type: "Full-time",
    color: "#ff6b35",
    points: [
      "Built Jenkins & GitHub Actions CI/CD pipelines",
      "Containerized 5+ legacy apps using Docker",
      "Automated infra provisioning with Terraform + Ansible",
    ],
  },

];

export const certifications = [
  { name: "AWS Solutions Architect", org: "Amazon Web Services", year: "2023", color: "#ff6b35", icon: "☁️" },
  { name: "HashiCorp Terraform", org: "HashiCorp", year: "2022", color: "#8b5cf6", icon: "🏗️" },
];
