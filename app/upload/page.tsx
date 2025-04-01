'use client'

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiX, FiInfo, FiLock } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { analyseStatement } from '../actions/analyseStatement';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const router = useRouter();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size too large (max 5MB)');
        return;
      }
      setFile(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'image/*': ['.png', '.jpg', '.jpeg']
    },
    maxFiles: 1
  });

  const removeFile = () => {
    setFile(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    
    setIsSubmitting(true);
    try {
      const result = await analyseStatement(file)
      console.log('Analysis complete:', result)
      router.push('/finish');
      router.refresh();
    } catch (err) {
      setError('Analysis failed. Please try again.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar/>

      <main className="max-w-md mx-auto px-4 py-5 pb-16">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h2 className="text-2xl text-gray-800 mb-4">Upload bank statement</h2>
          <p className="text-gray-600">
            For best results PDF files are recommended. Images are accepted but may produce varying results.
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Upload Card */}
          <div 
            {...getRootProps()} 
            className={`bg-white rounded-2xl shadow-sm border-2 border-dashed hover:border-blue-400 transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            }`}
          >
            <div className="p-8 text-center cursor-pointer">
              <div className="space-y-4">
                <FiUploadCloud className="h-12 w-12 text-blue-500 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {isDragActive ? 'Drop file here' : 'Drag & drop file'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    or click to select
                  </p>
                </div>
                <p className="text-xs text-gray-400 flex items-center justify-center">
                  <FiLock className="h-3 w-3 mr-1" />
                  Secure encrypted processing
                </p>
              </div>
              <input {...getInputProps({ name: 'file' })} />
            </div>
          </div>

          {/* File Preview */}
          {file && (
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate">
                <FiFile className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)}MB</span>
              </div>
              <button 
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-red-500"
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          )}

          {/* Yearly Statement Tip */}
          <div className="mt-4 flex items-start bg-blue-50 p-3 rounded-lg">
            <FiInfo className="h-5 w-5 text-blue-600 mr-2 mt-1 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Uploading a yearly statement can improve the 
              detection of annual subscriptions and price changes.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center text-sm">
              <FiX className="h-4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={!file || isSubmitting}
            className={`mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors ${
              isSubmitting ? 'opacity-75 cursor-wait' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-4 w-4 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Analyse Subscriptions'}
          </button>
        </form>
      </main>
    </div>
  );
}