const bulbCount = 9;

export function MarqueeBulbs() {
  return (
    <div className="mb-3 flex items-center justify-center gap-2.5" aria-hidden="true">
      {Array.from({ length: bulbCount }, (_, index) => (
        <span
          key={index}
          className={
            index % 2 === 0
              ? "size-1.5 rounded-full bg-ivory"
              : "size-1.5 rounded-full bg-amber shadow-[0_0_8px_#d58a3c]"
          }
        />
      ))}
    </div>
  );
}

const fanRays = 13;

export function ProsceniumFan() {
  return (
    <svg
      viewBox="0 0 220 72"
      className="mx-auto h-16 w-52 text-gold"
      aria-hidden="true"
      fill="none"
    >
      {Array.from({ length: fanRays }, (_, index) => {
        const progress = index / (fanRays - 1);
        const angle = Math.PI * (1 - progress);
        const x2 = (110 + Math.cos(angle) * 100).toFixed(2);
        const y2 = (70 - Math.sin(angle) * 62).toFixed(2);

        return (
          <line
            key={index}
            x1="110"
            y1="70"
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1"
          />
        );
      })}
      <path d="M14 70H206" stroke="currentColor" strokeWidth="1" />
      <circle cx="110" cy="70" r="2.5" fill="currentColor" />
    </svg>
  );
}

const cornerPositions = [
  "-top-px -left-px",
  "-top-px -right-px",
  "-bottom-px -left-px",
  "-bottom-px -right-px",
] as const;

export function FrameCorners() {
  return (
    <>
      {cornerPositions.map((position) => (
        <span
          key={position}
          aria-hidden="true"
          className={`absolute size-2.5 bg-gold ${position}`}
        />
      ))}
    </>
  );
}
