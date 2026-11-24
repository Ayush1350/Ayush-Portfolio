export const profile = {
  name: "Ayush Patel",
  role: "Full Stack Developer",
  location: "Ahmedabad, Gujarat, India",
  introduction: "Ayush builds React and Next.js interfaces, shared UI systems, and Node.js APIs for workflows spanning purchase approvals, inventory, and dealer orders.",
  resume: "/Ayush-Patel-Resume.pdf",
  email: "ayushpatel24092002@gmail.com",
  phone: "+91 9408157601",
  github: "https://github.com/Ayush1350",
  linkedin: "https://www.linkedin.com/in/ayush1350",
  careerInterests: null,
};

export const education = {
  university: "Ganpat University",
  degree: "B.Tech in Computer Engineering",
  dates: "Jul 2020 – Jun 2024",
  college: "U.V. Patel College of Engineering",
  location: "Gujarat, India",
  cgpa: "7.88/10",
};

export const skills = [
  ["Frontend development", "React, TypeScript, JavaScript, Next.js, TanStack Router, HTML and CSS."],
  ["Backend development", "Node.js, Express.js, REST APIs, JWT authentication and role-based access."],
  ["State management and data fetching", "Redux Toolkit for shared client state. TanStack Query and RTK Query for caching, polling and invalidation."],
  ["Databases", "MongoDB and MySQL."],
  ["UI frameworks", "Material UI, Tailwind CSS and reusable React components."],
  ["Testing and code quality", "Vitest unit tests, Zod validation, code reviews and API checks with Postman."],
  ["Development tools and deployment", "Git, GitHub, Vite, Webpack, Docker and CI/CD."],
];

