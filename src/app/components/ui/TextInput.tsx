import React from "react";

interface TextInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export function TextInput({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  required = false,
  error,
  className = "",
}: TextInputProps) {
  return (
    <div className={`space-y-3 ${className}`}>
      <label htmlFor={name} className="block text-xl font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`mt-2 block w-full rounded-xl border-2 border-gray-300 shadow-md py-4 px-4 text-xl focus:border-blue-500 focus:ring-blue-500 ${
          error ? "border-red-300" : ""
        }`}
      />
      {error && (
        <p className="mt-2 text-lg text-red-600 font-medium">{error}</p>
      )}
    </div>
  );
}
