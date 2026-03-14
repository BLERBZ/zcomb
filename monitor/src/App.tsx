import { useState } from 'react';
import { usePolling } from './hooks/usePolling';
import { AgentCards } from './components/AgentCards';
import { KanbanBoard } from './components/KanbanBoard';
import { ActivityFeed } from './components/ActivityFeed';
import { MetricsPanel } from './components/MetricsPanel';
import { GanttChart } from './components/GanttChart';

function formatElapsed(startTime: number): string {
  const s = Math.floor((Date.now() - startTime) / 1000);
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
}

export default function App() {
  const { state, error, startTime } = usePolling(3000);
  const [darkMode, setDarkMode] = useState(true);
  const [activityFilter, setActivityFilter] = useState<string>('all');
  const [elapsed, setElapsed] = useState('00:00:00');

  // Update elapsed time every second
  useState(() => {
    const id = setInterval(() => setElapsed(formatElapsed(startTime)), 1000);
    return () => clearInterval(id);
  });

  const tasks = state?.tasks?.tasks || [];
  const agents = state?.agents?.agents || [];
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const overallProgress = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0;

  const bg = darkMode ? '#0d1117' : '#ffffff';
  const cardBg = darkMode ? '#161b22' : '#f6f8fa';
  const borderColor = darkMode ? '#30363d' : '#d0d7de';
  const textColor = darkMode ? '#e6edf3' : '#1f2328';
  const mutedColor = darkMode ? '#7d8590' : '#656d76';
  const accentColor = '#58a6ff';

  return (
    <div style={{
      minHeight: '100vh',
      background: bg,
      color: textColor,
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif',
      fontSize: 14
    }}>
      {/* Top Bar */}
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 24px',
        borderBottom: `1px solid ${borderColor}`,
        background: darkMode ? '#010409' : '#f6f8fa'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>&#9889;</span>
          <h1 style={{ margin: 0, fontSize: 18, fontWeight: 600 }}>ZCombinator</h1>
          <span style={{ color: mutedColor, fontSize: 13 }}>Agent Network Monitor</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: mutedColor, fontSize: 12 }}>PROGRESS</span>
            <div style={{
              width: 120, height: 6, borderRadius: 3,
              background: darkMode ? '#21262d' : '#e1e4e8',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${overallProgress}%`, height: '100%', borderRadius: 3,
                background: overallProgress === 100 ? '#3fb950' : accentColor,
                transition: 'width 0.5s ease'
              }} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 600 }}>{overallProgress}%</span>
          </div>
          <div style={{ color: mutedColor, fontSize: 13, fontFamily: 'monospace' }}>
            {elapsed}
          </div>
          {error && <span style={{ color: '#f85149', fontSize: 12 }}>Connection error</span>}
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{
              background: 'none', border: `1px solid ${borderColor}`,
              borderRadius: 6, padding: '4px 10px', cursor: 'pointer',
              color: textColor, fontSize: 12
            }}
          >
            {darkMode ? 'Light' : 'Dark'}
          </button>
        </div>
      </header>

      {/* Main Layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr 300px',
        gridTemplateRows: 'auto 1fr auto',
        gap: 0,
        height: 'calc(100vh - 53px)',
        overflow: 'hidden'
      }}>
        {/* Left: Agent Cards */}
        <div style={{
          gridRow: '1 / 4',
          borderRight: `1px solid ${borderColor}`,
          overflowY: 'auto',
          padding: 16
        }}>
          <h3 style={{ margin: '0 0 12px', fontSize: 12, textTransform: 'uppercase', color: mutedColor, letterSpacing: 1 }}>
            Agents ({agents.length})
          </h3>
          <AgentCards agents={agents} darkMode={darkMode} />
        </div>

        {/* Center: Kanban + Gantt */}
        <div style={{ overflowY: 'auto', padding: 16 }}>
          <KanbanBoard tasks={tasks} agents={agents} darkMode={darkMode} />
          <GanttChart tasks={tasks} metrics={state?.metrics} darkMode={darkMode} />
        </div>

        {/* Right: Activity Feed */}
        <div style={{
          gridRow: '1 / 4',
          borderLeft: `1px solid ${borderColor}`,
          overflowY: 'auto',
          padding: 16
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 style={{ margin: 0, fontSize: 12, textTransform: 'uppercase', color: mutedColor, letterSpacing: 1 }}>
              Activity
            </h3>
            <select
              value={activityFilter}
              onChange={e => setActivityFilter(e.target.value)}
              style={{
                background: cardBg, border: `1px solid ${borderColor}`,
                borderRadius: 4, padding: '2px 6px', color: textColor, fontSize: 11
              }}
            >
              <option value="all">All Agents</option>
              {agents.map(a => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <ActivityFeed
            activity={state?.activity || []}
            filter={activityFilter}
            darkMode={darkMode}
          />
        </div>

        {/* Bottom: Metrics */}
        <div style={{
          gridColumn: '2',
          borderTop: `1px solid ${borderColor}`,
          padding: 16
        }}>
          <MetricsPanel
            tasks={tasks}
            agents={agents}
            metrics={state?.metrics}
            darkMode={darkMode}
          />
        </div>
      </div>
    </div>
  );
}
