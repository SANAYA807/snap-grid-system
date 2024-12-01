import React, { useState, useEffect } from 'react';
import Modal from '../Modal';

interface Option {
  text: string;
  isCorrect: boolean;
}

interface OptionComponentProps {
  data?: Option[]; // Optional array of options passed via props
  onChange?: ( isCorrect: boolean) => void; // Callback to return the data
}

const OptionComponent: React.FC<OptionComponentProps> = ({ data, onChange }) => {
  const [numOptions, setNumOptions] = useState<number>(0);
  const [userOptions, setUserOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [correctOptionIndex, setCorrectOptionIndex] = useState<number | null>(null);
  const [isNumOptionsModalOpen, setIsNumOptionsModalOpen] = useState<boolean>(!data);
  const [isOptionsModalOpen, setIsOptionsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data) {
      setUserOptions(data);
      setCorrectOptionIndex(data.findIndex(option => option.isCorrect));
    }
  }, [data]);

  const handleNumOptionsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNumOptions(Number(e.target.value));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...userOptions];
    updatedOptions[index] = { ...updatedOptions[index], text: value };
    setUserOptions(updatedOptions);
  };

  const handleCorrectOptionChange = (index: number) => {
    const updatedOptions = userOptions.map((option, i) => ({
      ...option,
      isCorrect: i === index, // Mark only the selected option as correct
    }));

    setUserOptions(updatedOptions);
    setCorrectOptionIndex(index); // Update the index of the correct option
  };

  const handleSelection = (index: number) => {
    setSelectedOption(index);
    if (onChange) {
      const isCorrect = index === correctOptionIndex;
      onChange(isCorrect); 
    }
  };

  const generateOptionsInputs = () => {
    let optionsArray: Option[] = [];
    for (let i = 0; i < numOptions; i++) {
      optionsArray.push({ text: '', isCorrect: false });
    }
    setUserOptions(optionsArray);
    setIsNumOptionsModalOpen(false);
    setIsOptionsModalOpen(true);
  };

  const renderOptions = () => {
    return (
      <>
        {userOptions.map((option, index) => (
          <label
            key={index}
            className="flex items-center rounded-2xl mt-1 w-full bg-gray-200 px-4 py-2 cursor-pointer hover:bg-gray-300"
          >
            <input
              type="radio"
              name="options"
              className="mr-2"
              checked={selectedOption === index}
              onChange={() => handleSelection(index)}
            />
            <span className="text-gray-600">{option.text}</span>
          </label>
        ))}
      </>
    );
  };

  const renderOptionInputs = () => {
    return (
      <>
        {userOptions.map((option, index) => (
          <div key={index} className="mb-4">
            <input
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option.text}
              onChange={(e) => handleOptionChange(index, e.target.value)}
              className="border p-2 mr-2"
            />
            <label>
              <input
                type="radio"
                name="correctOption"
                checked={correctOptionIndex === index}
                onChange={() => handleCorrectOptionChange(index)}
              />
              Correct
            </label>
          </div>
        ))}
        <button
          onClick={() => {
            setIsOptionsModalOpen(false);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4"
        >
          Done
        </button>
      </>
    );
  };

  return (
    <div >
      {!data && (
        <Modal isOpen={isNumOptionsModalOpen} onClose={() => setIsNumOptionsModalOpen(false)}>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">How many options do you want?</h2>
            <input
              type="number"
              value={numOptions}
              onChange={handleNumOptionsChange}
              className="border p-2 mb-4"
              min={2}
            />
            <button
              onClick={generateOptionsInputs}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Set Options
            </button>
          </div>
        </Modal>
      )}

      {!data && (
        <Modal isOpen={isOptionsModalOpen} onClose={() => setIsOptionsModalOpen(false)}>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold mb-4">Enter Options</h2>
            {renderOptionInputs()}
          </div>
        </Modal>
      )}

      {renderOptions()}
    </div>
  );
};

export default OptionComponent;
