import { certifications, education, jobs, profile, projects, skills } from "../portfolio.js";

export const actions = {
  projects: { label: "View Projects", href: "/projects/" },
  experience: { label: "View Experience", href: "/resume/#experience" },
  skills: { label: "Explore Skills", href: "/about/#skills" },
  resume: { label: "Download Résumé", href: profile.resume, download: true },
  github: { label: "Visit GitHub", href: profile.github, external: true },
  linkedin: { label: "Visit LinkedIn", href: profile.linkedin, external: true },
  contact: { label: "Contact Me", href: "#contact" },
  ...Object.fromEntries(projects.map(({ id, name }) => [id, {
    label: "View " + name, href: "/projects/#" + id,
  }])),
};

export const suggestions = [
  "What is your professional experience?",
  "What enterprise projects have you worked on?",
  "What are your strongest technical skills?",
  "How do you manage server state in React?",
  "What was your contribution to VizDom?",
  "What is your backend development experience?",
  "How can I contact you?",
  "Can I download your résumé?",
];

const topics = [
  [/r[eé]sum[eé]|\bcv\b|download|रिज़्यूमे|રેઝ્યૂમે/i, ["resume"]],
  [/github/i, ["github"]],
  [/linkedin/i, ["linkedin"]],
  [/contact|email|reach you|संपर्क|સંપર્ક/i, ["contact", "linkedin"]],
  [/experience|job|employ|work history|lamda logs|intern|अनुभव|અનુભવ/i, ["experience"]],
  [/skills?|expertise|tech stack|framework|कौशल|કુશળતા/i, ["skills"]],
  [/projects?|portfolio work|प्रोजेक्ट|પ્રોજેક્ટ/i, ["projects"]],
  [/hire|fit for|strength|suitable/i, ["experience", "skills"]],
];

function actionIds(question, answer = "", recruiter = false) {
  const projectIds = projects.filter(({ name }) => (question + " " + answer).toLowerCase().includes(name.toLowerCase()))
    .map(({ id }) => id);
  const topicIds = topics.flatMap(([pattern, ids]) => pattern.test(question) ? ids : []);
  return [...new Set([...projectIds, ...topicIds, ...(recruiter ? ["experience", "skills", "projects"] : [])])].slice(0, 4);
}

const evidence = [
  ...skills.flatMap(([, tools]) => tools.match(/React|Next\.js|TypeScript|JavaScript|HTML|CSS|Redux Toolkit|Tailwind CSS|Material UI|Node\.js|Express\.js|REST APIs|webhooks|schema validation|JWT|OAuth|role-based access control|MongoDB|Mongoose|MySQL|Firebase|GitHub|Git|Vite|Webpack|Postman|AWS|Vercel|CI\/CD|Core Web Vitals|database indexing|query optimization/gi) || []),
  ...projects.flatMap(({ tools }) => tools.split(" · ")),
  "Vitest", "Docker", "Zod",
].sort((a, b) => b.length - a.length);
const additional = ["Kubernetes", "Python", "Django", "Flask", "FastAPI", "PostgreSQL", "Redis", "GraphQL", "Angular", "Vue", "Svelte", "Java", "Spring Boot", "Golang", "Rust", ".NET", "C#", "C++", "Azure", "GCP", "Terraform", "Jenkins", "Kafka", "Jest", "Cypress", "Playwright", "React Native", "Flutter"];
const normalize = (text) => text.toLowerCase().replace(/\b(?:react|next|node|express)js\b/g, (word) => word.slice(0, -2) + ".js").replace(/\breact\.js\b/g, "react").replace(/\bexpress\b(?!\.js)/g, "express.js");
const escapeRegex = (text) => text.replace(/[^\w\s]/g, "\\$&");
const termPattern = (term) => new RegExp("(?<![\\w])" + escapeRegex(normalize(term)) + "(?![\\w])", "gi");

function matchSkills(text) {
  let remaining = normalize(text);
  const unverified = additional.filter((term) => {
    if (!remaining.match(termPattern(term))) return false;
    remaining = remaining.replace(termPattern(term), " ");
    return true;
  });
  const matched = [...new Set(evidence)].filter((term) => {
    if (!remaining.match(termPattern(term))) return false;
    remaining = remaining.replace(termPattern(term), " ");
    return true;
  });
  return { matched, unverified };
}



function relatedProjects(matched) {
  return projects.map((project) => ({
    ...project, matches: matched.filter((term) => normalize(project.tools).match(termPattern(term))).length,
  })).filter(({ matches }) => matches).sort((a, b) => b.matches - a.matches).slice(0, 3);
}

