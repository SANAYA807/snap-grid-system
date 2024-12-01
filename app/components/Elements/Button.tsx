import React, { useState } from "react";

interface ButtonProps {
  data?: string; // Optional label prop to provide text directly to the button
  onChange?: (newLabel: string) => void; // Optional callback to send back the updated label
  onClick?: () => void; // Callback for when the main button is clicked
}

const ButtonComponent: React.FC<ButtonProps> = ({ data, onChange, onClick }) => {
  const [inputLabel, setInputLabel] = useState<string>(data || ""); // Initialize with provided label or empty string
  const [isEditing, setIsEditing] = useState<boolean>(!data); // If no label, allow editing

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputLabel(newValue);

    // Call the onChange callback if provided
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleSetLabelClick = () => {
    setIsEditing(false);

    // Call the onChange callback when editing is done
    if (onChange) {
      onChange(inputLabel);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {isEditing ? (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={inputLabel}
            onChange={handleInputChange}
            className="border p-2 mb-2"
            placeholder="Enter label text"
          />
          <button
            onClick={handleSetLabelClick}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Set Label
          </button>
        </div>
      ) : (
        <button
          className="bg-red-500 w-full text-white hover:bg-red-600 px-4 py-2 rounded-2xl"
          onClick={onClick} // Call the provided onClick function
        >
          {inputLabel || "Default Label"}
        </button>
      )}
    </div>
  );
};

export default ButtonComponent;
