import { useRef } from 'react';
import useReactToPdf from 'react-to-pdf';
import { CVData, CVSettings } from '@/types/cv';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, FileText, Palette } from 'lucide-react';
import GoogleTemplate from '@/components/templates/GoogleTemplate';
import FacebookTemplate from '@/components/templates/FacebookTemplate';
import MinimalistTemplate from '@/components/templates/MinimalistTemplate';

interface CVPreviewProps {
  cvData: CVData;
  settings: CVSettings;
  updateSettings: (settings: Partial<CVSettings>) => void;
}

export default function CVPreview({ cvData, settings, updateSettings }: CVPreviewProps) {
  // Ref for the CV preview container
  const cvRef = useRef<HTMLDivElement>(null);

  // Hook from react-to-pdf
  const toPDF = useReactToPdf({
    content: () => cvRef.current,
    filename: 'my-cv.pdf',
  }as any);

  const renderTemplate = () => {
    const templateProps = { cvData, settings };
    switch (settings.selectedTemplate) {
      case 'google':
        return <GoogleTemplate {...templateProps} />;
      case 'facebook':
        return <FacebookTemplate {...templateProps} />;
      case 'minimalist':
        return <MinimalistTemplate {...templateProps} />;
      default:
        return <GoogleTemplate {...templateProps} />;
    }
  };

  const handleExportWord = () => {
    // TODO: integrate with docx library
    alert('Word export functionality would be implemented with docx library');
  };

  const colorOptions = [
    { color: '#2563eb', name: 'Blue' },
    { color: '#dc2626', name: 'Red' },
    { color: '#059669', name: 'Green' },
    { color: '#7c3aed', name: 'Purple' },
    { color: '#ea580c', name: 'Orange' },
    { color: '#1f2937', name: 'Gray' },
    { color: '#000000', name: 'Black' },
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Preview Header */}
      <div className="p-6 border-b bg-gray-50">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">CV Preview</h2>
            <p className="text-sm text-gray-600 mt-1">Real-time preview of your CV</p>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toPDF}
              className="flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              PDF
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportWord}
              className="flex items-center"
            >
              <FileText className="w-4 h-4 mr-2" />
              Word
            </Button>
          </div>
        </div>

        {/* Template Controls */}
        <div className="mt-4 flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Palette className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Theme Colors:</span>
            <div className="flex space-x-2">
              {colorOptions.map(({ color, name }) => (
                <button
                  key={color}
                  onClick={() => updateSettings({ primaryColor: color })}
                  className={`w-7 h-7 rounded-full border-2 transition-all hover:scale-110 ${
                    settings.primaryColor === color
                      ? 'border-gray-800 shadow-md ring-2 ring-gray-300'
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color }}
                  title={name}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Additional Theme Options */}
        <div className="mt-3 flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">Background:</span>
          <div className="flex space-x-2">
            <button
              onClick={() => updateSettings({ theme: 'light' })}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                settings.theme === 'light'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Light
            </button>
            <button
              onClick={() => updateSettings({ theme: 'dark' })}
              className={`px-3 py-1 text-xs rounded-md border transition-colors ${
                settings.theme === 'dark'
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
              }`}
            >
              Dark
            </button>
          </div>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto bg-gray-100 p-6">
        <div className="max-w-4xl mx-auto">
          <div
            ref={cvRef}
            className={`shadow-lg rounded-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl ${
              settings.theme === 'dark' ? 'bg-gray-900' : 'bg-white'
            }`}
          >
            {renderTemplate()}
          </div>
        </div>
      </div>
    </div>
  );
}
