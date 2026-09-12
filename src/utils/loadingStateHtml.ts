export function getLoadingStateHtml({
  label = "Generating your image...",
  variant = "Drive",
}: {
  label?: string;
  variant?: "Drive" | "Dots" | "Orbit";
} = {}) {
  const chevron = [
    90, 0, 90,
    180, 90, 180,
    270, 180, 270,
  ];

  const ORBIT_ORDER = [0, 1, 2, 5, 8, 7, 6, 3];
  const orbit = Array.from({ length: 9 }, (_, i) => {
    const k = ORBIT_ORDER.indexOf(i);
    return k === -1 ? null : k * 110;
  });

  const patterns: Record<string, { delays: (number | null)[]; dur: number; round: boolean }> = {
    Drive: { delays: chevron, dur: 650, round: false },
    Dots: { delays: chevron, dur: 650, round: true },
    Orbit: { delays: orbit, dur: 950, round: false },
  };

  const selected = patterns[variant] ?? patterns.Drive;
  const cellsHtml = selected.delays
    .map((d) => {
      const opacity = d === null ? "0.07" : "0.15";
      const anim = d === null ? "none" : `pixel-on ${selected.dur}ms ease-in-out ${d}ms infinite`;
      const shapeClass = selected.round ? "rounded-full" : "rounded-[1px]";
      return `<span class="w-1 h-1 bg-[#111827] ${shapeClass}" style="opacity: ${opacity}; animation: ${anim};"></span>`;
    })
    .join("");

  return `
    <div class="xeni-pixel-loading flex w-fit items-center gap-2.5">
      <span aria-hidden="true" class="grid grid-cols-[repeat(3,4px)] gap-[1.5px]">
        ${cellsHtml}
      </span>
      <span
        class="bg-clip-text text-[13px] font-medium text-transparent"
        style="
          background-image: linear-gradient(90deg, #667085 35%, #111827 50%, #667085 65%);
          background-size: 200% 100%;
          animation: shimmer-text 1.4s linear infinite;
        "
      >
        ${label}
      </span>
      <span class="font-mono text-[12px] text-[#667085] tabular-nums xeni-pixel-timer">0.0s</span>
    </div>
  `;
}
