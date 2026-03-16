import { useState, useCallback, useEffect } from 'react';
import { useWalletStore } from './useOracleState';

interface StellarWindow extends Window {
  stellar?: {
    isConnected: () => Promise<boolean>;
    getPublicKey: () => Promise<string>;
    signTransaction: (
      transactionXDR: string,
      options?: { network?: string }
    ) => Promise<{ signedXDR: string }>;
    signMessage: (message: string) => Promise<{ signedMessage: string }>;
    requestStellarAccess?: () => Promise<string>;
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
      const w = globalThis as unknown as StellarWindow;
      if (w.stellar) {
        console.log('Freighter wallet detected:', w.stellar);
        setFreighterReady(true);
      } else {
        console.warn('Freighter wallet not found on window.stellar');
      }
    };

    // Check if already loaded
    checkFreighter();

    // Listen for Freighter load event
    const handleFreighterLoad = () => {
      console.log('Freighter load event fired');
      checkFreighter();
    };

    window.addEventListener('stellar:ready', handleFreighterLoad);
    document.addEventListener('stellar:ready', handleFreighterLoad);
    
    // Also set up a timeout check for cases where the event doesn't fire
    const timeout = setTimeout(() => {
      console.log('Timeout check for Freighter');
      checkFreighter();
    }, 2000);

    // Additional check on document load
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', checkFreighter);
      return () => {
        window.removeEventListener('stellar:ready', handleFreighterLoad);
        document.removeEventListener('stellar:ready', handleFreighterLoad);
        document.removeEventListener('DOMContentLoaded', checkFreighter);
        clearTimeout(timeout);
      };
    } else {
      return () => {
        window.removeEventListener('stellar:ready', handleFreighterLoad);
        document.removeEventListener('stellar:ready', handleFreighterLoad);
        clearTimeout(timeout);
      };
    }
  }, []);

  const isFreighterInstalled = useCallback((): boolean => {
    if (typeof window === 'undefined') return false;
    const w = globalThis as unknown as StellarWindow;
    const hasStellar = !!w.stellar;
    console.log('Checking Freighter installed:', hasStellar, w.stellar);
    return hasStellar;
  }, []);

  const connect = useCallback(async () => {
    // First check if extension is even installed
    if (!isFreighterInstalled()) {
      const errorMsg = 'Freighter extension not installed. Please install it from https://freighter.app';
      setError(errorMsg);
      setNetworkError(errorMsg);
      console.error('Stellar/Freighter wallet not detected on window.stellar');
      return null;
    }

    try {
      setIsLoading(true);
      setError(null);
      const w = globalThis as unknown as StellarWindow;

      // Check if wallet is available
      if (!w.stellar) {
        throw new Error('Stellar wallet API not available');
      }

      // Request wallet access (returns public key)
      let key: string;
      if (w.stellar.requestStellarAccess) {
        // Use requestStellarAccess if available
        key = await w.stellar.requestStellarAccess();
      } else {
        // Fallback: try to get public key directly
        const isConnected_ = await w.stellar.isConnected();
        console.log('Wallet connection status:', isConnected_);
        
        if (!isConnected_) {
          throw new Error('Stellar wallet is not connected. Please unlock it and try again.');
        }

        key = await w.stellar.getPublicKey();
      }

      if (!key) {
        throw new Error('Unable to retrieve public key from Stellar wallet');
      }

      setPublicKey(key);
      setIsConnected(true);
      setNetworkError(null);
      console.log('Wallet connected successfully with key:', key);
      return key;
    } catch (err: any) {
      const errorMessage =
        err?.message || 'Failed to connect wallet. Please try again.';
      console.error('Wallet connection error:', err);
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
    async (transactionXDR: string, options?: { network?: string }) => {
      if (!isFreighterInstalled()) {
        throw new Error('Stellar wallet extension not installed');
      }

      try {
        const w = globalThis as unknown as StellarWindow;
        if (!w.stellar) {
          throw new Error('Stellar wallet API not available');
        }
        
        console.log('Signing transaction with Stellar wallet...');
        const result = await w.stellar.signTransaction(transactionXDR, options);
        
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
        throw new Error('Stellar wallet extension not installed');
      }

      try {
        const w = globalThis as unknown as StellarWindow;
        if (!w.stellar) {
          throw new Error('Stellar wallet API not available');
        }
        
        console.log('Signing message with Stellar wallet...');
        const result = await w.stellar.signMessage(message);
        
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

