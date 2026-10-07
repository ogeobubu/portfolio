import React, { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, FileText, Github, Linkedin, Mail, Menu, Moon, Sun, Twitter, X } from 'lucide-react';
import './App.css';
import portrait from './components/img/main-portrait.webp';
import examPrepsImage from './components/img/exampreps360.webp';
import foodmartexMobileImage from './components/img/foodmartex_mobile.webp';
import foodmartexImage from './components/img/foodmartex.webp';
import amlDecodedImage from './components/img/amldecoded.webp';
import perfumeGardenImage from './components/img/perfumegardenhotel.webp';
import emeritusImage from './components/img/emeritusgadget.webp';
import squareboxImage from './components/img/squareboxng.webp';
import vendstashImage from './components/img/vendstash.webp';

type Experience = { period: string; role: string; company: string; description: string; achievements: string[]; technologies: string[] };
type Project = { name: string; label: string; period: string; description: string; href?: string; image?: string; technologies: string[] };

const experiences: Experience[] = [
  { period: 'Aug 2026 — Present', role: 'Senior Full-Stack & Mobile Developer', company: 'Novafoundry Technologies', description: 'Architecting web, mobile and backend systems for education, hospitality and commerce products.', achievements: ['Built ExamPreps-360 for 19,000+ active students with CBT simulations, automated scoring, subscriptions and progress tracking.', 'Designed resilient services and PostgreSQL schemas supporting 120,000+ past questions.', 'Delivered SEO-focused booking and e-commerce platforms with fast, direct conversion flows.'], technologies: ['React', 'React Native', 'Nest.js', 'PostgreSQL', 'Redux', 'TanStack', 'Paystack'] },
  { period: 'Nov 2025 — Present', role: 'Senior Software Engineer', company: 'Foodmartex Nigeria Limited', description: 'Building a multi-vendor delivery ecosystem spanning customer, rider, vendor and administration experiences.', achievements: ['Developed cross-platform food and grocery ordering with wallets, cached navigation and real-time order tracking.', 'Implemented location-based discovery, live rider maps, inventory management and logistics workflows.', 'Integrated REST APIs and Paystack across customer, rider, vendor and admin roles.'], technologies: ['React', 'TypeScript', 'Laravel', 'Redux', 'React Query', 'Paystack'] },
  { period: 'Feb 2022 — Nov 2024', role: 'Frontend Developer', company: 'FinesseCodes', description: 'Led SquareBox NG, a performance-focused responsive product built around reusable systems and dependable integrations.', achievements: ['Created modular React component systems and robust state-management flows.', 'Built custom email templates distributed to more than 10,000 active users.', 'Improved usability and technical SEO across mobile and desktop.'], technologies: ['React', 'REST APIs', 'Technical SEO'] },
  { period: 'Jun 2023 — Jul 2024', role: 'Mid Frontend Developer', company: 'MitochronHub', description: 'Led frontend delivery for procurement and fintech products with complex dashboards, real-time events and payment flows.', achievements: ['Built VendPal vendor and procuring dashboards, RFP comparison, file uploads and parcel tracking.', 'Developed VendStash’s reusable UI library, API integrations and responsive experiences.'], technologies: ['React', 'TypeScript', 'Redux', 'Socket.IO', 'Cloudinary', 'Paystack'] },
];

const projects: Project[] = [
  { name: 'ExamPreps-360', label: 'Education platform', period: 'Aug 2026 — Present', description: 'Web and mobile CBT practice for 19,000+ students, backed by 120,000+ questions, automated scoring, gamified learning and secure subscriptions.', href: 'https://exampreps360.online/', image: examPrepsImage, technologies: ['React', 'React Native', 'Nest.js', 'PostgreSQL', 'Paystack'] },
  { name: 'Foodmartex Mobile', label: 'Delivery app', period: 'Nov 2025', description: 'A cross-platform food and grocery app with merchant discovery, live rider maps, wallet integration, cached navigation and local rewards.', href: 'https://play.google.com/store/apps/details?id=com.foodmartex.customer&hl=en', image: foodmartexMobileImage, technologies: ['React Native', 'Redux', 'React Query', 'Maps'] },
  { name: 'FoodMartex Ecosystem', label: 'Multi-vendor delivery', period: 'Nov 2025 — Present', description: 'A scalable ordering ecosystem for food, groceries, pharmacy and laundry, with dedicated customer, vendor and admin operations.', href: 'https://foodmartex.online/', image: foodmartexImage, technologies: ['React', 'TypeScript', 'Node.js', 'Paystack', 'REST APIs'] },
  { name: 'AMLDecoded', label: 'Compliance hub', period: 'Oct 2025', description: 'An accessible full-stack AML resource and training hub with custom media, regulatory content and search-optimised architecture.', href: 'https://amldecoded.com/', image: amlDecodedImage, technologies: ['React', 'Accessibility', 'Video', 'SEO'] },
  { name: 'Perfume Garden Hotel', label: 'Hospitality booking', period: 'Sep 2026', description: 'A zero-commission direct-booking platform with WhatsApp conversion, room showcases, guest feedback and a 30+ item dining menu.', href: 'https://perfumegardenhotel.online/', image: perfumeGardenImage, technologies: ['Responsive UI', 'Local SEO', 'Structured data', 'Performance'] },
  { name: 'Emeritus Global Gadgets', label: 'E-commerce', period: 'Jun 2026', description: 'A full-stack commerce experience engineered around sub-second page loads, strong search visibility and a smooth checkout journey.', href: 'https://emeritusgadgets.online/', image: emeritusImage, technologies: ['React', 'E-commerce', 'Performance', 'SEO'] },
  { name: 'SquareBox NG', label: 'Digital trading', period: 'Feb 2022 — Nov 2024', description: 'A responsive React product with reusable components, REST integrations, robust state management and email experiences reaching 10,000+ users.', href: 'https://squarebox.ng/', image: squareboxImage, technologies: ['React', 'REST APIs', 'State management', 'SEO'] },
  { name: 'VendStash', label: 'Fintech platform', period: 'Aug — Oct 2023', description: 'A responsive, high-performance product with a reusable UI library, backend integrations, semantic markup and technical SEO.', href: 'https://vendstash.com/', image: vendstashImage, technologies: ['React', 'JavaScript', 'TypeScript', 'REST APIs'] },
];

