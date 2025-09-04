import { useState } from 'react';
import { CVData, CVSettings, TemplateType } from '@/types/cv';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';

const initialCVData: CVData = {
  personalInfo: {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    address: '',
    twitter: '',
    stackoverflow: '',
    medium: '',
    kaggle: '',
    leetcode: '',
    hackerrank: '',
  },
  careerObjective: {
    summary: '',
  },
  education: [],
  workExperience: [],
  skills: {
    programmingLanguages: [],
    frameworks: [],
    devopsTools: [],
    databases: [],
    softSkills: [],
  },
  projects: [],
  certifications: [],
  additionalSections: {
    openSourceContributions: [],
    research: [],
    patents: [],
    languages: [],
    volunteerExperience: [],
    conferences: [],
    references: [],
  },
};

const initialSettings: CVSettings = {
  selectedTemplate: 'google',
  theme: 'light',
  primaryColor: '#2563eb',
};

export default function CVBuilder() {
  const [cvData, setCVData] = useLocalStorage<CVData>('cv-builder-data', initialCVData);
  const [settings, setSettings] = useLocalStorage<CVSettings>('cv-builder-settings', initialSettings);
  const [activeSection, setActiveSection] = useState('personal');

  const updateCVData = <K extends keyof CVData>(section: K, data: CVData[K]) => {
    setCVData(prev => ({
      ...prev,
      [section]: data,
    }));
  };

  const updateSettings = (newSettings: Partial<CVSettings>) => {
    setSettings(prev => ({
      ...prev,
      ...newSettings,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">CV Builder Pro</h1>
              <span className="ml-2 text-sm text-gray-500">for IT Professionals</span>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={settings.selectedTemplate}
                onChange={(e) => updateSettings({ selectedTemplate: e.target.value as TemplateType })}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="google">Google Style</option>
                <option value="facebook">Facebook Style</option>
                <option value="minimalist">Minimalist</option>
              </select>
              <button
                onClick={() => updateSettings({ theme: settings.theme === 'light' ? 'dark' : 'light' })}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-md text-sm font-medium transition-colors"
              >
                {settings.theme === 'light' ? '🌙' : '☀️'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[calc(100vh-120px)]">
          {/* Left Panel - Form */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <CVForm
              cvData={cvData}
              updateCVData={updateCVData}
              activeSection={activeSection}
              setActiveSection={setActiveSection}
            />
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <CVPreview
              cvData={cvData}
              settings={settings}
              updateSettings={updateSettings}
            />
          </div>
        </div>
      </div>
    </div>
  );
}