export const projects = [
  {
    id: "vizdom",
    name: "VizDom",
    date: "Sep 2025 — Present",
    contribution: "I built the bill of quantities (BOQ) and budget comparison workflows, along with invoice validation, financial calculations and payment requests.",
    kind: "Interior fit-out · Project and procurement management",
    teaser: "Interior fit-out planning, procurement, and finance.",
    description:
      "VizDom gives sales, design, site, procurement, and finance teams a shared record for each interior fit-out project. An invoice reviewer can check what was ordered and received before the invoice moves to payment.",
    tools: "React · JavaScript · Redux · TanStack Query · Material UI · Vite",
    workflows: [
      [
        "Project planning",
        "Carry sales lead details into project setup, review designs and documents, and track weekly site progress.",
      ],
      [
        "Budgets and purchasing",
        "Compare vendor estimates, review budget revisions, and track purchase orders and receipts.",
      ],
      [
        "Approvals and payments",
        "Review pending requests and follow outstanding amounts in the finance workspace.",
      ],
      [
        "Documents and reporting",
        "Maintain versioned project documents and review weekly site progress, receivables, and payables.",
      ],
    ],
    example: {
      title: "Follow an invoice through review",
      steps: [
        [
          "Purchase order",
          "Procurement creates an order for a vendor’s materials or services.",
        ],
        [
          "Receipt",
          "The project team records what arrived or what work was completed.",
        ],
        [
          "Invoice review",
          "The reviewer checks the invoice against the order and receipt before a payment request moves forward.",
        ],
      ],
      note: "Redux holds session information and permissions. TanStack Query manages API data such as purchase-order lists. Status polling keeps pending approvals current. After an order is created, the app refreshes related queries so the list and project summary can show the update.",
    },
  },
  {
    id: "lamda-flow",
    name: "Lamda Flow",
    contribution: "I built protected workspaces and shared order components so each trading partner can act on the same transaction from its own workspace.",
    kind: "B2B distribution and inventory",
    date: "Feb 2025 — Present",
    teaser: "Order processing, warehouse inventory, and trade pricing.",
    description:
      "Lamda Flow helps manufacturers, distributors, and dealers coordinate orders and stock in role-specific workspaces. A dealer’s purchase order appears as a sale for the distributor, so both sides can follow the same transaction through dispatch and receipt.",
    tools:
      "React · TypeScript · Vite · TanStack Router · TanStack Query · Tailwind CSS",
    workflows: [
      [
        "Orders and returns",
        "Confirm sales, record dispatch and receipt, and review requests to return stock.",
      ],
      [
        "Warehouse inventory",
        "Check stock by location, transfer goods between warehouses, and trace changes in transaction history.",
      ],
      [
        "Catalogs and trade pricing",
        "Organize product variants and manage price lists and group discounts for different trade partners.",
      ],
      [
        "Purchasing and production",
        "Manage supplier orders and receipts, maintain versioned bills of materials, and track material issues and returns for production runs.",
      ],
    ],
    example: {
      title: "Follow a dealer order through delivery",
      steps: [
        [
          "Dealer",
          "Selects products from the catalog and submits a purchase order.",
        ],
        [
          "Distributor",
          "Reviews the same order as a sale, confirms it, and records dispatch.",
        ],
        [
          "Dealer",
          "Records receipt so both sides can follow the order from their own workspace.",
        ],
      ],
      note: "The portals share order forms and detail components. TanStack Router handles navigation and route access, while shared order logic selects the actions available for that order type. TanStack Query handles refreshing order and inventory data after changes.",
    },
  },
  {
    id: "bk-planner",
    name: "BK Planner",
    date: "Jul 2024 — Jan 2025",
    contribution: "I built member directories, event assignments and individual task tracking, and connected each activity to its supporting documents.",
    kind: "Member, event, and center operations",
    teaser: "Member records, event assignments, and center activities.",
    description:
      "BK Planner helps Brahma Kumaris center teams organize members, campaigns, events, and local activities. A coordinator can open an event to see who is assigned, which tasks are complete, and where its documents are stored.",
    tools:
      "React · TypeScript · Vite · Redux Toolkit · RTK Query · Tailwind CSS",
    workflows: [
      [
        "Member directory",
        "Search member profiles, organize people into groups, and select members for events.",
      ],
      [
        "Events and tasks",
        "Link events to campaigns, assign tasks to event members, and track completion by person.",
      ],
      [
        "Center activities",
        "Coordinate hosts, teachers, and travel arrangements, and keep supporting files with the activity record.",
      ],
      [
        "Document management",
        "Attach files to members, centers, events, or activities. Coordinators can copy a document page link or share it via WhatsApp.",
      ],
    ],
    example: {
      title: "See how a coordinator plans an event",
      steps: [
        [
          "Create the event",
          "Set the date and link the event to a campaign when it is part of a broader initiative.",
        ],
        [
          "Assign people",
          "Select members from the directory and assign tasks to people already on the event.",
        ],
        [
          "Track progress",
          "Check completion for the event task and for each assigned member, with supporting files on the event record.",
        ],
      ],
      note: "Redux Toolkit holds shared application state, and RTK Query fetches and caches member, event, and activity records. The event editor sends additions and removals to the API when the list of assigned members changes.",
    },
  },
];

export const jobs = [
  {
    date: "Jul 2024 — Present",
    company: "Lamda Logs (formerly Elixir Techne)",
    title: "Full Stack Software Developer",
    summary:
      "Develop React applications for procurement, finance and distribution teams.",
    highlights: [
      "Build reusable forms and role-based interfaces for purchasing, budgeting and order fulfillment.",
      "Use unit tests and code reviews to check financial validations and state changes.",
      "Work with backend, design and QA teams to integrate REST APIs and debug changes across connected screens.",
    ],
  },
  {
    date: "Jan 2024 — Jun 2024",
    company: "The One Web Technology",
    title: "Full Stack Developer Intern",
    summary:
      "Built and deployed web applications using MongoDB, Express.js, React, Node.js, and shared Redux state.",
    highlights: [
      "Built responsive React screens and connected them to Express services.",
      "Implemented JWT authentication and validated inputs on REST endpoints.",
    ],
  },
];

export const certifications = [
  ["JavaScript Essentials 1", "Cisco Networking Academy"],
  ["Career Edge: Professional Development", "TCS iON"],
  ["Software Development & Problem Solving", "HackerRank"],
];
