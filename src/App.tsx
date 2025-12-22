import { useState } from 'react';
import Countdown from './components/Countdown';
import Fireworks from './components/Fireworks';
import FinalMessage from './components/FinalMessage';
import DownloadButton from './components/DownloadButton';

/**
 * Main App - Romantic Christmas Countdown Experience
 * Progressive flow: Countdown → Fireworks Celebration → Final Message
 */
function App() {
  const [showCelebration, setShowCelebration] = useState(false);

  const handleCountdownComplete = () => {
    setShowCelebration(true);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {!showCelebration ? (
        // Phase 1: Countdown
        <Countdown onComplete={handleCountdownComplete} />
      ) : (
        // Phase 2: Celebration with fireworks
        <>
          <Fireworks />
          <DownloadButton />
          <FinalMessage />
        </>
      )}
    </div>
  );
}

export default App;
