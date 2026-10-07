import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, FileText, Github, Linkedin, Mail, Menu, Moon, Sun, Twitter, X } from 'lucide-react';
import './App.css';
import portrait from './components/img/main.jpg';
import resume from './components/img/oge-obubu-resume.pdf';

type Experience = { period: string; role: string; company: string; description: string; achievements: string[]; technologies: string[] };
type Project = { name: string; label: string; description: string; href: string; technologies: string[] };

const experiences: Experience[] = [
  { period: '2022 — 2025', role: 'Frontend Engineer', company: 'FinesseCodes', description: 'Led frontend development across consumer and business products, turning complex product requirements into fast, dependable interfaces.', achievements: ['Shipped three products serving 1,000+ monthly users.', 'Improved rendering latency by 22% and user engagement by 33.4%.', 'Mentored two junior developers and reduced onboarding time by 40%.'], technologies: ['React', 'TypeScript', 'Redux', 'React Query'] },
  { period: '2023 — 2024', role: 'Mid-Level Frontend Engineer', company: 'MitochronHub', description: 'Built customer-facing experiences for VendStash and modernised legacy components with an emphasis on speed and maintainability.', achievements: ['Created email experiences reaching 1,000+ users.', 'Refactored legacy components to improve load speed by 30%.'], technologies: ['React', 'JavaScript', 'HTML', 'CSS'] },
  { period: '2019 — 2025', role: 'Frontend Developer', company: 'Independent', description: 'Partnered with founders and teams to launch websites and web applications across fintech, commerce, community and professional services.', achievements: ['Helped a Rotary Club website reach the top Google result through technical SEO.', 'Built a housing platform connecting more than 80 students with accommodation.'], technologies: ['React', 'Material UI', 'SEO', 'Git'] },
];

const projects: Project[] = [
  { name: 'VendStash', label: 'B2B payments', description: 'A secure payment platform that helps businesses move money and manage online transactions with confidence.', href: 'https://vendstash.com/', technologies: ['React', 'Payments', 'Security'] },
  { name: 'Squarebox', label: 'Digital trading', description: 'A fast, friendly gift-card trading experience with real-time processing, rewards and clear transaction feedback.', href: 'https://squarebox.ng/', technologies: ['React', 'API integration', 'Responsive UI'] },
  { name: 'Mavericks', label: 'Service platform', description: 'A polished booking and management experience that makes arranging professional cleaning services feel effortless.', href: 'https://wash.mavericks.ng', technologies: ['React', 'Booking flow', 'Product design'] },
  { name: 'VendPal', label: 'Procurement', description: 'A marketplace connecting businesses with verified vendors, designed around efficient and transparent procurement.', href: 'https://vendpal.vercel.app/', technologies: ['React', 'TypeScript', 'Marketplace'] },
  { name: 'OhTopUp', label: 'Utilities', description: 'A simple utility-payment product that gives customers instant processing, discounts and a rewarding checkout flow.', href: 'https://ohtopup.name.ng/', technologies: ['Payments', 'Rewards', 'Mobile first'] },
  { name: 'Sidekicke', label: 'Creative agency', description: 'A lively digital home for an experiential marketing agency creating memorable, culture-led brand moments.', href: 'https://sidekicke.vercel.app/', technologies: ['Next.js', 'Creative direction', 'Motion'] },
];

const navItems = ['about', 'experience', 'work', 'contact'];

