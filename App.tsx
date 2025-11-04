
import React, { useState, useCallback, useEffect } from 'react';
import { GAME_DATA } from './constants';
import { GameState, Scene, Interactable, Dialogue, Choice, Ending } from './types';
import SceneViewer from './components/SceneViewer';
import Journal from './components/Journal';
import SuspicionMeter from './components/SuspicionMeter';
import DialogueModal from './components/DialogueModal';
import AchievementsDisplay from './components/AchievementsDisplay';
import { IMAGE_ASSETS } from './image-assets';
import { PowerIcon } from './components/Icons';

const App: React.FC = () => {
    const [gameState, setGameState] = useState<GameState>('MainMenu');
    const [currentScene, setCurrentScene] = useState<Scene>(GAME_DATA.scenes[0]);
    const [suspicion, setSuspicion] = useState(0);
    const [clues, setClues] = useState<string[]>([]);
    const [inventory, setInventory] = useState<string[]>([]);
    const [activeDialogue, setActiveDialogue] = useState<Dialogue | null>(null);
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [message, setMessage] = useState<string | null>(null);
    const [ending, setEnding] = useState<Ending | null>(null);
    const [isChangingScene, setIsChangingScene] = useState(false);
    const [showStatic, setShowStatic] = useState(true);

    const showMessage = (text: string, duration: number = 3000) => {
        setMessage(text);
        setTimeout(() => setMessage(null), duration);
    };
    
    const unlockAchievement = useCallback((name: string) => {
        if (!unlockedAchievements.includes(name)) {
            setUnlockedAchievements(prev => [...prev, name]);
            showMessage(`Achievement Unlocked: ${name}`);
        }
    }, [unlockedAchievements]);

    useEffect(() => {
        if (suspicion >= 100) {
            setSuspicion(100);
            const deadAirEnding = GAME_DATA.endings.find(e => e.id === 'Dead Air');
            if(deadAirEnding) {
                setEnding(deadAirEnding);
                setGameState('Ending');
                unlockAchievement('Dead Air');
            }
        }
    }, [suspicion, unlockAchievement]);

    const changeScene = useCallback((newScene: Scene) => {
        if (newScene.id === currentScene.id || isChangingScene) return;
        setIsChangingScene(true);
        setTimeout(() => {
            setCurrentScene(newScene);
            setIsChangingScene(false);
        }, 500); // Must match SceneViewer transition duration
    }, [currentScene.id, isChangingScene]);


    const handleStartGame = () => {
        setGameState('Playing');
        setCurrentScene(GAME_DATA.scenes[0]);
        // Reset state for new game
        setSuspicion(0);
        setClues([]);
        setInventory([]);
        setActiveDialogue(null);
        setEnding(null);
    };

    const updateSuspicion = useCallback((change: number) => {
        setSuspicion(prev => Math.max(0, Math.min(100, prev + change)));
    }, []);

    const handleDialogueChoice = useCallback((choice: Choice) => {
        updateSuspicion(choice.suspicion_change);
        showMessage(choice.response);
        setActiveDialogue(null);
        setGameState('Playing');
        
        if (choice.ending) {
            const chosenEnding = GAME_DATA.endings.find(e => e.id === choice.ending);
            if (chosenEnding) {
                setEnding(chosenEnding);
                setGameState('Ending');
                unlockAchievement(chosenEnding.id);
            }
        }

    }, [updateSuspicion, unlockAchievement]);

    const handleHotspotClick = useCallback((hotspot: Interactable) => {
        if (hotspot.action === 'start_broadcast') {
            const firstCall = GAME_DATA.dialogues.find(d => d.id === 'phone_call_1');
            if (firstCall) {
                setActiveDialogue(firstCall);
                setGameState('InCall');
                unlockAchievement('First Caller');
            }
        }
        
        if (hotspot.action === 'change_scene') {
            const targetSceneId = hotspot.id.replace('door_', '');
            const targetScene = GAME_DATA.scenes.find(s => s.id === targetSceneId);
            if (targetScene) {
                if (hotspot.id === 'door_office' && !inventory.includes('Back Office Key')) {
                    showMessage("It's locked.");
                    return;
                }
                 if (hotspot.id === 'door_archives' && !inventory.includes('Archives Key')) {
                    showMessage("It's locked.");
                    return;
                }
                changeScene(targetScene);
            }
        }

        if (hotspot.clue) {
            if (!clues.includes(hotspot.clue)) {
                setClues(prev => [...prev, hotspot.clue!]);
                showMessage("New clue added to journal.");
            }
        }
        
        if (hotspot.item_found) {
            if (!inventory.includes(hotspot.item_found)) {
                setInventory(prev => [...prev, hotspot.item_found]);
                showMessage(`Found: ${hotspot.item_found}`);
                if (hotspot.item_found.includes("FINCH - FINAL BROADCAST")) unlockAchievement("The Archivist");
            }
        }
        
        if (hotspot.action === 'puzzle_safe') {
            const solution = "10-89-78";
            const input = prompt("Enter safe combination (e.g., 10-89-78):");
            if(input === solution) {
                showMessage("The safe clicks open. You found the Archives Key!");
                if (!inventory.includes("Archives Key")) {
                    setInventory(prev => [...prev, "Archives Key"]);
                }
                unlockAchievement("Safe Cracker");
            } else {
                showMessage("Incorrect combination. The dial sticks.");
                updateSuspicion(5);
            }
        }

        if (hotspot.action === 'final_confrontation') {
            const finalCall = GAME_DATA.dialogues.find(d => d.id === 'phone_call_3');
            if (finalCall) {
                setActiveDialogue(finalCall);
                setGameState('InCall');
            }
        }
        
        if(hotspot.hidden_access === "basement"){
            if(inventory.includes("Archives Key")){
                const basementScene = GAME_DATA.scenes.find(s => s.id === "basement");
                if(basementScene){
                    changeScene(basementScene);
                    unlockAchievement("Deep Listener");
                    showMessage("You used the Archives Key on a hidden keyhole under the tile.");
                }
            } else {
                showMessage("The tile is loose, but there's a keyhole underneath you can't open.");
            }
        }


    }, [clues, inventory, unlockAchievement, updateSuspicion, changeScene]);


    const MainMenu = () => {
      const bgStyle = {
        backgroundImage: `url('${IMAGE_ASSETS['menu_bg.jpg']}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };
      
      return (
        <div 
          className="w-full h-full flex flex-col items-center justify-center text-amber-400 crt-effect"
          style={bgStyle}
        >
          <div className="absolute inset-0 bg-black/60 z-0"></div>
          <div className="relative z-10 flex flex-col items-center justify-center text-center p-4">
             <img src={IMAGE_ASSETS['logo_game.png']} alt="Last Broadcast" className="w-full max-w-2xl mb-4" />
            <h2 className="text-4xl text-glow-red">Final Master Edition GDD Explorer</h2>
            <button
                onClick={handleStartGame}
                className="mt-12 px-8 py-4 text-3xl border-2 border-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300"
            >
                Start Broadcast
            </button>
          </div>
        </div>
    );
    }

    const EndingScreen = () => {
        const bgStyle = {
            backgroundImage: `url('${IMAGE_ASSETS['credits_bg.jpg']}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        };

        return (
            <div className="w-full h-full flex flex-col items-center justify-center text-white crt-effect p-8 text-center" style={bgStyle}>
                <div className="absolute inset-0 bg-black/70 z-0"></div>
                <div className="relative z-10">
                    <h1 className="text-7xl text-glow-red">{ending?.id}</h1>
                    <p className="text-2xl mt-8 max-w-3xl text-teal-300 leading-relaxed">{ending?.description}</p>
                    <button
                        onClick={() => setGameState('MainMenu')}
                        className="mt-12 px-8 py-4 text-3xl border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300"
                    >
                        Return to Main Menu
                    </button>
                </div>
            </div>
        );
    }

    const StaticOverlay = () => (
        <div 
            className="fixed top-0 left-0 w-full h-full pointer-events-none z-50 opacity-10"
            style={{
                backgroundImage: `url('${IMAGE_ASSETS['static_noise.gif']}')`,
                backgroundRepeat: 'repeat',
            }}
        ></div>
    );

    return (
        <main className="bg-gray-900 w-screen h-screen overflow-hidden font-mono">
            {message && (
                <div className="absolute top-4 right-4 bg-black/80 text-teal-300 text-xl p-3 border-2 border-teal-500/50 z-50 animate-pulse">
                    {message}
                </div>
            )}
            
            {showStatic && <StaticOverlay />}

            {gameState === 'MainMenu' && <MainMenu />}
            {gameState === 'Ending' && <EndingScreen />}

            {(gameState === 'Playing' || gameState === 'InCall') && (
                <div className="flex flex-col md:flex-row h-full">
                    <div className="w-full md:w-3/4 h-2/3 md:h-full">
                        <SceneViewer scene={currentScene} onHotspotClick={handleHotspotClick} suspicion={suspicion} isChanging={isChangingScene} />
                    </div>
                    <div className="w-full md:w-1/4 h-1/3 md:h-full flex flex-col border-l-4 border-amber-500/50 bg-black">
                        <SuspicionMeter level={suspicion} />
                        <div className="flex-grow overflow-y-auto">
                           <Journal clues={clues} inventory={inventory} />
                        </div>
                        <div className="border-t-2 border-amber-500/50">
                            <AchievementsDisplay unlocked={unlockedAchievements} />
                        </div>
                         <div className="border-t-2 border-amber-500/50 p-2">
                             <button onClick={() => setShowStatic(!showStatic)} className="w-full flex items-center justify-center p-2 text-xl bg-gray-800/50 border-2 border-teal-500/50 hover:bg-teal-500/20 hover:text-teal-300 transition-colors duration-200">
                                <PowerIcon className="w-6 h-6 mr-2" />
                                Toggle Static: {showStatic ? 'ON' : 'OFF'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {gameState === 'InCall' && activeDialogue && (
                <DialogueModal
                    dialogue={activeDialogue}
                    onChoice={handleDialogueChoice}
                    onClose={() => { setActiveDialogue(null); setGameState('Playing'); }}
                />
            )}
        </main>
    );
};

export default App;