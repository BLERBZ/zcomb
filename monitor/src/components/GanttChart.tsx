import { useRef, useEffect, useState, useCallback } from 'react';
import type { Task, Metrics } from '../hooks/usePolling';

const phaseConfig: Record<number, { name: string; icon: string }> = {
  0: { name: 'Infrastructure', icon: '⚙' },
  1: { name: 'Research', icon: '🔍' },
  2: { name: 'Team Design', icon: '👥' },
  3: { name: 'Planning', icon: '📋' },
  4: { name: 'Implementation', icon: '⚡' },
  5: { name: 'QA & Testing', icon: '🧪' },
  6: { name: 'Validation', icon: '✅' },
};

const statusColors = {
  complete: { fill: '#238636', glow: '#23863640', text: '#3fb950', gradient: 'linear-gradient(135deg, #238636, #2ea043)' },
  active:   { fill: '#1f6feb', glow: '#1f6feb40', text: '#58a6ff', gradient: 'linear-gradient(135deg, #1f6feb, #388bfd)' },
  pending:  { fill: '#30363d', glow: 'transparent', text: '#484f58', gradient: 'linear-gradient(135deg, #21262d, #30363d)' },
};

export function GanttChart({ tasks, metrics, darkMode }: {
  tasks: Task[];
  metrics?: Metrics;
  darkMode: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerW, setContainerW] = useState(800);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      const w = entries[0].contentRect.width;
      if (w > 0) setContainerW(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const s = Math.min(1, Math.max(0.45, containerW / 900));
  const px = useCallback((base: number, min = 1) => Math.max(min, Math.round(base * s)), [s]);

  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const subText = darkMode ? '#8b949e' : '#57606a';

  // Group tasks by phase
  const phaseMap = new Map<number, Task[]>();
  tasks.forEach(t => {
    const list = phaseMap.get(t.phase) || [];
    list.push(t);
    phaseMap.set(t.phase, list);
  });

  const phases = Array.from(phaseMap.entries()).sort((a, b) => a[0] - b[0]);
  if (phases.length === 0) return null;

  // Compute phase data
  const phaseData = phases.map(([phase, pTasks]) => {
    const done = pTasks.filter(t => t.status === 'done').length;
    const total = pTasks.length;
    const pct = total > 0 ? Math.round((done / total) * 100) : 0;
    const hasActive = pTasks.some(t => t.status === 'in_progress');
    const allDone = pct === 100;
    const status: 'complete' | 'active' | 'pending' = allDone ? 'complete' : hasActive ? 'active' : 'pending';
    const config = phaseConfig[phase] || { name: `Phase ${phase}`, icon: '○' };
    return { phase, done, total, pct, status, ...config };
  });

  // Find the furthest active/complete phase for the connector line
  let lastActiveIdx = -1;
  phaseData.forEach((p, i) => {
    if (p.status === 'complete' || p.status === 'active') lastActiveIdx = i;
  });

  const nodeSize = px(28, 16);
  const lineH = px(3, 2);

  return (
    <div ref={containerRef}>
      <h3 style={{
        margin: `0 0 ${px(10)}px`,
        fontSize: px(12),
        fontWeight: 700,
        textTransform: 'uppercase',
        color: mutedColor,
        letterSpacing: 1.2,
      }}>
        Phase Timeline
      </h3>

      <div style={{
        background: darkMode
          ? 'linear-gradient(180deg, #0d111780, #0d1117)'
          : 'linear-gradient(180deg, #f6f8fa80, #f6f8fa)',
        borderRadius: px(10),
        padding: `${px(14)}px ${px(10)}px ${px(10)}px`,
        border: `1px solid ${darkMode ? '#1c2128' : '#e1e4e8'}`,
      }}>
        {/* Stepper row */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          position: 'relative',
        }}>
          {phaseData.map((p, i) => {
            const colors = statusColors[p.status];
            const isLast = i === phaseData.length - 1;

            return (
              <div key={p.phase} className="phase-step" style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                minWidth: 0,
              }}>
                {/* ── Connector line layer ── */}
                <div style={{
                  position: 'absolute',
                  top: nodeSize / 2 - lineH / 2,
                  left: 0,
                  right: 0,
                  height: lineH,
                  display: 'flex',
                  zIndex: 0,
                }}>
                  {/* Left half of line */}
                  {i > 0 && (
                    <div style={{
                      position: 'absolute',
                      right: '50%',
                      left: 0,
                      height: '100%',
                      borderRadius: lineH,
                      background: i <= lastActiveIdx
                        ? 'linear-gradient(90deg, #238636, #238636)'
                        : darkMode ? '#21262d' : '#d0d7de',
                    }} />
                  )}
                  {/* Right half of line */}
                  {!isLast && (
                    <div style={{
                      position: 'absolute',
                      left: '50%',
                      right: 0,
                      height: '100%',
                      borderRadius: lineH,
                      background: i < lastActiveIdx
                        ? 'linear-gradient(90deg, #238636, #238636)'
                        : i === lastActiveIdx && p.status === 'active'
                          ? `linear-gradient(90deg, #1f6feb, ${darkMode ? '#21262d' : '#d0d7de'})`
                          : darkMode ? '#21262d' : '#d0d7de',
                    }} />
                  )}
                </div>

                {/* ── Phase node circle ── */}
                <div style={{
                  width: nodeSize,
                  height: nodeSize,
                  borderRadius: '50%',
                  background: colors.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: px(12, 8),
                  fontWeight: 800,
                  color: p.status === 'pending' ? mutedColor : '#fff',
                  boxShadow: p.status !== 'pending'
                    ? `0 0 ${px(12)}px ${colors.glow}, 0 ${px(3)}px ${px(8)}px rgba(0,0,0,0.3)`
                    : `0 ${px(2)}px ${px(6)}px rgba(0,0,0,0.2)`,
                  border: p.status === 'pending'
                    ? `2px solid ${darkMode ? '#30363d' : '#d0d7de'}`
                    : `2px solid ${colors.fill}`,
                  position: 'relative',
                  zIndex: 1,
                  animation: p.status === 'active' ? 'pulse-healthy 2.5s ease-in-out infinite' : undefined,
                  flexShrink: 0,
                }}>
                  {p.status === 'complete' ? '✓' : p.phase}
                </div>

                {/* ── Detail card below the node ── */}
                <div style={{
                  marginTop: px(8),
                  width: '100%',
                  padding: `0 ${px(3)}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: px(4),
                }}>
                  {/* Phase icon + name */}
                  <div style={{
                    fontSize: px(9.5, 6),
                    fontWeight: 700,
                    color: p.status === 'pending' ? mutedColor : colors.text,
                    textAlign: 'center',
                    lineHeight: 1.2,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    maxWidth: '100%',
                  }}>
                    {p.name}
                  </div>

                  {/* Mini progress bar */}
                  <div style={{
                    width: '80%',
                    maxWidth: px(80),
                    height: px(5, 3),
                    background: darkMode ? '#21262d' : '#e1e4e8',
                    borderRadius: px(3),
                    overflow: 'hidden',
                    position: 'relative',
                  }}>
                    <div className={p.status === 'active' ? 'phase-bar-active' : undefined} style={{
                      width: `${p.pct}%`,
                      height: '100%',
                      background: colors.gradient,
                      borderRadius: px(3),
                      transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                      boxShadow: p.pct > 0 && p.status !== 'pending'
                        ? `0 0 ${px(6)}px ${colors.glow}`
                        : undefined,
                    }} />
                  </div>

                  {/* Count + percentage */}
                  <div style={{
                    fontSize: px(8.5, 5),
                    color: p.status === 'complete' ? '#3fb950' : subText,
                    fontWeight: p.status === 'complete' ? 600 : 400,
                    fontVariantNumeric: 'tabular-nums',
                    textAlign: 'center',
                    lineHeight: 1,
                  }}>
                    <span>{p.done}/{p.total}</span>
                    {p.pct > 0 && p.pct < 100 && (
                      <span style={{ opacity: 0.6, marginLeft: px(3) }}>{p.pct}%</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
