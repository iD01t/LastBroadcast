
import { GameData } from './types';

export const GAME_DATA: GameData = {
  scenes: [
    {
      id: "studio",
      title: "Radio Studio",
      description: "Warm amber glow from vintage audio equipment, deep shadows in the corners. A large window shows a rainy, empty street outside. The central mixing board is covered in dials and faders.",
      backgroundId: "1079",
      interactables: [
        {id: "console", label: "Mixing Board", action: "start_broadcast", position: { top: "50%", left: "50%" }},
        {id: "mic", label: "Microphone", text: "It crackles faintly with latent energy.", position: { top: "60%", left: "20%" }},
        {id: "logbook", label: "Studio Logbook", clue: "A logbook entry mentions 'severe technical difficulties' during Finch's final broadcast on 10-26-78.", position: { top: "45%", left: "10%" }},
        {id: "door_hallway", label: "Door to Hallway", action: "change_scene", position: { top: "70%", left: "85%" }}
      ]
    },
    {
      id: "hallway",
      title: "Hallway",
      description: "Long, oppressive hallway lit by a single, flickering fluorescent teal light. Doors to other rooms line the walls. Water stains on the ceiling tiles.",
      backgroundId: "838",
      interactables: [
        {id: "door_studio", label: "Door to Studio", action: "change_scene", position: { top: "50%", left: "10%" }},
        {id: "door_office", label: "Door to Back Office", action: "change_scene", locked: true, position: { top: "50%", left: "50%" }},
        {id: "door_archives", label: "Door to Archives", action: "change_scene", locked: true, position: { top: "50%", left: "90%" }},
        {id: "janitor_closet", label: "Janitor's Closet", item_found: "Back Office Key", position: { top: "80%", left: "70%" }},
        {id: "loose_tile", label: "Loose Floor Tile", hidden_access: "basement", position: { top: "85%", left: "60%" }}
      ]
    },
    {
      id: "office",
      title: "Back Office",
      description: "Cluttered manager's office. A desk is piled with paperwork. A large, vintage safe sits against the back wall. A single desk lamp provides a pool of light.",
      backgroundId: "173",
      interactables: [
        {id: "desk", label: "Desk", clue: "Finch's Personnel File. Hiring date: 10-26. The Archives Key is also here.", item_found: "Archives Key", position: { top: "50%", left: "50%" }},
        {id: "safe", label: "Safe", action: "puzzle_safe", position: { top: "60%", left: "80%" }},
        {id: "bookshelf", label: "Bookshelf", clue: "A book on radio frequencies is bookmarked. The station's original frequency was 88.9.", position: { top: "70%", left: "30%" }},
         {id: "door_hallway", label: "Door to Hallway", action: "change_scene", position: { top: "50%", left: "10%" }}
      ]
    },
    {
      id: "archives",
      title: "Archives Room",
      description: "A dusty, forgotten room filled with shelves of tape reels and vinyl records. A single, bare bulb hangs from the ceiling, casting harsh shadows.",
      backgroundId: "128",
      interactables: [
        {id: "tape_shelves", label: "Tape Shelves", item_found: "FINCH - FINAL BROADCAST - 10-26-78", position: { top: "60%", left: "40%" }},
        {id: "playback_deck", label: "Playback Deck", requires: "Fuse", action: "play_tape", position: { top: "50%", left: "70%" }},
        {id: "overturned_box", label: "Overturned Box", clue: "Finch's Research Notes on the 'Somnus Signal' and the name 'Anomaly'.", position: { top: "80%", left: "20%" }},
        {id: "door_hallway", label: "Door to Hallway", action: "change_scene", position: { top: "50%", left: "10%" }}
      ]
    },
    {
      id: "control_room",
      title: "Broadcast Control Room",
      description: "The station's nerve center. Wall-to-wall racks of humming machinery, oscilloscopes with glowing green waves, and a large transmitter panel.",
      backgroundId: "593",
      interactables: [
        {id: "transmitter", label: "Main Transmitter Panel", action: "final_confrontation", position: { top: "40%", left: "50%" }},
        {id: "maintenance_locker", label: "Maintenance Locker", item_found: "Fuse", position: { top: "70%", left: "20%" }},
        {id: "cutoff_switch", label: "Emergency Cut-off Switch", ending: "Static Loop", position: { top: "60%", left: "80%" }},
        {id: "door_hallway", label: "Door to Hallway", action: "change_scene", position: { top: "50%", left: "10%" }}
      ]
    },
    {
      id: "basement",
      title: "Secret Basement",
      description: "A terrifying, unfinished basement. Dirt floor, stone walls. A single, primitive transmitter is set up in the corner, covered in esoteric symbols.",
      backgroundId: "1003",
      interactables: [
        {id: "ritual_site", label: "Finch's Ritual Site", item_found: "Strange Tuning Fork", clue: "Finch's final maddened notes on tuning to the Anomaly's true frequency.", position: { top: "50%", left: "50%" }},
        {id: "door_hallway", label: "Back to Hallway", action: "change_scene", position: { top: "10%", left: "50%" }}
      ]
    },
    {
      id: "parkinglot",
      title: "Parking Lot / Escape",
      description: "The station's empty, rain-slicked parking lot at night. Your beat-up car is the only one there. The station's neon sign casts a lonely red glow.",
      backgroundId: "1041",
      interactables: []
    },
    {
      id: "anomaly_realm",
      title: "Signal Anomaly Realm",
      description: "An abstract, non-Euclidean space of shifting static, sound waves, and cosmic geometry. A visual representation of the Somnus Signal.",
      backgroundId: "980",
      interactables: []
    }
  ],
  dialogues: [
    {
      id: "phone_call_1",
      title: "The Hook",
      caller_line: "Good evening, Alex. You have my full attention. Let's make this final broadcast... memorable.",
      choices: [
        { text: "(Question) Who is this? Is this a prank?", suspicion_change: 5, response: "A prank would be less sincere. I'm your oldest listener." },
        { text: "(Comply) ...Okay. Welcome to the show. What's on your mind?", suspicion_change: -5, response: "That's better. I'm on every mind. Tonight, we're talking about Dr. Alistair Finch." },
        { text: "(Defy) I'm hanging up. Don't call again.", suspicion_change: 15, response: "I don't think you can. The line is open permanently.", effect: "lock_main_door" }
      ]
    },
    {
      id: "phone_call_2",
      title: "The Demand",
      caller_line: "You're getting warmer. He kept his secrets locked away. Just like the station keeps its secrets. Just like you keep yours.",
      choices: [
        { text: "(Question) What do you want from me?", suspicion_change: 0, response: "Want? I want you to finish his work. Open the safe. Show me you're a worthy successor.", flag: "PerfectHostPath" },
        { text: "(Defy) I'm not playing your games.", suspicion_change: 10, response: "(Voice glitches with anger) This is not a game. It is a... transference. Do not resist it." },
        { text: "(Bluff) I've already called the police.", suspicion_change: 5, response: "(A low chuckle) Their frequencies are mine now. They will only hear static when they listen for you." }
      ]
    },
     {
      id: "phone_call_3",
      title: "The Climax",
      caller_line: "The transmitter. The heart of this place. Finch tried to use it to shout. I want you to use it to listen. It is time to choose, Alex. The truth of the signal... or the silence of the void.",
      choices: [
        { text: "(Expose) I'm going to play Finch's tape. Everyone will hear what you are.", ending: "Truth Unveiled", suspicion_change: 0, response: "So be it." },
        { text: "(Submit) Tell me what to do. I'll broadcast whatever you want.", ending: "Perfect Host", suspicion_change: 0, response: "A wise choice. Tune to my frequency." },
        { text: "(Escape) I'm shutting it all down.", ending: "Static Loop", suspicion_change: 0, response: "You cannot shut me down. Only delay." }
      ]
    }
  ],
  endings: [
    { id: "Truth Unveiled", requirements: ["FINCH - FINAL BROADCAST - 10-26-78", "Finch's Research Notes"], scene: "parkinglot", description: "You play the tape. The Caller shrieks and the signal destabilizes. The lockdown breaks. You walk out into the dawn, exhausted but alive." },
    { id: "Dead Air", requirements: ["Suspicion 100"], scene: "studio", description: "The screen floods with static. You lose control. Alex slumps over the console. The 'ON AIR' light extinguishes. The final sound is The Caller's calm voice saying 'Thank you for calling.'" },
    { id: "Perfect Host", requirements: ["PerfectHostPath"], scene: "control_room", description: "You agree to broadcast the Caller's message. Your voice slowly morphs into the same synthetic tone as the Caller. The new 'host' begins their eternal broadcast." },
    { id: "Static Loop", requirements: ["Cutoff Switch"], scene: "studio", description: "You hit the emergency switch. The power dies. After a moment of silence, the phone rings again. The game restarts, but the rain outside is now red. You are trapped." },
    { id: "The Anomaly", requirements: ["Strange Tuning Fork", "FINCH - FINAL BROADCAST - 10-26-78"], scene: "anomaly_realm", description: "You use the tuning fork on the transmitter while playing the tape. The world dissolves into the Signal Anomaly Realm. You are offered a choice: return, or merge." }
  ],
  achievements: [
      "First Caller",
      "The Archivist",
      "Safe Cracker",
      "Hang Up",
      "Truth Unveiled",
      "Dead Air",
      "Deep Listener",
      "Hello, World?"
    ]
};
