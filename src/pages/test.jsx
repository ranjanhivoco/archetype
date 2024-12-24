import React, { useState } from 'react';
import { Share2, Check } from 'lucide-react';

const ShareButton = () => {
  const [shared, setShared] = useState(false);
  const [error, setError] = useState('');

  const handleShare = async () => {
    // Reset states
    setError('');
    setShared(false);

    try {
      // Check if Web Share API is supported
      if (!navigator.share) {
        throw new Error('Web Share API not supported');
      }

      // Example file to share - you would replace this with your actual file
      const file = new File(['Hello World'], 'hello.txt', {
        type: 'text/plain',
      });

      await navigator.share({
        title: 'Shared File',
        text: 'Check out this file!',
        files: [file]
      });

      setShared(true);
      setTimeout(() => setShared(false), 2000); // Reset success state after 2s
    } catch (err) {
      setError(err.message);
      setTimeout(() => setError(''), 3000); // Clear error after 3s
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleShare}
        className={`
          flex items-center gap-2 px-4 py-2 rounded-full
          ${shared 
            ? 'bg-green-500 hover:bg-green-600' 
            : 'bg-blue-500 hover:bg-blue-600'
          }
          text-white font-medium transition-colors duration-200
          active:scale-95 transform
        `}
      >
        {shared ? (
          <>
            <Check className="w-5 h-5" />
            Shared!
          </>
        ) : (
          <>
            <Share2 className="w-5 h-5" />
            Share File
          </>
        )}
      </button>
      
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </div>
  );
};

export default ShareButton;