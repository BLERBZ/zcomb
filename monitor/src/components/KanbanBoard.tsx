import type { Task, Agent } from '../hooks/usePolling';

const columns = [
  { key: 'inbox', label: 'INBOX', color: '#7d8590' },
  { key: 'assigned', label: 'ASSIGNED', color: '#d29922' },
  { key: 'in_progress', label: 'IN PROGRESS', color: '#58a6ff' },
  { key: 'review', label: 'REVIEW', color: '#a371f7' },
  { key: 'done', label: 'DONE', color: '#3fb950' },
  { key: 'failed', label: 'FAILED', color: '#f85149' }
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
  const textColor = darkMode ? '#e6edf3' : '#1f2328';
  const colBg = darkMode ? '#0d1117' : '#f6f8fa';

  const agentMap = new Map(agents.map(a => [a.id, a.name]));

  return (
    <div>
      <h3 style={{
        margin: '0 0 14px',
        fontSize: 13,
        fontWeight: 700,
        textTransform: 'uppercase',
        color: mutedColor,
        letterSpacing: 1.5
      }}>
        Task Board
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
              padding: 10,
              minHeight: 140
            }}>
              {/* Column Header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
                padding: '0 2px'
              }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  color: col.color,
                  letterSpacing: 0.5
                }}>
                  {col.label}
                </span>
                <span style={{
                  fontSize: 11,
                  fontWeight: 700,
                  background: darkMode ? '#21262d' : '#e1e4e8',
                  color: mutedColor,
                  padding: '1px 7px',
                  borderRadius: 10,
                  minWidth: 18,
                  textAlign: 'center'
                }}>
                  {colTasks.length}
                </span>
              </div>

              {/* Task Cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {colTasks.slice(0, 12).map(task => (
                  <div key={task.id} style={{
                    background: cardBg,
                    border: `1px solid ${borderColor}`,
                    borderRadius: 6,
                    padding: '8px 10px',
                    fontSize: 11,
                    transition: 'box-shadow 0.2s ease',
                    cursor: 'default'
                  }}>
                    {/* Priority indicator + title */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 6,
                      marginBottom: 4
                    }}>
                      <span style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: priorityColors[task.priority] || '#7d8590',
                        flexShrink: 0,
                        marginTop: 4
                      }} />
                      <span style={{
                        fontWeight: 500,
                        lineHeight: 1.35,
                        color: textColor,
                        flex: 1
                      }}>
                        {task.title.replace(/^Phase \d+: /, '')}
                      </span>
                    </div>

                    {/* Assignee + Phase */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      color: mutedColor,
                      fontSize: 10,
                      paddingLeft: 12
                    }}>
                      <span>{task.assignee ? agentMap.get(task.assignee) || task.assignee : 'Unassigned'}</span>
                      <span style={{
                        background: darkMode ? '#21262d' : '#e1e4e8',
                        padding: '0 5px',
                        borderRadius: 3,
                        fontSize: 9,
                        fontWeight: 600
                      }}>P{task.phase}</span>
                    </div>

                    {/* Dependencies */}
                    {task.dependencies.length > 0 && (
                      <div style={{
                        fontSize: 9,
                        color: mutedColor,
                        marginTop: 3,
                        paddingLeft: 12,
                        opacity: 0.7
                      }}>
                        Depends: {task.dependencies.join(', ')}
                      </div>
                    )}
                  </div>
                ))}
                {colTasks.length > 12 && (
                  <div style={{ fontSize: 10, color: mutedColor, textAlign: 'center', padding: 6 }}>
                    +{colTasks.length - 12} more
                  </div>
                )}
                {colTasks.length === 0 && (
                  <div style={{ fontSize: 10, color: mutedColor, textAlign: 'center', padding: 16, opacity: 0.5 }}>
                    No tasks
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