function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => localStorage.getItem('theme') === 'light' ? 'light' : 'dark');
  const [activeSection, setActiveSection] = useState('about');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('theme', theme); }, [theme]);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: '-25% 0px -55%', threshold: [0.05, 0.25, 0.5] });
    navItems.forEach((id) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    return () => observer.disconnect();
  }, []);

  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="site-shell">
      <a className="skip-link" href="#about">Skip to content</a>
      <header className="mobile-header">
        <a className="mobile-mark" href="#about" aria-label="Oge Obubu, home">OO<span>.</span></a>
        <div className="mobile-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Change colour theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>
      {menuOpen && <div className="mobile-menu">{navItems.map((item, index) => <button key={item} onClick={() => goTo(item)}><span>0{index + 1}</span>{item}</button>)}</div>}

      <aside className="identity-panel">
        <div>
          <a className="eyebrow" href="#about">Oge Obubu <span>— Portfolio</span></a>
          <h1>I build digital products that feel clear, quick and human.</h1>
          <p className="intro-line">Frontend engineer specialising in thoughtful, secure web experiences for ambitious teams.</p>
          <nav className="side-nav" aria-label="Primary navigation">
            {navItems.map((item, index) => <button className={activeSection === item ? 'active' : ''} key={item} onClick={() => goTo(item)}><span>0{index + 1}</span><i />{item}</button>)}
          </nav>
        </div>
        <div className="identity-footer">
          <div className="availability"><i /> Available for select projects</div>
          <div className="socials" aria-label="Social links">
            <a href="https://github.com/ogeobubu" target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
            <a href="https://linkedin.com/in/oge-obubu" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
            <a href="https://x.com/ogeobubu" target="_blank" rel="noreferrer" aria-label="X / Twitter"><Twitter size={19} /></a>
            <a href="mailto:ogeobubu@gmail.com" aria-label="Email Oge"><Mail size={19} /></a>
          </div>
          <button className="theme-button" onClick={toggleTheme}>{theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}{theme === 'dark' ? 'Light mode' : 'Dark mode'}</button>
        </div>
      </aside>

      <main className="content-panel">
        <section id="about" className="section about-section">
          <p className="mobile-kicker">Hello, I’m Oge <span>👋</span></p>
          <div className="portrait-wrap"><img src={portrait} alt="Oge Obubu" /><span>Based in Lagos, working worldwide</span></div>
          <div className="about-copy">
            <p className="lead">I’m a frontend engineer who cares about the space where product thinking, design and engineering meet.</p>
            <p>I build responsive applications for fintech, commerce and service businesses—translating complex workflows into interfaces people can trust and enjoy using.</p>
            <p>Over the last four-plus years, I’ve led product frontend work, improved performance across established codebases and helped other developers grow. I’m happiest turning a strong idea into a considered, production-ready experience.</p>
          </div>
          <div className="capability-row"><span>React</span><span>TypeScript</span><span>Next.js</span><span>Node.js</span><span>Product UI</span><span>Performance</span></div>
          <button className="scroll-cue" onClick={() => goTo('experience')}><ArrowDown size={16} /> Keep scrolling</button>
        </section>

        <section id="experience" className="section">
          <div className="section-heading"><span>01 / Experience</span><h2>Where I’ve made an impact.</h2></div>
          <div className="experience-list">{experiences.map((experience) => <article className="experience-item" key={experience.company}>
            <p className="period">{experience.period}</p><div><h3>{experience.role} <span>· {experience.company}</span></h3><p>{experience.description}</p>
            <ul>{experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
            <div className="tags">{experience.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
          </article>)}</div>
          <a className="text-link" href={resume} target="_blank" rel="noreferrer"><FileText size={17} /> View full résumé <ArrowUpRight size={16} /></a>
        </section>

        <section id="work" className="section">
          <div className="section-heading"><span>02 / Selected work</span><h2>Products built for real life.</h2><p>A selection of platforms I’ve helped shape—from payments and procurement to everyday services.</p></div>
          <div className="project-list">{projects.map((project, index) => <a className="project" href={project.href} target="_blank" rel="noreferrer" key={project.name}>
            <div className={`project-media project-theme-${index + 1}`}><div className="browser-bar"><i /><i /><i /></div><div className="project-monogram">{project.name.slice(0, 2)}</div><strong>{project.name}</strong><span className="project-number">0{index + 1}</span></div>
            <div className="project-copy"><p className="project-label">{project.label}</p><h3>{project.name}<ArrowUpRight size={20} /></h3><p>{project.description}</p><div className="tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
          </a>)}</div>
        </section>

        <section id="contact" className="section contact-section">
          <span className="contact-number">03 / Let’s talk</span><p>Have a product to build, a knotty interface to untangle, or a team I could help?</p><h2>Let’s make something useful.</h2>
          <a className="contact-button" href="mailto:ogeobubu@gmail.com">Start a conversation <ArrowUpRight size={20} /></a>
          <footer><span>Designed &amp; built by Oge Obubu © {new Date().getFullYear()}</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></footer>
        </section>
      </main>
    </div>
  );
}

export default App;
