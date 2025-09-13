import React, { useState } from 'react';
import { FileUpload } from '@/components/FileUpload';
import { SummaryDisplay } from '@/components/SummaryDisplay';
import { FileProcessor } from '@/lib/fileProcessor';
import { AISummarizer, type SummaryResult } from '@/lib/aiSummarizer';
import { Card, CardContent } from '@/components/ui/card';
import { Brain, Zap, Shield, Eye } from 'lucide-react';

export default function Index() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [summary, setSummary] = useState<SummaryResult | null>(null);
  const [fileName, setFileName] = useState<string>('');

  const handleFileSelect = async (file: File) => {
    setIsProcessing(true);
    setProgress(0);
    setError(null);
    setSummary(null);
    setFileName(file.name);

    try {
      // Step 1: Process file (20-50%)
      setProgress(20);
      const processedFile = await FileProcessor.processFile(file);
      setProgress(50);

      // Step 2: Generate summary (50-100%)
      setProgress(70);
      const summaryResult = await AISummarizer.generateSummary(
        processedFile.content,
        processedFile.name
      );
      setProgress(100);

      setSummary(summaryResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'En ukjent feil oppstod');
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  if (summary) {
    return (
      <div className="min-h-screen bg-gray-200">
        <div className="container mx-auto">
          <SummaryDisplay summary={summary} fileName={fileName} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Header */}
      <div className="container mx-auto px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            AI Sammendrag
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Last opp dokumenter og bilder for å få intelligente sammendrag på sekunder
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-200">
              <Brain className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">AI-drevet</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Avansert kunstig intelligens for nøyaktige sammendrag</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-200">
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Lynrask</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Få sammendrag på sekunder, ikke minutter</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-200">
              <Shield className="h-8 w-8 text-green-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">Sikker</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Filene dine behandles lokalt og sikkert</p>
          </div>
          
          <div className="text-center group">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow duration-200">
              <Eye className="h-8 w-8 text-purple-500" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">OCR-støtte</h3>
            <p className="text-sm text-gray-600 leading-relaxed">Leser tekst fra bilder med optisk gjenkjenning</p>
          </div>
        </div>

        {/* File Upload */}
        <FileUpload
          onFileSelect={handleFileSelect}
          isProcessing={isProcessing}
          progress={progress}
          error={error}
        />

        {/* Supported formats */}
        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-medium text-gray-900 mb-8">Støttede filformater</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <div className="text-3xl">📄</div>
                </div>
                <p className="font-medium text-gray-900 mb-1">PDF</p>
                <p className="text-xs text-gray-600">Dokumenter</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <div className="text-3xl">📝</div>
                </div>
                <p className="font-medium text-gray-900 mb-1">DOCX</p>
                <p className="text-xs text-gray-600">Word-filer</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <div className="text-3xl">📋</div>
                </div>
                <p className="font-medium text-gray-900 mb-1">TXT</p>
                <p className="text-xs text-gray-600">Tekstfiler</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <div className="text-3xl">🖼️</div>
                </div>
                <p className="font-medium text-gray-900 mb-1">JPG</p>
                <p className="text-xs text-gray-600">Bilder</p>
              </div>
              <div className="text-center group">
                <div className="w-20 h-20 bg-white rounded-2xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-all duration-200 group-hover:scale-105">
                  <div className="text-3xl">🎨</div>
                </div>
                <p className="font-medium text-gray-900 mb-1">PNG</p>
                <p className="text-xs text-gray-600">Tekstfiler</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}