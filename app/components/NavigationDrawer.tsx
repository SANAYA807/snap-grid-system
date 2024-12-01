import React, { useState } from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '../itemTypes';
import Timer from './Elements/Timer';
import Progress from './Elements/Progress';
import Question from './Elements/Question';
import ImageInput from './Elements/Image';
import OptionComponent from './Elements/Option';
import ButtonComponent from './Elements/Button';
import { FiMenu } from 'react-icons/fi'; // Import icon for the toggle

const items = [
  { id: 'progress-bar', label: 'Progress Bar', defaultColumns: 3, component: Progress },
  { id: 'timer', label: 'Timer', defaultColumns: 1, component: Timer },
  { id: 'question-text', label: 'Question Text', defaultColumns: 3, component: Question },
  { id: 'image', label: 'Image', defaultColumns: 3, component: ImageInput },
  { id: 'option', label: 'Option', defaultColumns: 3, component: OptionComponent },
  { id: 'button', label: 'Button', defaultColumns: 3, component: ButtonComponent },
];

export default function NavigationDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Function to toggle drawer visibility
  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="relative">
      {/* Mobile toggle icon */}
      <button
        onClick={toggleDrawer}
        className="lg:hidden p-3 text-gray-600 bg-gray-200 rounded-full absolute top-4 left-4 z-10"
      >
        <FiMenu size={24} />
      </button>

      {/* Drawer */}
      <div
        className={`${
          isDrawerOpen ? 'block' : 'hidden'
        } lg:block fixed lg:static left-0 top-0 w-64 h-full bg-gray-100 p-4 overflow-y-auto transition-all ease-in-out`}
        style={{ zIndex: 999 }}
      >
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

function DraggableItem({
  item,
}: {
  item: { id: string; label: string; defaultColumns: number; component: JSX.Element | React.FC<any> | (() => JSX.Element); };
}) {
  const [, drag] = useDrag(() => ({
    type: ItemTypes.BOX,
    item: { id: item.id, label: item.label, defaultColumns: item.defaultColumns, component: item.component },
  }));

  return (
    <div
      ref={drag}
      className="bg-white p-3 mb-3 border border-gray-300 rounded-lg cursor-move"
    >
      {item.label}
    </div>
  );
}
