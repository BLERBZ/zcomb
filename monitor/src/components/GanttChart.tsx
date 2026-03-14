import type { Task, Metrics } from '../hooks/usePolling';

const phaseNames: Record<number, string> = {
  0: 'Infrastructure',
  1: 'Research',
  2: 'Team Design',
  3: 'Planning',
  4: 'Implementation',
  5: 'QA & Testing',
  6: 'Validation'
};

export function GanttChart({ tasks, metrics, darkMode }: {
  tasks: Task[];
  metrics?: Metrics;
  darkMode: boolean;
}) {
  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const barBg = darkMode ? '#21262d' : '#e1e4e8';
  const borderColor = darkMode ? '#30363d' : '#d0d7de';

  // Group tasks by phase
  const phaseMap = new Map<number, Task[]>();
  tasks.forEach(t => {
    const list = phaseMap.get(t.phase) || [];
    list.push(t);
    phaseMap.set(t.phase, list);
  });

  const phases = Array.from(phaseMap.entries()).sort((a, b) => a[0] - b[0]);

  if (phases.length === 0) {
    return null;
  }

  return (
    <div>
      <h3 style={{ margin: '0 0 12px', fontSize: 12, textTransform: 'uppercase', color: mutedColor, letterSpacing: 1 }}>
        Phase Timeline
      </h3>
      <div style={{
        background: darkMode ? '#0d1117' : '#f6f8fa',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16
      }}>
        {phases.map(([phase, pTasks]) => {
          const done = pTasks.filter(t => t.status === 'done').length;
          const total = pTasks.length;
          const pct = total > 0 ? Math.round((done / total) * 100) : 0;
          const hasActive = pTasks.some(t => t.status === 'in_progress');
          const allDone = pct === 100;

          return (
            <div key={phase} style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '6px 0',
              borderBottom: `1px solid ${borderColor}`
            }}>
              <span style={{
                fontSize: 11,
                fontWeight: 600,
                width: 120,
                flexShrink: 0,
                color: allDone ? '#3fb950' : hasActive ? '#58a6ff' : mutedColor
              }}>
                Phase {phase}: {phaseNames[phase] || `Phase ${phase}`}
              </span>
              <div style={{
                flex: 1,
                height: 12,
                background: barBg,
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative'
              }}>
                <div style={{
                  width: `${pct}%`,
                  height: '100%',
                  background: allDone ? '#238636' : hasActive ? '#1f6feb' : '#30363d',
                  borderRadius: 6,
                  transition: 'width 0.5s ease'
                }} />
                {hasActive && !allDone && (
                  <div style={{
                    position: 'absolute',
                    right: 0,
                    top: 0,
                    width: `${100 - pct}%`,
                    height: '100%',
                    background: `repeating-linear-gradient(90deg, transparent, transparent 4px, ${darkMode ? '#1f6feb22' : '#1f6feb15'} 4px, ${darkMode ? '#1f6feb22' : '#1f6feb15'} 8px)`
                  }} />
                )}
              </div>
              <span style={{ fontSize: 10, color: mutedColor, width: 50, textAlign: 'right' }}>
                {done}/{total}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
