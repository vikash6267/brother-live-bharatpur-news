import React from 'react';

const Modal = ({ show, onClose, onSave, children }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Edit Live Stream</p>
            <div className="cursor-pointer z-50" onClick={onClose}>
              <svg
                className="fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
              >
                <path d="M14.53 3.47a.75.75 0 00-1.06 0L9 7.94 4.53 3.47A.75.75 0 003.47 4.53L7.94 9 3.47 13.47a.75.75 0 101.06 1.06L9 10.06l4.47 4.47a.75.75 0 101.06-1.06L10.06 9l4.47-4.47a.75.75 0 000-1.06z"></path>
              </svg>
            </div>
          </div>

          <div className="my-5">{children}</div>

          <div className="flex justify-end pt-2">
            <button
              className="px-4 bg-gray-200 p-3 rounded-lg text-black hover:bg-gray-300"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="px-4 bg-blue-600 p-3 ml-3 rounded-lg text-white hover:bg-blue-700"
              onClick={onSave}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
