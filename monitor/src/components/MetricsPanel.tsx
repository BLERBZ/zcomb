import type { Task, Agent, Metrics } from '../hooks/usePolling';

export function MetricsPanel({ tasks, agents, metrics, darkMode }: {
  tasks: Task[];
  agents: Agent[];
  metrics?: Metrics;
  darkMode: boolean;
}) {
  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const textColor = darkMode ? '#e6edf3' : '#1f2328';
  const borderColor = darkMode ? '#30363d' : '#d0d7de';
  const barBg = darkMode ? '#21262d' : '#e1e4e8';

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const activeTasks = tasks.filter(t => t.status === 'in_progress').length;
  const failedTasks = tasks.filter(t => t.status === 'failed').length;
  const phases = metrics?.phases || [];

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }}>
      {/* Large Stat Counters */}
      <div style={{
        display: 'flex',
        gap: 24,
        alignItems: 'center'
      }}>
        <BigStat value={totalTasks} label="TOTAL TASKS" color={textColor} />
        <div style={{ width: 1, height: 32, background: borderColor }} />
        <BigStat value={doneTasks} label="COMPLETED" color="#3fb950" />
        <div style={{ width: 1, height: 32, background: borderColor }} />
        <BigStat value={activeTasks} label="ACTIVE" color="#58a6ff" />
        <div style={{ width: 1, height: 32, background: borderColor }} />
        <BigStat value={failedTasks} label="FAILED" color={failedTasks > 0 ? '#f85149' : textColor} />
        <div style={{ width: 1, height: 32, background: borderColor }} />
        <BigStat value={agents.length} label="AGENTS" color="#a371f7" />
      </div>

      {/* Phase Tabs */}
      {phases.length > 0 && (
        <div style={{
          display: 'flex',
          gap: 2,
          alignItems: 'center',
          flexWrap: 'wrap'
        }}>
          {phases.map(p => {
            const isComplete = p.progress === 100;
            const isActive = p.progress > 0 && p.progress < 100;
            return (
              <div
                key={p.phase}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: 4,
                  background: isActive ? (darkMode ? '#1f6feb22' : '#ddf4ff') :
                    isComplete ? (darkMode ? '#23863618' : '#dafbe1') : 'transparent',
                  border: `1px solid ${isActive ? '#58a6ff44' : isComplete ? '#3fb95033' : 'transparent'}`,
                  minWidth: 70,
                  cursor: 'default'
                }}
              >
                {/* Phase progress mini-bar */}
                <div style={{
                  width: '100%',
                  height: 3,
                  background: barBg,
                  borderRadius: 2,
                  overflow: 'hidden',
                  marginBottom: 3
                }}>
                  <div style={{
                    width: `${p.progress}%`,
                    height: '100%',
                    background: isComplete ? '#3fb950' : isActive ? '#58a6ff' : '#30363d',
                    borderRadius: 2,
                    transition: 'width 0.5s ease'
                  }} />
                </div>
                <span style={{
                  fontSize: 9,
                  fontWeight: 600,
                  color: isActive ? '#58a6ff' : isComplete ? '#3fb950' : mutedColor,
                  textTransform: 'uppercase',
                  letterSpacing: 0.3,
                  whiteSpace: 'nowrap'
                }}>
                  {p.name}
                </span>
                <span style={{
                  fontSize: 8,
                  color: mutedColor,
                  marginTop: 1
                }}>
                  {p.progress}%
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

function BigStat({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{
        fontSize: 28,
        fontWeight: 800,
        color,
        fontVariantNumeric: 'tabular-nums',
        lineHeight: 1
      }}>
        {value}
      </div>
      <div style={{
        fontSize: 9,
        fontWeight: 600,
        color: '#7d8590',
        letterSpacing: 0.8,
        marginTop: 4,
        textTransform: 'uppercase'
      }}>
        {label}
      </div>
    </div>
  );
}