function compareJob(text) {
  const { matched, unverified } = matchSkills(text);
  const related = relatedProjects(matched);
  return [
    "**Skills documented in the portfolio**\n\n" + (matched.join(", ") || "No recognized technical terms matched the documented skills."),
    "**Relevant projects**\n\n" + (related.map(({ name, description }) => "- **" + name + "** — " + description).join("\n") || "No project surfaced for the terms recognized."),
    "**Requirements to verify**\n\n" + (unverified.length ? "The portfolio does not document " + unverified.join(", ") + ". " : "") +
      "This comparison checks known technical terms. Review seniority, depth, and any other requirements with Ayush.",
  ].join("\n\n");
}

const projectFollowUp = /\b(?:what|which) (?:tech|tools?|stack|frameworks?)\b|\b(?:how (?:was|is)|tell me more about) (?:it|that project)\b|\b(?:what (?:does|did)|stack (?:did|does)) (?:it|that project)\b|^(?:and )?(?:the )?(?:stack|tech stack|tools)\??$/i;

export function answerQuestion(question, mode, previousProject) {
  if (mode === "recruiter") {
    const text = compareJob(question);
    return { text, ids: actionIds("", text, true) };
  }

  const ids = actionIds(question);
  const mentioned = projects.filter(({ name }) => question.toLowerCase().includes(name.toLowerCase()));
  const followUp = projectFollowUp.test(question) ? projects.find(({ name }) => name === previousProject) : undefined;
  const selected = mentioned.length ? mentioned : followUp ? [followUp] : [];
  if (selected.length) {
    const text = selected.map(({ name, description, tools, example, contribution }) =>
      "**" + name + "**\n\n" + description + "\n\n**Stack** · " + tools +
      "\n\n" + contribution + "\n\n" + example.note).join("\n\n");
    return {
      text,
      ids: [...new Set(selected.map(({ id }) => id || "resume"))].slice(0, 4),
      project: selected.length === 1 ? selected[0].name : undefined,
    };
  }

  const { matched, unverified } = matchSkills(question);
  let text;
  if (ids.includes("resume")) text = "You can download Ayush Patel’s résumé as a PDF below.";
  else if (ids.includes("contact")) text = "Ayush is based in " + profile.location + ". His public email and phone are listed in the contact section, and you can also reach him on LinkedIn.";
  else if (ids.includes("github") || ids.includes("linkedin")) text = "Use the links below to open Ayush’s public profile.";
  else if (/server state|data fetching/i.test(question)) return { text: projects.map(({ name, example }) => "**" + name + "** — " + example.note).join("\n\n"), ids: ["vizdom", "lamda-flow", "bk-planner"] };
  else if (/backend/i.test(question) && !unverified.length) return { text: "Ayush built MERN applications during his internship, including Express REST endpoints with JWT authentication and input validation. At Lamda Logs he integrates business workflows with REST APIs.", ids: ["experience", "skills"] };
  else if (matched.length || unverified.length) {
    const related = relatedProjects(matched);
    const documented = matched.length ? "Ayush’s portfolio documents **" + matched.join(", ") + "**." : "";
    const examples = related.length ? "Relevant projects include " + related.map(({ name }) => "**" + name + "**").join(", ") + "." : "";
    const unknown = unverified.length ? "The portfolio doesn’t document " + unverified.join(", ") + "." : "";
    text = [documented, examples, unknown].filter(Boolean).join("\n\n");
    return { text, ids: [...new Set([...related.map(({ id }) => id || "resume"), "skills"])].slice(0, 4) };
  }
  else if (ids.includes("projects")) text = projects.map(({ name, teaser }) => "- **" + name + "** — " + teaser).join("\n");
  else if (/hire|fit for|suitable/i.test(question)) text = profile.introduction + "\n\n" + jobs[0].highlights.slice(0, 2).map((line) => "- " + line).join("\n");
  else if (ids.includes("experience")) text = jobs.map(({ company, title, date, summary }) => "**" + company + "** · " + date + "\n\n" + title + ". " + summary).join("\n\n");
  else if (ids.includes("skills")) text = skills.map(([label, tools]) => "- **" + label + "** — " + tools).join("\n");
  else if (/education|university|degree|cgpa/i.test(question)) text = "**" + education.degree + "** at " + education.university + " (" + education.dates + "), with a CGPA of " + education.cgpa + ".";
  else if (/achiev|certif|problem.solving/i.test(question)) text = jobs[0].highlights[0] + "\n\n**Certifications**\n\n" + certifications.map(([title, issuer]) => "- " + title + " · " + issuer).join("\n");
  else if (/yourself|about ayush|who (is|are)|introduction/i.test(question)) text = "**" + profile.name + "** is a " + profile.role + " based in " + profile.location + ". " + profile.introduction;
  else text = "I don’t have a documented answer to that question. Try a suggested question, ask about a specific project, or browse the portfolio below.";
  return { text, ids: [...new Set([...ids, ...(!ids.length ? ["projects", "experience"] : [])])].slice(0, 4) };
}
