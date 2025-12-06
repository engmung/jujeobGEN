import React from 'react';
import { Intensity } from '../types';
import { INTENSITY_OPTIONS } from '../constants';

interface IntensitySelectorProps {
  value: Intensity;
  onChange: (value: Intensity) => void;
}

const IntensitySelector: React.FC<IntensitySelectorProps> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        주접 강도 <span className="text-rose-500">*</span>
      </label>
      <div className="grid grid-cols-3 gap-2">
        {INTENSITY_OPTIONS.map((option) => {
          const isSelected = value === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`
                relative flex flex-col items-center justify-center p-3 rounded-xl border transition-all duration-200
                ${isSelected 
                  ? 'border-rose-500 bg-rose-50 text-rose-700 shadow-sm ring-1 ring-rose-500' 
                  : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50 hover:border-gray-300'
                }
              `}
            >
              <span className="text-xl mb-1">{option.emoji}</span>
              <span className={`text-sm font-medium ${isSelected ? 'font-bold' : ''}`}>
                {option.label}
              </span>
            </button>
          );
        })}
      </div>
      <p className="text-xs text-gray-500 mt-1 text-center">
        {INTENSITY_OPTIONS.find(opt => opt.value === value)?.desc}
      </p>
    </div>
  );
};

export default IntensitySelector;