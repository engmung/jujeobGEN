import React, { useEffect, useState } from 'react';
import { Tone } from '../types';
import { TONE_OPTIONS } from '../constants';

interface ToneSelectorProps {
  value: Tone;
  onChange: (value: Tone) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ value, onChange }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const index = TONE_OPTIONS.findIndex(opt => opt.value === value);
    if (index !== -1) {
      setCurrentIndex(index);
    }
  }, [value]);

  const handlePrev = () => {
    const newIndex = currentIndex === 0 ? TONE_OPTIONS.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    onChange(TONE_OPTIONS[newIndex].value);
  };

  const handleNext = () => {
    const newIndex = currentIndex === TONE_OPTIONS.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    onChange(TONE_OPTIONS[newIndex].value);
  };

  const currentOption = TONE_OPTIONS[currentIndex];

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        말투 선택 <span className="text-rose-500">*</span>
      </label>
      
      <div className="relative flex items-center justify-between bg-white border border-gray-200 rounded-xl p-2 shadow-sm">
        
        {/* Left Button */}
        <button
          type="button"
          onClick={handlePrev}
          className="flex-shrink-0 w-10 h-14 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          aria-label="이전 말투"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content Area */}
        <div className="flex-1 flex flex-col items-center justify-center py-1 text-center select-none overflow-hidden">
          <div className="flex items-center gap-2 mb-0.5">
            <span className="text-2xl">{currentOption.emoji}</span>
            <span className="font-bold text-gray-900 text-lg">{currentOption.label}</span>
          </div>
          <p className="text-xs text-gray-500 truncate max-w-[200px]">
            {currentOption.desc}
          </p>
        </div>

        {/* Right Button */}
        <button
          type="button"
          onClick={handleNext}
          className="flex-shrink-0 w-10 h-14 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
          aria-label="다음 말투"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Indicator dots (optional visual flair) */}
      <div className="flex justify-center gap-1.5 mt-1">
        {TONE_OPTIONS.map((_, idx) => (
          <div 
            key={idx} 
            className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-rose-400 w-3' : 'bg-gray-200'}`} 
          />
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;