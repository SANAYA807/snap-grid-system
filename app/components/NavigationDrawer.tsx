import React, { useState } from 'react';
import { DragPreviewImage, useDrag } from 'react-dnd';
import { ItemTypes } from '../itemTypes';
import Timer from './Elements/Timer';
import Progress from './Elements/Progress';
import Question from './Elements/Question';
import ImageInput from './Elements/Image';
import OptionComponent from './Elements/Option';
import ButtonComponent from './Elements/Button';
import { FiMenu } from 'react-icons/fi';
import Arrows from './Elements/Arrows';
import Pagination from './Elements/Pagination';

const items = [
  { id: 'progress-bar', label: 'Progress Bar', defaultColumns: 3, component: Progress },
  { id: 'timer', label: 'Timer', defaultColumns: 1, component: Timer },
  { id: 'question-text', label: 'Question Text', defaultColumns: 3, component: Question },
  { id: 'image', label: 'Image', defaultColumns: 3, component: ImageInput },
  { id: 'option', label: 'Option', defaultColumns: 3, component: OptionComponent },
  { id: 'button', label: 'Button', defaultColumns: 3, component: ButtonComponent },
  { id: 'naviagation-arrows', label: 'Arrows', defaultColumns: 1, component: Arrows },
  { id: 'pagination', label: 'Pagination', defaultColumns: 1, component: Pagination },
];

export default function NavigationDrawer() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => setIsDrawerOpen(!isDrawerOpen);

  return (
    <div className="relative">
      <button
        onClick={toggleDrawer}
        className="lg:hidden p-2 text-gray-600 bg-gray-200 rounded-full absolute top-2 left-4 z-10"
      >
        <FiMenu size={20} />
      </button>

      <div
        className={`${isDrawerOpen ? 'block' : 'hidden'
          } lg:block fixed lg:static left-0 top-0 w-64 h-full bg-gray-100 p-4 overflow-y-auto transition-all ease-in-out`}
        style={{ zIndex: 999 }}
      >
        {items.map((item) => (
          <DraggableItem
            key={item.id}
            item={item}
            onDragStart={() => setIsDrawerOpen(false)}
          />
        ))}
      </div>
    </div>
  );
}

function DraggableItem({
  item,
  onDragStart,
}: {
  item: {
    id: string;
    label: string;
    defaultColumns: number;
    component: JSX.Element | React.FC<any> | (() => JSX.Element);
  };
  onDragStart: () => void;
}) {
  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.BOX,
    item: () => {
      onDragStart();
      return {
        id: item.id,
        label: item.label,
        defaultColumns: item.defaultColumns,
        component: item.component,
      };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <>
      {/* Drag Preview */}
      <DragPreviewImage connect={preview} src="your-preview-image.png" />

      {/* Draggable Element */}
      <div
        ref={drag}
        className={`p-3 mb-3 bg-white border rounded-lg cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'
          }`}
      >
        {item.label}
      </div>
    </>
  );
}
