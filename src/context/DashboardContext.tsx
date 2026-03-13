import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearnerRecord, Project } from '../types';
import { DashboardStats, calculateDashboardStats } from '../utils/dashboardStats';

const STORAGE_KEY = 'ai_diag_dashboard_records';
const PROJECTS_KEY = 'ai_diag_projects';

const SEED_PROJECTS: Project[] = [
  {
    id: 'standard',
    name: 'AI 역량 진단 (표준)',
    slug: 'standard',
    type: 'standard',
    isActive: true,
    showResult: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 'imm',
    name: 'AI 역량 진단 (IMM)',
    slug: 'imm',
    type: 'imm',
    isActive: true,
    showResult: true,
    createdAt: new Date().toISOString(),
  },
];

interface DashboardContextValue {
  records: LearnerRecord[];
  stats: DashboardStats;
  projects: Project[];
  setRecords: (records: LearnerRecord[]) => void;
  clearRecords: () => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  getProjectRecords: (projectId: string) => LearnerRecord[];
  getProjectStats: (projectId: string) => DashboardStats;
}

const DashboardContext = createContext<DashboardContextValue | null>(null);

export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecordsState] = useState<LearnerRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [projects, setProjectsState] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(PROJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.length > 0 ? parsed : SEED_PROJECTS;
      }
      return SEED_PROJECTS;
    } catch {
      return SEED_PROJECTS;
    }
  });

  const stats = calculateDashboardStats(records);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  }, [projects]);

  const setRecords = (newRecords: LearnerRecord[]) => {
    setRecordsState(newRecords);
  };

  const clearRecords = () => {
    setRecordsState([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  const addProject = (project: Project) => {
    setProjectsState(prev => [...prev, project]);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjectsState(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjectsState(prev => prev.filter(p => p.id !== id));
  };

  const getProjectRecords = (projectId: string) => {
    return records.filter(r => r.projectId === projectId);
  };

  const getProjectStats = (projectId: string) => {
    return calculateDashboardStats(getProjectRecords(projectId));
  };

  return (
    <DashboardContext.Provider value={{
      records, stats, projects,
      setRecords, clearRecords,
      addProject, updateProject, deleteProject,
      getProjectRecords, getProjectStats,
    }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
};
