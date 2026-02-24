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

function Divider({ icon = '⚙' }) {
  return (
    <div className="town-divider">
      <span className="divider-icon">{icon}</span>
    </div>
  );
}

function App() {
  return (
    <div className="min-h-screen">
      <SideNav />

      {/* Hero — the town map IS the entry point, no duplicate title */}
      <TownMap />

      {/* Section 1: Town Square — What is a Service? */}
      <Section {...sections[0]}>
        {/* Sharper service definition callout */}
        <div className="callout-box fade-in mb-6">
          <p className="font-semibold text-navy text-[1.05rem] mb-2">
            The "One Week" Test
          </p>
          <p className="text-navy/75 text-[0.95rem] leading-relaxed">
            If a forward deployed team could rebuild it in a week with an AI coding assistant, it's not a service — it's a <strong>feature</strong>. Features are fine. But they don't compound. A service has <em>pedagogical depth</em>, <em>technical depth</em>, and <em>data depth</em> that takes months to build right.
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

      <Divider icon="⚔" />

      {/* Section 2: Two Teams */}
      <Section {...sections[1]}>
        <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="callout-box red !pl-10">
            <h4 className="font-display text-xl text-red-team tracking-wide mb-2">RED — The Squad</h4>
            <ul className="text-sm text-navy/70 space-y-1.5">
              <li className="flex gap-2"><span className="text-red-team">▸</span> Forward Deployed to a region</li>
              <li className="flex gap-2"><span className="text-red-team">▸</span> Speed &amp; autonomy</li>
              <li className="flex gap-2"><span className="text-red-team">▸</span> Ships weekly</li>
              <li className="flex gap-2"><span className="text-red-team">▸</span> On the ground in schools</li>
            </ul>
          </div>
          <div className="callout-box blue !pl-10">
            <h4 className="font-display text-xl text-blu-team tracking-wide mb-2">BLU — The Armory</h4>
            <ul className="text-sm text-navy/70 space-y-1.5">
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Internally Deployed</li>
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Depth &amp; reusability</li>
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Builds for everyone</li>
              <li className="flex gap-2"><span className="text-blu-team">▸</span> Learns from all regions</li>
            </ul>
          </div>
        </div>

        <div className="callout-box fade-in mb-6">
          <p className="text-navy/75 text-[0.95rem] leading-relaxed">
            <strong>This isn't a hierarchy. It's a supply chain.</strong> The Squad discovers needs. The Armory centralizes solutions. The Squad consumes them and sends feedback. Repeat. The whole system only works when both teams stay connected.
          </p>
        </div>

        <Poll
          sectionId={sections[1].id}
          question={sections[1].pollQuestion}
          options={sections[1].pollOptions}
        />
        <CommentBox sectionId={sections[1].id} />
      </Section>

      <Divider icon="🔧" />

      {/* Section 3: The Armory / Service Anatomy */}
      <Section {...sections[2]}>
        <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            { name: 'Front Counter', icon: '🚪', desc: 'Interface layer — APIs, UIs, agent/MCP interfaces. Three doors can lead to the same room.', color: 'border-gold' },
            { name: 'The Forge', icon: '🔥', desc: 'Core logic — domain expertise encoded. The most important layer. Needs documentation more than clean code.', color: 'border-red-team' },
            { name: 'The Vault', icon: '🏛', desc: 'Data layer — xAPI tracking, standardized storage, cross-regional normalization.', color: 'border-blu-team' },
            { name: 'The Watchers', icon: '👁', desc: 'Observability — usage metrics, feedback loops, behavioral monitoring. How the service learns.', color: 'border-dusty' },
          ].map(layer => (
            <div key={layer.name} className={`p-5 bg-white rounded-lg border-l-4 ${layer.color} shadow-sm`}>
              <h5 className="font-semibold text-navy text-sm flex items-center gap-2">
                <span>{layer.icon}</span> {layer.name}
              </h5>
              <p className="text-xs text-navy/65 mt-2 leading-relaxed">{layer.desc}</p>
            </div>
          ))}
        </div>

        <div className="callout-box fade-in mb-6">
          <p className="text-navy/75 text-[0.95rem] leading-relaxed">
            <strong>Debugging with layers:</strong> When latency degrades → look at The Forge. When teachers aren't using it → look at the Front Counter. When you don't know either is happening → you forgot to build The Watchers.
          </p>
        </div>

        <Quiz quiz={quizzes.brokenService} />
        <Poll
          sectionId={sections[2].id}
          question={sections[2].pollQuestion}
          options={sections[2].pollOptions}
        />
        <CommentBox sectionId={sections[2].id} />
      </Section>

      <Divider icon="🏗" />

      {/* Section 4: Six Buildings */}
      <Section {...sections[3]}>
        <BuildingCards />
        <CommentBox sectionId={sections[3].id} />
      </Section>

      <Divider icon="🛡" />

      {/* Section 5: Standards Gate */}
      <Section {...sections[4]}>
        {/* Why standards matter — new callout */}
        <div className="callout-box fade-in mb-6">
          <p className="font-semibold text-navy text-[1.05rem] mb-2">
            Why Standards?
          </p>
          <p className="text-navy/75 text-[0.95rem] leading-relaxed mb-3">
            Our theory of change is a chain: <strong>Inputs → Adoption → Quality → Impact</strong>. Every link must hold. Standards protect each link:
          </p>
          <ul className="text-navy/70 text-[0.92rem] space-y-2">
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> A lesson plan that takes 10 minutes to generate breaks the <em>adoption</em> layer</li>
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> A coaching tool with inconsistent scores breaks the <em>quality</em> layer</li>
            <li className="flex gap-2"><span className="text-gold font-bold">→</span> An exam testing content never taught breaks the <em>impact</em> layer</li>
          </ul>
        </div>

        <div className="fade-in bg-navy/5 rounded-lg p-5 mb-6">
          <p className="font-display text-xl text-navy tracking-wide mb-2">Progressive Enforcement</p>
          <div className="grid grid-cols-3 gap-3 text-center text-sm">
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="font-display text-lg text-gold">Q1</p>
              <p className="text-navy/60 text-xs mt-1">Start with 3 standards per service. Measure them. Make them non-negotiable.</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="font-display text-lg text-blu-team">Q2</p>
              <p className="text-navy/60 text-xs mt-1">Add the next tier. Expand coverage across services.</p>
            </div>
            <div className="bg-white rounded-lg p-3 shadow-sm">
              <p className="font-display text-lg text-red-team">Q3</p>
              <p className="text-navy/60 text-xs mt-1">Full enforcement. Muscle memory exists. Standards are culture.</p>
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

      <Divider icon="📋" />

      {/* Section 6: Three Pillars (tabbed) */}
      <Section {...sections[5]}>
        <PillarTabs />
        <CommentBox sectionId={sections[5].id} />
      </Section>

      <Divider icon="🔭" />

      {/* Section 7: Observatory */}
      <Section {...sections[6]}>
        {/* Pyramid layers visual */}
        <div className="fade-in mb-6">
          {[
            { layer: 4, name: 'IMPACT', detail: 'Student Learning Outcomes — target 60%', color: 'bg-gold', width: 'w-[60%]' },
            { layer: 3, name: 'QUALITY', detail: 'FICO Fidelity Score — target 60%', color: 'bg-red-team', width: 'w-[72%]' },
            { layer: 2, name: 'ADOPTION', detail: 'Lesson Plan Engagement — target 65%', color: 'bg-blu-team', width: 'w-[84%]' },
            { layer: 1, name: 'INPUTS', detail: 'Coach Visits + Training Engagement', color: 'bg-dusty', width: 'w-full' },
          ].map(l => (
            <div key={l.layer} className={`${l.width} mx-auto mb-2`}>
              <div className={`${l.color} text-white rounded-lg px-4 py-3 flex items-center justify-between`}>
                <div className="flex items-center gap-3">
                  <span className="font-display text-lg opacity-60">L{l.layer}</span>
                  <span className="font-semibold text-sm">{l.name}</span>
                </div>
                <span className="text-xs text-white/70">{l.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="callout-box fade-in mb-6">
          <p className="font-semibold text-navy text-[1.05rem] mb-2">
            When Metrics Disagree
          </p>
          <p className="text-navy/75 text-[0.95rem] leading-relaxed">
            The disagreement <em>is</em> the diagnosis. High fidelity + low outcomes → content problem. Low fidelity + low outcomes → coaching problem. Low engagement → adoption problem (fix the product or intensify inputs).
          </p>
        </div>

        <Quiz quiz={quizzes.diagnosticDesk} />
        <Poll
          sectionId={sections[6].id}
          question={sections[6].pollQuestion}
          options={sections[6].pollOptions}
        />
        <CommentBox sectionId={sections[6].id} />
      </Section>

      <Divider icon="⏳" />

      {/* Section 8: Evolution */}
      <Section {...sections[7]}>
        <div className="fade-in mb-6">
          {/* Rhythm image */}
          <div className="rounded-lg overflow-hidden border-2 border-dusty/20 mb-6">
            <img
              src="/images/s10_rhythm.jpg"
              alt="Action Mode vs Sense-Making Mode"
              className="w-full h-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { phase: '1', title: 'Now', desc: 'One region drives. Armory builds, Squads consume.', color: 'border-dusty', bg: 'bg-dusty/5' },
              { phase: '2', title: 'Q2-Q3', desc: '3+ regions. Config-driven adaptation. A/B testing.', color: 'border-blu-team', bg: 'bg-blu-team/5' },
              { phase: '3', title: 'Q4+', desc: 'External partners. MCP/OpenAPI. Self-describing APIs.', color: 'border-gold', bg: 'bg-gold/5' },
            ].map(p => (
              <div key={p.phase} className={`p-4 ${p.bg} rounded-lg border-t-4 ${p.color} text-center`}>
                <span className="font-display text-3xl text-navy">Phase {p.phase}</span>
                <p className="text-xs font-bold text-gold mt-1 uppercase tracking-wider">{p.title}</p>
                <p className="text-sm text-navy/60 mt-3 leading-relaxed">{p.desc}</p>
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

      <Divider icon="🏁" />

      {/* Section 9: Closing */}
      <Section {...sections[8]}>
        {/* Three-line closing */}
        <div className="fade-in py-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg bg-blu-team/5 border-l-4 border-blu-team">
              <span className="stamp text-blu-team text-xs">TECH</span>
              <p className="text-[1.05rem] font-semibold text-navy">Technical standards ensure it <em>works</em>.</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-red-team/5 border-l-4 border-red-team">
              <span className="stamp text-red-team text-xs">PED</span>
              <p className="text-[1.05rem] font-semibold text-navy">Pedagogical standards ensure it <em>teaches</em>.</p>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gold/5 border-l-4 border-gold">
              <span className="stamp text-gold text-xs">PROD</span>
              <p className="text-[1.05rem] font-semibold text-navy">Product standards ensure it's <em>used</em>.</p>
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
      <footer className="bg-navy text-center py-16 px-6">
        <p className="font-display text-4xl md:text-5xl text-gold tracking-wider mb-3">
          BUILD DEEP. SHIP WIDE. TEACH WELL.
        </p>
        <p className="text-white/40 text-sm">
          Taleemabad Services &amp; Standards Framework &middot; February 2026
        </p>
      </footer>
    </div>
  );
}

export default App;
