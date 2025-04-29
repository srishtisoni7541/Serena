import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, Loader2, Waves, Square } from 'lucide-react';

const App = () => {
  const vapiRef = useRef(null);
  const [isListening, setIsListening] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const apiKey = import.meta.env.VITE_VAPI_API_KEY;
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

  useEffect(() => {
    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on('start', () => {
      setIsListening(true);
      setIsAnalyzing(false);
      setIsSpeaking(false);
    });

    vapi.on('transcript', () => {
      setIsListening(false);
      setIsAnalyzing(true);
      setIsSpeaking(false);
    });

    vapi.on('response', () => {
      setIsAnalyzing(false);
      setIsSpeaking(true);
    });

    vapi.on('end', () => {
      setIsListening(false);
      setIsAnalyzing(false);
      setIsSpeaking(false);
      setIsActive(false);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [apiKey]);

  const handleMicToggle = () => {
    if (!isActive) {
      setIsActive(true);
      vapiRef.current?.start(assistantId);
    } else {
      vapiRef.current?.stop();
      setIsActive(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#d0f0ff] to-[#a6e3ff] p-4 sm:p-6">
      <div className="bg-white/70 backdrop-blur-md rounded-3xl shadow-2xl px-6 py-10 w-full max-w-md text-center">
        <h1 className="text-2xl sm:text-3xl font-bold text-sky-700 mb-2">Health Voice Assistant</h1>
        <p className="text-gray-700 mb-6 text-sm sm:text-base">
          Ask anything related to your health. I'm here to help!
        </p>

        <button
          onClick={handleMicToggle}
          className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto rounded-full text-white shadow-lg transition-all duration-300
          ${isSpeaking ? 'bg-orange-400 animate-pulse shadow-orange-300' : isActive ? 'bg-red-400 hover:bg-red-500' : 'bg-sky-400 hover:bg-sky-500'}
        `}
        >
          {isListening ? (
            <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8" />
          ) : isSpeaking ? (
            <Waves className="w-6 h-6 sm:w-8 sm:h-8" />
          ) : isActive ? (
            <Square className="w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
          )}
        </button>

        {/* Status Messages */}
        {isListening && (
          <p className="mt-4 text-sm text-sky-800 font-semibold animate-pulse">Listening...</p>
        )}
        {isAnalyzing && (
          <p className="mt-4 text-sm text-blue-700 font-semibold animate-pulse">Analyzing...</p>
        )}
        {isSpeaking && (
          <p className="mt-4 text-sm text-orange-700 font-semibold animate-pulse">Responding...</p>
        )}
        {!isActive && !isListening && !isSpeaking && !isAnalyzing && (
          <p className="mt-4 text-sm text-gray-600">Tap the mic to start talking</p>
        )}
      </div>
    </div>
  );
};

export default App;
