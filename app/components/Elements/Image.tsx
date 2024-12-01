import React, { useState } from "react";

interface ImageInputProps {
  data?: string; // Optional image src passed via props
  onChange?: (imageData: string | null) => void; // Optional callback to send back the uploaded image data
}

const ImageInput: React.FC<ImageInputProps> = ({ data, onChange }) => {
  const [image, setImage] = useState<string | null>(data || null); // Use the src prop if provided

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        setImage(imageData); // Set the image URL after it's loaded

        // Trigger the onChange callback if provided
        if (onChange) {
          onChange(imageData);
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Display uploaded or provided image */}
      {image ? (
        <div className="mt-4">
          <img src={image} alt="Uploaded Preview" className=" h-auto rounded-md" />
        </div>
      ) : (
        // Placeholder when no image is provided
        <label
          htmlFor="image-upload"
          className="cursor-pointer border-2 border-dashed p-4 w-64 flex justify-center items-center rounded-md"
        >
          <span className="text-gray-500">Click or drag to upload an image</span>
        </label>
      )}

      {/* Hidden file input */}
      {!image && (
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          id="image-upload"
          className="hidden"
        />
      )}
    </div>
  );
};

export default ImageInput;
