'use client';

import { useState, useCallback, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUploadCloud, FiFile, FiX, FiInfo, FiLock, FiPlus, FiMinus, FiClock, FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import Navbar from '@/components/Navbar';
import { analyseStatement } from '../actions/analyseStatement';
import { useRouter } from 'next/navigation';
import Footer from '@/components/Footer';

// Pricing configuration
const PRICING = {
  basePrice: 7.99,
  bundles: [
    { quantity: 1, price: 7.99 },
    { quantity: 2, price: 12.99 },
    { quantity: 3, price: 15.99 },
  ],
  extraPricePerAccount: 2.00
};

// Processing Modal Component
function ProcessingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-200/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 mb-4">
            <FiClock className="h-6 w-6 text-blue-600" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Analysing your statements.
          </h3>
          <p className="text-sm text-gray-600 mb-6">
            This may take up to a minute. Please sit tight!
          </p>
          <div className="flex items-center justify-center mb-4">
            <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
          <p className="text-xs text-gray-500">
            Please do not close this window.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function UploadPage() {
  const [files, setFiles] = useState<File[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const calculatePrice = (qty: number) => {
    if (qty <= 3) return PRICING.bundles.find(b => b.quantity === qty)?.price || PRICING.basePrice;
    return PRICING.bundles[2].price + (qty - 3) * PRICING.extraPricePerAccount;
  };

  const handleQuantityChange = (newQty: number) => {
    if (newQty < 1) return;
    setQuantity(newQty);
    // Auto-remove files if quantity is reduced below current file count
    if (newQty < files.length) {
      setFiles(prev => prev.slice(0, newQty));
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setError(null);
    const remainingSlots = quantity - files.length;
    const newFiles = acceptedFiles
      .filter(file => file.size <= 5 * 1024 * 1024)
      .slice(0, remainingSlots);

    if (acceptedFiles.length > remainingSlots) {
      setError(`Only ${remainingSlots} more file${remainingSlots > 1 ? 's' : ''} needed`);
    }

    setFiles(prev => [...prev, ...newFiles]);
  }, [files.length, quantity]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'application/pdf': ['.pdf'], 'image/*': ['.png', '.jpg', '.jpeg'] },
    maxFiles: quantity,
    multiple: true
  });

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (files.length !== quantity) {
      setError(`Please upload exactly ${quantity} file${quantity > 1 ? 's' : ''}`);
      return;
    }
    
    setIsSubmitting(true);
    
    // Show modal after 0.5 second delay
    setTimeout(() => {
      setShowModal(true);
    }, 500);
    
    try {
      const result = await analyseStatement(files);
      console.log(result)
      if (result.success && result.sessionId) {
        router.push(`/checkout?sessionId=${result.sessionId}`);
      } else {
        throw new Error('Failed to create analysis session');
      }
    } catch (err) {
      setError('Processing failed. Please try again.');
      setShowModal(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const totalPrice = calculatePrice(quantity);
  const isBundle = quantity <= 3;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />

      <main className="max-w-md mx-auto px-4 py-5 pb-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl text-gray-800 mb-4">Analyse Multiple Bank Accounts</h2>
          <p className="text-gray-600">
            Upload statements from different accounts and save with our bundle pricing
          </p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}>
          {/* Quantity Selector */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Number of Bank Accounts</h3>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  <FiMinus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <button
                  type="button"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                  disabled={isSubmitting}
                >
                  <FiPlus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600">
                <span>{quantity} account{quantity > 1 ? 's' : ''}</span>
                <span className="font-medium text-gray-900">
                  ${isBundle ? PRICING.bundles.find(b => b.quantity === quantity)?.price : (
                    <>
                      {PRICING.bundles[2].price} + {quantity - 3} × ${PRICING.extraPricePerAccount}
                    </>
                  )}
                </span>
              </div>
              <div className="flex justify-between font-medium text-blue-600">
                <span>Total Price</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
            </div>
            
            {/* Payment Information Message */}
            <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="flex items-start">
                <FiInfo className="h-4 w-4 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                <p className="text-xs text-blue-700">
                    Before you pay, we’ll show you your total yearly subscription cost - so you’ll know exactly whether it’s worth it.                </p>
              </div>
            </div>
          </div>

          {/* Upload Section */}
          <div 
            {...getRootProps()}
            className={`bg-white rounded-2xl shadow-sm border-2 border-dashed hover:border-blue-400 transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
            } ${files.length === quantity || isSubmitting ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div className="p-8 text-center">
              <div className="space-y-4">
                <FiUploadCloud className="h-12 w-12 text-blue-500 mx-auto" />
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {files.length}/{quantity} Files Uploaded
                  </h3>
                  <p className="text-sm text-gray-500">
                    {files.length === quantity ? 
                      'All files uploaded' : 
                      'Drag & drop or click to select'
                    }
                  </p>
                </div>
                <p className="text-xs text-gray-400 flex items-center justify-center">
                  <FiLock className="h-3 w-3 mr-1" />
                  Each file encrypted separately
                </p>
              </div>
              <input {...getInputProps({ name: 'files' })} disabled={files.length === quantity || isSubmitting} />
            </div>
          </div>

          {/* Uploaded Files */}
          {files.map((file, index) => (
            <div key={file.name} className="mt-4 p-3 bg-gray-50 rounded-lg flex items-center justify-between">
              <div className="flex items-center space-x-2 truncate">
                <FiFile className="h-4 w-4 text-blue-500 flex-shrink-0" />
                <span className="text-sm text-gray-700 truncate">{file.name}</span>
                <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)}MB</span>
              </div>
              <button 
                type="button"
                onClick={() => removeFile(index)}
                className="text-gray-400 hover:text-red-500"
                disabled={isSubmitting}
              >
                <FiX className="h-4 w-4" />
              </button>
            </div>
          ))}

          {/* Error Messages */}
          {error && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center text-sm">
              <FiX className="h-4 w-4 mr-1" />
              <span>{error}</span>
            </div>
          )}

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={files.length !== quantity || isSubmitting}
            className={`mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors ${
              (files.length !== quantity || isSubmitting) ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? 'Processing...' : 'See your spend ->'}
          </button>
        </form>
      </main>
      <Footer />
      

      {/* Processing Modal */}
      <ProcessingModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </div>
  );
}