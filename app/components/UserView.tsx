import React, { useState, useEffect } from 'react';
import { BoxMapping } from '~/interfaces';
import Progress from '~/components/Elements/Progress';
import Question from '~/components/Elements/Question';
import OptionComponent from '~/components/Elements/Option';
import ButtonComponent from '~/components/Elements/Button';
import Timer from '~/components/Elements/Timer';
import ImageInput from '~/components/Elements/Image';
import { useLoaderData } from '@remix-run/react';
import { droppableConfig } from '~/components/gridConfig';
import Modal from './Modal';

const componentsMap: { [key: string]: React.FC<any> } = {
  'progress-bar': Progress,
  'question-text': Question,
  option: OptionComponent,
  button: ButtonComponent,
  timer: Timer,
  image: ImageInput,
};

const UserView = () => {
  const [isLoading, setIsLoading] = useState(true);
  const items: BoxMapping[] = useLoaderData();
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to track modal visibility

  useEffect(() => {
    if (items) {
      setIsLoading(false);
    }
  }, [items]);

  const itemsByBoxId = items.reduce((acc, { item, boxId }) => {
    if (!acc[boxId]) acc[boxId] = [];
    acc[boxId].push(item);
    return acc;
  }, {} as { [key: number]: BoxMapping['item'][] });

  const handleOptionChange = (answer: boolean) => {
    setIsAnswerCorrect(answer);
  };

  const handleButtonClick = () => {
    setIsModalOpen(true); // Open the modal when the button is clicked
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close the modal
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-500 text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center mx-auto sm:m-2 ">
      <div className="grid bg-white grid-cols-5 grid-rows-15 p-3 sm:h-[90vh] h-screen overflow-hidden sm:w-96 sm:m-2 sm:rounded-lg">
        {droppableConfig.map(({ id, rowStart, colStart, colSpan }) => (
          <div
            key={id}
            className={`col-start-${colStart} row-start-${rowStart} col-span-${colSpan}`}
          >
            {itemsByBoxId[id]?.map((item, index) => {
              const Component = componentsMap[item.id];
              return Component ? (
                <Component
                  key={index}
                  data={item.data}
                  onClick={handleButtonClick}  // Pass the handleButtonClick to open the modal
                  onChange={handleOptionChange} // Pass handleOptionChange to OptionComponent
                />
              ) : (
                <div key={index}>Unknown Component</div>
              );
            })}
          </div>
        ))}
      </div>

     
      {/* Conditionally render the modal based on isModalOpen */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleModalClose}
      >
        {/* Display content inside the modal */}
        {isAnswerCorrect !== null ? (isAnswerCorrect ? 'Correct!' : 'Incorrect, please try again.') : 'No answer selected yet.'}
      </Modal>
    </div>
  );
};

export default UserView;