import { useState, useCallback, useEffect } from 'react';
import { useWalletStore } from './useOracleState';

interface FreighterWindow extends Window {
  freighter?: {
    isConnected: () => Promise<boolean>;
    getPublicKey: () => Promise<string>;
    signTransaction: (
      transactionXDR: string,
      network: string
    ) => Promise<{ signedXDR: string }>;
    signMessage: (message: string) => Promise<{ signedMessage: string }>;
  };
}

export function useFreighter() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [freighterReady, setFreighterReady] = useState(false);
  const {
    publicKey,
    setPublicKey,
    setIsConnected,
    setNetworkError,
    isConnected,
  } = useWalletStore();

  // Wait for Freighter to be available
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const checkFreighter = () => {
      const window_ = globalThis as unknown as FreighterWindow;
      if (window_.freighter) {
        setFreighterReady(true);
      }
    };

    // Check if already loaded
    checkFreighter();

    // Listen for Freighter load event
    window.addEventListener('freighterLoaded', checkFreighter);
    
    // Also set up a timeout check for cases where the event doesn't fire
    const timeout = setTimeout(checkFreighter, 2000);

    return () => {
      window.removeEventListener('freighterLoaded', checkFreighter);
      clearTimeout(timeout);
    };
  }, []);

  const isFreighterInstalled = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    const window_ = globalThis as unknown as FreighterWindow;
    return !!window_.freighter;
  }, []);

  const connect = useCallback(async () => {
    // First check if extension is even installed
    if (!isFreighterInstalled()) {
      const errorMsg = 'Freighter extension not installed. Please install it from https://freighter.app';
      setError(errorMsg);
      setNetworkError(errorMsg);
      console.error('Freighter not detected on window object');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      const window_ = globalThis as unknown as FreighterWindow;

      // Check if wallet connection is possible
      const isConnected_ = await window_.freighter?.isConnected();
      if (!isConnected_) {
        throw new Error('Freighter wallet is not connected. Please unlock it and try again.');
      }

      // Get public key
      const key = await window_.freighter?.getPublicKey();
      if (!key) {
        throw new Error('Unable to retrieve public key from Freighter');
      }

      setPublicKey(key);
      setIsConnected(true);
      setNetworkError(null);
      console.log('Freighter connected successfully with key:', key);
      return key;
    } catch (err: any) {
      const errorMessage =
        err?.message || 'Failed to connect wallet. Please try again.';
      console.error('Freighter connection error:', err);
      setError(errorMessage);
      setNetworkError(errorMessage);
      setIsConnected(false);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [isFreighterInstalled, setPublicKey, setIsConnected, setNetworkError]);

  const disconnect = useCallback(() => {
    setPublicKey(null);
    setIsConnected(false);
    setError(null);
  }, [setPublicKey, setIsConnected]);

  const signTransaction = useCallback(
    async (transactionXDR: string, network: string) => {
      if (!isFreighterInstalled()) {
        throw new Error('Freighter extension not installed');
      }

      try {
        const window_ = globalThis as unknown as FreighterWindow;
        console.log('Signing transaction with Freighter...');
        const result = await window_.freighter?.signTransaction(
          transactionXDR,
          network
        );
        if (!result?.signedXDR) {
          throw new Error('Transaction signing returned empty result');
        }
        console.log('Transaction signed successfully');
        return result.signedXDR;
      } catch (err: any) {
        console.error('Transaction signing error:', err);
        setError(err?.message || 'Failed to sign transaction');
        throw err;
      }
    },
    [isFreighterInstalled]
  );

  const signMessage = useCallback(
    async (message: string) => {
      if (!isFreighterInstalled()) {
        throw new Error('Freighter extension not installed');
      }

      try {
        const window_ = globalThis as unknown as FreighterWindow;
        console.log('Signing message with Freighter...');
        const result = await window_.freighter?.signMessage(message);
        if (!result?.signedMessage) {
          throw new Error('Message signing returned empty result');
        }
        console.log('Message signed successfully');
        return result.signedMessage;
      } catch (err: any) {
        console.error('Message signing error:', err);
        setError(err?.message || 'Failed to sign message');
        throw err;
      }
    },
    [isFreighterInstalled]
  );

  return {
    publicKey,
    isConnected,
    isLoading,
    error,
    freighterReady,
    isFreighterInstalled,
    connect,
    disconnect,
    signTransaction,
    signMessage,
  };
}

