import { useState, useCallback, useRef } from 'react';
import type { CardData } from '../types';
import type { CardTheme, Difficulty } from '../types';
import { generateCards, DIFFICULTY_CONFIG } from '../data/gameData';
import { computeAccuracy } from '../utils/storage';

export interface GameState {
  cards: CardData[];
  moves: number;
  matchedPairs: number;
  totalPairs: number;
  gameStarted: boolean;
  gameWon: boolean;
  flippedIds: string[];
  isLocked: boolean; // prevent clicks during evaluation
}

interface UseGameOptions {
  difficulty: Difficulty;
  theme: CardTheme;
  onMatch?: () => void;
  onMismatch?: () => void;
  onFlip?: () => void;
  onWin?: (moves: number, accuracy: number) => void;
}

export function useGame({ difficulty, theme, onMatch, onMismatch, onFlip, onWin }: UseGameOptions) {
  const config = DIFFICULTY_CONFIG[difficulty];

  const initState = (): GameState => ({
    cards: generateCards(config.pairs, theme),
    moves: 0,
    matchedPairs: 0,
    totalPairs: config.pairs,
    gameStarted: false,
    gameWon: false,
    flippedIds: [],
    isLocked: false,
  });

  const [gameState, setGameState] = useState<GameState>(initState);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const flipCard = useCallback((cardId: string) => {
    setGameState(prev => {
      // Guard conditions
      if (prev.isLocked) return prev;
      if (prev.flippedIds.includes(cardId)) return prev;
      if (prev.flippedIds.length >= 2) return prev;

      const card = prev.cards.find(c => c.id === cardId);
      if (!card || card.isMatched) return prev;

      onFlip?.();

      const newFlipped = [...prev.flippedIds, cardId];
      const newCards = prev.cards.map(c =>
        c.id === cardId ? { ...c, isFlipped: true } : c,
      );

      const newState: GameState = {
        ...prev,
        cards: newCards,
        flippedIds: newFlipped,
        gameStarted: true,
      };

      // Evaluate pair
      if (newFlipped.length === 2) {
        const [idA, idB] = newFlipped;
        const cardA = newCards.find(c => c.id === idA)!;
        const cardB = newCards.find(c => c.id === idB)!;
        const newMoves = prev.moves + 1;

        if (cardA.pairId === cardB.pairId) {
          // Match!
          const matchedCards = newCards.map(c =>
            c.id === idA || c.id === idB ? { ...c, isMatched: true } : c,
          );
          const newMatched = prev.matchedPairs + 1;
          const won = newMatched === prev.totalPairs;
          const accuracy = computeAccuracy(newMoves, newMatched);

          setTimeout(() => onMatch?.(), 50);

          if (won) {
            setTimeout(() => onWin?.(newMoves, accuracy), 600);
          }

          return {
            ...newState,
            cards: matchedCards,
            moves: newMoves,
            matchedPairs: newMatched,
            flippedIds: [],
            gameWon: won,
            isLocked: false,
          };
        } else {
          // Mismatch — lock and flip back after delay
          setTimeout(() => onMismatch?.(), 50);

          lockTimerRef.current && clearTimeout(lockTimerRef.current);

          // We schedule the flip-back outside setState
          setTimeout(() => {
            setGameState(s => ({
              ...s,
              cards: s.cards.map(c =>
                c.id === idA || c.id === idB ? { ...c, isFlipped: false } : c,
              ),
              flippedIds: [],
              isLocked: false,
            }));
          }, 850);

          return {
            ...newState,
            moves: newMoves,
            isLocked: true,
          };
        }
      }

      return newState;
    });
  }, [onFlip, onMatch, onMismatch, onWin]);

  const restart = useCallback(() => {
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    setGameState(initState());
  }, [difficulty, theme]);

  return { gameState, flipCard, restart };
}
