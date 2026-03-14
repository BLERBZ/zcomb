import type { Activity } from '../hooks/usePolling';

const typeColors: Record<string, string> = {
  task_started: '#58a6ff',
  task_completed: '#3fb950',
  task_failed: '#f85149',
  self_reflection: '#a371f7',
  heartbeat: '#7d8590',
  research: '#d29922',
  spawned: '#79c0ff',
  status_change: '#d2a8ff',
  error: '#f85149'
};

function timeAgo(ts: string): string {
  const diff = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m`;
  return `${Math.floor(diff / 3600)}h`;
}

export function ActivityFeed({ activity, filter, darkMode }: {
  activity: Activity[];
  filter: string;
  darkMode: boolean;
}) {
  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const borderColor = darkMode ? '#21262d' : '#e1e4e8';

  const filtered = filter === 'all' ? activity : activity.filter(a => a.agentId === filter);
  const reversed = [...filtered].reverse();

  if (reversed.length === 0) {
    return (
      <div style={{ color: mutedColor, fontSize: 12, textAlign: 'center', padding: 20 }}>
        Waiting for agent activity...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
      {reversed.map((item, i) => (
        <div
          key={i}
          style={{
            padding: '8px 0',
            borderBottom: `1px solid ${borderColor}`,
            fontSize: 12
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 2 }}>
            <span style={{
              fontWeight: 600,
              color: typeColors[item.type] || mutedColor,
              fontSize: 10,
              textTransform: 'uppercase'
            }}>
              {item.type.replace(/_/g, ' ')}
            </span>
            <span style={{ color: mutedColor, fontSize: 10 }}>
              {timeAgo(item.timestamp)}
            </span>
          </div>
          <div style={{ color: darkMode ? '#c9d1d9' : '#1f2328', lineHeight: 1.4 }}>
            {item.message}
          </div>
          <div style={{ color: mutedColor, fontSize: 10, marginTop: 2 }}>
            {item.agentId}
          </div>
        </div>
      ))}
    </div>
  );
}
