import React from 'react';
import { Scene, Interactable } from '../types';
import Hotspot from './Hotspot';
import { IMAGE_ASSETS } from '../image-assets';

interface SceneViewerProps {
  scene: Scene;
  onHotspotClick: (hotspot: Interactable) => void;
  suspicion: number;
  isChanging: boolean;
}

const SceneViewer: React.FC<SceneViewerProps> = ({ scene, onHotspotClick, suspicion, isChanging }) => {
  const getSuspicionClass = () => {
    if (suspicion >= 75) return 'animate-pulse contrast-200';
    if (suspicion >= 50) return 'saturate-50';
    return '';
  };

  const getGlowEffectClass = () => {
    if (suspicion >= 75) {
      return 'shadow-2xl shadow-red-500/50 animate-pulse';
    }
    if (suspicion >= 50) {
      return 'shadow-2xl shadow-red-500/30';
    }
    return 'shadow-2xl shadow-amber-500/20';
  };

  return (
    <div className={`relative w-full h-full bg-black text-white border-4 border-amber-500/50 overflow-hidden transition-all duration-500 ease-in-out ${isChanging ? 'opacity-0' : 'opacity-100'} ${getGlowEffectClass()}`}>
      <img
        key={scene.id}
        src={IMAGE_ASSETS[scene.background]}
        alt={scene.title}
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${getSuspicionClass()}`}
      />
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Overlays for CRT effect */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('${IMAGE_ASSETS['vignette_overlay.png']}')`, backgroundSize: '100% 100%' }}></div>
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: `url('${IMAGE_ASSETS['ui_frame.png']}')`, backgroundSize: '100% 100%' }}></div>
      
      {scene.interactables.map((hotspot) => (
        <Hotspot key={hotspot.id} hotspot={hotspot} onClick={onHotspotClick} />
      ))}

      <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/70 border-t-2 border-amber-500/50 text-amber-400">
        <h2 className="text-3xl text-glow">{scene.title}</h2>
        <p className="text-lg mt-1">{scene.description}</p>
      </div>

       {suspicion >= 25 && <div className="absolute inset-0 pointer-events-none crt-effect"></div>}
       {suspicion >= 50 && <div className="absolute top-4 right-4 text-red-500 text-glow-red text-2xl animate-pulse">SYSTEM UNSTABLE</div>}

    </div>
  );
};

export default SceneViewer;