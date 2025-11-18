# Dragon Warriors - Gaming Portal

## Overview

Dragon Warriors is a Dragon Ball Z-inspired gaming portal built as a full-stack web application. The platform allows users to create accounts, manage characters, purchase VIP memberships and in-game items, participate in guilds, and compete on leaderboards. The application features a dark, anime-inspired aesthetic with vibrant orange and yellow energy accents, providing an immersive gaming experience for players.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Technology Stack:**
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter (lightweight client-side routing)
- **UI Components**: Radix UI primitives with shadcn/ui component library (New York style variant)
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: React Context API for authentication, TanStack Query for server state
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

**Design System:**
The application implements a comprehensive design system inspired by modern gaming platforms (Riot Games, Blizzard, Epic Games). Key design decisions include:

- Dark theme with deep navy/charcoal backgrounds for reduced eye strain during extended gaming sessions
- Vibrant orange (#ff8c00, #ffa500) and golden yellow (#ffd700, #ffb700) accent colors to evoke Dragon Ball Z energy aesthetics
- Custom typography using Google Fonts: Rajdhani/Orbitron for headings (futuristic feel), Inter/Poppins for body text (readability)
- Consistent spacing system using Tailwind's scale (2, 4, 6, 8, 12, 16 units)
- Card-based layouts with subtle elevation and hover effects for interactivity
- Status indicators using semantic colors (green for online, red for offline/destructive actions)
- Consistent player/member card design across ranking and guild pages
  - Vocation GIF (32x32px) with name displayed below
  - Level badge and rank indicators
  - Online status with animated green pulse
  - Guild name display when applicable

**Component Architecture:**
- Atomic design pattern with reusable UI components (buttons, cards, badges)
- Feature-specific components (CharacterCard, GuildCard, ProductCard, VocationSelect, etc.)
- Page-level components organized under `/pages` directory
- Protected routes wrapper for authenticated content
- Context providers for cross-cutting concerns (authentication, loading states)

**Key Components:**
- `VocationSelect`: Custom dropdown component for selecting character vocation with GIF preview
  - Displays vocation name and animated GIF icon
  - Integrates with vocations API endpoint
  - Provides visual feedback on selected vocation

### Backend Architecture

**Technology Stack:**
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM for type-safe database operations
- **Development**: tsx for TypeScript execution, esbuild for production builds

**Server Structure:**
The backend follows a simple Express-based architecture with clear separation of concerns:

- `server/index.ts`: Application entry point with middleware setup and request logging
- `server/routes.ts`: Route registration (currently minimal, ready for API expansion)
- `server/storage.ts`: Storage abstraction layer with in-memory implementation (MemStorage)
- `server/db.ts`: Database connection setup using Drizzle ORM
- `server/vite.ts`: Vite dev server integration for development HMR

**Storage Layer:**
The application uses an interface-based storage pattern (IStorage) allowing easy swapping between implementations. Currently implements MemStorage for development, with PostgreSQL schema defined via Drizzle ready for production.

**API Design Philosophy:**
- RESTful API pattern with `/api` prefix for all application routes
- Request/response logging with truncation for readability
- JSON body parsing with raw body preservation for webhooks
- Session-based authentication preparation (connect-pg-simple for PostgreSQL sessions)

**API Endpoints:**
- `GET /api/vocations`: Returns list of available character vocations
- `POST /api/account`: Creates new user account with player character
  - Request body: { name, email, password, nickname, playerName, vocationId }
- `POST /api/login`: Authenticates user and returns JWT token
  - Request body: { login, password }
  - Response: { token }
- `POST /api/account/logout`: Logs out authenticated user
  - Header: Authorization: Bearer {token}
- `GET /api/account/validate-auth-token`: Validates JWT token and returns user data
  - Header: Authorization: Bearer {token}
- `GET /api/account`: Returns complete account information for authenticated user
  - Header: Authorization: Bearer {token}
  - Response: Full account object with all fields
- `GET /api/account/players`: Returns all players/characters belonging to authenticated user's account
  - Header: Authorization: Bearer {token}
  - Response: Array of player objects
- `POST /api/player`: Creates a new player/character for authenticated user
  - Header: Authorization: Bearer {token}
  - Request body: { playerName, vocationId }
- `DELETE /api/player/:id`: Deletes a player/character belonging to authenticated user
  - Header: Authorization: Bearer {token}
- `GET /api/players`: Paginated list of players with filtering
- `GET /api/player/:id`: Detailed player information
- `GET /api/guilds`: Paginated list of guilds
- `GET /api/guild/:id`: Detailed guild information
- `POST /api/guild`: Creates a new guild with authenticated user's selected character as owner
  - Header: Authorization: Bearer {token}
  - Request body: { name, ownerId }
  - Response: Created guild object
- **Guild Invitation System:**
  - **Sending Invites:**
    - Frontend sends invite requests directly to `http://localhost:8000/api/guild/join-player`
    - Only guild leaders (rank level 3) and vice-leaders (rank level 2) can invite players
    - Request body: { player_id: number, guild_id: number, guild_player_admin: number }
    - Authentication handled via Bearer token in Authorization header
  - **Viewing and Accepting Invites:**
    - Guild detail API returns `guild_invite` array with pending invitations
    - Each invite includes player data (id, name, level, vocation, online status, account_id)
    - Frontend displays "Convites Pendentes" section when invites exist
    - Players can only accept invites for their own characters (verified via account_id match)
    - Accept endpoint: POST to `http://localhost:8000/api/guild/accept-invite-player`
    - Accept request body: { player_id: number, guild_id: number }
    - After acceptance, player moves from guild_invite to guild_rank members
- **Online Players Count:**
  - External API endpoint at `http://localhost:8000/api/qtd_online`
  - Returns real-time count of online players: `{ "qtd_online": <number> }`
  - Displayed on home page ServerStatus component
  - Auto-refreshes every 30 seconds via TanStack Query
  - Fallback to 0 if API is unavailable
  - Routed through main backend (port 8000) which proxies to game server

### Data Storage Solutions

**Database:**
- **Provider**: Neon Serverless PostgreSQL (via @neondatabase/serverless)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **WebSocket Support**: WebSocket connections via ws package for Neon serverless

**Schema Design:**
Current schema includes a users table with:
- UUID primary key (auto-generated)
- Username (unique, required)
- Password (required)
- Extensible for additional user attributes (points, VIP status, etc.)

**Migration Strategy:**
- Drizzle Kit for schema migrations (`db:push` script)
- Migrations stored in `/migrations` directory
- Schema definitions in `shared/schema.ts` for client/server sharing

**Development vs Production:**
- In-memory storage (MemStorage) used for rapid development iteration
- Production-ready PostgreSQL schema and connection configured
- Storage interface allows seamless transition between implementations

### Authentication and Authorization

**Current Implementation:**
- JWT token-based authentication via AuthContext
- Token stored in localStorage with automatic validation on app load
- Login endpoint validates credentials and returns JWT token
- Token validation endpoint returns user data for authenticated requests
- Protected route wrapper component preventing unauthorized access
- Automatic token validation on app initialization

**Authentication Flow:**
1. User submits login credentials (username/email + password)
2. Backend validates and returns JWT token
3. Frontend stores token in localStorage
4. Frontend validates token and fetches user data
5. Frontend fetches complete account data using the token
6. User data and account data stored in AuthContext and localStorage
7. Token included in Authorization header for all protected API requests

**UI Integration:**
- Navbar adapts based on authentication status
- Logged-in users see: account dropdown, points balance, dashboard/characters/settings links, logout
- Non-authenticated users see: login and register buttons
- Loading state during token validation prevents UI flicker

**Security Considerations:**
- JWT token-based authentication with Bearer scheme
- Token validation on each app load
- Automatic logout on invalid/expired tokens
- Password fields in schema (ready for hashing implementation)
- Environment variable protection for DATABASE_URL

**Logout and Cache Management:**
- On logout, TanStack Query cache is selectively cleared to remove user-specific data
- Removes queries matching `/api/account` and `/api/player` endpoints
- Components using `useAuth()` automatically re-render when authentication state changes
- Guild invite UI is gated by `isAuthenticated` check to prevent showing after logout
- Local component state (like selected player) is reset via useEffect when user logs out

### External Dependencies

**UI Component Libraries:**
- Radix UI: Comprehensive set of unstyled, accessible primitives (accordion, alert-dialog, avatar, checkbox, dialog, dropdown-menu, label, navigation-menu, popover, progress, radio-group, scroll-area, select, separator, slider, switch, tabs, toast, toggle, tooltip)
- class-variance-authority: Type-safe component variant management
- cmdk: Command menu implementation
- tailwind-merge + clsx: Utility class composition

**Data Fetching:**
- TanStack Query (React Query): Server state management with caching and refetching
- Custom query client configuration with authorization handling

**Form Management:**
- React Hook Form: Performance-optimized form state management
- Zod: Runtime type validation and schema generation
- drizzle-zod: Integration between Drizzle schemas and Zod validation

**Date Handling:**
- date-fns: Modern date utility library for formatting and manipulation

**Development Tools:**
- Vite plugins for Replit integration (runtime error overlay, cartographer, dev banner)
- TypeScript strict mode for type safety
- PostCSS with Tailwind CSS and Autoprefixer

**Icons:**
- lucide-react: Consistent icon library
- react-icons: Additional icons (specifically SiDiscord for Discord branding)

**Database:**
- @neondatabase/serverless: Serverless PostgreSQL client optimized for edge
- ws: WebSocket implementation for Neon's connection protocol
- drizzle-orm: Type-safe SQL query builder

**Build Tools:**
- esbuild: Fast JavaScript bundler for production builds
- tsx: TypeScript execution for development server
- Vite: Modern frontend build tool with HMR