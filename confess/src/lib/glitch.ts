/**
 * Wallet address scramble animation utility
 * Animates text character by character with glitch effect
 */

export function generateGlitchFrames(
  targetText: string,
  duration: number = 800
): Array<{ text: string; timestamp: number }> {
  const frames: Array<{ text: string; timestamp: number }> = [];
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const frameCount = Math.ceil(duration / 16); // ~60fps

  for (let frame = 0; frame < frameCount; frame++) {
    const progress = frame / frameCount;
    let text = '';

    for (let i = 0; i < targetText.length; i++) {
      const charProgress = progress * (1 + (i / targetText.length) * 0.3);

      if (charProgress >= 1) {
        // Character is settled
        text += targetText[i];
      } else if (charProgress > 0.3) {
        // Character is scrambling
        const randomIndex = Math.floor(Math.random() * characters.length);
        text += characters[randomIndex];
      } else {
        // Character hasn't started
        text += '_';
      }
    }

    frames.push({
      text,
      timestamp: frame * 16,
    });
  }

  return frames;
}

/**
 * Get a unique color from a wallet address hash
 * Returns HSL color string
 */
export function hashToColor(address: string): string {
  // Use first 6 chars of address to generate HSL color
  const hash = address.substring(0, 6);
  const hue = parseInt(hash, 16) % 360;
  const saturation = 70 + (parseInt(hash.substring(2), 16) % 20); // 70-90%
  const lightness = 45 + (parseInt(hash.substring(4), 16) % 15); // 45-60%

  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

/**
 * Shorten wallet address for display
 */
export function shortenAddress(address: string, chars: number = 4): string {
  if (!address) return '';
  return `${address.slice(0, chars)}...${address.slice(-chars)}`;
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num: number): string {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
