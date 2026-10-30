"use client";

import { Fragment, useEffect, useState } from "react";
import { portfolio } from "./content";

const Arrow = () => <span className="link-arrow" aria-hidden="true">↗</span>;
const allSkills = portfolio.skills.flatMap((group) => group.items);
const skillRows = Array.from({ length: 3 }, (_, rowIndex) =>
  allSkills
    .map((item, skillIndex) => ({ item, skillIndex }))
    .filter((_, skillIndex) => skillIndex % 3 === rowIndex),
);

function SectionHeading({ title }: { title: string }) {
  return (
    <div className="section-heading reveal">
      <h2>{title}</h2>
    </div>
  );
}

function StepFlow({
  label,
  steps,
}: {
  label: string;
  steps: readonly { title: string; detail: string }[];
}) {
  return (
    <div className="flow-grid" role="group" aria-label={label}>
      {steps.map((step, index) => (
        <Fragment key={step.title}>
          <article className="flow-step reveal">
            <h3>{step.title}</h3>
            <p>{step.detail}</p>
          </article>
          {index < steps.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
        </Fragment>
      ))}
    </div>
  );
}

function SkillBubbles() {
  const [openSkill, setOpenSkill] = useState<string | null>(null);
  const [motionPaused, setMotionPaused] = useState(false);

  return (
    <section className={"skill-marquee" + (motionPaused ? " is-paused" : "")} aria-label="Skills and experience">
      <div className="skill-marquee-controls">
        <button
          className="motion-toggle"
          type="button"
          aria-pressed={motionPaused}
          aria-controls="skill-marquee-rows"
          onClick={() => setMotionPaused(!motionPaused)}
        >
          {motionPaused ? "Resume motion" : "Pause motion"}
        </button>
      </div>
      <div className="skill-marquee-rows" id="skill-marquee-rows">
        {skillRows.map((row, rowIndex) => {
          const rowIsExpanded = row.some(({ skillIndex }) => openSkill === `skill-${skillIndex}`);
          return (
            <div
              className={"skill-marquee-row" + (rowIsExpanded ? " is-expanded" : "")}
              role="group"
              aria-label={`Skills row ${rowIndex + 1}`}
              key={rowIndex}
            >
              <div className="skill-track">
                {[false, true].map((isCopy) => (
                  <div className="skill-sequence" aria-hidden={isCopy || undefined} key={String(isCopy)}>
                    {row.map(({ item, skillIndex }) => {
                      const skillId = `skill-${skillIndex}`;
                      const detailId = `${skillId}-${isCopy ? "copy" : "main"}`;
                      const isOpen = openSkill === skillId;
                      return (
                        <button
                          className="skill-bubble"
                          type="button"
                          key={item.name}
                          tabIndex={isCopy ? -1 : undefined}
                          aria-expanded={isOpen}
                          aria-controls={detailId}
                          onClick={() => setOpenSkill(isOpen ? null : skillId)}
                        >
                          <span className="skill-bubble-top">
                            <span>{item.name}</span>
                            <span className="skill-plus" aria-hidden="true">{isOpen ? "−" : "+"}</span>
                          </span>
                          <span className="skill-detail" id={detailId} hidden={!isOpen}>{item.detail}</span>
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("has-scroll-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -5% 0px" },
    );

    document.querySelectorAll(".reveal").forEach((node) => observer.observe(node));
    return () => {
      observer.disconnect();
      root.classList.remove("has-scroll-reveal");
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <main id="main-content">
      <section className="hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-content">
          <p className="hero-role reveal">Builder <i>×</i> strategist <i>×</i> musician</p>
          <h1 className="reveal"><span>Aarav</span><span className="outline">Shah</span></h1>
          <div className="hero-affiliation reveal">
            <p>{portfolio.person.school} · Class of 2029</p>
            <p>{portfolio.person.location}</p>
          </div>
        </div>
        <div className="scroll-cue reveal">
          <span>Scroll to explore</span><span className="scroll-cue-arrow" aria-hidden="true">↓</span>
        </div>
      </section>

      <section className="metrics-strip" aria-label="Highlights">
        {portfolio.metrics.map((metric) => (
          <article className="metric reveal" key={metric.label}>
            <strong>{metric.value}</strong>
            <p>{metric.label}</p>
            <small>{metric.detail}</small>
          </article>
        ))}
      </section>

      <section className="project-section robotics-section" id="robotics">
        <SectionHeading title={portfolio.projects.robotics.title} />
        <div className="project-intro reveal">
          <div>
            <p className="project-meta">{portfolio.projects.robotics.affiliation}</p>
            <p className="project-period">{portfolio.projects.robotics.period}</p>
          </div>
          <p className="project-summary">{portfolio.projects.robotics.summary}</p>
          <div className="tags" aria-label="Robotics skills">
            {portfolio.projects.robotics.tags.map((tag) => <span key={tag}>{tag}</span>)}
          </div>
        </div>

        <div className="robot-specs">
          {portfolio.projects.robotics.specs.map((spec) => (
            <article className="robot-spec reveal" key={spec.label}>
              <span>{spec.label}</span>
              <h3>{spec.value}</h3>
              <p>{spec.detail}</p>
            </article>
          ))}
        </div>

        <StepFlow label="Robotics design and build process" steps={portfolio.projects.robotics.steps} />
      </section>

      <section className="project-section trading-section" id="markets">
        <SectionHeading title={portfolio.projects.trading.title} />
        <div className="trading-layout">
          <aside className="return-card reveal" aria-label="Five-month portfolio result">
            <span>{portfolio.projects.trading.result.label}</span>
            <strong>{portfolio.projects.trading.result.value}</strong>
            <p>{portfolio.projects.trading.result.detail}</p>
            <small>{portfolio.projects.trading.result.notice}</small>
          </aside>
          <div className="trading-copy reveal">
            <p className="project-period">{portfolio.projects.trading.period}</p>
            <p className="project-summary">{portfolio.projects.trading.summary}</p>
            <div className="tags" aria-label="Market research skills">
              {portfolio.projects.trading.tags.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
        </div>
        <StepFlow label="Market research process" steps={portfolio.projects.trading.steps} />
      </section>

      <section className="music-section" id="music">
        <SectionHeading title={portfolio.music.title} />
        <div className="music-layout">
          <div className="music-copy reveal">
            <p className="project-meta">{portfolio.music.instrument} · {portfolio.music.role}</p>
            <p className="project-period">{portfolio.music.period}</p>
            <p>{portfolio.music.summary}</p>
          </div>
        </div>
        <blockquote className="reflection reveal">
          <p>“{portfolio.music.quote.text}”</p>
          <cite>— {portfolio.music.quote.author}</cite>
        </blockquote>
      </section>

      <section className="leadership-section light-section" id="leadership">
        <SectionHeading title="Build the room, not just the result." />
        <div className="lead-grid">
          {portfolio.leadRoles.map((role) => (
            <article className="lead-card reveal" key={role.organization}>
              <p className="project-meta">{role.organization}</p>
              <h3>{role.role}</h3>
              <p className="lead-period">{role.period}</p>
              <p>{role.summary}</p>
              <ul aria-label={role.organization + " skills"}>
                {role.skills.map((skill) => <li key={skill}>{skill}</li>)}
              </ul>
            </article>
          ))}
        </div>

        <section className="awards-section" aria-labelledby="awards-title">
          <h2 id="awards-title" className="reveal">Awards &amp; Recognition</h2>
          <div className="awards-list">
            {portfolio.awards.map((award) => (
              <article className="award reveal" key={award.title + award.detail}>
                <strong>{award.title}</strong>
                <div>
                  <h3>{award.detail}</h3>
                  {award.meta && <p>{award.meta}</p>}
                </div>
              </article>
            ))}
          </div>
        </section>
      </section>

      <section className="skills-section" id="skills">
        <SectionHeading title="Skills &amp; coursework." />
        <SkillBubbles />
      </section>

      <section className="education-section light-section" id="education">
        <SectionHeading title="Education." />
        <div className="education-grid">
          <article className="education-card reveal">
            <span>School</span>
            <h3>{portfolio.education.school}</h3>
            <p>{portfolio.education.dates}</p>
            <p>{portfolio.education.graduation}</p>
          </article>
          <article className="education-card reveal">
            <span>Coursework focus</span>
            <p>{portfolio.education.focus}</p>
          </article>
        </div>
        <p className="spoken-languages reveal">
          Languages: Gujarati (limited working proficiency) · Spanish (elementary proficiency)
        </p>
      </section>

      <section className="contact-section" id="contact">
        <h2 className="reveal">Get in touch.</h2>
        <div className="contact-links reveal">
          <a href={"mailto:" + portfolio.person.email}>{portfolio.person.email}<Arrow /></a>
          <a href={portfolio.person.linkedIn} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
        </div>
      </section>

      <footer className="site-footer" aria-label="Social links">
        <a href={portfolio.person.github} target="_blank" rel="noreferrer">GitHub<Arrow /></a>
        <a href={portfolio.person.linkedIn} target="_blank" rel="noreferrer">LinkedIn<Arrow /></a>
        <a href={"mailto:" + portfolio.person.email}>Email<Arrow /></a>
      </footer>
      </main>
    </>
  );
}
