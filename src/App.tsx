
import { AnimatePresence, motion } from 'framer-motion';
import { AppProvider, useApp } from './context/AppContext';
import { HomePage } from './pages/HomePage';
import { GamePage } from './pages/GamePage';
import { ChallengePage } from './pages/ChallengePage';
import { JourneyPage } from './pages/JourneyPage';
import { StudioPage } from './pages/StudioPage';

// Page transition wrapper
const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};

const pageTransition = {
  duration: 0.28,
  ease: 'easeInOut' as const,
};

function AppRouter() {
  const { state } = useApp();
  const { currentPage } = state;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={pageTransition}
        style={{ minHeight: '100vh' }}
      >
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'game' && <GamePage />}
        {currentPage === 'challenge' && <ChallengePage />}
        {currentPage === 'journey' && <JourneyPage />}
        {currentPage === 'studio' && <StudioPage />}
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppRouter />
    </AppProvider>
  );
}
