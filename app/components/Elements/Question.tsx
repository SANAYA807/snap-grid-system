import React, { useState } from 'react';
import Modal from '../Modal';

interface QuestionProps {
    data?:string;
  onChange?: (question: string) => void; // Optional callback for handling question updates
}

const Question: React.FC<QuestionProps> = ({ data ,onChange }) => {
  const [question, setQuestion] = useState<string>(''); // State to store the input question
  const [isModalOpen, setIsModalOpen] = useState<boolean>(true); // Modal visibility state
  const [input, setInput] = useState<string>(''); // State to handle the input field

  // Handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Handle submit and close the modal
  const handleSubmit = () => {
    setQuestion(input); // Update the question
    if (onChange) {
      onChange(input); // Trigger the onChange callback if provided
    }
    setIsModalOpen(false); // Close the modal
  };

  

  return (
    <div className="flex flex-col">
      {/* Modal to input question */}
     {!data &&  <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Ask a Question</h2>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your question"
          className="border p-2 mb-4"
        />
        <div className="flex gap-4 mb-4">
          {/* Submit button */}
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Submit Question
          </button>
        </div>
      </Modal>}

      {/* Display the question after closing modal */}
      {!isModalOpen && question && !data && (
        <div className="text-lg">
          <p>Q: {question}</p>
        </div>
      )}
      {data && <div className="text-lg">
          <p>Q: {data}</p>
        </div>}
    </div>
  );
};

export default Question;
