# Design Guidelines: Dragon Ball Z-Inspired Gaming Portal

## Design Approach
**Reference-Based Approach** drawing inspiration from modern gaming platforms (Riot Games, Blizzard, Epic Games) combined with anime-inspired energy aesthetics. The design emphasizes dramatic visual hierarchy, bold contrasts, and dynamic elements while maintaining professional polish.

## Core Design Principles

### Color Strategy (Dark Theme)
- **Primary Dark Backgrounds**: Deep navy/charcoal (#0f1419, #1a1f2e)
- **Energy Accents**: Vibrant orange (#ff8c00, #ffa500) and golden yellow (#ffd700, #ffb700)
- **Status Indicators**: Green (#4ade80) for online, red (#ef4444) for offline
- **Text Hierarchy**: White (#ffffff) primary, gray (#9ca3af) secondary
- **Card Backgrounds**: Subtle dark elevation (#1e293b, #2d3748)

### Typography System
- **Primary Font**: "Rajdhani" or "Orbitron" (bold, futuristic) for headings via Google Fonts
- **Body Font**: "Inter" or "Poppins" for readability
- **Hierarchy**:
  - H1: 3xl to 5xl, bold (800-900 weight)
  - H2: 2xl to 4xl, semibold (600-700)
  - H3: xl to 2xl, medium (500-600)
  - Body: base to lg, regular (400)
  - Captions: sm to base, light (300-400)

### Layout System
**Spacing Primitives**: Use Tailwind units of **2, 4, 6, 8, 12, 16** (e.g., p-4, gap-8, mb-12)
- Tight spacing: 2-4 for inline elements
- Standard spacing: 6-8 for component padding
- Section spacing: 12-16 for vertical rhythm

### Component Library

**Navigation Bar**
- Fixed top position with backdrop blur and dark semi-transparent background
- Height: h-16 to h-20
- Logo left-aligned with energy glow effect (orange/yellow subtle aura)
- Navigation links with hover underline animations in orange
- User menu/login button right-aligned with accent button styling

**Buttons**
- **Primary CTA**: Orange gradient background (from orange to yellow), bold text, px-6 py-3, rounded-lg, subtle glow effect
- **Secondary**: Dark background with orange border, hover fills with orange
- **Ghost**: Transparent with orange text, hover background in dark orange/10
- All buttons with smooth transitions (duration-200)

**Cards**
- Dark backgrounds (#1e293b) with subtle border (border-orange-500/20)
- Padding: p-6 to p-8
- Rounded corners: rounded-xl
- Hover effect: slight scale (hover:scale-105) with glow shadow in orange
- Inner glow on active/featured cards

**Status Box (Server Online/Offline)**
- Prominent position on homepage
- Pulse animation for "online" status with green glow
- Icon + text + player count in horizontal layout
- Border with status color accent

**Ranking Tables/Leaderboards**
- Striped rows (alternate dark shades)
- Top 3 entries with special treatment (gold/silver/bronze accents)
- Rank badges with circular design and gradient backgrounds
- Player stats in grid columns: Rank | Avatar/Name | Level | Power | Guild

**Shop Product Cards**
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Product image placeholder at top with gradient overlay
- Title in bold with orange accent
- Price prominently displayed with VIP badge if applicable
- "Purchase" button at bottom with glow effect

**Transaction History**
- Timeline layout with connecting lines in orange
- Each transaction as card with date, type, amount, status
- Status badges (completed/pending/failed) with color coding

**Guild Cards (Top 5)**
- Larger cards with guild emblem placeholder
- Guild name in large bold text
- Member count, total power, leader name
- Hover reveals more details or "Join" button

## Page-Specific Layouts

### Homepage
1. **Hero Section** (80-90vh)
   - Full-width background with subtle energy particle effect (CSS animation)
   - Centered content: Game logo/title (large), tagline, dual CTAs ("Start Playing" + "Watch Trailer")
   - Server status box integrated at bottom-right of hero
   
2. **Stats Dashboard** (py-16)
   - Two-column layout: Top 10 Players (left) | Top 5 Guilds (right)
   - Each with styled tables/cards and section headers with orange underline accent

3. **Quick Actions Grid** (py-16)
   - Five cards in grid (2 cols on md, 3 on lg): Create Account, Shop, Ranking, Discord, Download
   - Icon-driven design with hover effects

### User Dashboard
- Sidebar navigation (left) with user avatar, name, level badge
- Main content area showing:
  - Account overview cards (grid-cols-1 md:grid-cols-3): Points Balance, VIP Status, Total Purchases
  - Transaction history below in full width
  - Each section with clear heading and dark card background

### Shop Page
- Filter sidebar (left, collapsible on mobile) for categories: All, Points, VIP, Items
- Product grid (main area) with 3 columns on desktop
- Featured products banner at top with larger cards

### Ranking Page
- Tabbed interface: Players | Guilds | Events
- Full-width leaderboard table with sticky header
- Search/filter bar at top
- Pagination at bottom with orange accent

### Deposit/Sell Points Pages
- Centered form layout with max-width (max-w-2xl)
- Step indicator at top showing process (1. Amount → 2. Payment → 3. Confirm)
- Large input fields with orange focus rings
- Summary card showing breakdown before confirmation

## Images
**Hero Background**: Abstract energy aura/power-up effect (golden/orange light bursts), NOT character images
**Product Placeholders**: Geometric icons or energy spheres in orange gradients
**Guild Emblems**: Abstract symbols (shields, stars, geometric patterns)
**User Avatars**: Circular with orange ring border, placeholder silhouette if none uploaded

## Animations (Minimal)
- Subtle particle float effect on hero background
- Pulse glow on server status when online
- Smooth hover scale on cards (scale-105, duration-200)
- Page transition fades
- **NO** complex scroll-triggered or excessive motion effects

## Accessibility
- Maintain WCAG AA contrast ratios (ensure orange/yellow on dark backgrounds meets standards)
- Focus indicators visible on all interactive elements (orange ring)
- Semantic HTML with proper heading hierarchy
- ARIA labels for icon-only buttons
- Keyboard navigation support throughout

## Responsive Breakpoints
- Mobile-first approach
- Navbar collapses to hamburger menu below md (768px)
- Single column layouts on mobile, multi-column on md+
- Tables become scrollable cards on mobile
- Reduce padding/spacing scales down proportionally (e.g., p-16 → p-8 → p-4)