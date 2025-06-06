import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus } from 'lucide-react';
import { formatPrice } from '../../lib/utils';

interface CakeBuilderProps {
  onClose: () => void;
}

const cakeOptions = {
  size: [
    { id: '6inch', name: '6 inch (serves 6-8)', price: 25 },
    { id: '8inch', name: '8 inch (serves 10-12)', price: 35 },
    { id: '10inch', name: '10 inch (serves 15-20)', price: 50 },
    { id: '12inch', name: '12 inch (serves 25-30)', price: 70 },
  ],
  flavor: [
    { id: 'vanilla', name: 'Vanilla Bean', price: 0 },
    { id: 'chocolate', name: 'Rich Chocolate', price: 0 },
    { id: 'strawberry', name: 'Fresh Strawberry', price: 2 },
    { id: 'lemon', name: 'Lemon Zest', price: 2 },
    { id: 'red-velvet', name: 'Red Velvet', price: 3 },
    { id: 'carrot', name: 'Carrot Spice', price: 3 },
  ],
  frosting: [
    { id: 'buttercream', name: 'Classic Buttercream', price: 0 },
    { id: 'cream-cheese', name: 'Cream Cheese', price: 2 },
    { id: 'chocolate-ganache', name: 'Chocolate Ganache', price: 3 },
    { id: 'whipped-cream', name: 'Whipped Cream', price: 1 },
  ],
  decorations: [
    { id: 'fresh-berries', name: 'Fresh Berries', price: 8 },
    { id: 'chocolate-drip', name: 'Chocolate Drip', price: 5 },
    { id: 'edible-flowers', name: 'Edible Flowers', price: 12 },
    { id: 'custom-message', name: 'Custom Message', price: 3 },
    { id: 'candles', name: 'Birthday Candles', price: 2 },
  ],
};

export default function CakeBuilder({ onClose }: CakeBuilderProps) {
  const [selectedOptions, setSelectedOptions] = useState({
    size: '',
    flavor: '',
    frosting: '',
    decorations: [] as string[],
  });
  const [customMessage, setCustomMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(0);

  const steps = ['Size', 'Flavor', 'Frosting', 'Decorations', 'Review'];

  const handleOptionSelect = (category: string, optionId: string) => {
    if (category === 'decorations') {
      setSelectedOptions(prev => ({
        ...prev,
        decorations: prev.decorations.includes(optionId)
          ? prev.decorations.filter(id => id !== optionId)
          : [...prev.decorations, optionId]
      }));
    } else {
      setSelectedOptions(prev => ({
        ...prev,
        [category]: optionId
      }));
    }
  };

  const calculateTotal = () => {
    let total = 0;
    
    // Size price
    const sizeOption = cakeOptions.size.find(s => s.id === selectedOptions.size);
    if (sizeOption) total += sizeOption.price;
    
    // Flavor price
    const flavorOption = cakeOptions.flavor.find(f => f.id === selectedOptions.flavor);
    if (flavorOption) total += flavorOption.price;
    
    // Frosting price
    const frostingOption = cakeOptions.frosting.find(f => f.id === selectedOptions.frosting);
    if (frostingOption) total += frostingOption.price;
    
    // Decorations price
    selectedOptions.decorations.forEach(decorationId => {
      const decoration = cakeOptions.decorations.find(d => d.id === decorationId);
      if (decoration) total += decoration.price;
    });
    
    return total;
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0: return selectedOptions.size !== '';
      case 1: return selectedOptions.flavor !== '';
      case 2: return selectedOptions.frosting !== '';
      case 3: return true; // Decorations are optional
      case 4: return true; // Review step
      default: return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Size
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Choose Your Cake Size
            </h3>
            {cakeOptions.size.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect('size', option.id)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedOptions.size === option.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {option.name}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {formatPrice(option.price)}
                  </span>
                </div>
              </button>
            ))}
          </div>
        );

      case 1: // Flavor
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Select Your Flavor
            </h3>
            {cakeOptions.flavor.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect('flavor', option.id)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedOptions.flavor === option.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {option.name}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        );

      case 2: // Frosting
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Choose Your Frosting
            </h3>
            {cakeOptions.frosting.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect('frosting', option.id)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedOptions.frosting === option.id
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {option.name}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    {option.price > 0 ? `+${formatPrice(option.price)}` : 'Included'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        );

      case 3: // Decorations
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Add Decorations (Optional)
            </h3>
            {cakeOptions.decorations.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionSelect('decorations', option.id)}
                className={`w-full p-4 border-2 rounded-lg text-left transition-colors ${
                  selectedOptions.decorations.includes(option.id)
                    ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {option.name}
                  </span>
                  <span className="text-primary-600 dark:text-primary-400 font-semibold">
                    +{formatPrice(option.price)}
                  </span>
                </div>
              </button>
            ))}
            
            {selectedOptions.decorations.includes('custom-message') && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Custom Message
                </label>
                <input
                  type="text"
                  value={customMessage}
                  onChange={(e) => setCustomMessage(e.target.value)}
                  placeholder="Enter your custom message..."
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            )}
          </div>
        );

      case 4: // Review
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Review Your Custom Cake
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Size:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {cakeOptions.size.find(s => s.id === selectedOptions.size)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Flavor:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {cakeOptions.flavor.find(f => f.id === selectedOptions.flavor)?.name}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Frosting:</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {cakeOptions.frosting.find(f => f.id === selectedOptions.frosting)?.name}
                </span>
              </div>
              {selectedOptions.decorations.length > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Decorations:</span>
                  <div className="text-right">
                    {selectedOptions.decorations.map(decorationId => {
                      const decoration = cakeOptions.decorations.find(d => d.id === decorationId);
                      return (
                        <div key={decorationId} className="font-medium text-gray-900 dark:text-white">
                          {decoration?.name}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {customMessage && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Message:</span>
                  <span className="font-medium text-gray-900 dark:text-white">
                    "{customMessage}"
                  </span>
                </div>
              )}
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
              <div className="flex justify-between text-xl font-bold text-gray-900 dark:text-white">
                <span>Total:</span>
                <span>{formatPrice(calculateTotal())}</span>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-display font-bold text-gray-900 dark:text-white">
            Custom Cake Builder
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <= currentStep
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
                <span className={`ml-2 text-sm ${
                  index <= currentStep
                    ? 'text-gray-900 dark:text-white font-medium'
                    : 'text-gray-500 dark:text-gray-400'
                }`}>
                  {step}
                </span>
                {index < steps.length - 1 && (
                  <div className="w-8 h-px bg-gray-300 dark:bg-gray-600 ml-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-gray-200 dark:border-gray-700">
          <div className="text-lg font-semibold text-gray-900 dark:text-white">
            Total: {formatPrice(calculateTotal())}
          </div>
          
          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Back
              </button>
            )}
            
            {currentStep < steps.length - 1 ? (
              <button
                onClick={() => setCurrentStep(currentStep + 1)}
                disabled={!canProceed()}
                className="px-6 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  // Add to cart logic here
                  console.log('Custom cake added to cart:', selectedOptions, customMessage);
                  onClose();
                }}
                className="px-6 py-2 bg-accent-500 hover:bg-accent-600 text-white rounded-lg transition-colors"
              >
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}