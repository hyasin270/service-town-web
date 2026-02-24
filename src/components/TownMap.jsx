import { buildings } from '../data/content';

export default function TownMap() {
  return (
    <section className="relative w-full">
      <div className="relative">
        <img
          src="/images/s04_six_services.jpg"
          alt="Service Town — Six Buildings, Six Services"
          className="w-full h-auto"
        />
        {buildings.map(b => (
          <a
            key={b.id}
            href={`#six-buildings`}
            className="building-hotspot"
            style={{ left: b.left, top: b.top, width: b.width, height: b.height }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('six-buildings')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span className="hotspot-label">{b.name} — {b.service}</span>
          </a>
        ))}
      </div>
      <div className="bg-navy text-center py-4 px-6">
        <p className="text-gold font-display text-2xl tracking-wider mb-1">
          CLICK A BUILDING TO EXPLORE
        </p>
        <p className="text-white/60 text-sm">
          Or scroll down to discover Service Town section by section
        </p>
      </div>
    </section>
  );
}
