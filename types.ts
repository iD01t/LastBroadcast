
export interface GameData {
  scenes: Scene[];
  dialogues: Dialogue[];
  endings: Ending[];
  achievements: string[];
}

export interface Scene {
  id: string;
  title: string;
  description: string;
  backgroundId: string;
  interactables: Interactable[];
}

export interface Interactable {
  id: string;
  label: string;
  position: { top: string; left: string };
  action?: string;
  text?: string;
  clue?: string;
  item_found?: string;
  locked?: boolean;
  requires?: string;
  ending?: string;
  hidden_access?: string;
}

export interface Dialogue {
  id: string;
  title: string;
  caller_line: string;
  choices: Choice[];
}

export interface Choice {
  text: string;
  suspicion_change: number;
  response: string;
  effect?: string;
  flag?: string;
  ending?: string;
}

export interface Ending {
  id: string;
  requirements: string[];
  scene: string;
  description: string;
}

export type GameState = 'MainMenu' | 'Playing' | 'InCall' | 'Ending' | 'Paused';
