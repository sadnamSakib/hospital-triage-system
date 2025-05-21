import React, { useCallback } from "react";

interface RangeSliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  label: string;
  showMarks?: boolean;
}

export function RangeSlider({
  min,
  max,
  value,
  onChange,
  label,
  showMarks = true,
}: RangeSliderProps) {
  // Use useCallback to memoize the handler to prevent recreation on every render
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(e.target.value));
    },
    [onChange]
  );

  // Create marks only once, not on every render
  const marks = React.useMemo(() => {
    return Array.from({ length: max - min + 1 }, (_, i) => i + min);
  }, [min, max]);

  return (
    <div className="w-full space-y-6">
      <label className="block text-xl font-medium text-gray-700 mb-4">
        {label}
      </label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        className="w-full h-4 bg-gray-200 rounded-lg appearance-none cursor-pointer"
      />
      {showMarks && (
        <div className="flex justify-between px-2 mt-2">
          {marks.map((mark) => (
            <span key={mark} className="text-lg font-medium text-gray-600">
              {mark}
            </span>
          ))}
        </div>
      )}
      <div className="text-center font-bold text-3xl mt-6 py-4 bg-blue-50 rounded-xl border border-blue-200">
        Selected: {value}
      </div>
    </div>
  );
}