export const pillars = {
  technical: {
    name: 'Technical',
    color: 'blu-team',
    image: '/images/s06_technical_pillar.jpg',
    tagline: 'Is it battle-ready?',
    description: 'Technical standards protect reliability. You either hit the bar or you don\'t.',
    standards: [
      {
        id: 'T1', name: 'Uptime', detail: '\u226599.5% during school hours (8am\u20133pm local time)',
        deeper: 'Measured per-service, not aggregate. A 99.5% average that hides a service at 95% is a lie. Monitor each building in Service Town independently. Alert on degradation before teachers notice.',
      },
      {
        id: 'T2', name: 'Latency SLAs', detail: 'Digital Coach: 10 min, Lesson Plans: 60 sec, Exams: 30 sec',
        deeper: 'Each service has a different acceptable wait time based on the workflow context. A teacher waiting for a lesson plan during class needs it in 60 seconds. A Digital Coach observation can process asynchronously in 10 minutes. These aren\'t arbitrary \u2014 they\'re designed around the teacher\'s moment of need.',
      },
      {
        id: 'T3', name: 'Diarization Accuracy', detail: 'Teacher vs. student voice separation \u226590%',
        deeper: 'The Digital Coach needs to distinguish who is speaking. If it attributes a student\'s answer to the teacher, the FICO score becomes meaningless. 90% is the floor before analysis becomes unreliable. Validate against hand-labeled samples per region.',
      },
      {
        id: 'T5', name: 'Framework Interop', detail: 'HOTS / OECD / TEACH / FICO all normalize to 0\u2013100%',
        deeper: 'Different regions use different observation frameworks. A teacher in Rawalpindi is assessed via HOTS, another in Balochistan via FICO. The service must speak all dialects and translate to a common scale so cross-regional comparison is meaningful.',
      },
      {
        id: 'T6', name: 'Model Consistency', detail: 'Same model + leniency settings across ALL teachers',
        deeper: 'No hidden thumbs on the scale. If two teachers deliver the same lesson, they should get the same score regardless of which server processed them. Version-lock models per scoring cycle. Audit for drift monthly.',
      },
      {
        id: 'T8', name: 'Multi-Region Routing', detail: 'Config-driven, no code changes per region',
        deeper: 'Adding Region Y should not require deploying new code. Configuration files \u2014 not feature branches \u2014 control regional behavior: language, curriculum framework, assessment rubric, school calendar. The same binary serves all regions.',
      },
      {
        id: 'T9', name: 'Offline Resilience', detail: 'Core functions degrade gracefully on poor connectivity',
        deeper: 'Many LMIC schools have intermittent connectivity. Lesson plans should cache. Observations should queue. The app should never show a blank screen. Design for "works offline, syncs when possible" \u2014 not "requires internet."',
      },
      {
        id: 'T10', name: 'Security & Privacy', detail: 'PII scrubbing, FERPA/GDPR compliance, audit trails',
        deeper: 'Student data is sacred. Teacher voice recordings must be handled with consent. PII must be scrubbed from analytics pipelines. Every data access is logged. This isn\'t optional \u2014 it\'s the price of entry for working with schools.',
      },
    ],
  },
  pedagogical: {
    name: 'Pedagogical',
    color: 'red-team',
    image: '/images/s07_pedagogical_pillar.jpg',
    tagline: 'Does it follow the doctrine?',
    description: 'These are the accumulated wisdom of structured pedagogy research \u2014 the 105:1 benefit-cost ratio Cambridge measured, the Bridge International model, TIP Pakistan\'s diagnostic cycles.',
    standards: [
      {
        id: 'P1', name: 'Gradual Release', detail: 'I Do \u2192 We Do \u2192 You Do. Every lesson, no exceptions.',
        deeper: 'This is the backbone of structured pedagogy. The teacher models (I Do), practices collaboratively (We Do), then students work independently (You Do). Every lesson plan our service generates must follow this arc. No shortcuts, no "watch this video" as a substitute for modeling.',
      },
      {
        id: 'P2', name: 'Sequential Knowledge', detail: 'Every SLO builds on the previous.',
        deeper: 'Services must know what came before and after in the curriculum. A lesson on fractions should know that students learned division last week. The Exam Generator should never test content that hasn\'t been taught yet. Sequence awareness is non-negotiable.',
      },
      {
        id: 'P3', name: 'Curriculum Continuity', detail: 'Pre-generated sequences. The system knows what was taught last week.',
        deeper: 'Lesson plans aren\'t generated in isolation. The system maintains a teaching timeline per class. If the teacher was on Chapter 3 last Tuesday, this Tuesday starts where Chapter 3 ended. No orphaned lessons, no repeated content, no gaps.',
      },
      {
        id: 'P4', name: 'Recall Integration', detail: 'Every lesson includes recall from prior learning.',
        deeper: 'Research shows that retrieval practice \u2014 asking students to recall previously learned material \u2014 is one of the most effective learning strategies. Every lesson plan must begin with a recall activity. The service should auto-generate appropriate recall questions from prior SLOs.',
      },
      {
        id: 'P5', name: 'Standards Alignment', detail: 'SNC 2020 (Pakistan) or relevant national curriculum.',
        deeper: 'Every SLO, lesson plan, and exam question maps to a national curriculum standard. In Pakistan, that\'s SNC 2020. In other regions, it\'s their equivalent. The mapping must be explicit \u2014 not "this roughly covers Grade 5 Math" but "this targets SNC 5.2.3: Fractions as parts of a whole."',
      },
      {
        id: 'P6', name: 'Cross-Curricular Awareness', detail: 'Surface connections between subjects (Phase 2 vision).',
        deeper: 'A Phase 2 ambition: when the Grade 5 Math lesson covers ratios, the system surfaces that Grade 5 Science is currently teaching concentration \u2014 a natural cross-curricular connection. This requires curriculum graph awareness across subjects.',
      },
    ],
  },
  product: {
    name: 'Product',
    color: 'gold',
    image: '/images/s08_product_pillar.jpg',
    tagline: 'Will the teacher actually use it?',
    description: 'Product standards are the hardest to define \u2014 and the most interesting. Backend decisions shape the experience more than most people realize.',
    standards: [
      {
        id: 'X1', name: 'Engagement Tracking', detail: 'Real classroom usage, not app opens. Behavioral telemetry.',
        deeper: 'An app open is not engagement. Did the teacher use the lesson plan in class? Did they follow it or abandon it midway? Behavioral telemetry \u2014 scroll depth, time-on-section, modification patterns \u2014 tells the real story. Build this into every service from day one.',
      },
      {
        id: 'X2', name: 'Teacher Agency Loop', detail: 'Deliver \u2192 teacher responds \u2192 next iteration improves.',
        deeper: 'Teachers aren\'t passive consumers. When a teacher modifies a lesson plan, that\'s signal. When they skip a section, that\'s signal. The service must capture these responses and use them to improve future outputs. The teacher is a co-creator, not an end user.',
      },
      {
        id: 'X3', name: 'Feedback Mechanism', detail: 'Thumbs up/down, iteration requests, "not possible" \u2014 built into every output.',
        deeper: 'Every piece of content the service generates should have a lightweight feedback mechanism. Not a survey \u2014 a single tap. "This worked." "This didn\'t." "This isn\'t possible in my context." Aggregate this per region to surface systemic issues.',
      },
      {
        id: 'X4', name: 'Progressive Onboarding', detail: 'Don\'t overwhelm on first use. Intelligent defaults.',
        deeper: 'A new teacher in their first week should see a simple, opinionated experience. Advanced features reveal themselves over time. Never show 47 configuration options on the first screen. Default to the most common regional setup and let teachers customize later.',
      },
      {
        id: 'X5', name: 'Mobile-First LMIC Design', detail: 'Low bandwidth, small screens, Urdu-first.',
        deeper: 'Our teachers use budget Android phones on 3G/4G connections. Every feature must work on a 5.5" screen. Images must be compressed. Urdu is the primary language \u2014 English is secondary. Right-to-left layout must be tested. 100KB budget per page load.',
      },
      {
        id: 'X7', name: 'A/B Testing Rigor', detail: 'Thompson Sampling / Wilson Score \u2014 statistical rigor, not gut instinct.',
        deeper: 'When we test a new lesson plan format vs. the existing one, we need proper statistical methods. Thompson Sampling for adaptive allocation, Wilson Score for confidence intervals. No more "it felt like teachers liked it better." Measure. Prove. Then scale.',
      },
      {
        id: 'X8', name: 'Behavioral Observability', detail: '"Is it being used well?" not just "is it up?"',
        deeper: 'Technical uptime tells you the server is running. Behavioral observability tells you if the service is doing its job. Track rejection rate (how often teachers dismiss outputs), modification rate (how much they change them), and time-to-value (how quickly they get useful output).',
      },
      {
        id: 'X10', name: 'Interoperability', detail: 'MCP-ready, consumable by agents, APIs, and UIs.',
        deeper: 'Every service should be accessible via multiple interfaces: a human UI, a REST API, and an MCP/agent interface. The same Lesson Plan service that a teacher accesses via the app should be callable by Rumi, by a third-party LMS, or by a government reporting system.',
      },
    ],
  },
};
