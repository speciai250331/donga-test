import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearnerRecord } from '../types';
import { DashboardStats, calculateDashboardStats } from '../utils/dashboardStats';

const STORAGE_KEY = 'ai_diag_dashboard_records';

interface DashboardContextValue {
  records: LearnerRecord[];
  stats: DashboardStats;
  setRecords: (records: LearnerRecord[]) => void;
  clearRecords: () => void;
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

  const stats = calculateDashboardStats(records);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
  }, [records]);

  const setRecords = (newRecords: LearnerRecord[]) => {
    setRecordsState(newRecords);
  };

  const clearRecords = () => {
    setRecordsState([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <DashboardContext.Provider value={{ records, stats, setRecords, clearRecords }}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const ctx = useContext(DashboardContext);
  if (!ctx) throw new Error('useDashboard must be used within DashboardProvider');
  return ctx;
};
