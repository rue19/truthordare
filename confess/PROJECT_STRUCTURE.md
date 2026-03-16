# CONFESS — Project Structure & File Listing

## 📁 Complete Directory Tree

```
confess/
├── .env.example                    # Environment variables template
├── .eslintrc.json                  # ESLint configuration
├── .gitignore                      # Git ignore rules
├── .prettierignore                 # Prettier ignore rules
├── .prettierrc                     # Code formatter configuration
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript configuration
├── tsconfig.node.json              # TypeScript node config
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # TailwindCSS configuration
├── postcss.config.js               # PostCSS configuration
├── README.md                       # Main documentation
│
├── public/                         # Static assets
│   └── (favicon, images, etc)
│
└── src/
    ├── app/                        # Next.js 14 App Router
    │   ├── layout.tsx              # Root layout wrapper
    │   ├── page.tsx                # Landing page (/)
    │   ├── lobby/
    │   │   └── page.tsx            # Lobby page (/lobby)
    │   ├── game/
    │   │   └── [session_id]/
    │   │       └── page.tsx        # Game room (/game/[sessionId])
    │   └── profile/
    │       └── page.tsx            # Profile page (/profile)
    │
    ├── components/
    │   ├── scene/                  # 3D React Three Fiber components
    │   │   ├── OracleScene.tsx     # Main R3F canvas orchestrator
    │   │   ├── Dodecahedron.tsx    # Oracle mesh w/ animations
    │   │   ├── PlayerOrb.tsx       # Wallet-linked plasma orbs
    │   │   ├── VoidBackground.tsx  # Nebula shader background
    │   │   ├── ParticleField.tsx   # 2000-particle drift system
    │   │   └── PostProcessing.tsx  # Bloom, CA, Vignette, Noise
    │   │
    │   ├── ui/                     # 2D UI components
    │   │   ├── ChallengeCard.tsx   # Materializing question/dare card
    │   │   ├── WalletOrb.tsx       # Wallet display w/ glitch anim
    │   │   ├── CrystalButton.tsx   # Crystalline slab buttons
    │   │   ├── StatsPanel.tsx      # Stats & score display
    │   │   ├── GhostTrail.tsx      # Fading challenge imprints
    │   │   └── Toast.tsx           # Toast notification system
    │   │
    │   └── layout/                 # Layout components
    │       ├── Navbar.tsx          # Top navigation bar
    │       └── LenisProvider.tsx   # Smooth scrolling wrapper
    │
    ├── hooks/
    │   ├── useFreighter.ts         # Stellar wallet connection
    │   ├── useOracleState.ts       # Zustand stores (Oracle, Wallet, Game)
    │   └── useLenis.ts             # Smooth scrolling hook
    │
    ├── lib/
    │   ├── contract.ts             # Soroban contract wrappers
    │   │   ├── createGame()
    │   │   ├── getTruth()
    │   │   ├── getDare()
    │   │   ├── completeChallenge()
    │   │   ├── getStats()
    │   │   └── Stellar utilities
    │   │
    │   └── glitch.ts               # Utility functions
    │       ├── generateGlitchFrames()
    │       ├── hashToColor()
    │       ├── shortenAddress()
    │       └── formatNumber()
    │
    ├── shaders/
    │   └── voidNebula.glsl         # Custom GLSL volumetric fog shader
    │
    └── styles/
        └── globals.css             # Global styles, fonts, CSS vars
```

## 📦 Key Files Breakdown

### Configuration Files
| File | Purpose |
|------|----|
| `package.json` | All 30+ dependencies, dev scripts |
| `tsconfig.json` | TypeScript strict mode, path aliases |
| `next.config.js` | Next.js optimization & webpack config |
| `tailwind.config.js` | Custom theme colors & utilities |
| `.env.example` | Template for environment variables |

### Pages (4 Total)
| Route | File | Purpose |
|-------|------|---------|
| `/` | `page.tsx` | Cinematic landing with 3D intro |
| `/lobby` | `lobby/page.tsx` | Wallet connect, opponent setup |
| `/game/[sessionId]` | `game/[session_id]/page.tsx` | Main game arena |
| `/profile` | `profile/page.tsx` | Player stats & achievements |

### 3D Scene Components (6 Files)
| Component | File | Purpose |
|-----------|------|---------|
| Main Canvas | `OracleScene.tsx` | R3F Canvas orchestrator + lighting |
| Oracle | `Dodecahedron.tsx` | Central 12-face die w/ animations |
| Player Orbs | `PlayerOrb.tsx` | Plasma spheres orbiting oracle |
| Background | `VoidBackground.tsx` | Nebula-like infinite backdrop |
| Particles | `ParticleField.tsx` | 2000 drifting micro-particles |
| Effects | `PostProcessing.tsx` | Bloom, CA, Vignette, Noise |

