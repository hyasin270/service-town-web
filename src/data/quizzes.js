export const quizzes = {
  serviceVsFeature: {
    title: 'Service or Feature?',
    description: 'Classify each scenario. Remember: if a field team could rebuild it in a week with AI, it\'s a feature.',
    questions: [
      {
        scenario: 'A lesson plan generator built specifically for Rawalpindi that only understands the HOTS rubric and can\'t adapt to other frameworks.',
        options: ['Service', 'Feature'],
        correct: 1,
        explanation: 'This is a feature — it\'s region-specific, single-framework, and lacks the depth and adaptability of a true service.',
      },
      {
        scenario: 'A Digital Coach that works across HOTS, OECD, TEACH, and FICO frameworks, auto-routes by region, normalizes scores to 0-100%, and feeds every observation back into improving future recommendations.',
        options: ['Service', 'Feature'],
        correct: 0,
        explanation: 'This is a service — it has pedagogical depth (multi-framework), technical depth (auto-routing, normalization), and data depth (feedback loops).',
      },
      {
        scenario: 'An API endpoint that returns a quiz for Grade 5 Math Chapter 3 when called with the right parameters.',
        options: ['Service', 'Feature'],
        correct: 1,
        explanation: 'This is a feature — it\'s an interface to content, not a deep subsystem. An API endpoint is a door, not the room behind it.',
      },
    ],
  },

  brokenService: {
    title: 'Fix the Broken Service',
    description: 'The Armory blacksmith needs your help. Each service has a missing layer — can you identify which one?',
    questions: [
      {
        scenario: 'Latency just spiked on the Digital Coach and nobody noticed for 3 days. Teachers were waiting 15 minutes for feedback. Which layer is missing?',
        options: ['Front Counter (Interface)', 'The Forge (Core Logic)', 'The Vault (Data)', 'The Watchers (Observability)'],
        correct: 3,
        explanation: 'The Watchers — observability. Without monitoring and alerts, problems go undetected until users complain.',
      },
      {
        scenario: 'The Lesson Plan service generates plans quickly and they\'re pedagogically sound, but teachers in Region Y keep saying they "can\'t find it" and adoption is at 12%.',
        options: ['Front Counter (Interface)', 'The Forge (Core Logic)', 'The Vault (Data)', 'The Watchers (Observability)'],
        correct: 0,
        explanation: 'The Front Counter — the interface layer. The service works well internally but the way teachers access it is broken or undiscoverable.',
      },
      {
        scenario: 'The Exam Generator creates tests, but scores vary wildly between regions because each one uses slightly different leniency settings and model versions.',
        options: ['Front Counter (Interface)', 'The Forge (Core Logic)', 'The Vault (Data)', 'The Watchers (Observability)'],
        correct: 1,
        explanation: 'The Forge — core logic. The domain rules aren\'t properly centralized. Same model and leniency settings should apply across all regions.',
      },
    ],
  },

  diagnosticDesk: {
    title: 'The Diagnostic Desk',
    description: 'Data reports arrive from the field. Read the numbers, diagnose the problem.',
    questions: [
      {
        scenario: 'Region X reports: FICO Fidelity Score = 72% (above target), but Student Learning Outcomes = 38% (well below 60% target).',
        options: ['Content problem — revise lesson plans', 'Coaching problem — increase visits', 'Adoption problem — fix the product', 'Everything is fine'],
        correct: 0,
        explanation: 'High fidelity + low outcomes = content problem. Teachers are following the plan faithfully, but the content itself isn\'t producing learning. Revise the lesson plan material.',
      },
      {
        scenario: 'Region Y reports: FICO Fidelity Score = 41% (below target), Student Learning Outcomes = 35% (below target).',
        options: ['Content problem — revise lesson plans', 'Coaching problem — intensify visits', 'Adoption problem — fix the product', 'Success — scale it'],
        correct: 1,
        explanation: 'Low fidelity + low outcomes = coaching problem. Teachers aren\'t following the plan AND students aren\'t learning. Intensify coaching and increase visit frequency.',
      },
      {
        scenario: 'Region Z reports: Lesson Plan Engagement = 48% (below 65% target). FICO and outcomes data are incomplete because there aren\'t enough observations.',
        options: ['Content problem — revise lesson plans', 'Coaching problem — intensify visits', 'Adoption problem — investigate usability + increase coach visits', 'Success — scale it'],
        correct: 2,
        explanation: 'Low LP engagement = adoption problem. Teachers aren\'t even using the plans. Product team investigates usability barriers; coaches increase visits to drive adoption.',
      },
    ],
  },
};
