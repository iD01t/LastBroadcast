
import React from 'react';

interface SuspicionMeterProps {
  level: number;
}

const SuspicionMeter: React.FC<SuspicionMeterProps> = ({ level }) => {
  const getBarColor = () => {
    if (level >= 75) return 'bg-red-500';
    if (level >= 50) return 'bg-yellow-500';
    return 'bg-teal-500';
  };

  const getTextColor = () => {
    if (level >= 75) return 'text-red-400 text-glow-red';
    if (level >= 50) return 'text-yellow-400';
    return 'text-teal-300';
  };
  
  const getEffectText = () => {
    if (level >= 75) return "MAJOR HALLUCINATIONS";
    if (level >= 50) return "VISUAL GLITCHES";
    if (level >= 25) return "AUDIO HALLUCINATIONS";
    return "ALL CLEAR";
  }

  return (
    <div className="bg-black/70 p-4 text-amber-300">
      <h3 className="text-2xl text-center text-glow">Suspicion Level</h3>
      <div className="text-center my-2">
        <span className={`text-5xl font-bold ${getTextColor()}`}>{level}%</span>
        <p className={`text-xl ${getTextColor()} animate-pulse`}>{getEffectText()}</p>
      </div>
      <div className="w-full bg-gray-800 border-2 border-amber-500/30 h-8 p-1">
        <div
          className={`h-full ${getBarColor()} transition-all duration-500`}
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

export default SuspicionMeter;
