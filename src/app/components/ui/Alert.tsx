import React from "react";

interface AlertProps {
  type: "info" | "warning" | "error" | "success";
  message: string;
  title?: string;
  onClose?: () => void;
}

export function Alert({ type, message, title, onClose }: AlertProps) {
  const bgColors = {
    info: "bg-blue-50 border-blue-400 text-blue-700",
    warning: "bg-yellow-50 border-yellow-400 text-yellow-700",
    error: "bg-red-50 border-red-400 text-red-700",
    success: "bg-green-50 border-green-400 text-green-700",
  };

  return (
    <div className={`rounded-xl p-6 border-l-8 ${bgColors[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {type === "info" && (
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm0-9a1 1 0 011 1v4a1 1 0 01-2 0V8a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === "warning" && (
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === "error" && (
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          )}
          {type === "success" && (
            <svg className="h-10 w-10" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </div>
        <div className="ml-6">
          {title && <h3 className="text-2xl font-bold mb-2">{title}</h3>}
          <div className="text-xl">{message}</div>
        </div>
        {onClose && (
          <div className="ml-auto pl-6">
            <button
              onClick={onClose}
              className="inline-flex text-gray-400 hover:text-gray-500 focus:outline-none p-2"
            >
              <span className="sr-only">Close</span>
              <svg className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
