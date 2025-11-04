
import React from 'react';
import { Dialogue, Choice } from '../types';

interface DialogueModalProps {
  dialogue: Dialogue;
  onChoice: (choice: Choice) => void;
  onClose: () => void;
}

const DialogueModal: React.FC<DialogueModalProps> = ({ dialogue, onChoice, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="w-full max-w-2xl bg-black border-4 border-red-500/80 text-white p-6 shadow-2xl shadow-red-500/30 crt-effect">
        <div className="text-center">
          <h2 className="text-3xl text-red-500 text-glow-red animate-pulse">{dialogue.title}</h2>
          <p className="text-xl text-teal-300 my-6 tracking-wider leading-relaxed">
            "{dialogue.caller_line}"
          </p>
        </div>
        <div className="mt-8 flex flex-col space-y-4">
          {dialogue.choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => onChoice(choice)}
              className="w-full text-left text-xl p-4 bg-gray-800/50 border-2 border-teal-500/50 hover:bg-teal-500/20 hover:text-teal-300 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-teal-400"
            >
              &gt; {choice.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DialogueModal;
