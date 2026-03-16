import {
  Keypair,
  TransactionBuilder,
  Networks,
  SorobanRpc,
} from '@stellar/stellar-sdk';

// Contract configuration
export const CONTRACT_ID = 'CALSOMXGUXSM7JGKOO4K52LOCZQW2ERYWFUDITYR5E7VZLWAU7CNHV2B';
export const NETWORK_PASSPHRASE = 'Test SDF Network ; September 2015';
export const RPC_URL = 'https://soroban-testnet.stellar.org';

const server = new SorobanRpc.Server(RPC_URL);

interface GameStats {
  games_played: number;
  challenges_completed: number;
}

interface ContractResponse {
  result?: {
    retval?: {
      type?: string;
      val?: any;
    };
  };
  error?: string;
}

/**
 * Create a new game session
 */
export async function createGame(
  player1: string,
  player2: string,
  wallet: any
): Promise<bigint | null> {
  try {
    // This is a placeholder implementation
    // In production, you'd interact with the Soroban contract
    const sessionId = BigInt(Math.floor(Math.random() * 1000000));
    return sessionId;
  } catch (error) {
    console.error('Error creating game:', error);
    return null;
  }
}

/**
 * Get a random truth question from the contract
 */
export async function getTruth(): Promise<string> {
  try {
    const truths = [
      'What is your biggest fear?',
      'Who do you secretly admire?',
      'What is your most embarrassing moment?',
      'Have you ever lied to your best friend?',
      'What would you do if nobody found out?',
      'Who is the person you trust the most?',
      'What is something you wish you could change?',
      'What makes you feel most alive?',
      'Have you ever broken a promise?',
      'What is your deepest insecurity?',
    ];
    return truths[Math.floor(Math.random() * truths.length)];
  } catch (error) {
    console.error('Error fetching truth:', error);
    return 'Tell us a secret...';
  }
}

/**
 * Get a random dare challenge from the contract
 */
export async function getDare(): Promise<string> {
  try {
    const dares = [
      'Do an impression of someone here',
      'Dance for 30 seconds without music',
      'Call a friend and tell them a joke',
      'Sing a song out loud',
      'Do 20 push-ups',
      'Walk backwards for a minute',
      'Speak in an accent for the next 3 rounds',
      'Let someone give you a makeover',
      'Share your screen and let others draw on it',
      'Do a silly dance move that becomes your signature',
    ];
    return dares[Math.floor(Math.random() * dares.length)];
  } catch (error) {
    console.error('Error fetching dare:', error);
    return 'Take on a challenge...';
  }
}

/**
 * Mark a challenge as completed
 */
export async function completeChallenge(
  player: string,
  challengeType: 'truth' | 'dare',
  wallet: any
): Promise<boolean> {
  try {
    // Placeholder: in production, commit to contract
    return true;
  } catch (error) {
    console.error('Error completing challenge:', error);
    return false;
  }
}

/**
 * Get player statistics
 */
export async function getStats(player: string): Promise<GameStats> {
  try {
    // Placeholder: in production, fetch from contract
    return {
      games_played: 0,
      challenges_completed: 0,
    };
  } catch (error) {
    console.error('Error fetching stats:', error);
    return {
      games_played: 0,
      challenges_completed: 0,
    };
  }
}

/**
 * Validate wallet address format
 */
export function isValidStellarAddress(address: string): boolean {
  return /^G[A-Z2-7]{56}$/.test(address);
}

/**
 * Get account details from the network
 */
export async function getAccountDetails(publicKey: string) {
  try {
    const account = await server.getAccount(publicKey);
    return account;
  } catch (error) {
    console.error('Error fetching account:', error);
    return null;
  }
}
