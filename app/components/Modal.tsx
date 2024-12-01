import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-md shadow-md sm:w-1/3">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold">Modal Title</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-800"
                        aria-label="Close Modal"
                    >
                        ×
                    </button>
                </div>
                <div>{children}</div>
            </div>
        </div>
    );
};

export default Modal;
