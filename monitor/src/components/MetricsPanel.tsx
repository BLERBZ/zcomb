import type { Task, Agent, Metrics } from '../hooks/usePolling';

export function MetricsPanel({ tasks, agents, metrics, darkMode }: {
  tasks: Task[];
  agents: Agent[];
  metrics?: Metrics;
  darkMode: boolean;
}) {
  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const barBg = darkMode ? '#21262d' : '#e1e4e8';

  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const failedTasks = tasks.filter(t => t.status === 'failed').length;
  const inProgress = tasks.filter(t => t.status === 'in_progress').length;
  const completionPct = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;
  const errorRate = totalTasks > 0 ? Math.round((failedTasks / totalTasks) * 100) : 0;

  const activeAgents = agents.filter(a => a.status === 'active').length;
  const doneAgents = agents.filter(a => a.status === 'done').length;

  const phases = metrics?.phases || [];

  return (
    <div style={{ display: 'flex', gap: 24, alignItems: 'flex-start', flexWrap: 'wrap' }}>
      {/* Stats */}
      <div style={{ display: 'flex', gap: 20 }}>
        <Stat label="Completion" value={`${completionPct}%`} color="#3fb950" />
        <Stat label="In Progress" value={String(inProgress)} color="#58a6ff" />
        <Stat label="Error Rate" value={`${errorRate}%`} color={errorRate > 0 ? '#f85149' : '#3fb950'} />
        <Stat label="Agents Active" value={`${activeAgents}/${agents.length}`} color="#58a6ff" />
        <Stat label="Agents Done" value={`${doneAgents}/${agents.length}`} color="#3fb950" />
        <Stat label="Tasks Done" value={`${doneTasks}/${totalTasks}`} color="#3fb950" />
      </div>

      {/* Phase Progress */}
      {phases.length > 0 && (
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 10, textTransform: 'uppercase', color: mutedColor, marginBottom: 6, letterSpacing: 1 }}>
            Phase Progress
          </div>
          {phases.map(p => (
            <div key={p.phase} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: mutedColor, width: 80, flexShrink: 0 }}>
                P{p.phase} {p.name}
              </span>
              <div style={{ flex: 1, height: 4, background: barBg, borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  width: `${p.progress}%`,
                  height: '100%',
                  background: p.progress === 100 ? '#3fb950' : '#58a6ff',
                  borderRadius: 2,
                  transition: 'width 0.5s ease'
                }} />
              </div>
              <span style={{ fontSize: 10, color: mutedColor, width: 30, textAlign: 'right' }}>
                {p.progress}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div>
      <div style={{ fontSize: 10, textTransform: 'uppercase', color: '#7d8590', marginBottom: 2, letterSpacing: 0.5 }}>
        {label}
      </div>
      <div style={{ fontSize: 18, fontWeight: 700, color, fontVariantNumeric: 'tabular-nums' }}>
        {value}
      </div>
    </div>
  );
}
