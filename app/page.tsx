"use client";

import { useEffect, useMemo, useState } from "react";
import { portfolio, type ChapterId } from "./content";

const Arrow = () => <span aria-hidden="true">↗</span>;

function ChapterHeader({ number, label, title }: { number: string; label: string; title: string }) {
  return (
    <div className="chapter-heading reveal">
      <p className="chapter-kicker"><span>{number}</span> / {label}</p>
      <h2>{title}</h2>
    </div>
  );
}

function SystemVisual() {
  return (
    <div className="system-visual" aria-label="Abstract visualization connecting code, markets, mechanics, music, and leadership" role="img">
      <div className="orbit orbit-a"><span>CODE</span></div>
      <div className="orbit orbit-b"><span>CAPITAL</span></div>
      <div className="orbit orbit-c"><span>MOTION</span></div>
      <div className="core"><b>AS</b><small>FRISCO / TX</small></div>
      <i className="spark spark-1" /><i className="spark spark-2" /><i className="spark spark-3" />
    </div>
  );
}

function DataTrace() {
  return (
    <div className="data-trace" aria-hidden="true">
      <div className="trace-bars">{Array.from({ length: 32 }, (_, i) => <i key={i} style={{ height: `${18 + ((i * 17) % 66)}%` }} />)}</div>
      <div className="trace-line"><span /><span /><span /><span /><span /><span /></div>
      <div className="trace-labels"><span>SCAN / 04:12</span><span>HUMAN VALIDATION: ON</span></div>
    </div>
  );
}

