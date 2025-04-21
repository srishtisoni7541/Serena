

import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, Loader2, Waves } from 'lucide-react';

const App = () => {
  const vapiRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  // ✅ Env variables
  const apiKey = import.meta.env.VITE_VAPI_API_KEY;
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

  useEffect(() => {
    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on('start', () => {
      setIsListening(true);
      setIsAnalyzing(false);
    });

    vapi.on('transcript', () => {
      setIsListening(false);
      setIsAnalyzing(true); // after user's voice is captured
    });

    vapi.on('response', () => {
      setIsAnalyzing(false);
      setIsSpeaking(true); // AI starts speaking
    });

    vapi.on('end', () => {
      setIsListening(false);
      setIsAnalyzing(false);
      setIsSpeaking(false);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [apiKey]);

  const handleMicClick = () => {
    if (vapiRef.current) {
      setIsListening(true);
      setIsSpeaking(false);
      setIsAnalyzing(false);
      vapiRef.current.start(assistantId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] p-4 sm:p-6">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl px-6 py-10 w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-2">Health Voice Assistant</h1>
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Ask anything related to your health. I'm here to help!
        </p>

        <button
          onClick={handleMicClick}
          className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto rounded-full text-white shadow-lg transition-all duration-300
          ${
            isSpeaking
              ? 'bg-orange-500 animate-pulse shadow-orange-400'
              : 'bg-teal-500 hover:bg-teal-600'
          }`}
        >
          {isListening ? (
            <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8" />
          ) : isSpeaking ? (
            <Waves className="w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
          )}
        </button>

        {/* Text Feedback Below Mic */}
        {isListening && (
          <p className="mt-4 text-sm text-teal-800 font-semibold animate-pulse">
            Listening...
          </p>
        )}
        {isAnalyzing && (
          <p className="mt-4 text-sm text-blue-700 font-semibold animate-pulse">
            Analyzing your input...
          </p>
        )}
        {isSpeaking && (
          <p className="mt-4 text-sm text-orange-700 font-semibold animate-pulse">
            Responding...
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
