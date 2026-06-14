export const personalInfo = {
  name: 'Ayush Patel',
  title: 'Frontend & Mobile Engineer',
  tagline: 'I build fast, scalable web apps that users love.',
  location: 'Ahmedabad, Gujarat, India',
  phone: '+91-9408157601',
  email: 'ayushpatel2492002@gmail.com',
  linkedin: 'https://linkedin.com/in/ayush1350',
  github: 'https://github.com/Ayush1350',
  summary: `Results-driven Frontend Developer with 2+ years of professional experience
  building scalable SaaS platforms and business management applications.
  Proficient in Next.js, React.js, and TypeScript, with a strong track record of
  delivering production-grade web applications across real estate, e-commerce,
  media, and ed-tech domains. Experienced in leveraging AI tooling to accelerate
  delivery and maintain high code quality.`,
};

export const skills = {
  Languages: ['JavaScript (ES6+)', 'TypeScript', 'Dart', 'Java', 'Kotlin', 'PHP', 'HTML5/CSS3', 'SQL'],
  'Frameworks & Libraries': ['React.js', 'Next.js', 'React Native', 'Flutter', 'Node.js', 'Express.js', 'Redux.js', 'Tailwind CSS', 'MUI'],
  'Databases & Cloud': ['MongoDB', 'MySQL', 'Firebase', 'Vercel', 'REST APIs'],
  'Tools & Practices': ['Git', 'GitHub Copilot', 'AI Agents', 'VS Code', 'Android Studio'],
};

export const experiences = [
  {
    role: 'Software Developer',
    company: 'Lamda Logs (formerly Elixir Techne)',
    period: 'Jul 2024 – Present',
    duration: '2 yrs',
    type: 'Full-time',
    location: 'Ahmedabad, Gujarat · On-site',
    bullets: [
      'Spearhead frontend architecture for core multi-tenant SaaS and enterprise platforms (Flipspaces, LamdaLogs), utilizing a type-safe Next.js, React.js, and TypeScript stack to streamline real estate operations and distributor networks.',
      'Architected and delivered internal dashboards and media applications (BK Planner, BK One, MyCourse), leveraging Redux.js for predictable global state management, real-time notifications, and live streaming integrations.',
      'Optimized development velocity and upheld strict code standards across all products by embedding AI Agents and GitHub Copilot directly into daily engineering workflows.',
    ],
  },
  {
    role: 'Web Developer Intern',
    company: 'The One Web Technology',
    period: 'Jan 2024 – Jun 2024',
    duration: '6 months',
    type: 'Internship',
    location: 'Ahmedabad, Gujarat · On-site',
    bullets: [
      'Built ExploreEra, a full-stack travel booking application supporting flight, hotel, and holiday package reservations using the MERN stack.',
      'Implemented global state management with Redux.js and delivered a fully responsive UI using React.js, MUI, and Tailwind CSS, improving usability across all screen sizes.',
      'Gained hands-on experience with JWT-based authentication, RESTful API design, and MongoDB database management.',
    ],
  },
];

export const projects = [
  {
    name: 'Flipspaces',
    tech: ['Next.js', 'React.js', 'JavaScript', 'Tailwind CSS'],
    company: 'Lamda Logs',
    period: 'Sep 2025 – Present',
    description:
      'Customised SaaS modules for real estate builders, broker partners, furniture brands, and architect/contractor workflows, serving as the scalable tech backbone for diverse business verticals.',
    highlights: [
      'Optimised rendering performance using Next.js App Router and server-side data-fetching patterns for faster page loads and improved SEO scores.',
    ],
    category: 'SaaS',
  },
  {
    name: 'BizzMitr (LamdaLogs)',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    company: 'Lamda Logs',
    period: 'Feb 2025 – Present',
    description:
      'Multi-level order management system for business management, handling company, distributor, and dealer workflows with real-time coordination.',
    highlights: [
      'Enforced strict type safety with TypeScript across all components and API integrations, substantially reducing runtime errors in production.',
    ],
    category: 'Dashboard',
  },
  {
    name: 'BK One',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    company: 'Lamda Logs',
    period: 'Jan 2025',
    description:
      'Unified media management dashboard consolidating BK Tube (videos), music, audio files, and books with real-time activity notifications.',
    highlights: [
      'Developed a comprehensive dashboard allowing users to access and manage multiple media types with seamless content experience.',
    ],
    category: 'Dashboard',
  },
  {
    name: 'BK Planner',
    tech: ['React.js', 'TypeScript', 'Redux.js', 'Tailwind CSS'],
    company: 'Lamda Logs',
    period: 'Oct 2024 – Dec 2024',
    description:
      'Internal event planning and management dashboard with staff assignment, scheduling, and event coordination modules.',
    highlights: [
      'Used Redux.js for centralised state management across complex UI flows involving staff scheduling and event coordination.',
    ],
    category: 'Dashboard',
  },
  {
    name: 'MyCourse',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS'],
    company: 'Lamda Logs',
    period: 'Jul 2024 – Sep 2024',
    description:
      'Online learning platform with multiple pages covering course browsing, enrollments, and live webinars.',
    highlights: [
      'Delivered a multi-page learning platform from scratch with intuitive UX and responsive design.',
    ],
    category: 'Ed-Tech',
  },
  {
    name: 'ExploreEra',
    tech: ['React.js', 'JavaScript', 'Tailwind CSS', 'MUI', 'Redux.js', 'Node.js', 'Express.js', 'MongoDB'],
    company: 'The One Web Technology',
    period: 'Jan 2024 – Jun 2024',
    description:
      'Full-stack travel booking platform enabling seamless booking of flights, hotels, and holiday packages in a single application.',
    highlights: [
      'Built the complete MERN stack application from scratch with JWT authentication, REST APIs, and full Redux state management.',
    ],
    category: 'Full-Stack',
  },
  {
    name: 'Unused Medicine Donation',
    tech: ['React Native'],
    company: 'Ganpat University',
    period: 'Apr 2023 – Jun 2023',
    description:
      'Cross-platform mobile app enabling individuals to donate unused, safe medicines to NGOs for distribution to people in need.',
    highlights: [
      'Bridges the gap between surplus medication and those who cannot afford it, built with React Native for iOS and Android.',
    ],
    category: 'Mobile',
  },
];

export const education = {
  degree: 'Bachelor of Technology in Computer Engineering',
  institution: 'Ganpat University — U.V. Patel College of Engineering',
  period: 'July 2020 – June 2024',
  cgpa: '7.88',
  location: 'Gujarat, India',
};

export const certifications = [
  { name: 'Java (Basic)', issuer: 'HackerRank' },
  { name: 'SQL (Basic)', issuer: 'HackerRank' },
  { name: 'CSS (Basic)', issuer: 'HackerRank' },
  { name: 'JavaScript Essentials 1 (JSE)', issuer: 'Cisco' },
  { name: 'Java', issuer: 'Great Learning' },
  { name: 'TCS iON Career Edge', issuer: 'TCS' },
];
