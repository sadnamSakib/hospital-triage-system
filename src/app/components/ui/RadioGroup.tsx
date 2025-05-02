import React from "react";

interface Option {
  value: string;
  label: string;
}

interface RadioGroupProps {
  options: Option[];
  name: string;
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export function RadioGroup({
  options,
  name,
  value,
  onChange,
  label,
}: RadioGroupProps) {
  return (
    <div className="space-y-4">
      {label && (
        <div className="text-xl font-medium text-gray-700 mb-4">{label}</div>
      )}
      <div className="space-y-4">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center space-x-4 cursor-pointer p-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50"
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="h-8 w-8 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-xl text-gray-700">{option.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
