import type { Agent } from '../hooks/usePolling';

const statusColors: Record<string, string> = {
  active: '#3fb950',
  idle: '#7d8590',
  blocked: '#d29922',
  done: '#58a6ff'
};

const statusEmoji: Record<string, string> = {
  active: '\u25CF',
  idle: '\u25CB',
  blocked: '\u25B2',
  done: '\u2713'
};

export function AgentCards({ agents, darkMode }: { agents: Agent[]; darkMode: boolean }) {
  const cardBg = darkMode ? '#161b22' : '#ffffff';
  const borderColor = darkMode ? '#30363d' : '#d0d7de';
  const mutedColor = darkMode ? '#7d8590' : '#656d76';

  if (agents.length === 0) {
    return (
      <div style={{ color: mutedColor, fontSize: 13, textAlign: 'center', padding: 20 }}>
        No agents spawned yet...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {agents.map(agent => (
        <div
          key={agent.id}
          style={{
            background: cardBg,
            border: `1px solid ${borderColor}`,
            borderRadius: 8,
            padding: 12,
            borderLeft: `3px solid ${statusColors[agent.status] || '#7d8590'}`
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>{agent.name}</span>
            <span style={{
              fontSize: 11,
              color: statusColors[agent.status],
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 4
            }}>
              {statusEmoji[agent.status]} {agent.status}
            </span>
          </div>
          <div style={{ fontSize: 11, color: mutedColor, marginBottom: 6 }}>{agent.role}</div>
          {agent.currentTask && (
            <div style={{
              fontSize: 11,
              color: darkMode ? '#e6edf3' : '#1f2328',
              background: darkMode ? '#0d1117' : '#f6f8fa',
              padding: '4px 8px',
              borderRadius: 4,
              marginBottom: 6
            }}>
              {agent.currentTask}
            </div>
          )}
          <div style={{ display: 'flex', gap: 12, fontSize: 11, color: mutedColor }}>
            <span>{agent.metrics.tasksCompleted} done</span>
            <span>{agent.metrics.errors} errors</span>
          </div>
        </div>
      ))}
    </div>
  );
}
