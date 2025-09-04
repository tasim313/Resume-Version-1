import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, User } from 'lucide-react';

interface ImageUploadProps {
  value?: string;
  onChange: (imageUrl: string) => void;
  onRemove: () => void;
  label: string;
  placeholder?: string;
}

export default function ImageUpload({ value, onChange, onRemove, label, placeholder }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <Card className={`relative ${isDragging ? 'border-blue-500 bg-blue-50' : ''}`}>
        <CardContent className="p-4">
          {value ? (
            <div className="relative">
              <img
                src={value}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mx-auto border-2 border-gray-200"
              />
              <Button
                variant="destructive"
                size="sm"
                onClick={onRemove}
                className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0"
              >
                <X className="w-3 h-3" />
              </Button>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={openFileDialog}
              className={`
                w-32 h-32 mx-auto border-2 border-dashed rounded-lg cursor-pointer
                flex flex-col items-center justify-center space-y-2
                transition-colors hover:bg-gray-50
                ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}
              `}
            >
              <User className="w-8 h-8 text-gray-400" />
              <div className="text-center">
                <p className="text-xs text-gray-500">Click or drag</p>
                <p className="text-xs text-gray-400">to upload</p>
              </div>
            </div>
          )}
          
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          <div className="mt-3 text-center">
            <Button
              variant="outline"
              size="sm"
              onClick={openFileDialog}
              className="w-full"
            >
              <Upload className="w-4 h-4 mr-2" />
              {value ? 'Change Image' : 'Upload Image'}
            </Button>
          </div>
          
          {placeholder && (
            <p className="text-xs text-gray-500 mt-2 text-center">{placeholder}</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}