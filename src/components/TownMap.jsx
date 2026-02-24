import { buildings } from '../data/content';

export default function TownMap() {
  return (
    <header id="town-map" className="relative w-full">
      {/* The map image IS the hero — no separate title section */}
      <div className="relative">
        <img
          src="/images/s04_six_services.jpg"
          alt="Service Town — Six Buildings, Six Services"
          className="w-full h-auto"
        />

        {/* Overlay with entry text at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full text-center pb-8 pointer-events-none">
          <h1 className="font-display text-5xl md:text-7xl text-gold tracking-wider drop-shadow-lg mb-2">
            SERVICE TOWN
          </h1>
          <p className="text-white/75 text-base md:text-lg max-w-md mx-auto">
            An interactive guide to Taleemabad's services &amp; standards framework
          </p>
          <div className="mt-4 pointer-events-auto">
            <a
              href="#town-square"
              className="inline-block px-7 py-2.5 bg-gold text-navy font-semibold rounded-lg hover:bg-gold/90 transition-all text-sm tracking-wider uppercase shadow-lg"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('town-square')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Enter the Town ↓
            </a>
          </div>
        </div>

        {/* Building hotspots */}
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
    </header>
  );
}
