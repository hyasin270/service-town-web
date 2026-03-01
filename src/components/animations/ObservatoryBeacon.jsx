// Sweeping beacon animation for "The Observatory" section.
// A gold light beam slowly sweeps back and forth,
// with small data-point dots pulsing along the arc —
// evoking the observatory scanning the theory of change.

export default function ObservatoryBeacon() {
  return (
    <div className="relative w-full h-32 overflow-hidden mb-4">
      {/* Central beacon point */}
      <div
        className="absolute left-1/2 bottom-0 w-2 h-2 rounded-full bg-gold"
        style={{
          boxShadow: '0 0 12px rgba(180, 120, 30, 0.5), 0 0 24px rgba(180, 120, 30, 0.25)',
          transform: 'translateX(-50%)',
        }}
      />

      {/* Sweeping beam */}
      <div
        className="absolute bottom-0 left-1/2 origin-bottom"
        style={{
          width: '2px',
          height: '120px',
          background: 'linear-gradient(to top, rgba(180, 120, 30, 0.45), rgba(180, 120, 30, 0))',
          animation: 'beacon-sweep 6s ease-in-out infinite',
          willChange: 'transform',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Beam cone (wider fan) */}
      <div
        className="absolute bottom-0 left-1/2 origin-bottom"
        style={{
          width: '80px',
          height: '110px',
          marginLeft: '-40px',
          background: 'linear-gradient(to top, rgba(180, 120, 30, 0.1), transparent)',
          clipPath: 'polygon(45% 100%, 0% 0%, 100% 0%, 55% 100%)',
          animation: 'beacon-sweep 6s ease-in-out infinite',
          willChange: 'transform',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Data point dots along the arc */}
      {[
        { left: '30%', bottom: '60%', delay: '0s', size: 3 },
        { left: '45%', bottom: '80%', delay: '1.5s', size: 2 },
        { left: '60%', bottom: '50%', delay: '3s', size: 2.5 },
        { left: '70%', bottom: '70%', delay: '4.5s', size: 2 },
        { left: '35%', bottom: '40%', delay: '2s', size: 1.5 },
      ].map((dot, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.left,
            bottom: dot.bottom,
            width: dot.size,
            height: dot.size,
            background: 'rgba(180, 120, 30, 0.5)',
            animation: `forge-pulse 3s ease-in-out ${dot.delay} infinite`,
          }}
        />
      ))}
    </div>
  );
}
