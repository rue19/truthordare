import { useState, useCallback } from 'react';
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
  const {
    publicKey,
    setPublicKey,
    setIsConnected,
    setNetworkError,
    isConnected,
  } = useWalletStore();

  const isFreighterInstalled = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    const window_ = globalThis as unknown as FreighterWindow;
    return typeof window_ !== 'undefined' && !!window_.freighter;
  }, []);

  const connect = useCallback(async () => {
    if (!isFreighterInstalled()) {
      setError('Freighter extension not installed');
      setNetworkError(
        'Please install the Freighter wallet extension at freighter.app'
      );
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      const window_ = globalThis as unknown as FreighterWindow;

      const isConnected_ = await window_.freighter?.isConnected();
      if (!isConnected_) {
        throw new Error('Freighter wallet could not be accessed');
      }

      const key = await window_.freighter?.getPublicKey();
      if (!key) {
        throw new Error('Unable to get public key from Freighter');
      }

      setPublicKey(key);
      setIsConnected(true);
      setNetworkError(null);
      return key;
    } catch (err: any) {
      const errorMessage =
        err?.message || 'Failed to connect wallet. Please try again.';
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
        const result = await window_.freighter?.signTransaction(
          transactionXDR,
          network
        );
        return result?.signedXDR || null;
      } catch (err: any) {
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
        const result = await window_.freighter?.signMessage(message);
        return result?.signedMessage || null;
      } catch (err: any) {
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
    isFreighterInstalled,
    connect,
    disconnect,
    signTransaction,
    signMessage,
  };
}

