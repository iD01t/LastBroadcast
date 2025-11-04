
import React from 'react';
import { AchievementsIcon } from './Icons';
import { GAME_DATA } from '../constants';

interface AchievementsDisplayProps {
  unlocked: string[];
}

const AchievementsDisplay: React.FC<AchievementsDisplayProps> = ({ unlocked }) => {
  const allAchievements = GAME_DATA.achievements;
  
  return (
    <div className="bg-black/70 p-4 text-amber-300">
      <h3 className="text-2xl flex items-center text-glow mb-2">
        <AchievementsIcon className="w-6 h-6 mr-2" />
        Achievements ({unlocked.length}/{allAchievements.length})
      </h3>
      <div className="grid grid-cols-2 gap-2 text-lg">
        {allAchievements.map((ach) => {
          const isUnlocked = unlocked.includes(ach);
          return (
            <div key={ach} className={`flex items-center p-1 ${isUnlocked ? 'text-teal-300' : 'text-gray-600'}`}>
              <div className={`w-3 h-3 rounded-full mr-2 ${isUnlocked ? 'bg-teal-400' : 'bg-gray-700'}`}></div>
              <span>{isUnlocked ? ach : '???'}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsDisplay;
