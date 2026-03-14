import type { Task, Agent } from '../hooks/usePolling';

const columns = [
  { key: 'inbox', label: 'Inbox', color: '#7d8590' },
  { key: 'assigned', label: 'Assigned', color: '#d29922' },
  { key: 'in_progress', label: 'In Progress', color: '#58a6ff' },
  { key: 'review', label: 'Review', color: '#a371f7' },
  { key: 'done', label: 'Done', color: '#3fb950' },
  { key: 'failed', label: 'Failed', color: '#f85149' }
] as const;

const priorityColors: Record<string, string> = {
  high: '#f85149',
  medium: '#d29922',
  low: '#7d8590'
};

export function KanbanBoard({ tasks, agents, darkMode }: { tasks: Task[]; agents: Agent[]; darkMode: boolean }) {
  const cardBg = darkMode ? '#161b22' : '#ffffff';
  const borderColor = darkMode ? '#30363d' : '#d0d7de';
  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const colBg = darkMode ? '#0d1117' : '#f6f8fa';

  const agentMap = new Map(agents.map(a => [a.id, a.name]));

  return (
    <div>
      <h3 style={{ margin: '0 0 12px', fontSize: 12, textTransform: 'uppercase', color: mutedColor, letterSpacing: 1 }}>
        Tasks ({tasks.length})
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        gap: 8,
        marginBottom: 20
      }}>
        {columns.map(col => {
          const colTasks = tasks.filter(t => t.status === col.key);
          return (
            <div key={col.key} style={{
              background: colBg,
              borderRadius: 8,
              padding: 8,
              minHeight: 120
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 8,
                padding: '0 4px'
              }}>
                <span style={{ fontSize: 11, fontWeight: 600, color: col.color }}>
                  {col.label}
                </span>
                <span style={{
                  fontSize: 10,
                  background: darkMode ? '#21262d' : '#e1e4e8',
                  padding: '1px 6px',
                  borderRadius: 10,
                  color: mutedColor
                }}>
                  {colTasks.length}
                </span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {colTasks.slice(0, 10).map(task => (
                  <div key={task.id} style={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 6,
                    padding: '6px 8px',
                    fontSize: 11
                  }}>
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      marginBottom: 3
                    }}>
                      <span style={{ fontWeight: 500, lineHeight: 1.3, flex: 1 }}>
                        {task.title}
                      </span>
                      <span style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: priorityColors[task.priority] || '#7d8590',
                        flexShrink: 0,
                        marginLeft: 4,
                        marginTop: 4
                      }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: mutedColor, fontSize: 10 }}>
                      <span>{task.assignee ? agentMap.get(task.assignee) || task.assignee : 'unassigned'}</span>
                      <span>P{task.phase}</span>
                    </div>
                  </div>
                ))}
                {colTasks.length > 10 && (
                  <div style={{ fontSize: 10, color: mutedColor, textAlign: 'center', padding: 4 }}>
                    +{colTasks.length - 10} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
