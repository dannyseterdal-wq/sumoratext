import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, FileText, Hash, Clock, CheckCircle } from 'lucide-react';
import type { SummaryResult } from '@/lib/aiSummarizer';

interface SummaryDisplayProps {
  summary: SummaryResult;
  fileName: string;
}

export const SummaryDisplay: React.FC<SummaryDisplayProps> = ({
  summary,
  fileName
}) => {
  const handleNewFile = () => {
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-gray-200 py-8">
      <div className="container mx-auto px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={handleNewFile}
            className="mb-6 text-gray-600 hover:text-gray-900 hover:bg-white rounded-full px-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Tilbake
          </Button>
          
          <div className="flex items-center space-x-4 mb-2">
            <div className="w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Sammendrag fullført</h1>
              <p className="text-gray-600">{fileName}</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Ord i sammendrag</p>
                <p className="text-xl font-semibold text-gray-900">{summary.wordCount}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <Hash className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Original lengde</p>
                <p className="text-xl font-semibold text-gray-900">{summary.originalLength}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Komprimering</p>
                <p className="text-xl font-semibold text-gray-900">
                  {Math.round((1 - summary.wordCount / (summary.originalLength / 5)) * 100)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Sammendrag</h2>
                <div className="prose prose-gray max-w-none">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {summary.summary}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Points */}
          <div>
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
              <div className="p-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Nøkkelpunkter</h3>
                <div className="space-y-4">
                  {summary.keyPoints.map((point, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed">{point}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 space-y-3">
              <Button 
                onClick={handleNewFile}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 font-medium transition-colors duration-200"
              >
                Last opp ny fil
              </Button>
              <Button 
                variant="outline"
                className="w-full border-gray-200 hover:bg-gray-50 rounded-xl py-3 font-medium transition-colors duration-200"
                onClick={() => window.print()}
              >
                Skriv ut sammendrag
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};