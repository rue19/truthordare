import { create } from 'zustand';

interface OracleState {
  animationState: 'idle' | 'truth' | 'dare' | 'complete';
  isExplosive: boolean;
  currentChallenge: string | null;
  player1: string | null;
  player2: string | null;

  setAnimationState: (state: OracleState['animationState']) => void;
  setIsExplosive: (value: boolean) => void;
  setCurrentChallenge: (challenge: string) => void;
  setPlayers: (p1: string, p2: string) => void;
}

export const useOracleStore = create<OracleState>((set) => ({
  animationState: 'idle',
  isExplosive: false,
  currentChallenge: null,
  player1: null,
  player2: null,

  setAnimationState: (animationState) => set({ animationState }),
  setIsExplosive: (isExplosive) => set({ isExplosive }),
  setCurrentChallenge: (currentChallenge) => set({ currentChallenge }),
  setPlayers: (player1, player2) => set({ player1, player2 }),
}));

interface WalletState {
  publicKey: string | null;
  isConnected: boolean;
  isConnecting: boolean;
  networkError: string | null;

  setPublicKey: (key: string | null) => void;
  setIsConnected: (value: boolean) => void;
  setIsConnecting: (value: boolean) => void;
  setNetworkError: (error: string | null) => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  publicKey: null,
  isConnected: false,
  isConnecting: false,
  networkError: null,

  setPublicKey: (publicKey) => set({ publicKey }),
  setIsConnected: (isConnected) => set({ isConnected }),
  setIsConnecting: (isConnecting) => set({ isConnecting }),
  setNetworkError: (networkError) => set({ networkError }),
}));

interface GameState {
  sessionId: string | null;
  gameStarted: boolean;
  currentRound: number;
  player1Score: number;
  player2Score: number;

  setSessionId: (id: string) => void;
  setGameStarted: (value: boolean) => void;
  setCurrentRound: (round: number) => void;
  updateScore: (player: 1 | 2, points: number) => void;
}

export const useGameStore = create<GameState>((set) => ({
  sessionId: null,
  gameStarted: false,
  currentRound: 0,
  player1Score: 0,
  player2Score: 0,

  setSessionId: (sessionId) => set({ sessionId }),
  setGameStarted: (gameStarted) => set({ gameStarted }),
  setCurrentRound: (currentRound) => set({ currentRound }),
  updateScore: (player, points) =>
    set((state) => ({
      [player === 1 ? 'player1Score' : 'player2Score']:
        (player === 1 ? state.player1Score : state.player2Score) + points,
    })),
}));
