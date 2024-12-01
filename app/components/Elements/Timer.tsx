import React, { useState, useEffect } from 'react';
import Modal from '../Modal'; // Import the reusable Modal component

interface TimerProps {
  data?: number; // Optional prop for initial minutes
  onChange?: (minutes: number) => void; // Optional callback for minutes input changes
}

const Timer: React.FC<TimerProps> = ({ data = 0, onChange }) => {
  const [minutes, setMinutes] = useState<number>(data);
  const [seconds, setSeconds] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [input, setInput] = useState<string>(data ? String(data) : '');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(!data);

  // Notify parent of minutes input change
  const notifyChange = () => {
    if (onChange) {
      onChange(parseInt(input)); // Send the input value (in minutes)
    }
  };

  // Handle the start of the timer
  const startTimer = () => {
    const totalSeconds = parseInt(input) * 60;
    setMinutes(parseInt(input));
    setSeconds(totalSeconds % 60);
    setIsActive(true);
    setIsModalOpen(false); // Close modal when timer starts
    notifyChange(); // Notify the parent with the minutes value
  };

  // Handle the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  // Countdown logic (triggered by `isActive`)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive) {
      interval = setInterval(() => {
        if (minutes === 0 && seconds === 0) {
          clearInterval(interval);
          setIsActive(false);
          alert('Time is up!');
        } else if (seconds === 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      clearInterval(interval);
    };
  }, [isActive, minutes, seconds]);

  // Automatically start timer if `data` is provided on mount
  useEffect(() => {
    if (data && !isModalOpen) {
      const totalSeconds = data * 60;
      setMinutes(data);
      setSeconds(totalSeconds % 60);
      setIsActive(true);
    }
  }, [data, isModalOpen]);

  // Reset the timer
  const resetTimer = () => {
    setIsActive(false);
    setMinutes(0);
    setSeconds(0);
    setInput('');
    setIsModalOpen(true); // Open modal again when reset
    notifyChange(); // Notify the parent with the reset value (0 minutes)
  };

  return (
    <div className="flex flex-col items-center">
      {/* Modal to set timer */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-bold mb-4">Set Timer</h2>
        <input
          type="number"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter minutes"
          className="border p-2 mb-4"
          min={1}
        />
        <div className="flex gap-4 mb-4">
          {/* Start button */}
          <button
            onClick={startTimer}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Start Timer
          </button>
        </div>
      </Modal>

      {/* Display remaining time */}
      {!isModalOpen ? (
        <div className="text-md text-gray-500 bg-gray-100 p-2 rounded-xl w-16 font-semibold">
          {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </div>
      ) : (
        <div>00:00</div>
      )}

    
    </div>
  );
};

export default Timer;
