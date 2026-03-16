# CONFESS — Truth or Dare on Stellar

A production-grade 3D psychological party game built on the Stellar blockchain. The entire experience lives inside an interactive WebGL world, not a traditional flat webpage.

## 🎭 The Concept

**CONFESS** is a fully spatial experience where you're inside a dark void. At the center floats a glowing **dodecahedron oracle** that responds to your choices. Select Truth and it cracks apart revealing a question. Select Dare and it explodes in a burst of particles. Players appear as glowing orbs orbiting the central oracle, and completed challenges leave ghost trails in the space.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Freighter Wallet extension (for Stellar integration)

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd confess

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the game.

### Build for Production

```bash
npm run build
npm start
```

## 🔌 Freighter Wallet Setup

1. Install [Freighter Wallet](https://freighter.io) extension
2. Create or import your Stellar account
3. Switch to **Testnet** network
4. You're ready to play!

## 🌐 Stellar Network Configuration

- **Network**: Stellar Testnet
- **RPC**: `https://soroban-testnet.stellar.org`
- **Passphrase**: `Test SDF Network ; September 2015`
- **Contract ID**: `CALSOMXGUXSM7JGKOO4K52LOCZQW2ERYWFUDITYR5E7VZLWAU7CNHV2B`

## 📁 Project Structure

```
src/
├── app/                      # Next.js 14 App Router
│   ├── page.tsx             # Landing page - cinematic intro
│   ├── lobby/page.tsx       # Game setup & wallet connect
│   ├── game/[session_id]/page.tsx  # Core game room
│   ├── profile/page.tsx     # Player stats & achievements
│   └── layout.tsx           # Root layout
├── components/
│   ├── scene/               # 3D React Three Fiber components
│   │   ├── OracleScene.tsx  # Main canvas and orchestrator
│   │   ├── Dodecahedron.tsx # Oracle mesh with animations
│   │   ├── PlayerOrb.tsx    # Wallet-linked plasma orbs
│   │   ├── VoidBackground.tsx # Nebula shader background
│   │   ├── ParticleField.tsx  # 2000 particle drift system
│   │   └── PostProcessing.tsx # Bloom, CA, Vignette, Noise
│   ├── ui/                  # 2D UI components
│   │   ├── ChallengeCard.tsx
│   │   ├── WalletOrb.tsx
│   │   ├── CrystalButton.tsx
│   │   ├── StatsPanel.tsx
│   │   ├── GhostTrail.tsx
│   │   └── Toast.tsx
│   └── layout/              # Layout components
│       ├── Navbar.tsx
│       └── LenisProvider.tsx
├── hooks/
│   ├── useFreighter.ts      # Wallet connection
│   ├── useOracleState.ts    # Zustand stores
│   └── useLenis.ts          # Smooth scrolling
├── lib/
│   ├── contract.ts          # Soroban contract wrappers
│   └── glitch.ts            # Utilities (glitch anim, etc)
├── shaders/
│   └── voidNebula.glsl      # Custom GLSL shader
└── styles/
    └── globals.css          # Typography, colors, animations
```

## 🎨 Design System

### Colors
- **Void Black**: `#05050a` (background)
- **Teal Accent**: `#00ffe1` (Truth, primary)
- **Ember Red**: `#ff3d00` (Dare, secondary)

### Typography
- **Headings**: Syne (geometric, unsettling)
- **Body**: DM Mono (cold, precise)
- **Accent**: Bebas Neue (loud, confrontational)

### Effects
- **Glow halos** define UI element edges (no traditional borders)
- **Glitch animation** on wallet addresses
- **Bloom postprocessing** on all glowing elements
- **Smooth inertia scrolling** via Lenis

## 🎮 Game Flow

### Landing Page (`/`)
- Full viewport 3D canvas with slowly dollying camera
- "How It Works" explained in 3 floating 3D panels
- Scroll down with Lenis smooth scrolling
- CTA: "Enter the Void" routes to lobby

### Lobby (`/lobby`)
- Connect Freighter wallet
- Enter opponent's Stellar address
- Start game (creates session, initializes both player orbs)

### Game Room (`/game/[session_id]`)
- Two crystalline button slabs: TRUTH and DARE
- Challenge card materializes in center on selection
- Stats panel in bottom right (animated counters)
- Ghost trails accumulate for completed challenges
- Both player orbs orbit the oracle

### Profile (`/profile`)
- Quieter scene with oracle in distance
- Stats displayed as animated glowing counters
- Achievement badges as crystalline gems in a ring
- Challenge history scrollable list

## 🔗 Smart Contract Integration

All interactions with Stellar are abstracted through `lib/contract.ts`:

```typescript
createGame(player1, player2) → bigint session_id
getTruth() → string question
getDare() → string challenge
completeChallenge(player, type) → boolean success
getStats(player) → { games_played, challenges_completed }
```

## 🎬 Animation System

### Framer Motion
- All 2D UI panels use spring physics
- Page transitions slide into 3D space with `rotateY` and `z`
- Shared layout IDs for challenge card transitions

### GSAP
- Dodecahedron explosion/implosion timelines
- Camera dolly on landing (0 → 3 second intro)
- Typewriter text reveal on challenge cards
- Glitch scramble on wallet addresses

### Three.js / React Three Fiber
- Dodecahedron rotation and pulsing glow
- Player orbs orbit around center with corona glow
- 2000 micro-particles drift with mouse repulsion
- Postprocessing: Bloom → ChromaticAberration → Vignette → Noise

### Lenis
- Smooth inertia scrolling on landing
- Scroll velocity affects oracle tilt (subtle parallax)

## 🚀 Performance Optimization

- `Suspense` boundaries on all 3D components
- `instancedMesh` for particle system (not 2000 individual meshes)
- Canvas `dpr={[1, 1.5]}` caps pixel ratio
- Postprocessing only on game room page
- `will-change: transform` on animated elements
- Font preloading via `next/font`

## 📦 Dependencies

- **Framework**: Next.js 14, React 18
- **3D**: Three.js, @react-three/fiber, @react-three/drei, @react-three/postprocessing
- **Animation**: Framer Motion, GSAP, Lottie React
- **Blockchain**: @stellar/stellar-sdk, @stellar/freighter-api
- **Styling**: TailwindCSS
- **State**: Zustand
- **Scrolling**: @studio-freight/lenis
- **Notifications**: react-hot-toast

## 🛠️ Development

```bash
# Watch mode
npm run dev

# Type checking
npm run type-check

# Linting
npm run lint

# Build
npm run build
```

## 🔐 Security

- Wallet signing done via Freighter extension (keys never leave browser)
- All transactions require user approval
- Contract calls validated on-chain
- Environment variables for sensitive config via `.env.local`

## 📄 License

MIT

## 🤝 Contributing

Contributions welcome! Please open issues and PRs.

---

**Built with passion for the Stellar ecosystem. May your truths run deep. May your dares be daring.** 🌌