const navItems = ['about', 'experience', 'work', 'contact'];
const resumeUrl = 'https://www.canva.com/design/DAGvHY8u3KA/5FiqKEtpeOLIxJZ9AOn2xQ/edit?utm_content=DAGvHY8u3KA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton';

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
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.documentElement.classList.add('motion-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8%', threshold: 0.08 });
    document.querySelectorAll('[data-reveal]').forEach((element) => revealObserver.observe(element));
    return () => {
      revealObserver.disconnect();
      document.documentElement.classList.remove('motion-ready');
    };
  }, []);

  const goTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); setMenuOpen(false); };
  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <div className="site-shell">
      <a className="skip-link" href="#about">Skip to content</a>
      <header className="mobile-header">
        <a className="mobile-mark" href="#about" aria-label="OO. — Oge Obubu home">OO<span>.</span></a>
        <div className="mobile-actions">
          <button className="icon-button" onClick={toggleTheme} aria-label="Change colour theme">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <button className="icon-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </header>
      {menuOpen && <div className="mobile-menu">{navItems.map((item, index) => <button key={item} onClick={() => goTo(item)}><span>0{index + 1}</span>{item}</button>)}</div>}

      <aside className="identity-panel">
        <div>
          <a className="eyebrow" href="#about">Oge Obubu <span>— Portfolio</span></a>
          <h1>I engineer digital products from interface to infrastructure.</h1>
          <p className="intro-line">Software engineer and full-stack developer with a particular strength in frontend engineering.</p>
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
          <div className="portrait-wrap" data-reveal><img src={portrait} alt="Oge Obubu" width="168" height="196" /><span>Based in Lagos, working worldwide</span></div>
          <div className="about-copy" data-reveal>
            <p className="lead">I’m a software engineer who builds across the stack, with my strongest craft in frontend development.</p>
            <p>I architect responsive web and mobile products, connect them to dependable APIs and data systems, and turn complex workflows into interfaces people can trust and enjoy using.</p>
            <p>My work spans education, logistics, fintech, procurement, compliance, hospitality and commerce—from React and React Native interfaces to Nest.js services, PostgreSQL schemas, payments and real-time features.</p>
          </div>
          <div className="capability-row" data-reveal><span>React</span><span>React Native</span><span>TypeScript</span><span>Node.js</span><span>Nest.js</span><span>PostgreSQL</span><span>Product UI</span></div>
          <button className="scroll-cue" onClick={() => goTo('experience')}><ArrowDown size={16} /> Keep scrolling</button>
        </section>

        <section id="experience" className="section">
          <div className="section-heading" data-reveal><span>01 / Experience</span><h2>Where I’ve made an impact.</h2></div>
          <div className="experience-list">{experiences.map((experience) => <article className="experience-item" data-reveal key={experience.company}>
            <p className="period">{experience.period}</p><div><h3>{experience.role} <span>· {experience.company}</span></h3><p>{experience.description}</p>
            <ul>{experience.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}</ul>
            <div className="tags">{experience.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div>
          </article>)}</div>
          <a className="text-link" href={resumeUrl} target="_blank" rel="noreferrer"><FileText size={17} /> View full résumé <ArrowUpRight size={16} /></a>
        </section>

        <section id="work" className="section">
          <div className="section-heading" data-reveal><span>02 / Selected work</span><h2>Products built for real life.</h2><p>Full-stack, web and mobile products serving students, shoppers, businesses, vendors and delivery teams.</p></div>
          <div className="project-list">{projects.map((project, index) => {
            const content = <><div className={`project-media project-theme-${(index % 6) + 1}`}>{project.image ? <img src={project.image} alt={`${project.name} product interface`} loading="lazy" /> : <><div className="browser-bar"><i /><i /><i /></div><div className="project-monogram">{project.name.slice(0, 2)}</div><strong>{project.name}</strong></>}<span className="project-number">{String(index + 1).padStart(2, '0')}</span></div>
              <div className="project-copy"><p className="project-label">{project.label} · {project.period}</p><h3>{project.name}{project.href && <ArrowUpRight size={20} />}</h3><p>{project.description}</p><div className="tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div></div></>;
            return project.href ? <a className="project" data-reveal href={project.href} target="_blank" rel="noreferrer" key={project.name}>{content}</a> : <article className="project" data-reveal key={project.name}>{content}</article>;
          })}</div>
        </section>

        <section id="contact" className="section contact-section">
          <span className="contact-number" data-reveal>03 / Let’s talk</span><p data-reveal>Have a product to build, a knotty interface to untangle, or a team I could help?</p><h2 data-reveal>Let’s make something useful.</h2>
          <a className="contact-button" data-reveal href="mailto:ogeobubu@gmail.com">Start a conversation <ArrowUpRight size={20} /></a>
          <footer data-reveal><span>Designed &amp; built by Oge Obubu © {new Date().getFullYear()}</span><button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>Back to top ↑</button></footer>
        </section>
      </main>
    </div>
  );
}

export default App;
