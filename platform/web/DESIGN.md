# Butr Design System

Butr should feel like a calm, intelligent investing copilot: friendly on the surface, disciplined underneath.

This design system is intentionally small and opinionated so the frontend stays consistent as we add more screens.

## Design references

- Ollama: restrained, product-first composition, strong whitespace, simple hierarchy, clear calls to action.
- Cuckoo: bright, warm, playful confidence, bold color, approachable copy, friendly personality.

Butr should sit between those poles:

- the clarity and restraint of Ollama
- the warmth and yellow energy of Cuckoo
- but with less marketing gloss and more trustworthy control-plane discipline

## Brand principles

- Calm, not hectic
- Clear, not clever
- Friendly, not childish
- Confident, not aggressive
- Beautiful, but not decorative for its own sake

## Logo direction

The logo should be a simple butter mark.

Recommended direction:

- a small rounded butter block or butter pat icon
- yellow is the primary brand cue
- minimal detail, ideally recognizable at favicon size
- should work on light and dark backgrounds

Avoid:

- literal cows
- complex illustrations
- fintech shields, charts, arrows, or bank-like symbols
- overly geometric crypto-style marks

## Color system

Use butter yellow as the signature accent, then support it with calm neutrals and a muted green for trust.

Suggested palette:

- `butr-50`: `#FFFBE8`
- `butr-100`: `#FFF3BF`
- `butr-200`: `#FFE68A`
- `butr-300`: `#FFD54A`
- `butr-400`: `#E7B82B`
- `butr-500`: `#D29A1E`
- `butr-900`: `#2A2116`

Supporting neutrals:

- `ink`: `#1E1B16`
- `surface`: `#FFFDF8`
- `surface-muted`: `#F5F1E8`
- `border`: `rgba(44, 34, 21, 0.10)`
- `muted-text`: `#756B5E`

Trust accent:

- `sage-500`: `#3F6A52`

Warning accent:

- `amber-500`: `#B56B2B`

## Typography

Use one strong sans family with a generous, modern feel.

Recommended:

- `Inter` if we want maximum reliability and broad availability
- or a more distinctive grotesk later if the brand needs more personality

Rules:

- large, confident headings
- compact, readable body text
- keep numbers clear for portfolio values and allocations
- avoid all-caps in main content

## Layout

The app should feel like a calm cockpit, not a dashboard wall.

Structure:

- left: conversation
- center/right: portfolio and trade preview
- lower area: activity and audit trail
- use cards, but keep them airy and not too boxed in

Spacing:

- generous outer padding
- strong vertical rhythm
- avoid dense grids unless we are in a dedicated analysis view

## Visual style

Use:

- soft warm gradients
- subtle texture or radial glow around key areas
- thin borders rather than heavy shadows
- rounded but not bubbly corners
- small motion cues that feel deliberate

Avoid:

- hard neon fintech gradients
- glassmorphism overuse
- dark terminal styling
- casino / trading-app energy
- purple-first palettes

## Components

### Chat

- primary interaction surface
- should feel conversational and calm
- messages should be easy to scan
- assistant responses should be concise with a clear action line

### Portfolio cards

- show account type, cash, total value, positions, and key weights
- keep the key number prominent
- make overweight/underweight states obvious but not alarming

### Trade preview

- the most important transactional component
- should clearly show:
  - what the user asked for
  - what Butr understood
  - estimated quantity
  - estimated notional
  - rule checks
  - risks or warnings
  - approval button

### Activity feed

- audit trail style
- chronologically ordered
- honest and readable
- should reinforce trust, not overwhelm

## Copy tone

Butr should sound:

- direct
- reassuring
- plain-English
- lightly warm

Examples:

- “Preview ready”
- “This needs approval”
- “You’re within your cash limit”
- “This would push the position above your preferred cap”

Avoid:

- “Execute your alpha”
- “Maximize returns”
- “Upgrade your strategy”
- “Supercharge your portfolio”

## Product states

### Paper mode

- clearly labeled
- default state during development
- safe and explanatory

### Live mode

- clearly labelled
- requires stronger confirmation affordances
- show the user when actions will affect real money

### ISA-only

- keep this visible in account and settings surfaces
- do not present unsupported account types

## Frontend implementation rules

When building screens, always follow these rules:

1. Start from this design system before inventing new patterns.
2. Keep the chat flow and preview flow aligned to the repository contracts.
3. Never let the LLM own UI state or business state.
4. Prefer concise, decisive screens over dense analytics layouts.
5. Every trade-related screen should show mode, account type, and approval state.

## Suggested screen primitives

- `BrandMark`
- `ModeBadge`
- `AccountSummaryCard`
- `ChatThread`
- `TradePreviewCard`
- `ApprovalPanel`
- `ActivityFeed`
- `RiskNote`

## Future extension points

- more refined illustration system
- richer activity summaries
- portfolio allocation visualizations
- settings page for rules and thresholds
- profile-level automation controls

For now, the strongest rule is simple: make Butr feel like butter-colored clarity sitting on top of serious financial control.
