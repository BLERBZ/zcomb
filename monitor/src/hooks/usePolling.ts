import { useState, useEffect, useCallback } from 'react';

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'blocked' | 'done';
  currentTask: string | null;
  metrics: { tasksCompleted: number; errors: number };
}

export interface Task {
  id: string;
  title: string;
  status: 'inbox' | 'assigned' | 'in_progress' | 'review' | 'done' | 'failed';
  assignee: string | null;
  priority: 'high' | 'medium' | 'low';
  dependencies: string[];
  phase: number;
  createdAt: string;
  updatedAt: string;
}

export interface Activity {
  timestamp: string;
  agentId: string;
  type: string;
  message: string;
}

export interface Metrics {
  completionPct: number;
  errorRate: number;
  tasksPerHour: number;
  phases: { phase: number; name: string; progress: number }[];
}

export interface AppState {
  agents: { agents: Agent[] };
  tasks: { tasks: Task[] };
  metrics: Metrics;
  activity: Activity[];
  riskAnalysis: any;
  timestamp: string;
}

export function usePolling(intervalMs: number = 3000) {
  const [state, setState] = useState<AppState | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startTime] = useState(Date.now());

  const fetchState = useCallback(async () => {
    try {
      const res = await fetch('/api/state');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setState(data);
      setError(null);
    } catch (e: any) {
      setError(e.message);
    }
  }, []);

  useEffect(() => {
    fetchState();
    const id = setInterval(fetchState, intervalMs);
    return () => clearInterval(id);
  }, [fetchState, intervalMs]);

  return { state, error, startTime };
}
