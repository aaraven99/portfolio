import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from 'framer-motion'
import Lenis from 'lenis'
import { ArrowDownRight, ArrowUpRight, Cpu, Crosshair, Disc3, Github, Linkedin, Mail, MoveRight, Orbit, Plus, Radio, Sparkles, X } from 'lucide-react'
const CoreScene = lazy(() => import('./CoreScene'))
const FeatureScene = lazy(async () => ({ default: (await import('./CoreScene')).FeatureScene }))

const chars = (text: string) => text.split('').map((char, i) => <motion.span key={`${char}-${i}`} aria-hidden="true" initial={{ y: '115%' }} animate={{ y: 0 }} transition={{ delay: .18 + i * .024, duration: .8, ease: [.16, 1, .3, 1] }}>{char === ' ' ? '\u00a0' : char}</motion.span>)

function MagneticButton({ children, className = '', href = '#projects' }: { children: React.ReactNode, className?: string, href?: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const onMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current; const r = el?.getBoundingClientRect(); if (!r || !el) return
    el.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.14}px, ${(e.clientY-r.top-r.height/2)*.14}px)`
  }
  return <a ref={ref} href={href} onMouseMove={onMove} onMouseLeave={() => { if (ref.current) ref.current.style.transform = '' }} className={`magnetic ${className}`}>{children}</a>
}

function Eyebrow({ children }: { children: React.ReactNode }) { return <div className="eyebrow"><i /> {children}</div> }

function TiltCard({ index, title, category, detail, accents }: { index: string, title: string, category: string, detail: string, accents: string[] }) {
  const ref = useRef<HTMLElement>(null)
  const move = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current; if (!el) return; const r = el.getBoundingClientRect()
    const x = (e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height
    el.style.setProperty('--rx', `${(0.5-y)*9}deg`); el.style.setProperty('--ry', `${(x-.5)*11}deg`); el.style.setProperty('--px', `${x*100}%`); el.style.setProperty('--py', `${y*100}%`)
  }
  return <article ref={ref} className="project-card" onMouseMove={move} onMouseLeave={() => { ref.current?.style.setProperty('--rx','0deg'); ref.current?.style.setProperty('--ry','0deg') }}>
    <div className="project-shine" /><div className={`project-visual visual-${index}`}>
      <div className="visual-label">SYS_{index} / {category.toUpperCase()}</div>
      {index === '01' && <><div className="chart"><span /><span /><span /><span /><span /><span /><span /></div><div className="ticker">+120.00% <b>↑</b></div></>}
      {index === '02' && <><div className="robot-wire"><span/><span/><span/><span/></div><div className="robot-wheel one"/><div className="robot-wheel two"/></>}
      {index === '03' && <><div className="formula">f(x) = Σ α<sub>i</sub> φ<sub>i</sub>(x)</div><div className="mesh-grid" /></>}
    </div>
    <div className="project-bottom"><span className="project-num">{index}</span><div><p>{category}</p><h3>{title}</h3><span>{detail}</span></div><ArrowUpRight /></div>
  </article>
}

function Stat({ value, label }: { value:string, label:string }) { return <div className="stat"><strong>{value}</strong><span>{label}</span><i /></div> }

function ProductMoment({ type, index, eyebrow, title, copy, detail }: { type: 'wheel' | 'tuba', index: string, eyebrow: string, title: React.ReactNode, copy: string, detail: string }) {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const [progress, setProgress] = useState(0)
  const sketchfabUrl = type === 'tuba'
    ? 'https://sketchfab.com/models/023787d702b7438cbf076884661b4cb8/embed?autospin=1&autostart=1&camera=0&transparent=1'
    : 'https://sketchfab.com/models/11f4092f46984ffdb53511493041b48a/embed?autospin=1&autostart=1&camera=0&transparent=1'
  const copyY = useTransform(scrollYProgress, [0, .5, 1], [70, 0, -70])
  const opacity = useTransform(scrollYProgress, [0, .18, .82, 1], [0, 1, 1, 0])
  useMotionValueEvent(scrollYProgress, 'change', setProgress)
  return <section ref={ref} className={`product-moment product-${type}`}>
    <div className="product-pin"><motion.div style={{ y: copyY, opacity }} className="product-copy"><Eyebrow>{eyebrow}</Eyebrow><span className="product-index">{index}</span><h2>{title}</h2><p>{copy}</p><small>{detail}</small></motion.div><div className="product-object"><div className="object-microcopy">SCROLL TO EXPLORE <span>↓</span></div><iframe className="sketchfab-model" title={type === 'tuba' ? 'Interactive 3D tuba' : 'Interactive 3D mecanum wheel'} allowFullScreen allow="autoplay; fullscreen; xr-spatial-tracking" src={sketchfabUrl}/><div className="object-axis axis-x"/><div className="object-axis axis-y"/></div></div>
  </section>
}

function App() {
  const [secret, setSecret] = useState(false)
  const { scrollYProgress } = useScroll()
  const navScale = useSpring(useTransform(scrollYProgress, [0,.08],[1, .86]), { stiffness: 170, damping: 24 })
  useEffect(() => { const lenis = new Lenis({ lerp: .085, smoothWheel: true }); let id = 0; const loop = (t:number) => { lenis.raf(t); id=requestAnimationFrame(loop) }; id=requestAnimationFrame(loop); return () => { cancelAnimationFrame(id); lenis.destroy() } }, [])
  return <main className={secret ? 'secret-mode' : ''}>
    <div className="ambient-grid" /><div className="noise" />
    <motion.nav style={{ scale: navScale }} className="topbar"><a href="#top" className="monogram">A<span>_</span>S</a><div className="nav-center"><a href="#story">Story</a><a href="#projects">Systems</a><a href="#contact">Contact</a></div><button onClick={() => setSecret(!secret)} className="system-status"><span /> {secret ? 'ENGINEERING MODE' : 'SYSTEMS ONLINE'}</button></motion.nav>

    <section id="top" className="hero">
      <div className="hero-copy"><Eyebrow>Personal operating system / 01—29</Eyebrow><h1><span className="clip">{chars('BUILDING')}</span><span className="clip outline">{chars('SYSTEMS')}</span><span className="clip">{chars('THAT PERFORM')}</span></h1><p>I design robots, build trading systems, and pursue excellence through engineering, mathematics, and disciplined execution.</p><div className="hero-actions"><MagneticButton>View systems <ArrowDownRight /></MagneticButton><MagneticButton className="secondary" href="#contact">Contact <MoveRight /></MagneticButton></div></div>
      <div className="core-wrap"><div className="core-tag tag-one"><Crosshair /> <span>ORBITAL<br/>MECHANICS</span></div><div className="core-tag tag-two"><Radio /> <span>LIVE<br/>SIGNAL</span></div><Suspense fallback={<div className="core-loader">INITIALIZING CORE</div>}><CoreScene /></Suspense><div className="core-caption"><span>THE CORE</span><i/> <small>INTERCONNECTED<br/>SYSTEMS</small></div></div>
      <div className="hero-footer"><span>FRISCO, TEXAS <b>·</b> PANTHER CREEK HS</span><span>CLASS OF 2029 <b>↘</b></span></div>
    </section>

    <section id="story" className="origin section-pad"><div className="section-head"><Eyebrow>Origin sequence / 001</Eyebrow><h2>WHY IT<br/><em>STARTED.</em></h2><p>One curiosity. A thousand connected systems.</p></div><div className="origin-stage">
      <div className="origin-machine"><div className="car-silhouette"><span/><span/><span/></div><div className="orbit-line a"/><div className="orbit-line b"/><div className="blueprint-note note-a">01 / OBSERVE</div><div className="blueprint-note note-b">02 / DECONSTRUCT</div></div>
      <div className="story-copy"><article><b>01</b><h3>It began with cars.</h3><p>Countless hours observing how they looked, moved, and functioned. Every detail asked a question.</p></article><article><b>02</b><h3>A door into robotics.</h3><p>A friend invited Aarav to one of his FIRST LEGO League team meetings. Engineering suddenly became something to create.</p></article><article><b>03</b><h3>Systems connect.</h3><p>FLL led to FTC. FTC led to CAD. CAD led to engineering and programming. Quantitative trading remains a side quest.</p></article></div>
    </div></section>

    <section className="mission section-pad"><div className="mission-lights"/><Eyebrow>Mission parameters / 02</Eyebrow><h2>DISCIPLINE<br/>IS A <em>FORCE.</em></h2><p className="mission-text">I am a student engineer passionate about building systems that create measurable results. Whether designing competition robots, developing quantitative trading algorithms, or performing at the highest levels of music competition, I solve difficult problems through continuous improvement.</p><div className="stats"><Stat value="120%" label="Portfolio return / 6 months"/><Stat value="3RD" label="UIL state finish"/><Stat value="FTC" label="Former lead engineer"/><Stat value="15–20" label="Hours / week practice"/></div></section>

    <section className="journey section-pad"><div className="section-head"><Eyebrow>Experience log / 03</Eyebrow><h2>ENGINEERING<br/><em>JOURNEY.</em></h2></div><div className="timeline">{[
      ['NOW','Independent Quantitative Trader','Proprietary Python strategy · automated signal generation · human-in-the-loop execution · 120% return over 6 months'],
      ['FTC','Former FTC Robotics Lead Engineer','Mecanum drivetrain · CAD design · additive manufacturing · Java development'],
      ['BAND','Panther Creek Marching Band','State Championship podium finish · State Solo Qualification · elite performance discipline'],
      ['YJA','Young Jains of America','Leadership · event organization · public speaking']
    ].map(([date,title,desc],i)=><motion.article initial={{opacity:0,x:i%2?35:-35}} whileInView={{opacity:1,x:0}} viewport={{once:true,amount:.4}} transition={{duration:.65}} key={title}><span className="time-node"/><time>{date}</time><div><h3>{title}</h3><p>{desc}</p></div><ArrowUpRight /></motion.article>)}</div></section>

    <ProductMoment type="wheel" index="04 / FTC" eyebrow="Robotics system / drive architecture" title={<>MOTION<br/>WITH <em>INTENT.</em></>} copy="A mecanum drivetrain turns engineering into mobility: four wheels, angled rollers, and control logic that let a robot translate in any direction." detail="MECANUM DRIVE · CAD · ADDITIVE MANUFACTURING · JAVA"/>

    <section id="projects" className="projects section-pad"><div className="project-intro"><Eyebrow>Build index / 05</Eyebrow><h2>SYSTEMS<br/><em>BUILT.</em></h2><p>Each build is an experiment in precision, iteration, and performance.</p></div><div className="project-stack"><TiltCard index="01" title="Algorithmic Trading System" category="Finance Engineering" detail="Signal generation · momentum detection · risk management" accents={[]}/><TiltCard index="02" title="FTC Competition Robot" category="Robotics" detail="Mecanum drive · CAD architecture · manufacturing" accents={[]}/><TiltCard index="03" title="Engineering & Research" category="STEM" detail="Mathematics · optimization · systems thinking" accents={[]}/></div></section>

    <section className="arsenal section-pad"><Eyebrow>Capability matrix / 05</Eyebrow><h2>TECHNICAL<br/><em>ARSENAL.</em></h2><div className="skill-grid">{['CAD','MECHANICAL DESIGN','ROBOTICS','PROTOTYPING','PYTHON','JAVA','QUANT ANALYSIS','RISK MANAGEMENT','PUBLIC SPEAKING','TEAM MANAGEMENT','EVENT ORGANIZATION','OPTIMIZATION'].map((skill,i)=><div className="skill" key={skill}><span>0{i+1}</span><b>{skill}</b><Plus /></div>)}</div></section>

    <ProductMoment type="tuba" index="06 / PERFORMANCE" eyebrow="Performance system / brass resonance" title={<>PRECISION<br/>HAS A <em>RHYTHM.</em></>} copy="Performance is a different form of systems thinking: breath, timing, tone, and hundreds of repetitions aligned under pressure." detail="TUBA / SOUSAPHONE · COMPETITIVE MARCHING BAND · TEXAS STATE SOLO QUALIFICATION"/>

    <section className="metrics section-pad"><Eyebrow>Performance metrics / 07</Eyebrow><div className="metric-grid"><div><strong>120<span>%</span></strong><p>Portfolio return / 6 months</p></div><div><strong>03<span>RD</span></strong><p>UIL state championships</p></div><div><strong>TOP<span>25%</span></strong><p>Stanford Math Tournament geometry test</p></div></div></section>

    <footer id="contact" className="contact"><div className="contact-lines"/><Eyebrow>Open channel / 08</Eyebrow><h2>LET'S BUILD<br/>SOMETHING <em>EXTRAORDINARY.</em></h2><MagneticButton className="contact-cta" href="mailto:aaraven99@gmail.com">Start a conversation <ArrowUpRight /></MagneticButton><div className="contact-bottom"><div><strong>AARAV SHAH</strong><span>FRISCO, TEXAS</span></div><div><a href="mailto:aaraven99@gmail.com"><Mail/> aaraven99@gmail.com</a><a href="https://linkedin.com/in/aarav-shah-eng" target="_blank"><Linkedin/> linkedin.com/in/aarav-shah-eng</a></div><span>© 2026 / BUILT FOR WHAT'S NEXT</span></div></footer>
    <button className="easter" onClick={() => setSecret(!secret)} aria-label="Toggle engineering mode"><Cpu /></button>{secret && <div className="unlock"><Sparkles/> BLUEPRINT OVERLAY UNLOCKED <button onClick={() => setSecret(false)}><X/></button></div>}
  </main>
}

export default App
