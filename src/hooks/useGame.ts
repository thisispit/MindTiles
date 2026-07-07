import { useState, useCallback, useRef } from 'react';
import type { CardData, Difficulty } from '../types';
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
  isLocked: boolean;
}

interface UseGameOptions {
  difficulty: Difficulty;
  onMatch?: () => void;
  onMismatch?: () => void;
  onFlip?: () => void;
  onWin?: (moves: number, accuracy: number) => void;
}

export function useGame({ difficulty, onMatch, onMismatch, onFlip, onWin }: UseGameOptions) {
  const config = DIFFICULTY_CONFIG[difficulty];

  const initState = (): GameState => ({
    cards: generateCards(config.pairs),
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
      if (prev.isLocked) return prev;
      if (prev.flippedIds.includes(cardId)) return prev;
      if (prev.flippedIds.length >= 2) return prev;

      const card = prev.cards.find(c => c.id === cardId);
      if (!card || card.isMatched) return prev;

      onFlip?.();

      const newFlipped = [...prev.flippedIds, cardId];
      const newCards   = prev.cards.map(c => c.id === cardId ? { ...c, isFlipped: true } : c);

      const newState: GameState = {
        ...prev,
        cards: newCards,
        flippedIds: newFlipped,
        gameStarted: true,
      };

      if (newFlipped.length === 2) {
        const [idA, idB] = newFlipped;
        const cardA = newCards.find(c => c.id === idA)!;
        const cardB = newCards.find(c => c.id === idB)!;
        const newMoves = prev.moves + 1;

        if (cardA.pairId === cardB.pairId) {
          // ✅ Match
          const matchedCards = newCards.map(c =>
            c.id === idA || c.id === idB ? { ...c, isMatched: true } : c,
          );
          const newMatched = prev.matchedPairs + 1;
          const won        = newMatched === prev.totalPairs;
          const accuracy   = computeAccuracy(newMoves, newMatched);

          setTimeout(() => onMatch?.(), 50);
          if (won) setTimeout(() => onWin?.(newMoves, accuracy), 600);

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
          // ❌ Mismatch
          setTimeout(() => onMismatch?.(), 50);
          lockTimerRef.current && clearTimeout(lockTimerRef.current);

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

          return { ...newState, moves: newMoves, isLocked: true };
        }
      }

      return newState;
    });
  }, [onFlip, onMatch, onMismatch, onWin]);

  const restart = useCallback(() => {
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    setGameState(initState());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [difficulty]);

  return { gameState, flipCard, restart };
}
