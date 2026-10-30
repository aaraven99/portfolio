export const portfolio = {
  person: {
    name: "Aarav Shah",
    location: "Frisco, Texas",
    email: "aaraven99@gmail.com",
    linkedIn: "https://www.linkedin.com/in/aarav-shah-tx/",
    github: "https://github.com/aaraven99",
    school: "Panther Creek High School",
    schoolDates: "August 2025 – May 2029",
    graduation: "May 2029",
  },
  metrics: [
    { value: "+120%", label: "portfolio return", detail: "five-month period" },
    { value: "3rd", label: "UIL State finish", detail: "marching band championships" },
    { value: "15–20", label: "hours each week", detail: "rehearsal and performance" },
    { value: "24290", label: "FTC team", detail: "Robo Rulers" },
  ],
  projects: {
    robotics: {
      affiliation: "Robo Rulers · FTC Team 24290",
      period: "Lead Engineer · June 2025 – March 2026",
      title: "Robotics, built through iteration.",
      summary:
        "I led the design of a competition robot, working across its Mecanum drivetrain, scoring mechanisms, custom CAD parts, and Java support.",
      tags: ["CAD modeling", "Java", "Mechanical design", "Additive manufacturing"],
      specs: [
        {
          label: "Drive system",
          value: "Mecanum",
          detail: "Omnidirectional movement across the field",
        },
        {
          label: "Scoring",
          value: "Launcher + intake",
          detail: "Designed for consistent trajectories and accurate scoring",
        },
        {
          label: "Fabrication",
          value: "CAD + 3D print",
          detail: "Custom parts including a delivery ramp",
        },
      ],
      steps: [
        {
          title: "Design",
          detail: "Plan the Mecanum chassis, shooting arm, and intake around competition needs.",
        },
        {
          title: "Model",
          detail: "Use CAD to develop custom components and check how the subsystems fit together.",
        },
        {
          title: "Build",
          detail: "Fabricate the robot and add custom parts, including a 3D-printed delivery ramp.",
        },
        {
          title: "Refine",
          detail:
            "Apply the Engineering Design Process to improve weight and durability; contribute Java for autonomous and tele-op modes.",
        },
      ],
    },
    trading: {
      period: "Independent Trader · January 2025 – Present",
      title: "A Python scanner for swing-trading setups.",
      summary:
        "I built a proprietary Python scanner for patterns including Pennants, Bull Flags, and VWAP deviations. I review its signals against broader market conditions and intraday liquidity.",
      tags: ["Python", "Technical patterns", "Risk management", "Trading journal"],
      result: {
        label: "Five-month period",
        value: "+120%",
        detail: "Portfolio return",
        notice: "Not indicative of future results.",
      },
      steps: [
        {
          title: "Find patterns",
          detail: "Scan for Pennants, Bull Flags, VWAP deviations, momentum shifts, and volume breakouts.",
        },
        {
          title: "Check context",
          detail: "Review signals against macroeconomic trends and intraday liquidity.",
        },
        {
          title: "Plan risk",
          detail: "Use dynamic position sizing and automated stop-loss alerts.",
        },
        {
          title: "Review outcomes",
          detail: "Keep a trading journal and compare signals with actual results to refine the Python logic.",
        },
      ],
    },
  },
  music: {
    title: "Precision you can hear.",
    instrument: "Tuba / Sousaphone",
    role: "Musician · State-qualified soloist",
    period: "May 2025 – Present",
    summary:
      "I spend 15–20 hours a week in rehearsals and performances with the Panther Creek Marching Band. The band earned third place at the UIL State Marching Band Championships, and I qualified for the Texas State Solo & Ensemble Contest as a freshman.",
    quote: {
      text: "I think very definitely it’s the little things that make the big things happen.",
      author: "John Wooden",
    },
  },
  leadRoles: [
    {
      organization: "Youth Finance First",
      role: "Chapter Lead",
      period: "September 2026 – Present",
      summary: "Chapter Lead at Youth Finance First.",
      skills: ["Student leadership", "Accountability", "Leadership"],
    },
    {
      organization: "Young Jains of America",
      role: "Local Representative",
      period: "March 2026 – Present",
      summary:
        "Organize community events and support youth engagement in Jain values and cultural education.",
      skills: ["Public speaking", "Project management", "Community building"],
    },
  ],
  awards: [
    {
      title: "3rd Place",
      detail: "UIL State Marching Band Championships",
      meta: "Panther Creek Marching Band",
    },
    {
      title: "Top 25%",
      detail: "Geometry · Stanford Math Tournament",
      meta: "Top quartile · Geometry",
    },
  ],
  skills: [
    {
      group: "Programming",
      items: [
        {
          name: "Python",
          detail:
            "Built a market scanner to identify swing-trading setups from technical patterns and review its signals against market context.",
        },
        {
          name: "Java",
          detail:
            "Contributed robot movement logic and subsystem execution for autonomous and tele-op modes.",
        },
      ],
    },
    {
      group: "CAD & engineering",
      items: [
        {
          name: "CAD modeling",
          detail:
            "Modeled and iterated custom robot components, including a 3D-printed delivery ramp.",
        },
        {
          name: "Mechanical design",
          detail:
            "Worked on a Mecanum drivetrain, shooting arm, and intake assembly for an FTC competition robot.",
        },
        {
          name: "Additive manufacturing",
          detail:
            "Used 3D-printed components to integrate mechanical subsystems and reduce robot weight.",
        },
        {
          name: "Engineering design",
          detail:
            "Used the Engineering Design Process to prototype and refine mechanical systems for durability and performance.",
        },
      ],
    },
    {
      group: "Markets & analysis",
      items: [
        {
          name: "Pennants & Bull Flags",
          detail: "Technical patterns included in the Python swing-trading scanner.",
        },
        {
          name: "VWAP & volume",
          detail:
            "Looked for VWAP deviations, momentum shifts, and volume breakouts.",
        },
        {
          name: "Signal review",
          detail:
            "Checked algorithmic outputs against macroeconomic trends and intraday liquidity.",
        },
        {
          name: "Risk controls",
          detail:
            "Used dynamic position sizing and automated stop-loss alerts.",
        },
        {
          name: "Trading journal",
          detail:
            "Compared algorithmic signals with actual outcomes to refine the Python logic.",
        },
      ],
    },
    {
      group: "Leadership & music",
      items: [
        {
          name: "Leadership accountability",
          detail:
            "Profile-listed skill reflected in your Chapter Lead and community representative roles.",
        },
        {
          name: "Student leadership",
          detail:
            "Chapter Lead at Youth Finance First and Local Representative for Young Jains of America.",
        },
        {
          name: "Leadership management",
          detail:
            "A top skill listed on your LinkedIn profile, alongside your community leadership experience.",
        },
        {
          name: "Youth Finance First",
          detail: "Chapter Lead · September 2026 to present.",
        },
        {
          name: "Young Jains of America",
          detail:
            "Local Representative · community events, youth engagement, and Jain cultural education.",
        },
        {
          name: "Tuba & sousaphone",
          detail:
            "Panther Creek Marching Band musician and Texas State Solo & Ensemble qualifier.",
        },
        {
          name: "Marching band",
          detail:
            "15–20 hours each week in rehearsals and performances; UIL State third-place finish.",
        },
      ],
    },
    {
      group: "Education & languages",
      items: [
        {
          name: "Academic focus",
          detail:
            "AP-heavy curriculum focused on advanced mathematics and computational logic.",
        },
        {
          name: "Gujarati",
          detail: "Limited working proficiency.",
        },
        {
          name: "Spanish",
          detail: "Elementary proficiency.",
        },
      ],
    },
  ],
  education: {
    school: "Panther Creek High School",
    dates: "August 2025 – May 2029",
    graduation: "Expected May 2029",
    focus:
      "AP-heavy coursework focused on advanced mathematics and computational logic.",
  },
} as const;