function RobotBlueprint() {
  return (
    <div className="robot-blueprint" aria-label="Abstract mecanum robot blueprint" role="img">
      <div className="bot-body"><div className="launcher" /><div className="bot-core">31053</div></div>
      <i className="wheel w1" /><i className="wheel w2" /><i className="wheel w3" /><i className="wheel w4" />
      <span className="dimension dx">360° MOTION</span><span className="dimension dy">ITERATE / REDUCE / REFINE</span>
    </div>
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [active, setActive] = useState<ChapterId>("intro");
  const [progress, setProgress] = useState(0);
  const [mode, setMode] = useState<"system" | "human">("system");
  const [cursor, setCursor] = useState({ x: -80, y: -80, active: false });
  const [menuOpen, setMenuOpen] = useState(false);

  const chapterIds = useMemo(() => portfolio.chapters.map((chapter) => chapter.id), []);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 1150);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let current: ChapterId = "intro";
      chapterIds.forEach((id) => {
        const node = document.getElementById(id);
        if (node && node.getBoundingClientRect().top <= window.innerHeight * 0.42) current = id;
      });
      setActive(current);
    };
    const onPointer = (event: PointerEvent) => setCursor({ x: event.clientX, y: event.clientY, active: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    onScroll();
    return () => { window.clearTimeout(timer); observer.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("pointermove", onPointer); };
  }, [chapterIds]);

  const goTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <div className={`loader ${loaded ? "loader-done" : ""}`} aria-hidden={loaded}>
        <div className="loader-mark">AS</div><p>Calibrating the system.</p><div className="loader-track"><i /></div>
      </div>
      <div className="cursor" style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0) scale(${cursor.active ? 1 : 0})` }} aria-hidden="true" />
      <div className="progress" aria-hidden="true"><i style={{ transform: `scaleX(${progress})` }} /></div>

      <header className="site-header">
        <button className="brand" onClick={() => goTo("intro")} aria-label="Back to intro"><span>AS</span><small>Systems in Motion</small></button>
        <div className="header-meta"><span>FRISCO, TX</span><span className="status"><i /> OPEN TO EXPLORING</span></div>
        <button className="menu-button" aria-expanded={menuOpen} aria-controls="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "CLOSE" : "CHAPTERS"}</button>
      </header>

      <nav id="mobile-menu" className={`mobile-menu ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
        {portfolio.chapters.map((chapter) => <button key={chapter.id} onClick={() => goTo(chapter.id)}><span>{chapter.number}</span>{chapter.label}</button>)}
      </nav>

      <aside className="chapter-nav" aria-label="Chapter navigation">
        {portfolio.chapters.map((chapter) => (
          <button key={chapter.id} onClick={() => goTo(chapter.id)} className={active === chapter.id ? "active" : ""} aria-label={`${chapter.number} ${chapter.label}`}>
            <span>{chapter.number}</span><b>{chapter.label}</b>
          </button>
        ))}
      </aside>

      <main>
        <section id="intro" className="chapter hero">
          <div className="hero-grid" aria-hidden="true" />
          <div className="hero-topline"><span>01 / INTRO</span><span>PANTHER CREEK · 2029</span></div>
          <div className="hero-title">
            <p>Builder <i>×</i> strategist <i>×</i> musician</p>
            <h1><span>AARAV</span><span className="outline">SHAH</span></h1>
          </div>
          <div className="hero-bottom">
            <p>{portfolio.statement}</p>
            <button className="round-link" onClick={() => goTo("build")} aria-label="Begin the story">BEGIN <span>↓</span></button>
          </div>
          <SystemVisual />
        </section>

        <section className="manifesto light-section">
          <p className="micro reveal">THE OPERATING PRINCIPLE</p>
          <h2 className="reveal">I work across <em>code, capital, machines, music,</em> and <em>community.</em> Each rewards the same thing: disciplined improvement.</h2>
          <div className="mode-switch reveal" role="group" aria-label="Identity lens">
            <button className={mode === "system" ? "selected" : ""} onClick={() => setMode("system")}>ON THE SYSTEM</button>
            <button className={mode === "human" ? "selected" : ""} onClick={() => setMode("human")}>OFF THE SYSTEM</button>
          </div>
          <div className={`mode-panel ${mode}`}>
            <span>{mode === "system" ? "ANALYZE / DESIGN / TEST / REFINE" : "LISTEN / PERFORM / SERVE / LEAD"}</span>
            <p>{mode === "system" ? "Turning ambiguity into measurable, improvable loops." : "Building the judgment, timing, and trust that no model can replace."}</p>
          </div>
        </section>

        <section className="metrics-strip" aria-label="Key metrics">
          {portfolio.metrics.map((metric) => <article key={metric.value + metric.label} className="metric reveal"><strong>{metric.value}</strong><p>{metric.label}</p><small>{metric.detail}</small></article>)}
        </section>

        <section id="build" className="chapter project-section build-section">
          <ChapterHeader number="02" label="BUILD" title="Make motion measurable." />
          <div className="case-layout">
            <div className="case-copy reveal"><p className="eyebrow">{portfolio.projects.robotics.eyebrow}</p><h3>{portfolio.projects.robotics.title}</h3><p className="lede">{portfolio.projects.robotics.summary}</p><div className="tags">{portfolio.projects.robotics.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
            <RobotBlueprint />
          </div>
          <div className="phase-grid">{portfolio.projects.robotics.phases.map((phase, index) => <article className="phase reveal" key={phase.label}><span>0{index + 1}</span><h4>{phase.label}</h4><p>{phase.text}</p></article>)}</div>
        </section>

        <section id="trade" className="chapter project-section trade-section">
          <ChapterHeader number="03" label="TRADE" title="Thousands scanned. One decision at a time." />
          <div className="trade-grid">
            <div className="return-card reveal"><span>FIVE-MONTH PERIOD</span><strong>+120%</strong><p>Portfolio return</p><small>Past performance. Personal research project. Not financial advice and not indicative of future results.</small></div>
            <div className="case-copy reveal"><p className="eyebrow">{portfolio.projects.trading.eyebrow}</p><h3>{portfolio.projects.trading.title}</h3><p className="lede">{portfolio.projects.trading.summary}</p><div className="tags">{portfolio.projects.trading.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
          </div>
          <DataTrace />
          <div className="phase-grid dark">{portfolio.projects.trading.phases.map((phase, index) => <article className="phase reveal" key={phase.label}><span>0{index + 1}</span><h4>{phase.label}</h4><p>{phase.text}</p></article>)}</div>
        </section>

        <section id="perform" className="chapter perform-section">
          <ChapterHeader number="04" label="PERFORM" title="Precision you can hear." />
          <div className="performance-stage">
            <div className="sound-wave" aria-hidden="true">{Array.from({ length: 44 }, (_, i) => <i key={i} style={{ height: `${10 + ((i * 29) % 88)}%` }} />)}</div>
            <div className="performance-copy reveal"><p className="eyebrow">TUBA / SOUSAPHONE · STATE-QUALIFIED SOLOIST</p><h3>Consistency under pressure.</h3><p>At Panther Creek, I commit 15–20 hours each week to rehearsals and performances. The work helped the marching band finish third at the UIL State Championships—and helped me qualify for the Texas State Solo & Ensemble Contest as a freshman.</p></div>
          </div>
          <blockquote className="reflection reveal"><span>REFLECTION / 01</span>“A system becomes a performance only when every person can trust the timing.”</blockquote>
        </section>

        <section id="lead" className="chapter lead-section light-section">
          <ChapterHeader number="05" label="LEAD" title="Build the room, not just the result." />
          <div className="lead-grid">
            <article className="lead-card reveal"><span>YOUNG JAINS OF AMERICA</span><h3>Local Representative</h3><p>Organizing community events, supporting youth engagement, and advancing Jain cultural education.</p><ul><li>Public speaking</li><li>Project management</li><li>Community building</li></ul></article>
            <div className="lead-quote reveal"><p>Leadership is another feedback loop:</p><strong>Listen → align → act → learn.</strong></div>
          </div>
          <div className="awards reveal">
            <p className="micro">HONORS / SIGNALS OF PROGRESS</p>
            {portfolio.awards.map((award) => (
              <article key={award.title + award.detail}>
                <strong>{award.title}</strong>
                <div className="award-copy">
                  <span>{award.detail}</span>
                  {award.meta && <small>{award.meta}</small>}
                  {award.description && <p>{award.description}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="skills-section">
          <div className="skills-heading reveal"><p className="micro">CONNECTED CAPABILITIES</p><h2>One operating system.<br />Multiple outputs.</h2></div>
          <div className="skill-list">{portfolio.skills.map((skill, index) => <article className="skill reveal" key={skill.name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{skill.name}</h3><p>{skill.domain}</p><div className="skill-meter"><i style={{ width: `${skill.level}%` }} /></div></article>)}</div>
        </section>

        <section className="timeline-section light-section">
          <p className="micro reveal">DEVELOPMENT LOG</p><div className="timeline">{portfolio.timeline.map((item) => <article className="reveal" key={item.year}><span>{item.year}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}</div>
        </section>

        <section id="future" className="chapter future-section">
          <ChapterHeader number="06" label="FUTURE" title="The next system is already moving." />
          <div className="future-layout">
            <div className="explore-wheel" aria-hidden="true"><div>?</div>{portfolio.explorations.map((item, index) => <span key={item} style={{ transform: `rotate(${index * 72}deg) translateY(-10rem) rotate(${-index * 72}deg)` }}>{String(index + 1).padStart(2, "0")}</span>)}</div>
            <div className="explore-list">{portfolio.explorations.map((item, index) => <article className="reveal" key={item}><span>0{index + 1}</span><h3>{item}</h3><Arrow /></article>)}</div>
          </div>
          <div className="education-grid reveal"><div><span>EDUCATION</span><h3>{portfolio.person.school}</h3><p>2025–2029 · Expected graduation {portfolio.person.graduation}</p></div><div><span>COURSEWORK</span><p>{portfolio.coursework.join(" · ")}</p></div><div><span>LANGUAGES</span><p>{portfolio.languages.join(" · ")}</p></div></div>
        </section>

        <section className="insights-section light-section">
          <p className="micro reveal">FIELD NOTES / INSIGHTS</p><div className="insights-grid"><article className="reveal"><span>01 / ENGINEERING</span><h3>Iteration is a form of honesty.</h3><p>The prototype tells you where the idea is weak. The next version is the response.</p></article><article className="reveal"><span>02 / MARKETS</span><h3>Speed needs a governor.</h3><p>Automation creates range. Judgment and risk controls decide what deserves action.</p></article><article className="reveal"><span>03 / PERFORMANCE</span><h3>Consistency compounds.</h3><p>Repetition becomes confidence; confidence becomes capacity under pressure.</p></article></div>
        </section>

        <section id="contact" className="contact-section">
          <p className="micro reveal">START A CONVERSATION</p><h2 className="reveal">Let’s improve<br /><em>the system.</em></h2>
          <div className="contact-links reveal"><a href={`mailto:${portfolio.person.email}`}>{portfolio.person.email}<Arrow /></a><a href={portfolio.person.linkedIn} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a></div>
        </section>
      </main>

      <footer><div className="footer-mark">AS<span>+</span></div><p>Always improving the system.</p><span>© {new Date().getFullYear()} · FRISCO, TEXAS</span></footer>
    </>
  );
}
