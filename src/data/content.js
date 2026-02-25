export const sections = [
  {
    id: 'town-square',
    title: 'Welcome to Service Town',
    subtitle: 'What we mean by "services" — and why it matters',
    image: '/images/s01_title_service_town.jpg',
    paragraphs: [
      "There's a question that comes up in every growing edtech company, usually around the time they expand to their second or third region: should each team build their own tools, or should someone build shared ones?",
      "The obvious answer is shared tools. But if you've ever tried to use a \"shared tool\" built by a central team that's never been to your school district, you know what happens. It's generic to the point of uselessness. So the field teams build their own. Which works — until there are five field teams all building subtly different versions of the same thing.",
      "This is the problem that services are designed to solve. But the word \"service\" is dangerously vague. At Taleemabad, we mean something specific.",
      "A service is not a button in an app. It's not an API endpoint. A service is a deep, specialized subsystem. It has pedagogical depth — someone who understands how teachers actually teach spent months encoding that understanding into it. It has technical depth — it handles edge cases a weekend prototype wouldn't. And it has data depth — every interaction feeds back into making the next one better.",
      "Here's a useful test: if a forward deployed team could rebuild it in a week with an AI coding assistant, it's not a service. It's a feature. Features are fine. But they don't compound."
    ],
    pollQuestion: 'How clear is the "service vs feature" distinction to you?',
    pollOptions: ['Crystal clear', 'Mostly clear', 'Still fuzzy', 'Need more examples'],
  },
  {
    id: 'two-teams',
    title: 'The Squad & The Armory',
    subtitle: 'RED deploys. BLU builds. Together they compound.',
    image: '/images/s03_two_teams.jpg',
    paragraphs: [
      "The Squad (Forward Deployed / RED) deploys to a specific region. They're on the ground, in schools, talking to teachers. If the Armory doesn't have a tool they need, they build their own. Full autonomy to be unblocked — that's the rule.",
      "The Armory (Internally Deployed / BLU) doesn't go to schools. They build the deep infrastructure that makes field work compoundable. Where the Squad optimizes for this teacher today, the Armory optimizes for every teacher tomorrow.",
      "This isn't a hierarchy. It's a supply chain. The Squad discovers needs. The Armory centralizes solutions. The Squad consumes them and sends feedback. Repeat. The whole system only works when both teams stay connected."
    ],
    pollQuestion: 'What\'s the biggest friction between field teams and central services today?',
    pollOptions: ['Services don\'t fit our context', 'Too slow to ship', 'We don\'t know what\'s available', 'No feedback loop'],
  },
  {
    id: 'armory',
    title: 'Inside a Service',
    subtitle: 'Four layers. Cut open any service and you should find them all.',
    image: '/images/s05_service_anatomy.jpg',
    paragraphs: [
      "The Front Counter is the interface layer — APIs, UIs, agent/MCP interfaces. The mistake people make is thinking the interface IS the service. It's not. Three different doors can lead to the same room.",
      "The Forge is the core logic layer — and it's the most important one. This is where domain expertise lives. Not in the code, but in the decisions the code encodes. This layer needs documentation more than it needs clean code, because the people changing it need to understand why the current decisions were made.",
      "The Vault is the data layer — standardized storage, xAPI tracking, cross-regional normalization.",
      "The Watchers are observability — usage metrics, feedback loops, behavioral monitoring. How the service learns.",
      "Why four layers? When latency degrades, you look at the Forge. When teachers aren't using it, you look at the Front Counter. When you don't know any of this is happening, you look at the Watchers — and realize you forgot to build them."
    ],
    pollQuestion: 'Which layer do you think is most often neglected?',
    pollOptions: ['Front Counter (Interface)', 'The Forge (Core Logic)', 'The Vault (Data)', 'The Watchers (Observability)'],
  },
  {
    id: 'six-buildings',
    title: 'Six Buildings. Six Services.',
    subtitle: 'Each building in Service Town houses a different capability.',
    image: '/images/s04_six_services.jpg',
    paragraphs: [
      "Service Town has six buildings. Each one represents a deep, specialized service that the Armory maintains and the Squad consumes.",
    ],
  },
  {
    id: 'standards-gate',
    title: 'The Standards Gate',
    subtitle: 'Every tool leaving the Armory must pass three inspections.',
    image: '/images/s05_standards_gate.jpg',
    paragraphs: [
      "Standards exist because the theory of change only works if every link holds. A lesson plan that takes 10 minutes to generate breaks the adoption layer. A coaching tool that gives inconsistent scores breaks the quality layer. An exam that tests content never taught breaks the impact layer.",
      "We organize standards into three pillars. Each one protects a different part of the system."
    ],
    pollQuestion: 'Which pillar do you think needs the most attention right now?',
    pollOptions: ['Technical', 'Pedagogical', 'Product'],
  },
  {
    id: 'three-pillars',
    title: 'Three Pillars of Standards',
    subtitle: 'Technical. Pedagogical. Product.',
    image: '/images/s06_technical_pillar.jpg',
    paragraphs: [],
  },
  {
    id: 'observatory',
    title: 'The Observatory',
    subtitle: 'Data along the theory of change — how we know if any of it matters.',
    image: '/images/s11_metrics_pyramid.jpg',
    paragraphs: [
      "Everything at Taleemabad traces back to one question: did the student learn? But you can't just measure outcomes. By the time you discover students in District X scored 20% lower, it's too late. You need the whole chain of leading indicators.",
      "Think of it as a series of questions, each building on the last. Who is the teacher? Who is the student? Did they show up? Did the teacher get the lesson plan? Did she teach it well? Did the students learn? Is the teacher growing over time?",
      "We expect to measure all of this within our platforms — across 60 database tables, ~1,950 teachers, and 45,000+ daily interactions. When any link breaks, the data tells us where."
    ],
    pollQuestion: 'Which part of the theory of change does your team focus on most?',
    pollOptions: ['Access & registration', 'Lesson plan delivery', 'Teaching quality (FICO)', 'Student outcomes'],
  },
  {
    id: 'evolution',
    title: 'How Services Evolve',
    subtitle: 'From hack to platform. Not every service reaches Phase 3 — but every one should be designed as if it will.',
    image: '/images/s16_service_evolution.jpg',
    paragraphs: [
      "Not every service starts fully realized. Most start as a hack. That's fine. What matters is the trajectory.",
      "Phase 1 (now): built by the Armory, consumed by Squads, one region drives requirements. Phase 2 (Q2-Q3): same service, three or more regions, config-driven adaptation, A/B testing across regions. Phase 3 (Q4+): externally available — partners consume via MCP/OpenAPI, self-describing APIs with pedagogical context in the metadata.",
      "All service work follows the academic calendar. Action Mode on teaching days: in schools, observing, testing. Sense-Making Mode during breaks: building, analyzing, planning. Match the rhythm."
    ],
    pollQuestion: 'Where is your primary service in its evolution?',
    pollOptions: ['Phase 1 — Single region', 'Phase 2 — Multi-region', 'Phase 3 — External', 'Not sure yet'],
  },
  {
    id: 'closing',
    title: 'Build Deep. Ship Wide. Teach Well.',
    subtitle: 'The standards board is now open.',
    image: '/images/s12_closing.jpg',
    paragraphs: [
      "Services aren't bureaucracy. They're leverage. A well-built service means the next team in the next province doesn't start from zero — they start from everything every team before them learned.",
      "Technical standards ensure it works. Pedagogical standards ensure it teaches. Product standards ensure it's used. The priority metrics tell you whether any of it matters in a classroom.",
      "We don't want to overwhelm teams with thirty standards on day one. Start with three per service — probably latency, gradual release, and engagement tracking. Measure them. Make them non-negotiable. Add the next tier in Q2. Full enforcement by Q3. By then, the muscle memory exists.",
      "The standards board is now open. Build accordingly."
    ],
    pollQuestion: 'How ready do you feel to apply these standards to your work?',
    pollOptions: ['Ready to go', 'Need a workshop first', 'Need to discuss with my team', 'Still have questions'],
  },
];

