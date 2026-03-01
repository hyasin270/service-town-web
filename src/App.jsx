import React from 'react';
import { sections } from './data/content';
import { quizzes } from './data/quizzes';
import SideNav from './components/SideNav';
import TownMap from './components/TownMap';
import Section from './components/Section';
import Poll from './components/Poll';
import CommentBox from './components/CommentBox';
import Quiz from './components/Quiz';
import PillarTabs from './components/PillarTabs';
import BuildingCards from './components/BuildingCard';
import GlowingForge from './components/animations/GlowingForge';
import DataStream from './components/animations/DataStream';
import ObservatoryBeacon from './components/animations/ObservatoryBeacon';
import TorchFlicker from './components/animations/TorchFlicker';

function LessonPlanExamples() {
  const [expanded, setExpanded] = React.useState(null);
  const plans = [
    { id: 'lp1', label: 'Rumi Lesson Plan', src: '/images/lesson-plans/lp1_photosynthesis.png', desc: 'Photosynthesis — multi-section weekly overview with Oral Language, Science, Reading, Writing blocks. Generated via hellorumi.ai.' },
    { id: 'lp2', label: 'Zavia Lesson Plan', src: '/images/lesson-plans/lp2_whatsapp.png', desc: 'Sent as plain text on WhatsApp. No formatting structure, no tracking, no feedback mechanism.' },
    { id: 'lp3', label: 'UGLP Lesson Plan', src: '/images/lesson-plans/lp3_fractions.png', desc: 'Fractions — simple web page with SLO, Hook, and content. Different format, different structure, no shared spine.' },
  ];

  return (
    <div className="fade-in mb-8">
      <p className="font-display text-2xl text-text mb-1">The Problem Without Standards</p>
      <p className="text-text-secondary text-sm mb-4">Three lesson plans. Three different formats. Three different places. No coherent spine. No shared pedagogical standards. No tracking for effectiveness.</p>
      <div className="space-y-2">
        {plans.map(lp => (
          <div key={lp.id} className="border border-border rounded-lg overflow-hidden bg-surface">
            <button
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-[rgba(212,168,67,0.05)] transition-colors"
              onClick={() => setExpanded(expanded === lp.id ? null : lp.id)}
            >
              <span className="text-gold text-lg">{expanded === lp.id ? '▾' : '▸'}</span>
              <span className="font-semibold text-text text-sm flex-1 font-ui">{lp.label}</span>
              <span className="text-text-muted text-xs font-ui">click to {expanded === lp.id ? 'collapse' : 'expand'}</span>
            </button>
            {expanded === lp.id && (
              <div className="px-4 pb-4">
                <p className="text-text-muted text-xs mb-3 italic">{lp.desc}</p>
                <img src={lp.src} alt={lp.label} className="w-full h-auto rounded border border-border" />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="text-red-team/80 text-sm mt-3 font-medium">
        This is what happens without a service. Each team invents its own format. None of them talk to each other.
      </p>
    </div>
  );
}

function ServiceLayer({ image, title, subtitle, text, detail, animation }) {
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    if (!imgRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-image-visible');
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [image]);

  return (
    <div className="mb-10">
      {/* Layer title bar */}
      <div className="bg-surface px-6 py-3 border-l-2 border-gold">
        <h3 className="font-display text-2xl md:text-3xl text-text">{title}</h3>
        {subtitle && <p className="text-text-secondary text-sm font-ui">{subtitle}</p>}
      </div>
      {/* Animation (if any) */}
      {animation}
      {/* Full-width image with entrance animation */}
      <div ref={imgRef} className="section-image-container">
        <img src={image} alt={title} className="w-full h-auto block" />
      </div>
      {/* Text content below */}
      <div className="max-w-[680px] mx-auto px-6 py-10">
        <p className="fade-in text-text text-[1.125rem] leading-[1.8] mb-3">{text}</p>
        <p className="fade-in text-text-secondary text-[0.95rem] leading-relaxed italic">{detail}</p>
      </div>
    </div>
  );
}

function Divider() {
  return (
    <div className="town-divider">
      <TorchFlicker />
    </div>
  );
}

function ScrollProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return <div className="scroll-progress" style={{ width: `${progress}%` }} />;
}

function App() {
  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <SideNav />

      {/* Hero — the town map IS the entry point */}
      <TownMap />

      {/* Section 1: Town Square — What is a Service? */}
      <Section {...sections[0]}>
        <div className="callout-box fade-in mb-6">
          <p className="font-semibold text-text text-[1.05rem] mb-3">
            What Makes Something a Service?
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-3">
            Two things. It's <strong className="text-text">central</strong> — it lives in the Armory, consumed by every Squad. And it's either:
          </p>
          <ul className="text-text-secondary text-[0.92rem] space-y-2 mb-3">
            <li className="flex gap-2"><span className="text-gold font-bold">1.</span> <strong className="text-text">Sufficiently complex</strong> — it encodes months of business logic, pedagogical research, or data normalization that no single FDS team could (or should) replicate</li>
            <li className="flex gap-2"><span className="text-gold font-bold">2.</span> <strong className="text-text">Abnormally simple and accessible</strong> — it delivers a unique flow (often on WhatsApp) that the forward deployed team finds inherently useful. Not because they're lazy — because it's genuinely valuable and they can't be bothered to rebuild it</li>
          </ul>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-2">
            The value lives in one of three places: <em>complex business logic</em> that's been carefully imported, <em>technical + pedagogical soundness</em> validated against <a href="#standards-gate" className="text-gold underline hover:text-gold/80">the standards below</a>, or a <em>unique delivery mechanism</em> that people actually want.
          </p>
          <p className="text-text-muted text-[0.88rem] leading-relaxed italic">
            If a forward deployed team could rebuild it in a week with an AI coding assistant, it's a feature, not a service. Features are fine. But they don't compound.
          </p>
        </div>
        <Quiz quiz={quizzes.serviceVsFeature} />
        <Poll
          sectionId={sections[0].id}
          question={sections[0].pollQuestion}
          options={sections[0].pollOptions}
        />
        <CommentBox sectionId={sections[0].id} />
      </Section>

      <Divider />

      {/* Section 2: Two Teams */}
      <Section {...sections[1]}>
        <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="callout-box red !pl-10">
            <h4 className="font-display text-xl text-red-team mb-2">RED — The Squad</h4>
            <ul className="text-sm text-text-secondary space-y-1.5">
              <li className="flex gap-2"><span className="text-red-team">▸</span> Forward Deployed to a region</li>
              <li className="flex gap-2"><span className="text-red-team">▸</span> Speed &amp; autonomy</li>
              <li className="flex gap-2"><span className="text-red-team">▸</span> Ships weekly</li>
              <li className="flex gap-2"><span className="text-red-team">▸</span> On the ground in schools</li>
            </ul>
          </div>
          <div className="callout-box blue !pl-10">
            <h4 className="font-display text-xl text-blu-team mb-2">BLU — The Armory</h4>
            <ul className="text-sm text-text-secondary space-y-1.5">
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Internally Deployed</li>
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Depth &amp; reusability</li>
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Builds for everyone</li>
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Learns from all regions</li>
            </ul>
          </div>
        </div>

        <div className="callout-box fade-in mb-6">
          <p className="text-text-secondary text-[0.95rem] leading-relaxed">
            <strong className="text-text">This isn't a hierarchy. It's a supply chain.</strong> The Squad discovers needs. The Armory centralizes solutions. The Squad consumes them and sends feedback. Repeat. The whole system only works when both teams stay connected.
          </p>
        </div>

        <div className="callout-box blue fade-in mb-6">
          <p className="font-semibold text-text text-[1.05rem] mb-2">
            Who Owns the Front-End?
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-2">
            The customer of the Services team is the FDS team. The product is measured by <strong className="text-text">accessibility</strong> and <strong className="text-text">how quickly people in FDS can use it</strong>.
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-2">
            FDS teams often build their own front-ends — that's expected and encouraged. But <a href="#three-pillars" className="text-blu-team underline hover:text-blu-team/80">Product Standards</a> still apply: they measure the usability of what you've built, its accessibility for the forward deployed team, and ultimately for the end user.
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed">
            The Services team owns the service — the back-end, the logic, the data. Their jurisdiction extends to ensuring the <em>interface</em> is consumable. The FDS team owns the last mile. The line is drawn at consumption: the service must be so good that field teams <strong className="text-text">want</strong> to use it as-is.
          </p>
        </div>

        <Poll
          sectionId={sections[1].id}
          question={sections[1].pollQuestion}
          options={sections[1].pollOptions}
        />
        <CommentBox sectionId={sections[1].id} />
      </Section>

      <Divider />

      {/* Section 3: The Armory / Service Anatomy — Four Layers */}
      <Section {...sections[2]}>
        <ServiceLayer
          image="/images/interiors/front_counter.jpg"
          title="The Front Counter"
          subtitle="The Interface Layer"
          text="A teacher in Rawalpindi opens WhatsApp and asks Rumi for tomorrow's lesson plan. A coach in Balochistan opens the NIETE app and taps 'Start Observation.' An engineer in FDE calls an API to pull student data. Three different people, three different entry points — but the same service underneath. That's the Front Counter: the door you walk through to reach the service. The mistake people make is thinking the door IS the service. It's not."
          detail="Digital Coach works through the NIETE app in ICT, a standalone app in Balochistan, and soon via Rumi on WhatsApp. Same coaching logic, different front doors. If teachers in a new region need the service on a different platform, you build a new Front Counter — you don't rebuild the whole service."
        />

        <ServiceLayer
          image="/images/interiors/the_forge.jpg"
          title="The Forge"
          subtitle="The Core Logic Layer"
          text="Anyone can build a lesson plan generator with ChatGPT in a weekend. But will it know that today's Photosynthesis lesson should connect to last week's Plant Structure lesson? Will it follow gradual release — I Do, We Do, You Do? Will it align to SNC 2020? Will it build in recall from prior learning? That's the difference between a feature and a service. The Forge is where months of pedagogical research get hammered into logic."
          detail="When you ask Rumi to generate a Grade 5 Math lesson on fractions, the Forge already knows what the students learned last week, which SLOs to target, and how to structure the lesson for structured pedagogy. That depth is why the field teams use it instead of building their own."
          animation={<GlowingForge />}
        />

        <ServiceLayer
          image="/images/interiors/the_vault.jpg"
          title="The Vault"
          subtitle="The Data Layer"
          text="The policy team needs to compare coaching effectiveness across Rawalpindi and Balochistan to design a new intervention. But Rawalpindi stores observation scores as percentages, Balochistan uses a 1-5 scale, and FDE records raw rubric tallies. 'Teacher observation score' means three different things in three different databases. The Vault fixes this — it standardizes how every service stores data, so that a score of 75 in Rawalpindi means the same thing as 75 in Balochistan."
          detail="Every interaction with every service generates data. The Vault normalizes it across regions, enforces validation rules, and makes cross-regional comparison reliable — so that when you pull numbers for an intervention design or a policy brief, you can trust them without spending weeks cleaning data first."
          animation={<DataStream />}
        />

        <div className="callout-box fade-in mb-6 max-w-[680px] mx-auto px-6">
          <p className="font-semibold text-text text-[1.05rem] mb-2">
            The Centralized Data Layer
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-3">
            Right now, different teams access different databases with different schemas and no shared rules around validation and accuracy. The Vault changes this. As more services are consumed across regions, their data converges into a <strong className="text-text">single source of truth</strong> — normalized, validated, and queryable.
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-2">
            <strong className="text-text">What changes:</strong> The underlying infrastructure becomes unified. Schemas are standardized. Validation rules are enforced. Cross-regional comparisons become reliable instead of approximate.
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed">
            <strong className="text-text">What stays the same:</strong> If you already have direct access to data for designing interventions or policy research, you keep it — with the relevant guardrails. The experience stays roughly the same. The data just gets more trustworthy.
          </p>
        </div>

        <ServiceLayer
          image="/images/interiors/the_watchers.jpg"
          title="The Watchers"
          subtitle="The Observability Layer"
          text="Last Thursday, lesson plan generation slowed from 30 seconds to 3 minutes. Nobody at HQ noticed. A coach in the field complained on Monday — four days later. In the meantime, 200 teachers either waited or gave up. That's what happens without The Watchers: the layer that monitors usage, tracks feedback, and flags problems before the field has to complain."
          detail="When LP engagement drops from 65% to 40% in a single week, is it a product bug or a school holiday? When coaches stop opening Digital Coach after their fifth observation, is it fatigue or a UX problem? The Watchers know the difference — and alert the team before leadership has to ask."
        />

        <div className="callout-box fade-in mb-6">
          <p className="font-semibold text-text text-[1.05rem] mb-2">
            When Something Goes Wrong
          </p>
          <ul className="text-text-secondary text-[0.92rem] space-y-2">
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> <strong className="text-text">Lesson plans take too long to generate?</strong> Look at The Forge — the core logic is the bottleneck.</li>
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> <strong className="text-text">Teachers aren't using Digital Coach?</strong> Look at the Front Counter — the interface isn't meeting them where they are.</li>
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> <strong className="text-text">Observation scores don't match across regions?</strong> Look at the Vault — the data isn't normalized.</li>
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> <strong className="text-text">You didn't know any of this was happening?</strong> You forgot to build The Watchers.</li>
          </ul>
        </div>

        <Quiz quiz={quizzes.brokenService} />
        <Poll
          sectionId={sections[2].id}
          question={sections[2].pollQuestion}
          options={sections[2].pollOptions}
        />
        <CommentBox sectionId={sections[2].id} />
      </Section>

      <Divider />

      {/* Section 4: Six Buildings */}
      <Section {...sections[3]}>
        <BuildingCards />
        <CommentBox sectionId={sections[3].id} />
      </Section>

      <Divider />

      {/* Section 5: Standards Gate */}
      <Section {...sections[4]}>
        <LessonPlanExamples />

        <div className="callout-box fade-in mb-6">
          <p className="font-semibold text-text text-[1.05rem] mb-2">
            Why Standards?
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-3">
            Our theory of change is a chain: <strong className="text-text">Inputs → Adoption → Quality → Impact</strong>. Every link must hold. Standards protect each link:
          </p>
          <ul className="text-text-secondary text-[0.92rem] space-y-2">
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> A lesson plan that takes 10 minutes to generate breaks the <em>adoption</em> layer</li>
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> A coaching tool with inconsistent scores breaks the <em>quality</em> layer</li>
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> An exam testing content never taught breaks the <em>impact</em> layer</li>
          </ul>
        </div>

        <div className="fade-in bg-surface-alt rounded-lg p-5 mb-6">
          <p className="font-display text-xl text-text mb-2">Progressive Enforcement</p>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-surface rounded-lg p-3 border border-border">
              <p className="font-display text-lg text-gold">Q1</p>
              <p className="text-text-muted text-xs mt-1">Start with 3 standards per service. Measure them. Make them non-negotiable.</p>
            </div>
            <div className="bg-surface rounded-lg p-3 border border-border">
              <p className="font-display text-lg text-blu-team">Q2</p>
              <p className="text-text-muted text-xs mt-1">Add the next tier. Expand coverage across services.</p>
            </div>
            <div className="bg-surface rounded-lg p-3 border border-border">
              <p className="font-display text-lg text-red-team">Q3</p>
              <p className="text-text-muted text-xs mt-1">Full enforcement. Muscle memory exists. Standards are culture.</p>
            </div>
          </div>
        </div>

        <Poll
          sectionId={sections[4].id}
          question={sections[4].pollQuestion}
          options={sections[4].pollOptions}
        />
        <CommentBox sectionId={sections[4].id} />
      </Section>

      <Divider />

      {/* Section 6: Three Pillars (tabbed) */}
      <Section {...sections[5]}>
        <PillarTabs />
        <CommentBox sectionId={sections[5].id} />
      </Section>

      <Divider />

      {/* Section 7: Observatory — Theory of Change */}
      <Section {...sections[6]}>
        <ObservatoryBeacon />

        <div className="fade-in mb-8">
          <p className="font-display text-2xl text-text mb-1">The Theory of Change</p>
          <p className="text-text-secondary text-sm mb-5">Each step is a question we need to answer. Track the chain, find the break.</p>

          <div className="space-y-1">
            {[
              { num: 1, q: 'Who is the teacher?', what: 'Registration & user management', metric: 'Teachers onboarded, profiles complete', color: 'bg-dusty' },
              { num: 2, q: 'Who is the student?', what: 'Enrollment & student rostering', metric: 'Students enrolled, names + roll numbers', color: 'bg-dusty' },
              { num: 3, q: 'Did they show up?', what: 'Attendance tracking', metric: 'Daily presence per student', color: 'bg-blu-team' },
              { num: 4, q: 'Did the teacher get the lesson plan?', what: 'Lesson plan delivery & engagement', metric: 'LP engagement — target 65%', color: 'bg-blu-team' },
              { num: 5, q: 'Did she teach it well?', what: 'Classroom observation & coaching', metric: 'FICO fidelity score, coach visits (target: 5/day)', color: 'bg-red-team' },
              { num: 6, q: 'Did the students learn?', what: 'Assessment & learning outcomes', metric: 'Exam scores, reading fluency (WCPM)', color: 'bg-gold' },
              { num: 7, q: 'Is the teacher growing?', what: 'Longitudinal improvement tracking', metric: 'Teaching dimension scores, progress over time', color: 'bg-gold' },
            ].map((step, i) => (
              <div key={step.num}>
                <div className="toc-step">
                  <div className={`toc-num ${step.color}`}>{step.num}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text text-sm">{step.q}</p>
                    <p className="text-text-muted text-xs mt-0.5">{step.what}</p>
                  </div>
                  <p className="text-text-muted text-xs text-right hidden md:block max-w-[200px] font-ui">{step.metric}</p>
                </div>
                {i < 6 && <div className="toc-arrow">↓</div>}
              </div>
            ))}
          </div>
        </div>

        <div className="callout-box blue fade-in mb-6">
          <p className="font-semibold text-text text-[1.05rem] mb-2">
            Who Uses the Observatory?
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-3">
            The Observatory isn't just for engineers. It's the centralized data layer that serves everyone who needs to make decisions from data:
          </p>
          <ul className="text-text-secondary text-[0.92rem] space-y-2 mb-3">
            <li className="flex gap-2"><span className="text-blu-team font-bold">▸</span> <strong className="text-text">Policy &amp; Research teams</strong> — designing interventions, analyzing cross-regional trends, reporting to government partners</li>
            <li className="flex gap-2"><span className="text-blu-team font-bold">▸</span> <strong className="text-text">Program teams</strong> — tracking coaching visits, teacher engagement, implementation fidelity</li>
            <li className="flex gap-2"><span className="text-blu-team font-bold">▸</span> <strong className="text-text">Leadership</strong> — strategic dashboards, outcome tracking, resource allocation</li>
            <li className="flex gap-2"><span className="text-blu-team font-bold">▸</span> <strong className="text-text">Service teams</strong> — monitoring their own usage, latency, and feedback loops</li>
          </ul>
          <p className="text-text-muted text-[0.88rem] leading-relaxed italic">
            The data team's responsibility is to make this layer reliable, accessible, and honest — so that everyone from a policy researcher to a regional coach can trust what they see.
          </p>
        </div>

        <div className="callout-box fade-in mb-6">
          <p className="font-semibold text-text text-[1.05rem] mb-2">
            When Metrics Disagree
          </p>
          <p className="text-text-secondary text-[0.95rem] leading-relaxed mb-2">
            The disagreement <em>is</em> the diagnosis:
          </p>
          <ul className="text-text-secondary text-[0.92rem] space-y-1.5">
            <li><strong className="text-text">High fidelity + low outcomes</strong> → Content problem (lesson plan material needs revision)</li>
            <li><strong className="text-text">Low fidelity + low outcomes</strong> → Coaching problem (intensify visits)</li>
            <li><strong className="text-text">Low LP engagement</strong> → Adoption problem (fix the product or increase inputs)</li>
          </ul>
        </div>

        <Quiz quiz={quizzes.diagnosticDesk} />
        <Poll
          sectionId={sections[6].id}
          question={sections[6].pollQuestion}
          options={sections[6].pollOptions}
        />
        <CommentBox sectionId={sections[6].id} />
      </Section>

      <Divider />

      {/* Section 8: Evolution */}
      <Section {...sections[7]}>
        <div className="fade-in mb-6">
          <div className="rounded-lg overflow-hidden border border-border mb-6">
            <img
              src="/images/s10_rhythm.jpg"
              alt="Action Mode vs Sense-Making Mode"
              className="w-full h-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { phase: '1', title: 'Now', desc: 'One region drives. Armory builds, Squads consume.', color: 'border-dusty', bg: 'bg-[rgba(196,160,106,0.08)]' },
              { phase: '2', title: 'Q2-Q3', desc: '3+ regions. Config-driven adaptation. A/B testing.', color: 'border-blu-team', bg: 'bg-[rgba(91,143,192,0.08)]' },
              { phase: '3', title: 'Q4+', desc: 'External partners. MCP/OpenAPI. Self-describing APIs.', color: 'border-gold', bg: 'bg-[rgba(212,168,67,0.08)]' },
            ].map(p => (
              <div key={p.phase} className={`p-4 ${p.bg} rounded-lg border-t-4 ${p.color} text-center`}>
                <span className="font-display text-3xl text-text">Phase {p.phase}</span>
                <p className="text-xs font-bold text-gold mt-1 uppercase tracking-wider font-ui">{p.title}</p>
                <p className="text-sm text-text-secondary mt-3 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Poll
          sectionId={sections[7].id}
          question={sections[7].pollQuestion}
          options={sections[7].pollOptions}
        />
        <CommentBox sectionId={sections[7].id} />
      </Section>

      <Divider />

      {/* Section 9: Closing */}
      <Section {...sections[8]}>
        <div className="fade-in py-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(91,143,192,0.08)] border-l-4 border-blu-team">
              <span className="stamp text-blu-team text-xs">TECH</span>
              <p className="text-[1.05rem] font-semibold text-text">Technical standards ensure it <em>works</em>.</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(224,85,80,0.08)] border-l-4 border-red-team">
              <span className="stamp text-red-team text-xs">PED</span>
              <p className="text-[1.05rem] font-semibold text-text">Pedagogical standards ensure it <em>teaches</em>.</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-[rgba(212,168,67,0.08)] border-l-4 border-gold">
              <span className="stamp text-gold text-xs">PROD</span>
              <p className="text-[1.05rem] font-semibold text-text">Product standards ensure it's <em>used</em>.</p>
            </div>
          </div>
        </div>
        <Poll
          sectionId={sections[8].id}
          question={sections[8].pollQuestion}
          options={sections[8].pollOptions}
        />
        <CommentBox sectionId={sections[8].id} />
      </Section>

      {/* Footer */}
      <footer className="bg-surface text-center py-20 px-6 border-t border-border">
        <p className="font-display text-5xl md:text-6xl text-gold tracking-tight mb-4">
          Build Deep. Ship Wide. Teach Well.
        </p>
        <p className="text-text-muted text-sm font-ui">
          Taleemabad Services &amp; Standards Framework &middot; February 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
