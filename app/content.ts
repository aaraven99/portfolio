export const portfolio = {
  person: {
    name: "Aarav Shah",
    location: "Frisco, Texas",
    email: "aaraven99@gmail.com",
    linkedIn: "https://linkedin.com/in/aarav-shah-eng",
    school: "Panther Creek High School",
    graduation: "May 2029",
    identity: ["Builder", "Strategist", "Musician", "Student", "Systems thinker"],
  },
  statement: "Different systems. One mindset: disciplined improvement.",
  chapters: [
    { number: "01", id: "intro", label: "Intro" },
    { number: "02", id: "build", label: "Build" },
    { number: "03", id: "trade", label: "Trade" },
    { number: "04", id: "perform", label: "Perform" },
    { number: "05", id: "lead", label: "Lead" },
    { number: "06", id: "future", label: "Future" },
  ],
  metrics: [
    { value: "120%", label: "portfolio return", detail: "five-month period · past performance" },
    { value: "3rd", label: "UIL State finish", detail: "marching band championships" },
    { value: "15–20", label: "hours / week", detail: "rehearsal and performance" },
    { value: "31053", label: "FTC team", detail: "FTX Combobulators" },
    { value: "360°", label: "movement", detail: "mecanum-wheel chassis" },
  ],
  projects: {
    robotics: {
      eyebrow: "Lead Engineer · FTC Robotics",
      title: "Motion, engineered.",
      summary: "A high-speed mecanum chassis and a precise projectile system, built through CAD-led iteration.",
      phases: [
        { label: "Problem", text: "Create fast, omnidirectional movement while keeping launch accuracy and total weight under control." },
        { label: "Approach", text: "Architect a mecanum-wheel chassis, model custom parts in CAD, and fabricate iterations with additive manufacturing." },
        { label: "Iteration", text: "Reduce mass, tighten the projectile mechanism, and contribute Java for autonomous and tele-op modes." },
        { label: "Result", text: "A lighter robot with 360-degree movement and a high-accuracy launching system for FTC Team 31053." },
      ],
      tags: ["CAD", "Java", "Mechanical design", "Additive manufacturing"],
    },
    trading: {
      eyebrow: "Independent Research · Quantitative Systems",
      title: "Signal. Validate. Control risk.",
      summary: "A proprietary Python scanner built to find price and volume structures across thousands of equities.",
      phases: [
        { label: "Signals", text: "Pennants, bull flags, VWAP, momentum shifts, and volume breakouts." },
        { label: "Scale", text: "Automated the scan of thousands of equities to surface a focused set of candidates." },
        { label: "Judgment", text: "Used a human-in-the-loop model to validate algorithmic signals before execution." },
        { label: "Risk", text: "Maintained dynamic position sizing, risk protocols, and automated stop-losses." },
      ],
      tags: ["Python", "Quantitative analysis", "Risk management", "Portfolio systems"],
    },
  },
  skills: [
    { name: "Python", domain: "Code", level: 88 },
    { name: "Java", domain: "Code", level: 72 },
    { name: "CAD", domain: "Machines", level: 82 },
    { name: "Quantitative analysis", domain: "Capital", level: 84 },
    { name: "Mechanical design", domain: "Machines", level: 80 },
    { name: "Portfolio management", domain: "Capital", level: 77 },
    { name: "Music performance", domain: "Performance", level: 90 },
    { name: "Leadership", domain: "Community", level: 81 },
  ],
  timeline: [
    { year: "2025", title: "Entered Panther Creek", text: "Began a four-year high school chapter shaped by advanced coursework, performance, and engineering." },
    { year: "Freshman", title: "Qualified at state level", text: "Earned a place at the Texas State Solo & Ensemble Contest while developing consistency under pressure." },
    { year: "Now", title: "Building across systems", text: "Connecting code, markets, robotics, music, and community through deliberate practice." },
    { year: "2029", title: "Next launch point", text: "Expected graduation: May 2029." },
  ],
  awards: [
    { title: "3rd Place", detail: "UIL State Marching Band Championships" },
    { title: "Top 25%", detail: "Geometry · Stanford Math Tournament" },
  ],
  coursework: ["AP Precalculus", "AP Human Geography"],
  languages: ["Gujarati · limited working proficiency", "Spanish · elementary proficiency"],
  explorations: ["Robotics", "Quantitative systems", "Software", "Finance", "Creative technology"],
} as const;

export type ChapterId = (typeof portfolio.chapters)[number]["id"];
