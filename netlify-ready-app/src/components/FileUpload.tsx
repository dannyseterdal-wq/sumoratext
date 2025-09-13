import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isProcessing: boolean;
  progress: number;
  error: string | null;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileSelect,
  isProcessing,
  progress,
  error
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png']
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
    validator: (file) => {
      const allowedExtensions = ['.pdf', '.docx', '.txt', '.jpg', '.jpeg', '.png'];
      const hasValidExtension = allowedExtensions.some(ext => 
        file.name.toLowerCase().endsWith(ext)
      );
      
      const allowedTypes = [
        'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'text/plain',
        'image/jpeg',
        'image/jpg',
        'image/png'
      ];
      
      const isImageFile = file.type.startsWith('image/');
      
      if (!hasValidExtension && !allowedTypes.includes(file.type) && !isImageFile) {
        return {
          code: 'file-invalid-type',
          message: 'Ugyldig filtype. Støttede formater: PDF, DOCX, TXT, JPG, PNG'
        };
      }
      
      return null;
    }
  });

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const clearFile = () => {
    setSelectedFile(null);
    // Reset file input
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (input) input.value = '';
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      {/* Main Upload Area */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div
          {...getRootProps()}
          className={`
            p-12 text-center cursor-pointer transition-all duration-200 ease-out
            ${isDragActive ? 'bg-blue-50 border-blue-200' : 'hover:bg-gray-50'}
            ${isProcessing ? 'pointer-events-none opacity-60' : ''}
          `}
        >
          <input {...getInputProps()} />
          
          <div className={`w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center transition-all duration-200 ${
            isDragActive ? 'bg-blue-100' : 'bg-gray-100'
          }`}>
            <Upload className={`h-10 w-10 transition-colors duration-200 ${
              isDragActive ? 'text-blue-600' : 'text-gray-400'
            }`} />
          </div>
          
          {isDragActive ? (
            <div>
              <p className="text-xl font-medium text-blue-600 mb-2">
                Slipp filen her
              </p>
              <p className="text-sm text-blue-500">
                Klar til å behandle filen din
              </p>
            </div>
          ) : (
            <div>
              <p className="text-xl font-medium text-gray-900 mb-2">
                Dra og slipp en fil her
              </p>
              <p className="text-sm text-gray-500 mb-4">
                eller klikk for å velge fra datamaskinen din
              </p>
              <div className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors duration-200">
                Velg fil
              </div>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="px-8 pb-8">
            <div className="bg-gray-50 rounded-2xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                    <File className="h-6 w-6 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatFileSize(selectedFile.size)}
                    </p>
                  </div>
                </div>
                {!isProcessing && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFile}
                    className="text-gray-400 hover:text-gray-600 hover:bg-white rounded-full w-8 h-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="px-8 pb-8">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Behandler fil...</span>
                <span className="text-sm text-gray-500">{progress}%</span>
              </div>
              <Progress value={progress} className="w-full h-2" />
            </div>
          </div>
        )}
      </div>

      {/* Format Info */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Støttede formater: PDF, DOCX, TXT, JPG, PNG • Maksimal størrelse: 10MB
        </p>
      </div>

      {/* Error Display */}
      {error && (
        <Alert variant="destructive" className="rounded-2xl border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="text-red-800">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
};