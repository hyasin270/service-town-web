// Subtle horizontal data-flow animation for "The Vault" section.
// Thin lines of varying lengths stream left-to-right at different speeds,
// evoking structured data flowing through normalization pipelines.

export default function DataStream() {
  const streams = [
    { width: '40%', duration: '8s', delay: '0s', top: '15%', opacity: 0.25 },
    { width: '65%', duration: '12s', delay: '2s', top: '35%', opacity: 0.35 },
    { width: '30%', duration: '10s', delay: '4s', top: '55%', opacity: 0.2 },
    { width: '55%', duration: '14s', delay: '1s', top: '75%', opacity: 0.3 },
    { width: '25%', duration: '9s', delay: '6s', top: '90%', opacity: 0.15 },
  ];

  return (
    <div className="relative w-full h-16 overflow-hidden">
      {streams.map((s, i) => (
        <div
          key={i}
          className="absolute h-px"
          style={{
            width: s.width,
            top: s.top,
            background: i === 1 || i === 3
              ? 'linear-gradient(90deg, transparent, rgba(180, 120, 30, 0.4), transparent)'
              : 'linear-gradient(90deg, transparent, rgba(13, 27, 42, 0.08), transparent)',
            opacity: s.opacity,
            animation: `data-flow ${s.duration} linear ${s.delay} infinite`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
