// Flickering torch flame SVG for section dividers.
// Replaces emoji icons with a tasteful, subtly animated gold flame.

export default function TorchFlicker() {
  return (
    <svg
      width="20"
      height="28"
      viewBox="0 0 20 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{
        animation: 'flicker 2s ease-in-out infinite',
        willChange: 'transform',
        filter: 'drop-shadow(0 0 6px rgba(180, 120, 30, 0.35))',
      }}
    >
      {/* Outer flame */}
      <path
        d="M10 2 C10 2, 4 10, 4 16 C4 20, 7 24, 10 24 C13 24, 16 20, 16 16 C16 10, 10 2, 10 2Z"
        fill="rgba(180, 120, 30, 0.65)"
      />
      {/* Inner flame — brighter core */}
      <path
        d="M10 8 C10 8, 7 13, 7 16 C7 18.5, 8.5 21, 10 21 C11.5 21, 13 18.5, 13 16 C13 13, 10 8, 10 8Z"
        fill="rgba(180, 120, 30, 0.9)"
      />
      {/* Hottest center */}
      <ellipse
        cx="10"
        cy="17"
        rx="2"
        ry="3"
        fill="rgba(255, 230, 180, 0.7)"
      />
    </svg>
  );
}
