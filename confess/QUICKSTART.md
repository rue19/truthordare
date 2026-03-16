# 🚀 CONFESS — Quick Start Guide

## ⚡ Step-by-Step Setup

### 1. Prerequisites
```bash
✓ Node.js 18+ installed
✓ npm or yarn package manager
✓ Freighter Wallet browser extension
✓ Stellar testnet account
```

### 2. Clone & Install
```bash
cd confess
npm install
```

### 3. Environment Setup
```bash
# Copy environment template
cp .env.example .env.local

# Edit .env.local if needed (defaults are pre-configured for testnet)
```

### 4. Install Freighter Wallet

1. Go to [freighter.io](https://freighter.io)
2. Install extension for Chrome/Firefox
3. Create new account or import existing
4. **Switch network to Stellar Testnet** ⚠️
5. Fund account at [Stellar Testnet Faucet](https://laboratory.stellar.org/#account-creator)

### 5. Start Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` in your browser.

---

## 📖 How to Play

### Landing Page (`/`)
- Watch the cinematic intro as the oracle appears
- Read "How It Works" explanation
- Scroll down or click "Enter the Void"

### Lobby (`/lobby`)
- Click "Connect Freighter Wallet"
- Approve wallet connection in extension
- Enter opponent's Stellar public key (starts with `G`)
- Click "Enter the Arena"

### Game Room (`/game/[sessionId]`)
- **TRUTH** button: Reveals a personal question
- **DARE** button: Issues a physical challenge
- Complete challenges to earn points
- Opponent's orb orbits across from yours
- Stats panel tracks round and scores

### Profile (`/profile`)
- View your total games played
- Check challenges completed
- Browse achievements
- See recent game history

---

## 🔌 Wallet Integration

The game uses **Freighter Wallet** for all Stellar interactions:

```
User Action
    ↓
Game requests signature
    ↓
Freighter popup (user approves)
    ↓
Transaction signed & submitted
    ↓
Game state updates
```

**No private keys ever leave your browser.**

---

## 🌐 Network Configuration

```yaml
Network: Stellar Testnet
RPC Endpoint: https://soroban-testnet.stellar.org
Network Passphrase: Test SDF Network ; September 2015
Contract ID: CALSOMXGUXSM7JGKOO4K52LOCZQW2ERYWFUDITYR5E7VZLWAU7CNHV2B
```

---

## 🛠️ Development Commands

```bash
# Start dev server (hot reload)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type check
npm run type-check

# Lint code
npm run lint
```

---

## 🐛 Troubleshooting

### "Freighter extension not found"
- Ensure extension is installed from [freighter.io](https://freighter.io)
- Refresh browser page
- Check that extension is enabled in browser settings

### "Wrong network error"
- Open Freighter extension
- Click network selector (top-left)
- Choose "Stellar Testnet"
- Refresh game page

### "Invalid address error"
- Verify opponent's address starts with `G`
- Address should be 56 characters long
- No spaces or special characters

### 3D graphics are choppy
- Check that you have latest browser version
- Update GPU drivers
- Close other resource-intensive applications
- Try incognito/private browsing mode

### Game won't load
- Clear browser cache (Ctrl+Shift+Del)
- Check browser console for errors (F12)
- Ensure JavaScript is enabled
- Try different browser (Chrome/Firefox/Safari all supported)

---

## 📝 Smart Contract Methods

The game wraps these Soroban contract functions:

```typescript
// Create new game session
createGame(player1: string, player2: string): Promise<bigint>

// Get random truth question  
getTruth(): Promise<string>

// Get random dare challenge
getDare(): Promise<string>

// Mark challenge as completed
completeChallenge(
  player: string, 
  challengeType: 'truth' | 'dare'
): Promise<boolean>

// Get player statistics
getStats(player: string): Promise<{
  games_played: number,
  challenges_completed: number
}>
```

All contract calls are idempotent and retry-safe.

---

## 🎨 Customization

### Change Colors
Edit `src/styles/globals.css`:
```css
:root {
  --void-black: #05050a;
  --teal-accent: #00ffe1;    /* Change this */
  --ember-red: #ff3d00;      /* Or this */
}
```

### Modify Questions/Dares
Edit `src/lib/contract.ts` in the `getTruth()` and `getDare()` functions:
```typescript
const truths = [
  'Your custom question here',
  // ... more questions
];
```

### Adjust Animation Speed
- GSAP timelines: `src/components/scene/Dodecahedron.tsx`
- Framer Motion: `duration` property in component props
- Lenis scroll: `src/hooks/useLenis.ts`

---

## 🚀 Deployment

### Deploy to Vercel
```bash
# Push to GitHub
git push origin main

# Vercel auto-deploys on push
# Set environment variables in Vercel dashboard
```

### Manual Deployment
```bash
npm run build
npm start
```

Server runs on `localhost:3000` by default.

---

## 📞 Support

For issues or questions:
1. Check [Stellar docs](https://developers.stellar.org)
2. Visit [Freighter support](https://freighter.io/support)
3. Check browser console for errors (F12)
4. Review game logs in terminal

---

## ✨ Tips for Best Experience

- Use a modern browser (Chrome 90+, Firefox 88+, Safari 15+)
- Ensure stable internet connection
- Allow location permission if prompted
- Install latest blockchain wallet extension
- Use a computer with dedicated GPU for smooth 3D
- Play in fullscreen for immersive experience
- Close other tabs to free up memory

---

**Good luck confessing in the void! 🌌**
