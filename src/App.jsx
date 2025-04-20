// import React, { useEffect, useRef, useState } from 'react';
// import Vapi from '@vapi-ai/web';
// import { Mic, Loader2 } from 'lucide-react';

// const App = () => {
//   const vapiRef = useRef(null);
//   const [isListening, setIsListening] = useState(false);

//   const apiKey = "7293dd81-7f6a-4d2b-a00b-b36049874ad4";
//   const assistantId = "1f2b0eab-8060-491a-b5e4-172115230766";

//   useEffect(() => {
//     const vapi = new Vapi(apiKey);
//     vapiRef.current = vapi;

//     vapi.on('start', () => {
//       setIsListening(true);
//     });

//     vapi.on('end', () => {
//       setIsListening(false);
//     });

//     return () => {
//       if (vapiRef.current) {
//         vapiRef.current.stop();
//       }
//     };
//   }, []);

//   const handleMicClick = () => {
//     if (vapiRef.current) {
//       vapiRef.current.start(assistantId);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#b2ebf2] p-4 sm:p-6">
//       <div className="bg-white/60 backdrop-blur-md rounded-3xl shadow-2xl px-6 py-10 w-full max-w-md text-center">
//         <h1 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-2">Health Voice Assistant</h1>
//         <p className="text-gray-600 mb-6 text-sm sm:text-base">
//           Ask anything related to your health. I'm here to help!
//         </p>

//         <button
//           onClick={handleMicClick}
//           className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto rounded-full bg-teal-500 text-white shadow-lg transition hover:bg-teal-600 ${
//             isListening ? 'animate-pulse' : ''
//           }`}
//         >
//           {isListening ? <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8" /> : <Mic className="w-6 h-6 sm:w-8 sm:h-8" />}
//         </button>

//         {isListening && (
//           <p className="mt-4 text-sm text-teal-800 font-semibold animate-pulse">Listening...</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default App;



import React, { useEffect, useRef, useState } from 'react';
import Vapi from '@vapi-ai/web';
import { Mic, Loader2 } from 'lucide-react';

const App = () => {
  const vapiRef = useRef(null);
  const [isListening, setIsListening] = useState(false);

  // ✅ Env variables
  const apiKey = import.meta.env.VITE_VAPI_API_KEY;
  const assistantId = import.meta.env.VITE_VAPI_ASSISTANT_ID;

  useEffect(() => {
    const vapi = new Vapi(apiKey);
    vapiRef.current = vapi;

    vapi.on('start', () => setIsListening(true));
    vapi.on('end', () => setIsListening(false));

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
    };
  }, [apiKey]);

  const handleMicClick = () => {
    if (vapiRef.current) {
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
          className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center mx-auto rounded-full bg-teal-500 text-white shadow-lg transition hover:bg-teal-600 ${
            isListening ? 'animate-pulse' : ''
          }`}
        >
          {isListening ? (
            <Loader2 className="animate-spin w-6 h-6 sm:w-8 sm:h-8" />
          ) : (
            <Mic className="w-6 h-6 sm:w-8 sm:h-8" />
          )}
        </button>

        {isListening && (
          <p className="mt-4 text-sm text-teal-800 font-semibold animate-pulse">Listening...</p>
        )}
      </div>
    </div>
  );
};

export default App;