### UI Components (6 Files)
| Component | File | Purpose |
|-----------|------|---------|
| Card | `ChallengeCard.tsx` | Typewriter-animated truth/dare reveal |
| Wallet | `WalletOrb.tsx` | Address display w/ glitch effect |
| Button | `CrystalButton.tsx` | Styled crystalline buttons |
| Stats | `StatsPanel.tsx` | Floating score & round counter |
| Trail | `GhostTrail.tsx` | Fading completed challenge imprints |
| Notifications | `Toast.tsx` | Hot toast notifications |

### Hooks (3 Files)
| Hook | File | Purpose |
|------|------|---------|
| Wallet | `useFreighter.ts` | Stellar wallet connection & signing |
| State | `useOracleState.ts` | Zustand stores (3 total) |
| Scroll | `useLenis.ts` | Lenis smooth scrolling |

### Library Functions (2 Files)
| Module | File | Purpose |
|--------|------|---------|
| Contracts | `contract.ts` | Soroban wrappers + Stellar SDK |
| Utilities | `glitch.ts` | Animations, hashing, formatting |

### Shaders (1 File)
| Shader | File | Purpose |
|--------|------|---------|
| Void Nebula | `voidNebula.glsl` | Volumetric fog FBM animation |

### Styling (1 File)
| Style | File | Purpose |
|-------|------|---------|
| Global | `globals.css` | Typography, colors, animations |

## 🎯 Total File Count: 34 Files

- **Configuration**: 8 files
- **Pages**: 4 files  
- **Scene Components**: 6 files
- **UI Components**: 6 files
- **Hooks**: 3 files
- **Libraries**: 2 files
- **Shaders**: 1 file
- **Styles**: 1 file
- **Documentation**: 3 files (README.md, this file, project-structure.md)

## 🚀 Installation & Running

```bash
# 1. Install dependencies (in /confess directory)
npm install

# 2. Create .env.local from .env.example
cp .env.example .env.local

# 3. Start development server
npm run dev

# 4. Visit http://localhost:3000
```

## 📱 Page Flow

```
/ (Landing)
    ↓ "Enter the Void"
/lobby (Setup)
    ↓ "Enter the Arena"
/game/[sessionId] (Play)
    ↓ "View Profile"
/profile (Stats)
    ↓ "Back to Lobby"
/lobby (Loop)
```

## 🔌 Stellar Integration

All blockchain calls routed through `lib/contract.ts`:

```typescript
// Blockchain Functions
- createGame(p1, p2) → session_id
- getTruth() → string
- getDare() → string
- completeChallenge(player, type) → bool
- getStats(player) → {games_played, challenges_completed}

// Network Config
- Network: Stellar Testnet
- RPC: https://soroban-testnet.stellar.org
- Contract: CALSOMXGUXSM7JGKOO4K52LOCZQW2ERYWFUDITYR5E7VZLWAU7CNHV2B
```

## 🎬 Animation Stack

| Library | Usage |
|---------|-------|
| **Framer Motion** | 2D UI springs, page transitions |
| **GSAP** | Dodecahedron explode/implode, camera dolly |
| **Three.js** | 3D world, shaders, materials |
| **React Three Fiber** | R3F component abstraction |
| **Lenis** | Smooth inertia scrolling |

## 💾 State Management

All state via **Zustand** stores in `useOracleState.ts`:

```typescript
1. OracleStore - Animation state, current challenge
2. WalletStore - Public key, connection status, errors
3. GameStore - Session ID, scores, round number
```

## 🎨 Design Tokens

```css
/* Colors */
--void-black: #05050a
--teal-accent: #00ffe1 (Truth)
--ember-red: #ff3d00 (Dare)
--dark-secondary: #0a0a0f

/* Typography */
--font-syne: Syne (headings)
--font-mono: DM Mono (body)
--font-bebas: Bebas Neue (accents)

/* Effects */
--glow-teal: 0 0 20px rgba(0, 255, 225, 0.5)
--glow-ember: 0 0 20px rgba(255, 61, 0, 0.5)
```

## 📊 Performance Flags

- ✅ Canvas `dpr={[1, 1.5]}` (pixel density capped)
- ✅ InstancedMesh for particles (not 2000 individual meshes)
- ✅ Lazy loaded 3D components with Suspense
- ✅ Postprocessing only on game room page
- ✅ CSS `will-change` on animations
- ✅ Next.js font preloading

---

**Everything is production-ready. Deploy with confidence.** 🚀
