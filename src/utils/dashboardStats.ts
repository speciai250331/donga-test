import { LearnerRecord } from '../types';

export interface DashboardStats {
  totalCompleted: number;
  avgScore: number;
  part1Avg: number;
  part2Avg: number;
  levelDist: { label: string; count: number; pct: number; cls: string }[];
  departments: { name: string; count: number; avg: number }[];
  recentActivity: { name: string; level: string; date: string }[];
}

const LEVEL_CLS_MAP: Record<string, string> = {
  '중급': 'intermediate',
  '초급': 'beginner',
  '기초': 'basic',
};

export const calculateDashboardStats = (records: LearnerRecord[]): DashboardStats => {
  const total = records.length;

  if (total === 0) {
    return {
      totalCompleted: 0,
      avgScore: 0,
      part1Avg: 0,
      part2Avg: 0,
      levelDist: [],
      departments: [],
      recentActivity: [],
    };
  }

  const avgScore = Math.round((records.reduce((s, r) => s + r.total, 0) / total) * 10) / 10;
  const part1Avg = Math.round((records.reduce((s, r) => s + r.part1, 0) / total) * 10) / 10;
  const part2Avg = Math.round((records.reduce((s, r) => s + r.part2, 0) / total) * 10) / 10;

  // Level distribution
  const levelCounts: Record<string, number> = {};
  records.forEach(r => {
    levelCounts[r.level] = (levelCounts[r.level] || 0) + 1;
  });
  const levelOrder = ['중급', '초급', '기초'];
  const levelDist = levelOrder
    .filter(l => levelCounts[l])
    .map(label => ({
      label,
      count: levelCounts[label],
      pct: Math.round((levelCounts[label] / total) * 100),
      cls: LEVEL_CLS_MAP[label] || 'basic',
    }));

  // Department stats
  const deptMap: Record<string, { sum: number; count: number }> = {};
  records.forEach(r => {
    if (!deptMap[r.dept]) deptMap[r.dept] = { sum: 0, count: 0 };
    deptMap[r.dept].sum += r.total;
    deptMap[r.dept].count += 1;
  });
  const departments = Object.entries(deptMap)
    .map(([name, { sum, count }]) => ({
      name,
      count,
      avg: Math.round((sum / count) * 10) / 10,
    }))
    .sort((a, b) => b.avg - a.avg);

  // Recent activity (sorted by date desc, top 5)
  const sorted = [...records].sort((a, b) => b.date.localeCompare(a.date));
  const recentActivity = sorted.slice(0, 5).map(r => ({
    name: r.name,
    level: r.level,
    date: r.date,
  }));

  return {
    totalCompleted: total,
    avgScore,
    part1Avg,
    part2Avg,
    levelDist,
    departments,
    recentActivity,
  };
};
