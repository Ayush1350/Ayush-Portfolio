import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

import { certifications, education, jobs, profile, projects, skills } from "./portfolio.js";
import { ChatLauncher } from "./assistant/ChatLauncher.jsx";

const { email, resume } = profile;
const navigation = [
  ["Home", "/"],
  ["About", "/about/"],
  ["Projects", "/projects/"],
  ["Résumé", "/resume/"],
];
const toolkit = [
  ["Interfaces", "React, Next.js, and TypeScript"],
  ["APIs", "Node.js, Express.js, and REST"],
  ["Data", "MongoDB and MySQL"],
];

function Header({ page }) {
  return (
    <header className="shell site-header">
      <a className="brand" href="/">
        Ayush Patel
      </a>
      <nav className="header-nav" aria-label="Main navigation">
        {navigation.map(([label, href]) => (
          <a
            key={href}
            href={href}
            aria-current={page === href ? "page" : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
      <a className="header-contact" href="#contact">
        Contact
      </a>
    </header>
  );
}

function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="home-intro">
          <p className="meta">Ahmedabad, India</p>
          <h1>
            Ayush <em>Patel</em>
          </h1>
          <p className="role">Full Stack Developer</p>
          <p className="intro">
            I have 2.5+ years of experience building React and TypeScript applications. At Lamda Logs, I connect the steps between a purchase order, a warehouse receipt and an approved payment.
          </p>
          <p className="home-position">
            React · TypeScript · Node.js
          </p>
          <div className="actions flex flex-wrap items-center gap-4">
            <a className="button" href="/projects/">
              Explore projects
            </a>
            <a className="textlink" href={resume} download>Download résumé</a>
            <a className="textlink" href="#contact">
              Contact me
            </a>
          </div>
        </div>
        <article className="home-feature">
          <p className="meta">Selected project · Interior fit-out</p>
          <div>
            <h2>VizDom</h2>
            <p>
              One project record connects design, site progress, purchasing, and
              finance. Follow how a purchase order becomes a payment request.
            </p>
            <a className="textlink" href="/projects/#vizdom">
              Read about VizDom
            </a>
          </div>
        </article>
      </section>
      <div className="home-grid">
        <section className="home-panel">
          <h2>Project index</h2>
          <ul className="index-list">
            {projects.map(({ id, name, teaser }) => (
              <li key={id}>
                <a href={`/projects/#${id}`}>
                  <strong>{name}</strong>
                  <span>{teaser}</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
        <section className="home-panel profile-panel">
          <div>
            <h2>Toolkit</h2>
            <dl className="toolkit">
              {toolkit.map(([area, tools]) => (
                <div key={area}>
                  <dt>{area}</dt>
                  <dd>{tools}</dd>
                </div>
              ))}
            </dl>
            <a className="textlink" href="/about/#skills">
              See technical skills
            </a>
          </div>
          <div className="home-resume">
            <p>
              Experience at Lamda Logs and The One Web Technology, plus
              education and certifications.
            </p>
            <a href="/resume/" className="textlink">
              View résumé
            </a>
          </div>
        </section>
      </div>
    </>
  );
}

function About() {
  return (
    <>
      <section className="page-intro about-intro">
        <div>
          <p className="meta">Ahmedabad, India</p>
          <h1>About</h1>
        </div>
        <div className="page-lede">
          <p>
            I’m Ayush Patel, a full stack developer. I work on tools that help
            teams keep track of orders, budgets, and the decisions that move a
            project forward.
          </p>
          <p>
            I started with full stack MERN development at The One Web
            Technology, where I built responsive screens and documented the APIs
            behind them. At Lamda Logs, my work has moved across shared React
            components, Next.js performance, and integrations with Node.js and
            Express APIs.
          </p>
          <p>
            I work with design, backend and QA teams to trace issues from the screen to the API. I use Vitest to check business rules and review query caching so connected screens stay in sync after an edit.
          </p>
          <a className="textlink" href="/resume/">
            See my work history
          </a>
        </div>
      </section>
      <section
        className="about-skills"
        id="skills"
        aria-labelledby="skills-heading"
      >
        <h2 id="skills-heading">Technical skills</h2>
        <dl>
          {skills.map(([label, tools]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{tools}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

function Project({ project }) {
  const { id, name, kind, date, description, tools, workflows, example } =
    project;
  return (
    <article
      className="project"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}-heading`}
    >
      <div className="project-heading">
        <p className="meta">{[kind, date].filter(Boolean).join(" · ")}</p>
        <h2 id={`${id}-heading`}>{name}</h2>
      </div>
      <div className="project-copy">
        <p>{description}</p>
        <p className="contribution">{project.contribution}</p>
        <p className="tech">{tools}</p>
      </div>
      <dl className="project-workflows">
        {workflows.map(([title, summary]) => (
          <div key={title}>
            <dt>{title}</dt>
            <dd>{summary}</dd>
          </div>
        ))}
      </dl>
      <details className="project-example">
        <summary>{example.title}</summary>
        <div className="example-content">
          <ol className="example-steps">
            {example.steps.map(([title, detail]) => (
              <li key={detail}>
                <strong>{title}</strong>
                <p>{detail}</p>
              </li>
            ))}
          </ol>
          <p className="example-note">
            <strong>Frontend implementation</strong> {example.note}
          </p>
        </div>
      </details>
    </article>
  );
}
function Projects() {
  return (
    <div className="projects-layout" id="work">
      <section className="projects-intro" aria-labelledby="projects-heading">
        <h1 id="projects-heading">Projects</h1>
        <p>
          Three applications for teams that manage projects, inventory, and
          events. Each includes a closer look at how a real task moves through
          the interface.
        </p>
        <nav aria-label="On this page">
          <ul className="index-list">
            {projects.map(({ id, name }) => (
              <li key={id}>
                <a href={`#${id}`}>{name}</a>
              </li>
            ))}
          </ul>
        </nav>
      </section>
      <div className="projects">
        {projects.map((project) => (
          <Project key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
function Experience() {
  return (
    <section
      id="experience"
      className="section experience"
      aria-labelledby="experience-heading"
    >
      <div>
        <h2 id="experience-heading">Experience</h2>
        {jobs.map(({ date, company, title, summary, highlights }) => (
          <article className="record" key={company}>
            <p className="meta">{date}</p>
            <div>
              <h3>{company}</h3>
              <p className="job-title">{title}</p>
              <p>{summary}</p>
              <ul className="record-highlights">
                {highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
          </article>
        ))}
        <div className="record education">
          <h3>Education</h3>
          <div>
            <h4>{education.university}</h4>
            <p>{education.degree} · {education.dates}</p>
            <p>{education.college} · {education.location}</p>
            <p>CGPA {education.cgpa}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Resume() {
  return (
    <>
      <section className="page-intro resume-intro">
        <div>
          <p className="meta">Ayush Patel</p>
          <h1>Résumé</h1>
        </div>
        <div className="page-lede">
          <p>
            Full Stack Developer in Ahmedabad, Gujarat, with experience in
            enterprise React applications, shared UI systems, and Node.js APIs.
          </p>
          <div className="actions flex flex-wrap items-center gap-4">
            <a className="button" href={resume} download>
              Download PDF
            </a>
            <a className="textlink" href={resume}>
              Open PDF
            </a>
          </div>
        </div>
      </section>
      <Experience />
      <section className="credentials" aria-labelledby="credentials-heading">
        <h2 id="credentials-heading">Certifications</h2>
        <dl>
          {certifications.map(([title, issuer]) => (
            <div key={title}>
              <dt>{title}</dt>
              <dd>{issuer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}

const pages = {
  "/": Home,
  "/about/": About,
  "/projects/": Projects,
  "/resume/": Resume,
};
const root = document.getElementById("root");
const page = root.dataset.page || "/";
const Page = pages[page];

function App() {
  useEffect(() => {
    // Cross-page fragments can resolve only after React renders their targets.
    const hash = window.location.hash.slice(1);
    if (hash) {
      const target = document.getElementById(hash);
      target?.scrollIntoView({ behavior: "instant" });
      target?.focus({ preventScroll: true });
    }
  }, []);

  return (
    <>
      <a className="skip" href="#main" target="_self">
        Skip to content
      </a>
      <Header page={page} />
      <main className="shell page" id="main" tabIndex={-1}>
        <Page />
      </main>
      <footer id="contact" tabIndex={-1}>
        <div className="shell footer">
          <div>
            <h2>Get in touch</h2>
            <p className="contact-location">Ahmedabad, Gujarat, India</p>
            <address className="flex flex-wrap gap-x-6 gap-y-2 not-italic">
              <a className="textlink" href={`mailto:${email}`}>
                {email}
              </a>
              <a className="textlink" href={`tel:${profile.phone.replaceAll(" ", "")}`}>
                {profile.phone}
              </a>
            </address>
          </div>
          <div className="social">
            <a href={profile.github}>GitHub</a>
            <a href={profile.linkedin}>LinkedIn</a>
          </div>
        </div>
      </footer>
      <ChatLauncher />
    </>
  );
}
createRoot(root).render(<App />);
