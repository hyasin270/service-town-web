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

function App() {
  return (
    <div className="min-h-screen">
      <SideNav />

      {/* Hero header */}
      <header className="relative">
        <div
          className="section-hero min-h-[70vh]"
          style={{ backgroundImage: 'url(/images/s01_title_service_town.jpg)' }}
        >
          <div className="section-hero-overlay" />
          <div className="section-hero-content max-w-[900px] mx-auto text-center" style={{ alignSelf: 'center' }}>
            <h1 className="font-display text-6xl md:text-8xl text-gold tracking-wider mb-4">
              SERVICE TOWN
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-lg mx-auto">
              An interactive guide to Taleemabad's services &amp; standards framework
            </p>
            <div className="mt-8">
              <a
                href="#town-square"
                className="inline-block px-8 py-3 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all text-sm tracking-wider uppercase"
              >
                Enter the Town ↓
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Interactive Town Map */}
      <TownMap />

      {/* Section 1: Town Square */}
      <Section {...sections[0]}>
        <Quiz quiz={quizzes.serviceVsFeature} />
        <Poll
          sectionId={sections[0].id}
          question={sections[0].pollQuestion}
          options={sections[0].pollOptions}
        />
        <CommentBox sectionId={sections[0].id} />
      </Section>

      {/* Separator */}
      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 2: Two Teams */}
      <Section {...sections[1]}>
        <div className="fade-in grid grid-cols-2 gap-4 mb-6">
          <div className="p-4 rounded-xl bg-red-team/5 border-2 border-red-team/20">
            <h4 className="font-display text-lg text-red-team tracking-wide">RED — The Squad</h4>
            <ul className="text-sm text-navy/70 mt-2 space-y-1">
              <li>Forward Deployed</li>
              <li>Speed &amp; autonomy</li>
              <li>Ships weekly</li>
              <li>On the ground in schools</li>
            </ul>
          </div>
          <div className="p-4 rounded-xl bg-blu-team/5 border-2 border-blu-team/20">
            <h4 className="font-display text-lg text-blu-team tracking-wide">BLU — The Armory</h4>
            <ul className="text-sm text-navy/70 mt-2 space-y-1">
              <li>Internally Deployed</li>
              <li>Depth &amp; reusability</li>
              <li>Builds for everyone</li>
              <li>Learns from all regions</li>
            </ul>
          </div>
        </div>
        <Poll
          sectionId={sections[1].id}
          question={sections[1].pollQuestion}
          options={sections[1].pollOptions}
        />
        <CommentBox sectionId={sections[1].id} />
      </Section>

      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 3: The Armory / Service Anatomy */}
      <Section {...sections[2]}>
        <div className="fade-in grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
          {[
            { name: 'Front Counter', desc: 'Interface layer — APIs, UIs, agent/MCP', color: 'border-gold' },
            { name: 'The Forge', desc: 'Core logic — domain expertise encoded', color: 'border-red-team' },
            { name: 'The Vault', desc: 'Data layer — xAPI, cross-regional normalization', color: 'border-blu-team' },
            { name: 'The Watchers', desc: 'Observability — metrics, feedback loops', color: 'border-dusty' },
          ].map(layer => (
            <div key={layer.name} className={`p-4 bg-white rounded-lg border-l-4 ${layer.color} shadow-sm`}>
              <h5 className="font-semibold text-navy text-sm">{layer.name}</h5>
              <p className="text-xs text-navy/60 mt-1">{layer.desc}</p>
            </div>
          ))}
        </div>
        <Quiz quiz={quizzes.brokenService} />
        <Poll
          sectionId={sections[2].id}
          question={sections[2].pollQuestion}
          options={sections[2].pollOptions}
        />
        <CommentBox sectionId={sections[2].id} />
      </Section>

      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 4: Six Buildings */}
      <Section {...sections[3]}>
        <BuildingCards />
        <CommentBox sectionId={sections[3].id} />
      </Section>

      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 5: Standards Gate */}
      <Section {...sections[4]}>
        <Poll
          sectionId={sections[4].id}
          question={sections[4].pollQuestion}
          options={sections[4].pollOptions}
        />
        <CommentBox sectionId={sections[4].id} />
      </Section>

      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 6: Three Pillars (tabbed) */}
      <Section {...sections[5]}>
        <PillarTabs />
        <CommentBox sectionId={sections[5].id} />
      </Section>

      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 7: Observatory */}
      <Section {...sections[6]}>
        {/* Pyramid layers visual */}
        <div className="fade-in mb-6">
          {[
            { layer: 4, name: 'IMPACT', detail: 'Student Learning Outcomes — target 60%', color: 'bg-gold' },
            { layer: 3, name: 'QUALITY', detail: 'FICO Fidelity Score — target 60%', color: 'bg-red-team' },
            { layer: 2, name: 'ADOPTION', detail: 'Lesson Plan Engagement — target 65%', color: 'bg-blu-team' },
            { layer: 1, name: 'INPUTS', detail: 'Coach Visits + Training Engagement', color: 'bg-dusty' },
          ].map(l => (
            <div key={l.layer} className="flex items-center gap-3 mb-2">
              <div className={`${l.color} text-white text-xs font-bold w-8 h-8 rounded flex items-center justify-center`}>
                L{l.layer}
              </div>
              <div className="flex-1">
                <span className="font-semibold text-sm text-navy">{l.name}</span>
                <span className="text-sm text-navy/50 ml-2">{l.detail}</span>
              </div>
            </div>
          ))}
        </div>
        <Quiz quiz={quizzes.diagnosticDesk} />
        <Poll
          sectionId={sections[6].id}
          question={sections[6].pollQuestion}
          options={sections[6].pollOptions}
        />
        <CommentBox sectionId={sections[6].id} />
      </Section>

      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 8: Evolution */}
      <Section {...sections[7]}>
        <div className="fade-in mb-6">
          {/* Rhythm image */}
          <img
            src="/images/s10_rhythm.jpg"
            alt="Action Mode vs Sense-Making Mode"
            className="w-full rounded-lg mb-6"
          />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { phase: '1', title: 'Now', desc: 'One region drives. Armory builds, Squads consume.', color: 'border-dusty' },
              { phase: '2', title: 'Q2–Q3', desc: '3+ regions. Config-driven adaptation. A/B testing.', color: 'border-blu-team' },
              { phase: '3', title: 'Q4+', desc: 'External partners. MCP/OpenAPI. Self-describing APIs.', color: 'border-gold' },
            ].map(p => (
              <div key={p.phase} className={`p-4 bg-white rounded-lg border-t-4 ${p.color} shadow-sm text-center`}>
                <span className="font-display text-2xl text-navy">Phase {p.phase}</span>
                <p className="text-xs font-semibold text-gold mt-1">{p.title}</p>
                <p className="text-xs text-navy/60 mt-2">{p.desc}</p>
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

      <div className="text-center py-4">
        <span className="text-dusty/40 text-2xl">···</span>
      </div>

      {/* Section 9: Closing */}
      <Section {...sections[8]}>
        {/* Three-line closing */}
        <div className="fade-in text-center py-6 mb-6">
          <p className="text-lg font-semibold text-blu-team mb-1">Technical standards ensure it works.</p>
          <p className="text-lg font-semibold text-red-team mb-1">Pedagogical standards ensure it teaches.</p>
          <p className="text-lg font-semibold text-gold">Product standards ensure it's used.</p>
        </div>
        <Poll
          sectionId={sections[8].id}
          question={sections[8].pollQuestion}
          options={sections[8].pollOptions}
        />
        <CommentBox sectionId={sections[8].id} />
      </Section>

      {/* Footer */}
      <footer className="bg-navy text-center py-12 px-6">
        <p className="font-display text-3xl text-gold tracking-wider mb-2">
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
