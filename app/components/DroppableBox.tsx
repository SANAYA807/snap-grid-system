import { FC, ReactNode, useState } from 'react';
import { useDrop } from 'react-dnd';
import { MdDeleteOutline } from 'react-icons/md';

import { ItemTypes } from '~/itemTypes';
import Modal from './Modal';

export interface DustbinProps {
  children?: ReactNode;
  onDrop?: (item: any, id: number) => void;
  id: number;
  colSpan: number; // Added colSpan to compare
  reset?: () => void; // Callback to reset the dropped state
}

export const DroppableBox: FC<DustbinProps> = ({ children, onDrop, id, colSpan, reset }) => {
  const [hasDropped, setHasDropped] = useState(false);
  const [droppedItem, setDroppedItem] = useState<any>(null);
  const [mismatch, setMismatch] = useState(false); // New state to track mismatch
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility

  // Drop hook logic with canDrop to prevent drop on mismatch
  const [{ isOver, isOverCurrent }, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      canDrop(item: any) {
        // Check for mismatch before allowing drop
        const isMismatch = item?.defaultColumns > colSpan;
        if (isMismatch)
          setIsModalOpen(true);


        return !isMismatch; // Prevent drop if there's a mismatch
      },
      drop(item: any, monitor) {
        const didDrop = monitor.didDrop();
        if (didDrop) {
          return;
        }

        setHasDropped(true);
        setDroppedItem(item);

        // Notify the parent with the dropped item and column
        if (onDrop) {
          onDrop(item, id);
        }
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
        isOverCurrent: monitor.isOver({ shallow: true }),
      }),
    }),
    [id, onDrop, colSpan] // Include colSpan in dependencies
  );

  const handleUserInputs = (data: any) => {
    const updatedItem = { ...droppedItem, data };
    setDroppedItem(updatedItem);

    // Notify the parent with updated data
    if (onDrop) {
      onDrop(updatedItem, id);
    }
  };

  // Reset function for individual DroppableBox
  const handleReset = () => {
    setHasDropped(false);
    setDroppedItem(null);
    setMismatch(false);
  };

  const gridColumnStyle = droppedItem?.defaultColumns
    ? { gridColumn: `span ${droppedItem.defaultColumns}` }
    : {};

  const zoomStyle =
    isOver || isOverCurrent
      ? { transform: 'scale(1.05)', backgroundColor: 'lightGreen' }
      : {};

  // Apply a red background if there is a mismatch
  const mismatchStyle = mismatch
    ? { backgroundColor: 'red', transform: 'scale(1)' }
    : {};

  return (
    <div
      ref={drop}
      style={{
        ...gridColumnStyle,
        ...zoomStyle,
        ...mismatchStyle,
      }}
      className={`relative w-full h-full rounded-md text-gray-500 text-center flex items-center justify-center border-2 border-dashed border-gray-300 transition-all duration-300 ease-in-out ${isOverCurrent || isOver ? 'bg-green-800' : 'bg-gray-100'
        }`}
    >
      {!hasDropped && 'Drop here'}
      <br />
      {hasDropped && droppedItem && (
        <droppedItem.component onChange={handleUserInputs} />
      )}
      <div>{children}</div>

      {hasDropped && (
        <button className="absolute top-0 right-0" onClick={handleReset}>
          <MdDeleteOutline />
        </button>
      )}

      {/* Show the modal if mismatch occurs */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <p>Cannot add this element here...</p>
      </Modal>
    </div>
  );
};