export const buildings = [
  { id: 'watchtower', name: 'Watchtower', service: 'Digital Coach', team: 'Digital Coach Team', consumers: 'Rawalpindi, Balochistan, FDE', status: 'Active', left: '4%', top: '8%', width: '17%', height: '52%' },
  { id: 'library', name: 'Library', service: 'Lesson Plans', team: 'LP Team', consumers: 'Rawalpindi, NIETE, FDS', status: 'Active', left: '2%', top: '64%', width: '21%', height: '30%' },
  { id: 'registry', name: 'Registry Office', service: 'User Management', team: 'Programs & Ops', consumers: 'Regional teams', status: 'Active', left: '30%', top: '15%', width: '22%', height: '40%' },
  { id: 'exam-hall', name: 'Examination Hall', service: 'Exam Generator', team: 'Assessment Team', consumers: 'Teachers via Rumi', status: 'Active', left: '30%', top: '58%', width: '24%', height: '32%' },
  { id: 'observatory', name: 'Observatory', service: 'Data & Analytics', team: 'Data Team', consumers: 'Leadership, policy, research', status: 'Building', left: '63%', top: '3%', width: '20%', height: '44%' },
  { id: 'training', name: 'Training Grounds', service: 'Teacher Training', team: 'Training Team', consumers: 'Programs, coaches', status: 'Active', left: '63%', top: '52%', width: '32%', height: '38%' },
];
