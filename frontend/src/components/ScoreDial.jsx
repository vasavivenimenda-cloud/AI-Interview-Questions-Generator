import React from 'react';

export default function ScoreDial({ score = 0, max = 10, size = 130, strokeWidth = 9, label = "Score" }) {
  const normalizedScore = Math.min(max, Math.max(0, Number(score) || 0));
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const percent = normalizedScore / max;
  const strokeDashoffset = circumference - (percent * circumference);

  // Dynamic color selection
  let strokeColor = "#10b981"; // Emerald
  let glowColor = "rgba(16, 185, 129, 0.35)";
  if (percent < 0.6) {
    strokeColor = "#f43f5e"; // Rose
    glowColor = "rgba(244, 63, 94, 0.35)";
  } else if (percent < 0.8) {
    strokeColor = "#f59e0b"; // Amber
    glowColor = "rgba(245, 158, 11, 0.35)";
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', width: size, height: size, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg
          width={size}
          height={size}
          style={{ transform: 'rotate(-90deg)', filter: `drop-shadow(0 0 12px ${glowColor})` }}
        >
          {/* Background circle track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)' }}
          />
        </svg>

        <div style={{ position: 'absolute', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span style={{ fontSize: `${size * 0.25}px`, fontWeight: 800, lineHeight: 1, color: 'var(--text-primary)' }}>
            {normalizedScore}
          </span>
          <span style={{ fontSize: `${size * 0.1}px`, color: 'var(--text-muted)', fontWeight: 600 }}>
            /{max}
          </span>
        </div>
      </div>
      {label && (
        <span style={{ marginTop: '0.5rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
          {label}
        </span>
      )}
    </div>
  );
}
