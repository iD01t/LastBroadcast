
import React from 'react';
import { Interactable } from '../types';

interface HotspotProps {
  hotspot: Interactable;
  onClick: (hotspot: Interactable) => void;
}

const Hotspot: React.FC<HotspotProps> = ({ hotspot, onClick }) => {
  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
      style={{ top: hotspot.position.top, left: hotspot.position.left }}
      onClick={() => onClick(hotspot)}
    >
      <button className="relative flex items-center justify-center w-8 h-8 md:w-10 md:h-10">
        <div className="absolute w-full h-full bg-amber-400 rounded-full opacity-30 group-hover:opacity-60 transition-opacity animate-pulse"></div>
        <div className="absolute w-3/4 h-3/4 bg-amber-400 rounded-full opacity-50 group-hover:opacity-80 transition-opacity"></div>
        <div className="absolute w-1/2 h-1/2 bg-amber-400 rounded-full"></div>
      </button>
      <div className="absolute bottom-full mb-2 w-max max-w-xs px-3 py-1 bg-black/80 text-amber-300 text-lg rounded-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap -translate-x-1/2 left-1/2">
        {hotspot.label}
      </div>
    </div>
  );
};

export default Hotspot;
