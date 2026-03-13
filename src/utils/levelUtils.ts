import { Level } from '../constants';

export const getLevelGradient = (level: string): string => {
  switch (level) {
    case Level.INTERMEDIATE:
      return 'linear-gradient(135deg, #4A5568 0%, #2D3748 100%)';
    case Level.BEGINNER:
      return 'linear-gradient(135deg, #FF9F43 0%, #FF6B35 100%)';
    default:
      return 'linear-gradient(135deg, #6B7F8A 0%, #4A5D68 100%)';
  }
};
