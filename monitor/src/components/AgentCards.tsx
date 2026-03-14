import type { Agent } from '../hooks/usePolling';

const statusColors: Record<string, string> = {
  active: '#3fb950',
  idle: '#7d8590',
  blocked: '#d29922',
  done: '#58a6ff'
};

const statusLabels: Record<string, string> = {
  active: 'ACTIVE',
  idle: 'IDLE',
  blocked: 'BLOCKED',
  done: 'DONE'
};

export function AgentCards({ agents, darkMode }: { agents: Agent[]; darkMode: boolean }) {
  const cardBg = darkMode ? '#161b22' : '#ffffff';
  const borderColor = darkMode ? '#30363d' : '#d0d7de';
  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const textColor = darkMode ? '#e6edf3' : '#1f2328';

  if (agents.length === 0) {
    return (
      <div style={{ color: mutedColor, fontSize: 13, textAlign: 'center', padding: 20 }}>
        No agents spawned yet...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {agents.map(agent => {
        const color = statusColors[agent.status] || '#7d8590';
        return (
          <div
            key={agent.id}
            style={{
              background: cardBg,
              border: `1px solid ${borderColor}`,
              borderRadius: 8,
              padding: '14px 14px 12px',
              borderLeft: `3px solid ${color}`,
              transition: 'border-color 0.3s ease'
            }}
          >
            {/* Name + Status Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: textColor }}>{agent.name}</span>
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                color: color,
                background: `${color}18`,
                padding: '2px 8px',
                borderRadius: 4,
                letterSpacing: 0.5,
                textTransform: 'uppercase'
              }}>
                {statusLabels[agent.status] || agent.status}
              </span>
            </div>

            {/* Role */}
            <div style={{
              fontSize: 11,
              color: mutedColor,
              marginBottom: 8,
              lineHeight: 1.4
            }}>
              {agent.role}
            </div>

            {/* Current Task */}
            {agent.currentTask && (
              <div style={{
                fontSize: 11,
                color: textColor,
                background: darkMode ? '#0d1117' : '#f6f8fa',
                padding: '6px 10px',
                borderRadius: 6,
                marginBottom: 8,
                borderLeft: `2px solid ${color}`,
                fontFamily: 'monospace',
                lineHeight: 1.4
              }}>
                {agent.currentTask}
              </div>
            )}

            {/* Metrics */}
            <div style={{
              display: 'flex',
              gap: 16,
              fontSize: 11,
              color: mutedColor,
              paddingTop: 4,
              borderTop: `1px solid ${darkMode ? '#21262d' : '#e8e8e8'}`
            }}>
              <span>Tasks <strong style={{ color: textColor }}>{agent.metrics.tasksCompleted}</strong></span>
              <span>Errors <strong style={{ color: agent.metrics.errors > 0 ? '#f85149' : textColor }}>{agent.metrics.errors}</strong></span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
