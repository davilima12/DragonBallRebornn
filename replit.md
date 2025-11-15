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

**Component Architecture:**
- Atomic design pattern with reusable UI components (buttons, cards, badges)
- Feature-specific components (CharacterCard, GuildCard, ProductCard, etc.)
- Page-level components organized under `/pages` directory
- Protected routes wrapper for authenticated content
- Context providers for cross-cutting concerns (authentication)

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
- Context-based authentication (AuthContext) with localStorage persistence
- Mock authentication for development (simulated login flow)
- Protected route wrapper component preventing unauthorized access
- User session data stored in localStorage

**Production-Ready Preparation:**
- Session store configured for PostgreSQL (connect-pg-simple)
- Express session middleware ready for implementation
- Credentials included in fetch requests for cookie-based sessions

**Security Considerations:**
- Password fields in schema (ready for hashing implementation)
- Environment variable protection for DATABASE_URL
- CSRF protection via rawBody preservation for webhook verification

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