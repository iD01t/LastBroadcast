
import React from 'react';
import { JournalIcon, InventoryIcon } from './Icons';

interface JournalProps {
  clues: string[];
  inventory: string[];
}

const Journal: React.FC<JournalProps> = ({ clues, inventory }) => {
  return (
    <div className="h-full bg-black/70 backdrop-blur-sm p-4 text-amber-300 flex flex-col space-y-4 overflow-y-auto">
      <div>
        <h3 className="text-2xl flex items-center text-glow mb-2">
          <JournalIcon className="w-6 h-6 mr-2" />
          Journal
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-2 text-lg">
          {clues.length > 0 ? (
            clues.map((clue, index) => <li key={index}>{clue}</li>)
          ) : (
            <li>No clues found yet.</li>
          )}
        </ul>
      </div>
       <div className="border-t border-amber-500/30 my-4"></div>
      <div>
        <h3 className="text-2xl flex items-center text-glow mb-2">
           <InventoryIcon className="w-6 h-6 mr-2" />
          Inventory
        </h3>
        <ul className="list-disc list-inside space-y-2 pl-2 text-lg">
          {inventory.length > 0 ? (
            inventory.map((item, index) => <li key={index}>{item}</li>)
          ) : (
            <li>Inventory is empty.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Journal;
