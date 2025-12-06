import React, { useState } from 'react';
import { FormData, Intensity, Relationship, Tone } from './types';
import { RELATIONSHIP_OPTIONS } from './constants';
import { generateJuJeop } from './services/geminiService';
import InputField from './components/InputField';
import SelectField from './components/SelectField';
import IntensitySelector from './components/IntensitySelector';
import ToneSelector from './components/ToneSelector';
import Button from './components/Button';
import ResultCard from './components/ResultCard';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    relationship: '',
    description: '',
    intensity: Intensity.MILD,
    tone: Tone.BASIC, // Default to Basic
  });

  const [result, setResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof FormData, value: string | Intensity | Tone) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      return newData;
    });
  };

  const isFormValid = formData.name.trim() !== '' && formData.relationship !== '';

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);
    setResult('');

    try {
      const generatedText = await generateJuJeop(formData);
      setResult(generatedText);
    } catch (err: any) {
      setError(err.message || '알 수 없는 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-2">
            💕 주접멘트 생성기
          </h1>
          <p className="text-gray-500 text-sm">
            사랑의 이름으로!
          </p>
        </header>

        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-gray-100">
          <div className="space-y-6">
            
            <div className="grid grid-cols-2 gap-3">
              <InputField
                id="name"
                label="상대"
                value={formData.name}
                placeholder="예: 엄마, 카리나"
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />

              <SelectField
                id="relationship"
                label="관계"
                value={formData.relationship}
                options={RELATIONSHIP_OPTIONS}
                onChange={(e) => handleInputChange('relationship', e.target.value as Relationship)}
                required
              />
            </div>

            <InputField
              id="description"
              label="한줄 소개 (선택)"
              value={formData.description}
              placeholder="예: 이쁨, 생일축하메시지"
              onChange={(e) => handleInputChange('description', e.target.value)}
            />

            {/* Tone Selector added here, before Intensity */}
            <ToneSelector 
              value={formData.tone}
              onChange={(val) => handleInputChange('tone', val)}
            />

            <IntensitySelector
              value={formData.intensity}
              onChange={(val) => handleInputChange('intensity', val)}
            />

            <div className="pt-2">
              <Button
                onClick={handleSubmit}
                isLoading={isLoading}
                disabled={!isFormValid}
              >
                주접 생성하기 ✨
              </Button>
            </div>
          </div>
        </div>

        {error && (
            <div className="mt-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm text-center border border-red-100 whitespace-pre-line">
            {error}
          </div>
        )}

        <ResultCard content={result} />
        
      </div>
    </div>
  );
};

export default App;